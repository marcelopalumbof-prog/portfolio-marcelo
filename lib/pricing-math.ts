/**
 * Núcleo de cálculo da MÓDULO B (calculadora interna).
 *
 * Funções puras e sem dependência de UI, para facilitar testes e reuso.
 *
 * Fórmula oficial (ver README):
 *   Receita bruta
 *   − Impostos        (bruta × taxPercent%)
 *   − Custos          (bruta × costPercent%)
 *   − Caixa agência   (bruta × reservePercent%)
 *   = Valor líquido a distribuir
 *   ÷ Número de sócios = parcela por sócio
 *   + Bônus de execução (se houver) para o sócio executor
 */

import type { SplitConfig } from "@/data/split-config";

/** Entrada do cálculo de divisão. */
export interface SplitInput extends SplitConfig {
  /** Valor cobrado do cliente (receita bruta), em R$. */
  grossAmount: number;
}

/** Resultado detalhado do cálculo de divisão. */
export interface SplitResult {
  /** Receita bruta. */
  gross: number;
  /** Valor de impostos retidos. */
  taxes: number;
  /** Valor de custos operacionais. */
  costs: number;
  /** Valor destinado ao caixa/reserva da agência. */
  reserve: number;
  /** Líquido a distribuir entre os sócios. */
  net: number;
  /** Parcela-base de cada sócio (líquido ÷ sócios), antes do bônus. */
  basePerPartner: number;
  /** Valor do bônus de execução (percentual aplicado sobre o líquido). */
  bonusAmount: number;
  /** Total recebido pelo sócio que executou (parcela-base + bônus). */
  executorTotal: number;
  /** Parcela recebida pelos demais sócios. */
  regularPartnerTotal: number;
  /** Total efetivamente distribuído (deve ser igual a `net`). */
  distributedTotal: number;
  /** Percentual líquido que sobra para os sócios (%). */
  netPercent: number;
}

/** Converte percentual em fração segura (evita NaN/undefined). */
function pct(value: number): number {
  const safe = Number.isFinite(value) ? value : 0;
  return Math.min(Math.max(safe, 0), 100) / 100;
}

/** Converte valor monetário em número finito não-negativo. */
function money(value: number): number {
  const safe = Number.isFinite(value) ? value : 0;
  return Math.max(safe, 0);
}

/** Arredonda para 2 casas (centavos) evitando erros de ponto flutuante. */
function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Calcula a divisão completa de uma venda.
 *
 * @example
 * // Projeto de R$ 10.000 → impostos 600, custos 800, caixa 2.000,
 * // líquido 6.600 → R$ 1.650 por sócio.
 * computeSplit({ grossAmount: 10000, taxPercent: 6, costPercent: 8,
 *                reservePercent: 20, partners: 4, executionBonusPercent: 0 });
 */
export function computeSplit(input: SplitInput): SplitResult {
  const gross = money(input.grossAmount);
  const partners = Math.max(1, Math.floor(Number.isFinite(input.partners) ? input.partners : 1));

  const taxes = round2(gross * pct(input.taxPercent));
  const costs = round2(gross * pct(input.costPercent));
  const reserve = round2(gross * pct(input.reservePercent));
  const net = round2(gross - taxes - costs - reserve);

  const basePerPartner = round2(net / partners);

  // O bônus é uma % extra sobre o líquido, paga somente ao sócio executor.
  const bonusAmount = round2(net * pct(input.executionBonusPercent));
  const executorTotal = round2(basePerPartner + bonusAmount);
  const regularPartnerTotal = basePerPartner;

  const distributedTotal = round2(
    basePerPartner * (partners - 1) + executorTotal,
  );

  const netPercent = gross > 0 ? round2((net / gross) * 100) : 0;

  return {
    gross,
    taxes,
    costs,
    reserve,
    net,
    basePerPartner,
    bonusAmount,
    executorTotal,
    regularPartnerTotal,
    distributedTotal,
    netPercent,
  };
}

