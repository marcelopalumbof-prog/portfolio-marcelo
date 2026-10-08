import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PricingTable } from "@/components/PricingTable";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Tabela de Preço",
  description:
    "Tabela de preços de criação de sites, e-commerce, sistemas web, aplicativos, IA e automações. Valores base com proposta personalizada para cada projeto.",
  keywords: [
    "tabela de preços",
    "preço criação de site",
    "quanto custa um site",
    "orçamento e-commerce",
    "preço sistema web",
    "preço aplicativo",
  ],
  openGraph: {
    title: `Tabela de Preço | ${profile.name}`,
    description:
      "Valores base de sites, e-commerce, sistemas, aplicativos e IA. Cada projeto recebe proposta personalizada.",
    type: "website",
    locale: "pt_BR",
  },
  alternates: {
    canonical: "/tabela-de-preco",
  },
};

/**
 * Rota pública MÓDULO A — "Tabela de Preço".
 * Acessível pelo item de menu "Tabela de Preço" no Navbar.
 */
export default function PricingPage() {
  return (
    <PageShell mainClassName="pt-16">
      <PricingTable />
    </PageShell>
  );
}
