export type CaseCategory =
  | "institucional"
  | "landing-page"
  | "ecommerce"
  | "sistema";

export interface CaseStudy {
  slug: string;
  client: string;
  segment: string;
  category: CaseCategory;
  title: string;
  shortDescription: string;
  coverImage: string;
  gallery: string[];
  technologies: string[];
  result?: string;
  liveUrl: string;
  featured?: boolean;
}

export const categoryLabels: Record<CaseCategory, string> = {
  institucional: "Site Institucional",
  "landing-page": "Landing Page",
  ecommerce: "E-commerce",
  sistema: "Sistema Web",
};

export const cases: CaseStudy[] = [
  {
    slug: "escola-novo-conceito",
    client: "Escola Novo Conceito",
    segment: "Educação",
    category: "institucional",
    title: "Site institucional para escola",
    shortDescription:
      "Site institucional completo com informações sobre a escola, cursos, equipe e contato.",
    coverImage: "/images/cases/escola-novo-conceito/cover.svg",
    gallery: [
      "/images/cases/escola-novo-conceito/1.svg",
      "/images/cases/escola-novo-conceito/2.svg",
      "/images/cases/escola-novo-conceito/3.svg",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://escolanovoconceito.marcelo-palumbof.workers.dev/",
    featured: true,
  },
  {
    slug: "site-aline",
    client: "Aline",
    segment: "Serviços Profissionais",
    category: "institucional",
    title: "Site institucional profissional",
    shortDescription:
      "Site institucional elegante para profissional autônoma, com portfólio e contato direto.",
    coverImage: "/images/cases/site-aline/cover.svg",
    gallery: [
      "/images/cases/site-aline/1.svg",
      "/images/cases/site-aline/2.svg",
      "/images/cases/site-aline/3.svg",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://site-aline.marcelo-palumbof.workers.dev/",
    featured: true,
  },
  {
    slug: "giovanna-flamiano",
    client: "Giovanna Flamiano",
    segment: "Moda / Beleza",
    category: "institucional",
    title: "Site institucional para marca pessoal",
    shortDescription:
      "Site institucional para marca pessoal com portfólio, sobre e contato.",
    coverImage: "/images/cases/giovanna-flamiano/cover.svg",
    gallery: [
      "/images/cases/giovanna-flamiano/1.svg",
      "/images/cases/giovanna-flamiano/2.svg",
      "/images/cases/giovanna-flamiano/3.svg",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://giovannaflamiano.marcelo-palumbof.workers.dev/",
    featured: true,
  },
  {
    slug: "gomes-salgados",
    client: "Gomes Salgados",
    segment: "Alimentação",
    category: "landing-page",
    title: "Landing page para salgados",
    shortDescription:
      "Landing page de alta conversão para encomendas de salgados, com cardápio e WhatsApp.",
    coverImage: "/images/cases/gomes-salgados/cover.svg",
    gallery: [
      "/images/cases/gomes-salgados/1.svg",
      "/images/cases/gomes-salgados/2.svg",
      "/images/cases/gomes-salgados/3.svg",
    ],
    technologies: ["Next.js", "Tailwind CSS", "WhatsApp Integration"],
    liveUrl: "https://gomessalgados.lovable.app",
    featured: true,
  },
  {
    slug: "flowcut",
    client: "FlowCut",
    segment: "Tecnologia / Streaming",
    category: "sistema",
    title: "Plataforma de streaming",
    shortDescription:
      "Sistema web completo para plataforma de streaming com painel administrativo.",
    coverImage: "/images/cases/flowcut/cover.svg",
    gallery: [
      "/images/cases/flowcut/1.svg",
      "/images/cases/flowcut/2.svg",
      "/images/cases/flowcut/3.svg",
    ],
    technologies: ["Next.js", "TypeScript", "Cloudflare"],
    liveUrl: "https://flowcut.bolt.host/",
    featured: true,
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

export function getCasesByCategory(category: CaseCategory): CaseStudy[] {
  return cases.filter((c) => c.category === category);
}
