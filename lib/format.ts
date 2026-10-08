/**
 * Utilitários de formatação numérica (moeda BRL, percentuais e datas).
 * Mantidos fora de `components/` e `data/` porque não contêm classes Tailwind.
 */

/** Opções de formatação monetária. */
interface CurrencyOptions {
  /** Casas decimais. Use 0 para valores "redondos" (tabelas) e 2 para cálculos. */
  decimals?: 0 | 2;
  /** Renderiza apenas o número, sem o símbolo "R$" (ex.: tabelas com coluna própria). */
  withoutSymbol?: boolean;
}

/**
 * Formata um valor em Reais no padrão brasileiro.
 * @example formatBRL(2500) // "R$ 2.500"
 * @example formatBRL(1650, { decimals: 2 }) // "R$ 1.650,00"
 */
export function formatBRL(value: number, options: CurrencyOptions = {}): string {
  const { decimals = 0, withoutSymbol = false } = options;

  if (!Number.isFinite(value)) return withoutSymbol ? "—" : "R$ —";

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: withoutSymbol ? "decimal" : "currency",
    currency: "BRL",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return formatter.format(value);
}

/** Formata um percentual: formatPercent(6) // "6%". */
export function formatPercent(value: number): string {
  const safe = Number.isFinite(value) ? value : 0;
  return `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(safe)}%`;
}

/** Formata uma data ISO (YYYY-MM-DD) para o padrão brasileiro. */
export function formatDate(isoDate: string): string {
  if (!isoDate) return "—";
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

/** Data local de hoje no formato ISO curto (YYYY-MM-DD), sem depender de UTC. */
export function todayISO(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}