/** Fatia da pizza (percentual e valor) para o gráfico. */
export interface ChartSlice {
  key: "taxes" | "costs" | "reserve" | "net";
  label: string;
  value: number;
  percent: number;
}

/**
 * Monta as 4 fatias do gráfico de pizza: impostos, custos, caixa e sócios.
 */
export function buildChartSlices(result: SplitResult): ChartSlice[] {
  const base = result.gross > 0 ? result.gross : 1;
  return [
    { key: "taxes", label: "Impostos", value: result.taxes, percent: (result.taxes / base) * 100 },
    { key: "costs", label: "Custos", value: result.costs, percent: (result.costs / base) * 100 },
    { key: "reserve", label: "Caixa da agência", value: result.reserve, percent: (result.reserve / base) * 100 },
    { key: "net", label: "Sócios (líquido)", value: result.net, percent: (result.net / base) * 100 },
  ];
}

/** Entrada do simulador de preço mínimo. */
export interface MinPriceInput {
  /** Custo horário interno (R$/h). */
  hourlyCost: number;
  /** Horas estimadas de execução. */
  estimatedHours: number;
  /** Receita líquida mínima desejada por sócio (R$). */
  targetNetPerPartner: number;
  /** Mesmos percentuais da calculadora, para projetar o líquido. */
  taxPercent: number;
  costPercent: number;
  reservePercent: number;
  partners: number;
}

/** Resultado do simulador de preço mínimo. */
export interface MinPriceResult {
  /** Custo total de horas do projeto. */
  hourCostTotal: number;
  /**
   * Menor preço que ainda entrega a meta líquida por sócio,
   * já descontando impostos, custos e caixa.
   */
  minPriceForTarget: number;
  /** Preço mínimo recomendado (maior entre custo de horas e meta). */
  suggestedMinPrice: number;
  /** Quanto esse preço mínimo "rende" por sócio. */
  netPerPartnerAtMin: number;
  /** Líquido por sócio no preço mínimo. */
  netAtMin: number;
  /** Margem sobre o custo de horas (R$). */
  marginOverHours: number;
}

/**
 * Simula o menor preço de venda que mantém a divisão saudável.
 *
 * Critérios considerados (o maior vence):
 *  1. Cobrir o custo total de horas trabalhadas;
 *  2. Entregar ao menos `targetNetPerPartner` de líquido para cada sócio.
 */
export function computeMinPrice(input: MinPriceInput): MinPriceResult {
  const hourlyCost = Math.max(0, Number.isFinite(input.hourlyCost) ? input.hourlyCost : 0);
  const estimatedHours = Math.max(0, Number.isFinite(input.estimatedHours) ? input.estimatedHours : 0);
  const target = Math.max(0, Number.isFinite(input.targetNetPerPartner) ? input.targetNetPerPartner : 0);
  const partners = Math.max(1, Math.floor(Number.isFinite(input.partners) ? input.partners : 1));

  const hourCostTotal = round2(hourlyCost * estimatedHours);

  // Fração da receita bruta que sobra para os sócios após descontos.
  const retentionFactor =
    1 - (pct(input.taxPercent) + pct(input.costPercent) + pct(input.reservePercent));
  const safeFactor = Math.max(retentionFactor, 0.01); // evita divisão por zero

  // Preço necessário para atingir a meta de líquido por sócio.
  const netNeeded = round2(target * partners);
  const minPriceForTarget = round2(netNeeded / safeFactor);

  const suggestedMinPrice = Math.ceil(Math.max(hourCostTotal, minPriceForTarget));

  const split = computeSplit({
    grossAmount: suggestedMinPrice,
    taxPercent: input.taxPercent,
    costPercent: input.costPercent,
    reservePercent: input.reservePercent,
    partners,
    executionBonusPercent: 0,
  });

  return {
    hourCostTotal,
    minPriceForTarget,
    suggestedMinPrice,
    netPerPartnerAtMin: split.basePerPartner,
    netAtMin: split.net,
    marginOverHours: round2(suggestedMinPrice - hourCostTotal),
  };
}
