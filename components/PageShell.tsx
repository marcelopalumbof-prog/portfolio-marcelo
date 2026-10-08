import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

/**
 * Shell compartilhado pelas rotas internas do site.
 * Repete exatamente a composição de `app/page.tsx` (Navbar / main / Footer /
 * botão do WhatsApp) para manter 100% de consistência visual entre a home,
 * `/tabela-de-preco` e `/calculadora`.
 */
export function PageShell({
  children,
  /** Classe extra do `<main>` (ex.: fundo da página). */
  mainClassName = "",
}: {
  children: ReactNode;
  mainClassName?: string;
}) {
  return (
    <>
      <Navbar />
      <main className={mainClassName}>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
