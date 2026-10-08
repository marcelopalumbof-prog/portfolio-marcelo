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
    slug: "clinica-vida-saudavel",
    client: "Clínica Vida Saudável",
    segment: "Saúde / Estética",
    category: "institucional",
    title: "Site institucional para clínica de estética",
    shortDescription:
      "Site institucional com agendamento online, galeria de tratamentos e otimização SEO local.",
    coverImage: "/images/cases/clinica-vida-saudavel/cover.jpg",
    gallery: [
      "/images/cases/clinica-vida-saudavel/1.jpg",
      "/images/cases/clinica-vida-saudavel/2.jpg",
      "/images/cases/clinica-vida-saudavel/3.jpg",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    result: "+140% em agendamentos online no primeiro mês",
    liveUrl: "https://exemplo.com/clinica-vida-saudavel",
    featured: true,
  },
  {
    slug: "landing-page-lancamento-app",
    client: "App Finly",
    segment: "Tecnologia / Finanças",
    category: "landing-page",
    title: "Landing page de lançamento para app financeiro",
    shortDescription:
      "Landing page de alta conversão para lançamento de aplicativo, com A/B testing integrado.",
    coverImage: "/images/cases/landing-finly/cover.jpg",
    gallery: [
      "/images/cases/landing-finly/1.jpg",
      "/images/cases/landing-finly/2.jpg",
      "/images/cases/landing-finly/3.jpg",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Vercel Analytics"],
    result: "Taxa de conversão de 8,4% no lançamento",
    liveUrl: "https://exemplo.com/finly",
    featured: true,
  },
  {
    slug: "ecommerce-moda-feminina",
    client: "Ateliê Bella Moda",
    segment: "Moda / Varejo",
    category: "ecommerce",
    title: "E-commerce completo para loja de moda",
    shortDescription:
      "Loja virtual com catálogo de 200+ produtos, checkout otimizado e integração com Meta Ads.",
    coverImage: "/images/cases/bella-moda/cover.jpg",
    gallery: [
      "/images/cases/bella-moda/1.jpg",
      "/images/cases/bella-moda/2.jpg",
      "/images/cases/bella-moda/3.jpg",
    ],
    technologies: ["Next.js", "Shopify", "Meta Pixel"],
    result: "R$ 180k em vendas no primeiro trimestre",
    liveUrl: "https://exemplo.com/bella-moda",
    featured: true,
  },
  {
    slug: "sistema-gestao-imobiliaria",
    client: "Imobiliária Prime",
    segment: "Imobiliário",
    category: "sistema",
    title: "Sistema de gestão de imóveis sob medida",
    shortDescription:
      "Painel administrativo completo para gestão de imóveis, clientes e visitas.",
    coverImage: "/images/cases/prime-imob/cover.jpg",
    gallery: [
      "/images/cases/prime-imob/1.jpg",
      "/images/cases/prime-imob/2.jpg",
      "/images/cases/prime-imob/3.jpg",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    result: "Redução de 60% no tempo de gestão de leads",
    liveUrl: "https://exemplo.com/prime-imob",
    featured: true,
  },
  {
    slug: "landing-page-curso-online",
    client: "Escola Digital Pro",
    segment: "Educação",
    category: "landing-page",
    title: "Landing page para curso online",
    shortDescription:
      "Página de vendas com vídeo, depoimentos, FAQ e checkout integrado.",
    coverImage: "/images/cases/escola-digital/cover.jpg",
    gallery: [
      "/images/cases/escola-digital/1.jpg",
      "/images/cases/escola-digital/2.jpg",
      "/images/cases/escola-digital/3.jpg",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Stripe"],
    result: "R$ 95k em vendas na primeira semana",
    liveUrl: "https://exemplo.com/escola-digital",
    featured: true,
  },
  {
    slug: "site-institucional-advogacia",
    client: "Escritório Almeida & Associados",
    segment: "Jurídico",
    category: "institucional",
    title: "Site institucional para escritório de advocacia",
    shortDescription:
      "Site profissional com áreas de atuação, equipe, blog e captura de leads.",
    coverImage: "/images/cases/almeida-adv/cover.jpg",
    gallery: [
      "/images/cases/almeida-adv/1.jpg",
      "/images/cases/almeida-adv/2.jpg",
      "/images/cases/almeida-adv/3.jpg",
    ],
    technologies: ["Next.js", "Tailwind CSS", "SEO"],
    result: "+200% em contatos via formulário",
    liveUrl: "https://exemplo.com/almeida-adv",
    featured: true,
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

export function getCasesByCategory(category: CaseCategory): CaseStudy[] {
  return cases.filter((c) => c.category === category);
}
