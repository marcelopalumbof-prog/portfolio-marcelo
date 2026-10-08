/**
 * Persistência das vendas/projetos da MÓDULO B.
 *
 * Usa `localStorage` (disponível apenas no browser) com fallback seguro para
 * SSR — os componentes só chamam estas funções em `useEffect`/handlers.
 * O arquivo `data/deals.json` é um espelho opcional exportável via CSV/PDF.
 */

import { DEAL_STATUSES, type DealStatus } from "@/data/split-config";

/** Status do projeto ao salvar. */
export interface SavedDeal {
  id: string;
  /** Nome do cliente. */
  client: string;
  /** Id do serviço em `data/agency-pricing.ts`. */
  serviceId: string;
  /** Nome congelado do serviço (sobrevive a mudanças de catálogo). */
  serviceName: string;
  /** Valor cobrado do cliente (R$). */
  value: number;
  /** Data no formato ISO (YYYY-MM-DD). */
  date: string;
  status: DealStatus;
  /** Fotografia dos parâmetros usados no cálculo, para auditoria. */
  split: {
    taxPercent: number;
    costPercent: number;
    reservePercent: number;
    partners: number;
    executionBonusPercent: number;
  };
}

/** Totais acumulados da carteira. */
export interface DealTotals {
  /** Faturamento bruto total. */
  revenue: number;
  /** Total acumulado no caixa da agência. */
  reserveTotal: number;
  /** Total de impostos. */
  taxesTotal: number;
  /** Total de custos operacionais. */
  costsTotal: number;
  /** Total líquido já distribuível. */
  netTotal: number;
  /** Total por sócio (líquido ÷ sócios, ponderado por projeto). */
  perPartnerTotal: number;
  /** Quantidade de projetos. */
  count: number;
}

const STORAGE_KEY = "zinck.deals.v1";

/** Verifica se o `localStorage` está disponível (SSR/privado). */
function hasStorage(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

/** Gera um id curto e único sem depender de bibliotecas. */
export function createDealId(): string {
  return `deal_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

/** Lê todas as vendas salvas. Retorna `[]` em caso de erro ou SSR. */
export function loadDeals(): SavedDeal[] {
  if (!hasStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedDeal);
  } catch {
    return [];
  }
}

/** Persiste a lista inteira de vendas. */
export function saveDeals(deals: SavedDeal[]): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
  } catch {
    // Storage cheio ou bloqueado: silencioso por segurança.
  }
}

/** Remove tudo (usado pelo botão "limpar carteira"). */
export function clearDeals(): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}

/** Guard de tipo defensivo para dados vindos do localStorage. */
function isSavedDeal(value: unknown): value is SavedDeal {
  if (typeof value !== "object" || value === null) return false;
  const deal = value as Partial<SavedDeal>;
  return (
    typeof deal.id === "string" &&
    typeof deal.client === "string" &&
    typeof deal.serviceName === "string" &&
    typeof deal.value === "number" &&
    typeof deal.date === "string" &&
    DEAL_STATUSES.includes(deal.status as DealStatus)
  );
}

/**
 * Calcula os totais acumulados da carteira.
 * Importa `computeSplit` de forma lazy para evitar ciclo de imports.
 */
export function computeTotals(deals: SavedDeal[]): DealTotals {
  const totals: DealTotals = {
    revenue: 0,
    reserveTotal: 0,
    taxesTotal: 0,
    costsTotal: 0,
    netTotal: 0,
    perPartnerTotal: 0,
    count: deals.length,
  };

  for (const deal of deals) {
    const { taxPercent, costPercent, reservePercent, partners } = deal.split;
    const gross = Math.max(0, deal.value);
    const taxes = gross * (taxPercent / 100);
    const costs = gross * (costPercent / 100);
    const reserve = gross * (reservePercent / 100);
    const net = gross - taxes - costs - reserve;
    const safePartners = Math.max(1, partners);

    totals.revenue += gross;
    totals.taxesTotal += taxes;
    totals.costsTotal += costs;
    totals.reserveTotal += reserve;
    totals.netTotal += net;
    totals.perPartnerTotal += net / safePartners;
  }

  // Arredonda para centavos.
  for (const key of Object.keys(totals) as (keyof DealTotals)[]) {
    if (typeof totals[key] === "number") {
      totals[key] = Math.round((totals[key] as number) * 100) / 100;
    }
  }

  return totals;
}
