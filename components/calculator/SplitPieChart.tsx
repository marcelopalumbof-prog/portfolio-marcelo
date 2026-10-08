"use client";

/**
 * Gráfico de pizza (SVG puro, sem dependências) da divisão da venda.
 * 4 fatias: impostos, custos, caixa da agência e sócios.
 * Acessível: `role="img"` + legenda textual com valores e percentuais.
 */

import type { ChartSlice } from "@/lib/pricing-math";
import { formatBRL, formatPercent } from "@/lib/format";

/** Cores de cada fatia — derivadas da paleta `brand` + semânticos. */
const SLICE_COLORS: Record<ChartSlice["key"], string> = {
  taxes: "#ef4444", // vermelho — impostos
  costs: "#f59e0b", // âmbar — custos
  reserve: "#1d61f1", // brand-600 — caixa da agência
  net: "#10b981", // verde — líquido dos sócios
};

interface Props {
  slices: ChartSlice[];
  /** Diâmetro do gráfico em px. */
  size?: number;
}

export function SplitPieChart({ slices, size = 220 }: Props) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Acumula o deslocamento (stroke-dasharray) para empilhar os segmentos.
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-8">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Gráfico de pizza da divisão do valor: impostos, custos, caixa da agência e sócios"
        className="shrink-0"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={28}
        />
        {slices.map((slice) => {
          const length = (slice.percent / 100) * circumference;
          const segment = (
            <circle
              key={slice.key}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={SLICE_COLORS[slice.key]}
              strokeWidth={28}
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${center} ${center})`}
            />
          );
          offset += length;
          return segment;
        })}
        {/* Valor total ao centro */}
        <text
          x={center}
          y={center - 4}
          textAnchor="middle"
          className="fill-gray-900 dark:fill-gray-100"
          style={{ fontSize: 13, fontWeight: 700 }}
        >
          Bruto
        </text>
        <text
          x={center}
          y={center + 16}
          textAnchor="middle"
          className="fill-gray-500 dark:fill-gray-400"
          style={{ fontSize: 12 }}
        >
          {formatBRL(slices.reduce((sum, s) => sum + s.value, 0))}
        </text>
      </svg>

      {/* Legenda acessível */}
      <ul className="w-full space-y-2.5">
        {slices.map((slice) => (
          <li
            key={slice.key}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span
                aria-hidden="true"
                className="h-3 w-3 shrink-0 rounded-sm"
                style={{ backgroundColor: SLICE_COLORS[slice.key] }}
              />
              {slice.label}
            </span>
            <span className="font-medium tabular-nums text-gray-900 dark:text-gray-100">
              {formatBRL(slice.value, { decimals: 2 })}{" "}
              <span className="text-gray-400">({formatPercent(slice.percent)})</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
