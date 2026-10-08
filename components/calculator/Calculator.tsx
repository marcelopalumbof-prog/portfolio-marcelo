"use client";

/**
 * MÓDULO B — Calculadora interna de precificação e divisão.
 *
 * Fluxo: escolher serviço → ajustar valor cobrado → ajustar parâmetros
 * (impostos, custos, caixa, nº de sócios, bônus) → ver cards + gráfico de
 * pizza → salvar na carteira → exportar CSV/PDF → usar o simulador de
 * preço mínimo.
 *
 * Estado persistido em `localStorage` (parâmetros, nomes dos sócios e
 * carteira de vendas). Nenhum dado sai do navegador.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { logoutAction } from "@/app/calculadora/actions";
import { agencyServices, getServiceById } from "@/data/agency-pricing";
import {
  DEAL_STATUSES,
  dealStatusLabels,
  defaultPartnerNames,
  defaultSplitConfig,
  type DealStatus,
  type SplitConfig,
} from "@/data/split-config";
import {
  clearDeals,
  createDealId,
  loadDeals,
  saveDeals,
  type SavedDeal,
} from "@/lib/deals";
import { formatBRL, todayISO } from "@/lib/format";
import { buildChartSlices, computeSplit } from "@/lib/pricing-math";
import { DealsList } from "@/components/calculator/DealsList";
import { MinPriceSimulator } from "@/components/calculator/MinPriceSimulator";
import { SplitPieChart } from "@/components/calculator/SplitPieChart";

/** Chaves de persistência no localStorage. */
const STORAGE_KEYS = {
  split: "zinck.calc.split.v1",
  partners: "zinck.calc.partners.v1",
} as const;

/** Lê um valor JSON do localStorage com guard de tipos. */
function readStorage<T>(key: string, fallback: T, validate: (v: unknown) => boolean): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return validate(parsed) ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
}

/** Guard simples para o objeto de parâmetros. */
function isSplitConfig(value: unknown): value is SplitConfig {
  if (typeof value !== "object" || value === null) return false;
  const cfg = value as Partial<SplitConfig>;
  return (
    typeof cfg.taxPercent === "number" &&
    typeof cfg.costPercent === "number" &&
    typeof cfg.reservePercent === "number" &&
    typeof cfg.partners === "number" &&
    typeof cfg.executionBonusPercent === "number"
  );
}

/** Guard para a lista de nomes de sócios. */
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

/** Card de indicador numérico. */
function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "brand" | "danger" | "success";
}) {
  const tones = {
    default: "bg-gray-50 text-gray-900 dark:bg-gray-950/50 dark:text-gray-100",
    brand: "bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300",
    danger: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
    success: "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300",
  } as const;

  return (
    <div className={`rounded-xl p-4 ${tones[tone]}`}>
      <p className="text-xs uppercase tracking-wider opacity-70">{label}</p>
      <p className="mt-1 font-display text-xl font-bold tabular-nums">{value}</p>
      {hint && <p className="mt-0.5 text-xs opacity-70">{hint}</p>}
    </div>
  );
}

/** Campo percentual/numérico configurável. */
function ParamField({
  id,
  label,
  value,
  onChange,
  suffix,
  min = 0,
  max,
  step = 1,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-sm text-gray-900 tabular-nums focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
    </div>
  );
}

