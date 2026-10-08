/**
 * Exportação de relatórios da MÓDULO B.
 *
 * - CSV: gera e baixa um arquivo `.csv` com separador `;` (compatível com
 *   Excel/Google Sheets em pt-BR) e BOM UTF-8 para acentuação correta.
 * - PDF: usa a caixa `.printable` + `window.print()` — sem dependências.
 */

import { dealStatusLabels } from "@/data/split-config";
import { computeTotals, type SavedDeal } from "@/lib/deals";
import { formatBRL, formatDate } from "@/lib/format";

/** Escapa um valor para o CSV (aspas duplas escapadas). */
function csvCell(value: string | number): string {
  const str = String(value).replace(/"/g, '""');
  return `"${str}"`;
}

/** Monta o conteúdo CSV da carteira de vendas. */
export function buildDealsCsv(deals: SavedDeal[]): string {
  const header = [
    "ID",
    "Cliente",
    "Serviço",
    "Valor (R$)",
    "Data",
    "Status",
    "Impostos %",
    "Custos %",
    "Caixa %",
    "Sócios",
    "Bônus execução %",
  ];

  const rows = deals.map((deal) =>
    [
      deal.id,
      deal.client,
      deal.serviceName,
      deal.value.toFixed(2).replace(".", ","),
      formatDate(deal.date),
      dealStatusLabels[deal.status],
      String(deal.split.taxPercent),
      String(deal.split.costPercent),
      String(deal.split.reservePercent),
      String(deal.split.partners),
      String(deal.split.executionBonusPercent),
    ]
      .map(csvCell)
      .join(";"),
  );

  const totals = computeTotals(deals);
  const summary = [
    "",
    csvCell("TOTAIS"),
    csvCell("Faturamento"),
    csvCell(totals.revenue.toFixed(2).replace(".", ",")),
    csvCell("Caixa da agência"),
    csvCell(totals.reserveTotal.toFixed(2).replace(".", ",")),
    csvCell("Líquido distribuível"),
    csvCell(totals.netTotal.toFixed(2).replace(".", ",")),
    csvCell("Total por sócio (soma)"),
    csvCell(totals.perPartnerTotal.toFixed(2).replace(".", ",")),
  ].join(";");

  // BOM UTF-8 + quebras de linha CRLF para compatibilidade com Excel.
  return `\uFEFF${[header.map(csvCell).join(";"), ...rows, summary].join("\r\n")}`;
}

/** Dispara o download do CSV da carteira. */
export function downloadDealsCsv(deals: SavedDeal[]): void {
  if (typeof document === "undefined") return;
  const csv = buildDealsCsv(deals);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `relatorio-zinck-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Abre a caixa de impressão do navegador.
 * O CSS `@media print` esconde tudo fora de `.printable`, gerando o PDF
 * quando o usuário escolher "Salvar como PDF".
 */
export function printReport(): void {
  if (typeof window === "undefined") return;
  window.print();
}

/** Helper para rótulos de valores no relatório. */
export function reportValue(value: number): string {
  return formatBRL(value, { decimals: 2 });
}
