/**
 * MÓDULO A — TABELA DE PREÇO PÚBLICA
 * ---------------------------------------------------------------------------
 * Fonte única de verdade dos serviços oferecidos pela agência e seus valores
 * base. Este arquivo é consumido pela página pública `/tabela-de-preco` e
 * também pela calculadora interna `/calculadora` (select de serviços).
 *
 * COMO ALTERAR PREÇOS: edite o campo `basePrice` (número, em R$) do serviço
 * desejado. A formatação "a partir de R$ X" é automática.
 * COMO ADICIONAR UM SERVIÇO: acrescente um objeto em `agencyServices`
 * escolhendo uma `category` existente em `pricingCategories`.
 */

/** Categorias exibidas como abas na página pública. */
export type PricingCategoryId = "sites" | "sistemas" | "ia" | "suporte";

/** Definição de uma aba/categoria da tabela de preços. */
export interface PricingCategory {
  id: PricingCategoryId;
  label: string;
  description: string;
}

/** Um serviço público com valor base e entregáveis. */
export interface AgencyService {
  /** Identificador estável (usado como chave e na calculadora interna). */
  id: string;
  name: string;
  category: PricingCategoryId;
  /** Valor base "a partir de", em reais (número inteiro). */
  basePrice: number;
  /** Unidade de cobrança. Só para serviços recorrentes (ex.: "/mês"). */
  period?: string;
  /** Frase curta explicando o serviço. */
  description: string;
  /** Lista de entregáveis exibida no card. */
  deliverables: string[];
  /** Prazo médio de entrega, em texto. */
  avgTimeline: string;
  /** Destaque visual "Mais procurado". */
  popular?: boolean;
}

export const pricingCategories: PricingCategory[] = [
  {
    id: "sites",
    label: "Sites & E-commerce",
    description: "Presença digital para atrair, convencer e vender.",
  },
  {
    id: "sistemas",
    label: "Sistemas & Produtos",
    description: "Software sob medida para operar e escalar seu negócio.",
  },
  {
    id: "ia",
    label: "IA & Automação",
    description: "Agentes, automações e implantação de inteligência artificial.",
  },
  {
    id: "suporte",
    label: "Suporte & Evolução",
    description: "Planos contínuos para manter tudo no ar e melhorando.",
  },
];

