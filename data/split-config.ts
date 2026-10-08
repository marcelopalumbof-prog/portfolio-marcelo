/**
 * MÓDULO B — PARÂMETROS DA CALCULADORA DE PRECIFICAÇÃO E DIVISÃO
 * ---------------------------------------------------------------------------
 * Valores padrão da área restrita `/calculadora`. Cada percentual é
 * configurável na própria interface (e persistido no localStorage), mas os
 * defaults editáveis aqui servem como "estado de fábrica" e como documentação
 * da política de divisão da agência.
 *
 * COMO ALTERAR: edie os números abaixo e/ou os nomes de `defaultPartners`.
 */

/** Parâmetros de divisão de uma venda. */
export interface SplitConfig {
  /** Impostos sobre a receita bruta (%). Padrão: Simples Nacional. */
  taxPercent: number;
  /** Custos operacionais: ferramentas, hospedagem, licenças (%). */
  costPercent: number;
  /** Caixa/reserva da agência (%). */
  reservePercent: number;
  /** Número de sócios que dividem o valor líquido. */
  partners: number;
  /** Bônus extra (%) para o sócio que executou o projeto. 0 = desativado. */
  executionBonusPercent: number;
}

/** Simulador de preço mínimo: custos de horas e meta por sócio. */
export interface MinPriceConfig {
  /** Custo horário interno estimado (R$/h) — o que a hora "custa" para a agência. */
  hourlyCost: number;
  /** Receita líquida mínima desejada por sócio para o projeto valer a pena (R$). */
  targetNetPerPartner: number;
}

/** Parâmetros padrão da calculadora. */
export const defaultSplitConfig: SplitConfig = {
  taxPercent: 6, // Simples Nacional (faixa ajustável)
  costPercent: 8, // Ferramentas, hospedagem e licenças
  reservePercent: 20, // Caixa/reserva da agência
  partners: 4, // Número de sócios
  executionBonusPercent: 0, // Bônus de execução (opcional)
};

/** Padrões do simulador de preço mínimo. */
export const defaultMinPriceConfig: MinPriceConfig = {
  hourlyCost: 120,
  targetNetPerPartner: 1500,
};

/** Nomes padrão dos sócios (editáveis na interface). */
export const defaultPartnerNames: string[] = [
  "Sócio 1",
  "Sócio 2",
  "Sócio 3",
  "Sócio 4",
];

/** Rótulos de status de uma venda/projeto. */
export const DEAL_STATUSES = ["proposta", "fechado", "pago"] as const;

export type DealStatus = (typeof DEAL_STATUSES)[number];

/** Mapeia status -> rótulo em português. */
export const dealStatusLabels: Record<DealStatus, string> = {
  proposta: "Proposta",
  fechado: "Fechado",
  pago: "Pago",
};
