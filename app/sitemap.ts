import type { MetadataRoute } from "next";
import { cases } from "@/data/cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://seuportfolio.com.br";
  const caseUrls = cases.map((c) => ({
    url: `${baseUrl}/cases/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      // Módulo A — tabela pública de preços
      url: `${baseUrl}/tabela-de-preco`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...caseUrls,
  ];
}
