import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Área restrita da Módulo B: nunca indexar.
        disallow: ["/calculadora"],
      },
    ],
    sitemap: "https://seuportfolio.com.br/sitemap.xml",
  };
}