export function Calculator() {
  // ── Parâmetros configuráveis ──────────────────────────────────────────
  const [config, setConfig] = useState<SplitConfig>(defaultSplitConfig);
  const [partnerNames, setPartnerNames] = useState<string[]>(defaultPartnerNames);

  // ── Dados do projeto ──────────────────────────────────────────────────
  const [serviceId, setServiceId] = useState(agencyServices[0].id);
  const [chargedValue, setChargedValue] = useState<number>(
    agencyServices[0].basePrice,
  );
  const [clientName, setClientName] = useState("");
  const [dealDate, setDealDate] = useState(todayISO());
  const [dealStatus, setDealStatus] = useState<DealStatus>("proposta");

  // ── Carteira de vendas ────────────────────────────────────────────────
  const [deals, setDeals] = useState<SavedDeal[]>([]);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hidratação do localStorage (só no client, após a montagem).
  useEffect(() => {
    setConfig(readStorage<SplitConfig>(STORAGE_KEYS.split, defaultSplitConfig, isSplitConfig));
    setPartnerNames(
      readStorage<string[]>(STORAGE_KEYS.partners, defaultPartnerNames, isStringArray),
    );
    setDeals(loadDeals());
  }, []);

  // Persiste parâmetros e nomes sempre que mudam.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEYS.split, JSON.stringify(config));
      window.localStorage.setItem(STORAGE_KEYS.partners, JSON.stringify(partnerNames));
    } catch {
      /* storage indisponível */
    }
  }, [config, partnerNames]);

  /** Exibe uma mensagem temporária de confirmação. */
  const notify = useCallback((message: string) => {
    setFlashMessage(message);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlashMessage(null), 3000);
  }, []);

  useEffect(() => () => {
    if (flashTimer.current) clearTimeout(flashTimer.current);
  }, []);

  /** Ajusta um parâmetro. */
  const updateConfig = useCallback((key: keyof SplitConfig, value: number) => {
    setConfig((prev) => ({ ...prev, [key]: Number.isFinite(value) ? value : 0 }));
  }, []);

  /**
   * Altera o número de sócios e ajusta a lista de nomes
   * (corta ou completa com "Sócio N").
   */
  const changePartnerCount = useCallback((count: number) => {
    const safe = Math.min(Math.max(Math.round(count) || 1, 1), 12);
    setConfig((prev) => ({ ...prev, partners: safe }));
    setPartnerNames((prev) => {
      const next = [...prev];
      while (next.length < safe) next.push(`Sócio ${next.length + 1}`);
      return next.slice(0, safe);
    });
  }, []);

  /** Muda o serviço e reseta o valor cobrado para o preço base dele. */
  const changeService = useCallback((id: string) => {
    setServiceId(id);
    const service = getServiceById(id);
    if (service) setChargedValue(service.basePrice);
  }, []);

  // ── Cálculo derivado ──────────────────────────────────────────────────
  const result = useMemo(
    () =>
      computeSplit({
        grossAmount: chargedValue,
        taxPercent: config.taxPercent,
        costPercent: config.costPercent,
        reservePercent: config.reservePercent,
        partners: config.partners,
        executionBonusPercent: config.executionBonusPercent,
      }),
    [chargedValue, config],
  );

  const slices = useMemo(() => buildChartSlices(result), [result]);

  /** Guarda o projeto atual na carteira (localStorage). */
  const saveDeal = useCallback(() => {
    const service = getServiceById(serviceId);
    if (!service) return;

    const deal: SavedDeal = {
      id: createDealId(),
      client: clientName.trim() || "Cliente não identificado",
      serviceId: service.id,
      serviceName: service.name,
      value: chargedValue,
      date: dealDate || todayISO(),
      status: dealStatus,
      split: {
        taxPercent: config.taxPercent,
        costPercent: config.costPercent,
        reservePercent: config.reservePercent,
        partners: config.partners,
        executionBonusPercent: config.executionBonusPercent,
      },
    };

    const next = [deal, ...deals];
    setDeals(next);
    saveDeals(next);
    setClientName("");
    notify("Projeto salvo na carteira.");
  }, [
    serviceId,
    clientName,
    chargedValue,
    dealDate,
    dealStatus,
    config,
    deals,
    notify,
  ]);

  /** Altera o status de um item salvo. */
  const changeDealStatus = useCallback((id: string, status: DealStatus) => {
    setDeals((prev) => {
      const next = prev.map((deal) => (deal.id === id ? { ...deal, status } : deal));
      saveDeals(next);
      return next;
    });
  }, []);

  /** Remove um item salvo. */
  const removeDeal = useCallback((id: string) => {
    setDeals((prev) => {
      const next = prev.filter((deal) => deal.id !== id);
      saveDeals(next);
      return next;
    });
  }, []);

  /** Limpa toda a carteira. */
  const clearAllDeals = useCallback(() => {
    clearDeals();
    setDeals([]);
    notify("Carteira limpa.");
  }, [notify]);

  /** Restaura os parâmetros padrão. */
  const resetConfig = useCallback(() => {
    setConfig(defaultSplitConfig);
    setPartnerNames(defaultPartnerNames);
    notify("Parâmetros restaurados.");
  }, [notify]);

  const activeService = getServiceById(serviceId) ?? agencyServices[0];

  return (
    <section className="bg-gray-50 py-10 dark:bg-gray-900/50">
      <div className="container-section">
        {/* ── Cabeçalho ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-title"
            >
              Calculadora de precificação
            </motion.h1>
            <p className="section-subtitle !mt-2">
              Defina o preço, veja a divisão entre sócios e salve a venda.
              Ferramenta interna — não compartilhe esta URL.
            </p>
          </div>

          <form action={logoutAction} className="print:hidden">
            <button type="submit" className="btn-secondary !px-4 !py-2 text-xs">
              Sair
            </button>
          </form>
        </div>

        {/* Aviso de confirmação */}
        {flashMessage && (
          <div
            role="status"
            className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-300"
          >
            {flashMessage}
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* ── Coluna 1: serviço, valor e parâmetros ───────────────── */}
          <div className="space-y-6">
            {/* Serviço + valor cobrado */}
            <div className="card">
              <h2 className="font-display text-lg font-bold">Projeto</h2>

              <div className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="service"
                    className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Serviço
                  </label>
                  <select
                    id="service"
                    value={serviceId}
                    onChange={(event) => changeService(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  >
                    {agencyServices.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} — {formatBRL(service.basePrice)}
                        {service.period ?? ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="charged-value"
                    className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Valor cobrado do cliente
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      R$
                    </span>
                    <input
                      id="charged-value"
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step={100}
                      value={Number.isFinite(chargedValue) ? chargedValue : 0}
                      onChange={(event) => setChargedValue(Number(event.target.value))}
                      className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-8 pr-3 text-sm font-semibold text-gray-900 tabular-nums focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Preço base de {formatBRL(activeService.basePrice)}
                    {activeService.period ?? ""} — edite livremente.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="client-name"
                      className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Cliente
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      value={clientName}
                      onChange={(event) => setClientName(event.target.value)}
                      placeholder="Nome do cliente"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="deal-date"
                      className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Data
                    </label>
                    <input
                      id="deal-date"
                      type="date"
                      value={dealDate}
                      onChange={(event) => setDealDate(event.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </span>
                  <div
                    role="radiogroup"
                    aria-label="Status do projeto"
                    className="inline-flex rounded-lg bg-gray-200 p-1 dark:bg-gray-800"
                  >
                    {DEAL_STATUSES.map((status) => (
                      <button
                        key={status}
                        type="button"
                        role="radio"
                        aria-checked={dealStatus === status}
                        onClick={() => setDealStatus(status)}
                        className={`rounded-md px-4 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                          dealStatus === status
                            ? "bg-white text-brand-600 shadow-sm dark:bg-gray-900"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {dealStatusLabels[status]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Parâmetros configuráveis */}
            <div className="card">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-lg font-bold">Parâmetros</h2>
                <button
                  type="button"
                  onClick={resetConfig}
                  className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
                >
                  Restaurar padrões
                </button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <ParamField
                  id="tax-percent"
                  label="Impostos"
                  suffix="%"
                  min={0}
                  max={100}
                  value={config.taxPercent}
                  onChange={(v) => updateConfig("taxPercent", v)}
                  hint="Simples Nacional"
                />
                <ParamField
                  id="cost-percent"
                  label="Custos operacionais"
                  suffix="%"
                  min={0}
                  max={100}
                  value={config.costPercent}
                  onChange={(v) => updateConfig("costPercent", v)}
                  hint="Ferramentas e hospedagem"
                />
                <ParamField
                  id="reserve-percent"
                  label="Caixa da agência"
                  suffix="%"
                  min={0}
                  max={100}
                  value={config.reservePercent}
                  onChange={(v) => updateConfig("reservePercent", v)}
                  hint="Reserva"
                />
                <ParamField
                  id="partner-count"
                  label="Número de sócios"
                  min={1}
                  max={12}
                  value={config.partners}
                  onChange={changePartnerCount}
                />
                <ParamField
                  id="bonus-percent"
                  label="Bônus de execução"
                  suffix="%"
                  min={0}
                  max={100}
                  value={config.executionBonusPercent}
                  onChange={(v) => updateConfig("executionBonusPercent", v)}
                  hint="Extra para o sócio executor"
                />
              </div>

              {/* Nomes dos sócios */}
              <h3 className="mt-6 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Sócios
              </h3>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {partnerNames.map((name, index) => (
                  <div key={`partner-${index}`}>
                    <label
                      htmlFor={`partner-${index}`}
                      className="sr-only"
                    >
                      Nome do sócio {index + 1}
                    </label>
                    <input
                      id={`partner-${index}`}
                      type="text"
                      value={name}
                      onChange={(event) => {
                        const value = event.target.value;
                        setPartnerNames((prev) =>
                          prev.map((item, i) => (i === index ? value : item)),
                        );
                      }}
                      placeholder={`Sócio ${index + 1}`}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Coluna 2: resultado em cards + gráfico ──────────────── */}
          <div className="space-y-6 lg:col-span-2">
            <div className="card">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-lg font-bold">Resultado</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Líquido: {formatPercentShort(result.netPercent)} da receita
                </span>
              </div>

              {/* Cards de valores */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                  label="Receita bruta"
                  value={formatBRL(result.gross, { decimals: 2 })}
                  tone="brand"
                />
                <StatCard
                  label="Impostos"
                  value={`− ${formatBRL(result.taxes, { decimals: 2 })}`}
                  hint={`${config.taxPercent}%`}
                  tone="danger"
                />
                <StatCard
                  label="Custos"
                  value={`− ${formatBRL(result.costs, { decimals: 2 })}`}
                  hint={`${config.costPercent}%`}
                  tone="danger"
                />
                <StatCard
                  label="Caixa da agência"
                  value={`− ${formatBRL(result.reserve, { decimals: 2 })}`}
                  hint={`${config.reservePercent}%`}
                />
                <StatCard
                  label="Valor líquido a distribuir"
                  value={formatBRL(result.net, { decimals: 2 })}
                  hint={`${config.partners} sócios`}
                  tone="success"
                />
                <StatCard
                  label="Por sócio (base)"
                  value={formatBRL(result.basePerPartner, { decimals: 2 })}
                  hint={
                    config.executionBonusPercent > 0
                      ? `+ ${formatBRL(result.bonusAmount, { decimals: 2 })} de bônus`
                      : "Sem bônus"
                  }
                  tone="success"
                />
              </div>

              {/* Gráfico de pizza */}
              <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-800">
                <SplitPieChart slices={slices} />
              </div>

              {/* Divisão por sócio */}
              <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-800">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Divisão por sócio
                </h3>
                <ul className="mt-3 space-y-2">
                  {partnerNames.map((name, index) => {
                    const isExecutor = index === 0;
                    const receives =
                      isExecutor && config.executionBonusPercent > 0
                        ? result.executorTotal
                        : result.regularPartnerTotal;

                    return (
                      <li
                        key={`share-${index}`}
                        className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-4 py-3 text-sm dark:bg-gray-950/50"
                      >
                        <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          {name || `Sócio ${index + 1}`}
                          {isExecutor && config.executionBonusPercent > 0 && (
                            <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                              executou + {config.executionBonusPercent}%
                            </span>
                          )}
                        </span>
                        <span className="font-semibold tabular-nums text-gray-900 dark:text-gray-100">
                          {formatBRL(receives, { decimals: 2 })}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* Ação de salvar */}
                <div className="mt-5 flex flex-wrap items-center gap-3 print:hidden">
                  <button type="button" onClick={saveDeal} className="btn-primary">
                    Salvar projeto
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Cliente, serviço, valor, data e status ficam salvos neste
                    navegador.
                  </p>
                </div>
              </div>
            </div>

            {/* Carteira + exportação */}
            <DealsList
              deals={deals}
              onStatusChange={changeDealStatus}
              onRemove={removeDeal}
              onClear={clearAllDeals}
            />

            {/* Simulador de preço mínimo */}
            <MinPriceSimulator split={config} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Formata um percentual curto (ex.: "66%"). */
function formatPercentShort(value: number): string {
  return `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(value)}%`;
}
