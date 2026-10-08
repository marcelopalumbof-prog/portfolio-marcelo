import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseBySlug, cases, categoryLabels } from "@/data/cases";
import { CaseDetail } from "@/components/CaseDetail";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const caseItem = getCaseBySlug(params.slug);
  if (!caseItem) return {};

  return {
    title: `${caseItem.client} — ${caseItem.title}`,
    description: caseItem.shortDescription,
    openGraph: {
      title: `${caseItem.client} — ${caseItem.title}`,
      description: caseItem.shortDescription,
    },
  };
}

export default function CasePage({ params }: Props) {
  const caseItem = getCaseBySlug(params.slug);
  if (!caseItem) notFound();

  return <CaseDetail caseItem={caseItem} />;
}
