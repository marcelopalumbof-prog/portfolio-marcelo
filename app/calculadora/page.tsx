import type { Metadata } from "next";
import { cookies } from "next/headers";
import { PageShell } from "@/components/PageShell";
import { Calculator } from "@/components/calculator/Calculator";
import { LoginGate } from "@/components/calculator/LoginGate";
import { isAuthorized } from "@/lib/auth";

/** Impede indexação da área restrita. */
export const metadata: Metadata = {
  title: "Calculadora interna",
  description: "Área restrita — não indexar.",
  robots: { index: false, follow: false },
};

/**
 * Rota MÓDULO B — Calculadora interna de precificação e divisão.
 *
 * Protegida por senha vinda da variável de ambiente `CALCULATOR_PASSWORD`.
 * A verificação acontece no servidor via cookie httpOnly; se inválida,
 * apenas o formulário de login é renderizado (o conteúdo nunca chega ao
 * cliente desautenticado).
 */
export default async function CalculadoraPage({
  searchParams,
}: {
  searchParams: { erro?: string };
}) {
  const authorized = isAuthorized(cookies());

  return (
    <PageShell mainClassName="pt-16">
      {authorized ? <Calculator /> : <LoginGate hasError={searchParams.erro === "1"} />}
    </PageShell>
  );
}
