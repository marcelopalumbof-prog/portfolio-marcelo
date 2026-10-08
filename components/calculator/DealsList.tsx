"use client";

/**
 * Lista de vendas/projetos salvos + totais acumulados + exportação CSV/PDF.
 * Persistência em `localStorage` (ver `lib/deals.ts`).
 */

import { dealStatusLabels, type DealStatus } from "@/data/split-config";
import {
  computeTotals,
  type SavedDeal,
} from "@/lib/deals";
import { downloadDealsCsv, printReport } from "@/lib/export";
import { formatBRL, formatDate } from "@/lib/format";

/** Cor do badge por status. */
const STATUS_STYLES: Record<DealStatus, string> = {
  proposta: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  fechado: "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300",
  pago: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
};

interface Props {
  deals: SavedDeal[];
  /** Altera o status de um item da lista. */
  onStatusChange: (id: string, status: DealStatus) => void;
  /** Remove um item da lista. */
  onRemove: (id: string) => void;
  /** Limpa toda a carteira. */
  onClear: () => void;
}

export function DealsList({ deals, onStatusChange, onRemove, onClear }: Props) {
  const totals = computeTotals(deals);

  return (
    <section
      aria-labelledby="deals-title"
      className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Cabeçalho + ações */}
      <div className="flex flex-col gap-4 border-b border-gray-200 p-6 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            id="deals-title"
            className="font-display text-lg font-bold text-gray-900 dark:text-gray-100"
          >
            Projetos salvos
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {totals.count} {totals.count === 1 ? "projeto" : "projetos"} na
            carteira
          </p>
        </div>

        <div className="flex flex-wrap gap-2 print:hidden">
          <button
            type="button"
            onClick={() => downloadDealsCsv(deals)}
            disabled={deals.length === 0}
            className="btn-secondary !px-4 !py-2 text-xs disabled:cursor-not-allowed disabled:opacity-50"
          >
            Exportar CSV
          </button>
          <button
            type="button"
            onClick={printReport}
            disabled={deals.length === 0}
            className="btn-secondary !px-4 !py-2 text-xs disabled:cursor-not-allowed disabled:opacity-50"
          >
            Exportar PDF
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={deals.length === 0}
            className="inline-flex items-center rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition-all hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            Limpar
          </button>
        </div>
      </div>

      {deals.length === 0 ? (
        <p className="p-6 text-sm text-gray-500 dark:text-gray-400">
          Nenhum projeto salvo ainda. Preencha os dados acima e clique em
          &ldquo;Salvar projeto&rdquo;.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Lista de projetos salvos com cliente, serviço, valor, data e
              status
            </caption>
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:bg-gray-950/50 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 font-semibold">Cliente</th>
                <th scope="col" className="px-6 py-3 font-semibold">Serviço</th>
                <th scope="col" className="px-6 py-3 font-semibold">Valor</th>
                <th scope="col" className="px-6 py-3 font-semibold">Data</th>
                <th scope="col" className="px-6 py-3 font-semibold">Status</th>
                <th scope="col" className="px-6 py-3 text-right font-semibold print:hidden">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {deals.map((deal) => (
                <tr key={deal.id}>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                    {deal.client || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {deal.serviceName}
                  </td>
                  <td className="px-6 py-4 tabular-nums text-gray-900 dark:text-gray-100">
                    {formatBRL(deal.value, { decimals: 2 })}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {formatDate(deal.date)}
                  </td>
                  <td className="px-6 py-4 print:px-0">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[deal.status]}`}
                    >
                      {dealStatusLabels[deal.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right print:hidden">
                    <div className="flex items-center justify-end gap-2">
                      {/* Troca de status inline (acessível via label) */}
                      <label className="sr-only" htmlFor={`status-${deal.id}`}>
                        Alterar status de {deal.client}
                      </label>
                      <select
                        id={`status-${deal.id}`}
                        value={deal.status}
                        onChange={(event) =>
                          onStatusChange(deal.id, event.target.value as DealStatus)
                        }
                        className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                      >
                        <option value="proposta">Proposta</option>
                        <option value="fechado">Fechado</option>
                        <option value="pago">Pago</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => onRemove(deal.id)}
                        aria-label={`Remover projeto de ${deal.client}`}
                        className="rounded-lg px-2 py-1.5 text-xs text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Totais acumulados */}
      {deals.length > 0 && (
        <div className="grid gap-4 border-t border-gray-200 p-6 sm:grid-cols-2 lg:grid-cols-4 dark:border-gray-800">
          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-950/50">
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Faturamento
            </p>
            <p className="mt-1 font-display text-xl font-bold tabular-nums text-gray-900 dark:text-gray-100">
              {formatBRL(totals.revenue, { decimals: 2 })}
            </p>
          </div>
          <div className="rounded-xl bg-brand-50 p-4 dark:bg-brand-950/40">
            <p className="text-xs uppercase tracking-wider text-brand-700 dark:text-brand-300">
              No caixa da agência
            </p>
            <p className="mt-1 font-display text-xl font-bold tabular-nums text-brand-700 dark:text-brand-300">
              {formatBRL(totals.reserveTotal, { decimals: 2 })}
            </p>
          </div>
          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-950/50">
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Líquido distribuível
            </p>
            <p className="mt-1 font-display text-xl font-bold tabular-nums text-gray-900 dark:text-gray-100">
              {formatBRL(totals.netTotal, { decimals: 2 })}
            </p>
          </div>
          <div className="rounded-xl bg-green-50 p-4 dark:bg-green-950/40">
            <p className="text-xs uppercase tracking-wider text-green-700 dark:text-green-300">
              Total por sócio (soma)
            </p>
            <p className="mt-1 font-display text-xl font-bold tabular-nums text-green-700 dark:text-green-300">
              {formatBRL(totals.perPartnerTotal, { decimals: 2 })}
            </p>
          </div>
        </div>
      )}

      {/* Bloco legível na impressão/PDF */}
      {deals.length > 0 && (
        <div className="hidden border-t border-gray-200 p-6 print:block dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Faturamento total:{" "}
            <strong>{formatBRL(totals.revenue, { decimals: 2 })}</strong> · Caixa
            da agência:{" "}
            <strong>{formatBRL(totals.reserveTotal, { decimals: 2 })}</strong> ·
            Líquido:{" "}
            <strong>{formatBRL(totals.netTotal, { decimals: 2 })}</strong> · Por
            sócio (soma):{" "}
            <strong>{formatBRL(totals.perPartnerTotal, { decimals: 2 })}</strong>
          </p>
        </div>
      )}
    </section>
  );
}
