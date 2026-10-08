"use client";

/**
 * Simulador de "preço mínimo".
 * Dado o custo de horas estimado, sugere o menor preço que ainda mantém
 * a divisão saudável (cobrindo as horas + meta líquida por sócio).
 */

import { useMemo, useState } from "react";
import {
  computeMinPrice,
  type MinPriceInput,
} from "@/lib/pricing-math";
import { defaultMinPriceConfig, type SplitConfig } from "@/data/split-config";
import { formatBRL } from "@/lib/format";

interface Props {
  /** Parâmetros atuais da calculadora (impostos, custos, caixa, sócios). */
  split: SplitConfig;
}

/** Campo numérico reutilizável do simulador. */
function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  step = 1,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  step?: number;
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
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(event) => onChange(Number(event.target.value))}
          className={`w-full rounded-lg border border-gray-300 bg-white py-2.5 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 ${
            prefix ? "pl-8" : "pl-3"
          } ${suffix ? "pr-12" : "pr-3"} tabular-nums`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export function MinPriceSimulator({ split }: Props) {
  const [hourlyCost, setHourlyCost] = useState(defaultMinPriceConfig.hourlyCost);
  const [hours, setHours] = useState(40);
  const [targetPerPartner, setTargetPerPartner] = useState(
    defaultMinPriceConfig.targetNetPerPartner,
  );

  const result = useMemo(() => {
    const input: MinPriceInput = {
      hourlyCost,
      estimatedHours: hours,
      targetNetPerPartner: targetPerPartner,
      taxPercent: split.taxPercent,
      costPercent: split.costPercent,
      reservePercent: split.reservePercent,
      partners: split.partners,
    };
    return computeMinPrice(input);
  }, [hourlyCost, hours, targetPerPartner, split]);

  const reachedTarget = result.netPerPartnerAtMin >= targetPerPartner;

  return (
    <section
      aria-labelledby="min-price-title"
      className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
    >
      <h2
        id="min-price-title"
        className="font-display text-lg font-bold text-gray-900 dark:text-gray-100"
      >
        Simulador de preço mínimo
      </h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Descubra o menor preço que ainda mantém a divisão saudável, cobrindo o
        custo de horas e a meta de líquido por sócio.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <NumberField
          id="sim-hourly-cost"
          label="Custo de horas"
          prefix="R$"
          suffix="/h"
          value={hourlyCost}
          onChange={setHourlyCost}
        />
        <NumberField
          id="sim-hours"
          label="Horas estimadas"
          suffix="h"
          value={hours}
          onChange={setHours}
        />
        <NumberField
          id="sim-target"
          label="Meta líquida por sócio"
          prefix="R$"
          value={targetPerPartner}
          onChange={setTargetPerPartner}
        />
      </div>

      {/* Resultado */}
      <div className="mt-6 rounded-xl bg-brand-50 p-5 dark:bg-brand-950/40">
        <p className="text-sm font-medium text-brand-700 dark:text-brand-300">
          Preço mínimo sugerido
        </p>
        <p className="mt-1 font-display text-3xl font-bold text-brand-700 dark:text-brand-300 tabular-nums">
          {formatBRL(result.suggestedMinPrice, { decimals: 2 })}
        </p>

        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Custo das horas</dt>
            <dd className="font-semibold tabular-nums text-gray-900 dark:text-gray-100">
              {formatBRL(result.hourCostTotal, { decimals: 2 })}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">
              Preço p/ meta por sócio
            </dt>
            <dd className="font-semibold tabular-nums text-gray-900 dark:text-gray-100">
              {formatBRL(result.minPriceForTarget, { decimals: 2 })}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Líquido por sócio</dt>
            <dd className="font-semibold tabular-nums text-gray-900 dark:text-gray-100">
              {formatBRL(result.netPerPartnerAtMin, { decimals: 2 })}
            </dd>
          </div>
        </dl>

        <p
          className={`mt-4 text-sm ${
            reachedTarget
              ? "text-green-600 dark:text-green-400"
              : "text-amber-600 dark:text-amber-400"
          }`}
        >
          {reachedTarget
            ? `Nesse preço cada sócio recebe ${formatBRL(result.netPerPartnerAtMin, { decimals: 2 })}, atingindo a meta de ${formatBRL(targetPerPartner, { decimals: 2 })}. Margem sobre as horas: ${formatBRL(result.marginOverHours, { decimals: 2 })}.`
            : `Atenção: mesmo no preço mínimo sugerido o líquido por sócio fica abaixo da meta. Considere reduzir horas, revisar a meta ou aumentar o preço.`}
        </p>
      </div>
    </section>
  );
}