export const agencyServices: AgencyService[] = [
  // ── SITES & E-COMMERCE ────────────────────────────────────────────────
  {
    id: "landing-page",
    name: "Landing Page",
    category: "sites",
    basePrice: 2500,
    description: "Página única de alta conversão para campanhas e lançamentos.",
    deliverables: [
      "Design responsivo (mobile-first)",
      "Seções de conversão (copy + CTA)",
      "Formulário integrado ao WhatsApp",
      "SEO técnico básico (meta tags, sitemap, velocidade)",
      "Google Analytics e Meta Pixel",
      "Publicação e treinamento de edição",
      "1 rodada de ajustes",
    ],
    avgTimeline: "5 a 7 dias úteis",
  },
  {
    id: "site-institucional",
    name: "Site Institucional",
    category: "sites",
    basePrice: 4500,
    description: "Site completo de 5 a 8 páginas para apresentar sua empresa.",
    deliverables: [
      "Até 8 páginas personalizadas",
      "Design exclusivo alinhado à marca",
      "SEO on-page completo",
      "Blog integrado com CMS",
      "Formulário de contato e mapa",
      "Integrações (Analytics, Pixel, WhatsApp)",
      "Treinamento de uso",
      "1 rodada de ajustes",
    ],
    avgTimeline: "10 a 15 dias úteis",
    popular: true,
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    category: "sites",
    basePrice: 9000,
    description: "Loja virtual completa, pronta para vender 24 horas por dia.",
    deliverables: [
      "Catálogo e fichas de produto",
      "Checkout com Pix, cartão e boleto",
      "Gestão de pedidos e estoque",
      "Cálculo de frete e transportadoras",
      "Cupons e recuperação de carrinho",
      "SEO para produtos",
      "Painel administrativo",
      "Treinamento da equipe",
    ],
    avgTimeline: "20 a 40 dias úteis",
  },
  {
    id: "portal-blog",
    name: "Portal / Blog de conteúdo",
    category: "sites",
    basePrice: 4500,
    description: "Portal de conteúdo com CMS, categorias e foco em SEO.",
    deliverables: [
      "CMS com posts, categorias e tags",
      "Layout de listagem e página de artigo",
      "SEO e dados estruturados",
      "Newsletter e compartilhamento social",
      "Controle de autores e permissões",
      "Painel de métricas básicas",
    ],
    avgTimeline: "10 a 20 dias úteis",
  },

  // ── SISTEMAS & PRODUTOS ───────────────────────────────────────────────
  {
    id: "sistema-saas",
    name: "Sistema web / SaaS sob medida (MVP)",
    category: "sistemas",
    basePrice: 15000,
    description: "MVP de sistema web ou SaaS, do levantamento ao lançamento.",
    deliverables: [
      "Levantamento de requisitos e escopo",
      "Protótipo UI/UX aprovado",
      "Autenticação e controle de perfis",
      "Painel administrativo",
      "Banco de dados e API",
      "Integração de pagamento (quando aplicável)",
      "Testes, deploy e monitoramento",
      "30 dias de suporte pós-lançamento",
    ],
    avgTimeline: "30 a 60 dias úteis",
  },
  {
    id: "app-mobile",
    name: "Aplicativo mobile (iOS/Android)",
    category: "sistemas",
    basePrice: 10000,
    description: "Aplicativo para iOS e Android com base compartilhada de código.",
    deliverables: [
      "UI/UX mobile nativo",
      "Versões iOS e Android",
      "Publicação nas lojas (Apple e Google)",
      "Push notifications",
      "Integração com API / backend",
      "Painel administrativo básico",
      "30 dias de suporte",
    ],
    avgTimeline: "40 a 70 dias úteis",
  },
  {
    id: "ferramentas-internas",
    name: "Programas e ferramentas internas",
    category: "sistemas",
    basePrice: 6000,
    description: "Dashboards, painéis e automações internas para sua operação.",
    deliverables: [
      "Mapeamento dos processos atuais",
      "Painel e dashboards sob medida",
      "Automação de rotinas repetitivas",
      "Relatórios e exportação de dados",
      "Controle de acesso por perfil",
      "Integrações (planilhas, ERP, APIs)",
      "Treinamento da equipe",
    ],
    avgTimeline: "15 a 30 dias úteis",
  },

  // ── IA & AUTOMAÇÃO ────────────────────────────────────────────────────
  {
    id: "agente-ia",
    name: "Agente / Chatbot com IA",
    category: "ia",
    basePrice: 6000,
    description: "Agente inteligente para atender, qualificar e vender 24/7.",
    deliverables: [
      "Treinamento com sua base de conhecimento",
      "Atendimento no site e/ou WhatsApp",
      "Triagem e captação de leads",
      "Transferência para atendimento humano",
      "Painel de conversas e métricas",
      "Ajuste de tom de voz da marca",
      "30 dias de otimização",
    ],
    avgTimeline: "10 a 20 dias úteis",
  },
  {
    id: "automacoes-ia",
    name: "Automações e integrações com IA",
    category: "ia",
    basePrice: 4000,
    description: "Conectamos suas ferramentas e automatizamos fluxos com IA.",
    deliverables: [
      "Mapeamento dos fluxos a automatizar",
      "Integração entre APIs e sistemas",
      "Automação com IA (textos, triagem, dados)",
      "Tratamento de erros e alertas",
      "Documentação do fluxo",
      "15 dias de ajustes",
    ],
    avgTimeline: "5 a 15 dias úteis",
  },
  {
    id: "consultoria-ia",
    name: "Consultoria e implantação de IA",
    category: "ia",
    basePrice: 3000,
    description: "Diagnóstico e plano de implantação de IA no seu negócio. Sob escopo.",
    deliverables: [
      "Diagnóstico de oportunidades",
      "Priorização por impacto × esforço",
      "Plano de implantação passo a passo",
      "Recomendação de ferramentas e modelos",
      "Estimativa de custos operacionais",
      "Sessão de apresentação e próximos passos",
    ],
    avgTimeline: "3 a 5 dias úteis",
  },

  // ── SUPORTE & EVOLUÇÃO ────────────────────────────────────────────────
  {
    id: "suporte-mensal",
    name: "Suporte e evolução mensal",
    category: "suporte",
    basePrice: 800,
    period: "/mês",
    description: "Monitoramento, segurança e melhorias contínuas no seu projeto.",
    deliverables: [
      "Monitoramento e backups",
      "Atualizações de segurança",
      "Pequenos ajustes e melhorias",
      "Relatório mensal de atividades",
      "Canal direto de suporte",
      "Prioridade na fila de atendimento",
    ],
    avgTimeline: "Contínuo",
  },
];

/** Observação legal/comercial exibida ao rodapé da tabela pública. */
export const agencyPricingNote =
  "Valores base. Cada projeto recebe proposta personalizada.";

/** Busca um serviço pelo id (usado pela calculadora interna). */
export function getServiceById(id: string): AgencyService | undefined {
  return agencyServices.find((service) => service.id === id);
}
