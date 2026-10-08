export type PricingTab = "sites" | "trafego";

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  timeline: string;
  popular?: boolean;
  tab: PricingTab;
}

export const pricingPlans: PricingPlan[] = [
  // CRIAÇÃO DE SITES
  {
    id: "landing-page",
    name: "Landing Page",
    price: "R$ 1.500",
    description: "Página única de alta conversão para campanhas e lançamentos.",
    features: [
      "Página única otimizada",
      "Design responsivo",
      "Formulário de captura",
      "Integração com WhatsApp",
      "SEO básico",
      "Hospedagem inclusa (1 ano)",
    ],
    timeline: "5 a 7 dias",
    tab: "sites",
  },
  {
    id: "site-institucional",
    name: "Site Institucional",
    price: "R$ 3.000",
    description: "Site completo de 5 a 8 páginas para sua empresa.",
    features: [
      "5 a 8 páginas",
      "Design personalizado",
      "Blog integrado",
      "SEO completo",
      "Formulário de contato",
      "Google Analytics",
      "Hospedagem inclusa (1 ano)",
    ],
    timeline: "10 a 15 dias",
    popular: true,
    tab: "sites",
  },
  {
    id: "site-premium",
    name: "Site Institucional Premium",
    price: "R$ 5.500",
    description: "Site avançado com blog, SEO completo e animações premium.",
    features: [
      "Tudo do plano Institucional",
      "Blog com CMS",
      "SEO avançado",
      "Animações premium",
      "Área de membros",
      "Chat online",
      "Suporte prioritário",
    ],
    timeline: "15 a 25 dias",
    tab: "sites",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    price: "R$ 6.000",
    description: "Loja virtual completa pronta para vender online.",
    features: [
      "Catálogo de produtos",
      "Checkout integrado",
      "Pagamentos (Pix, cartão, boleto)",
      "Gestão de pedidos",
      "SEO para produtos",
      "Integração com transportadoras",
      "Treinamento da equipe",
    ],
    timeline: "20 a 40 dias",
    tab: "sites",
  },
  {
    id: "blog-portal",
    name: "Blog / Portal",
    price: "R$ 2.800",
    description: "Portal de conteúdo com blog otimizado para SEO.",
    features: [
      "Blog com CMS",
      "Categorias e tags",
      "SEO avançado",
      "Newsletter",
      "Comentários",
      "Redes sociais integradas",
    ],
    timeline: "10 a 15 dias",
    tab: "sites",
  },
  {
    id: "sistema-web",
    name: "Sistema Web Sob Medida",
    price: "R$ 12.000",
    description: "Painel e sistema web personalizado para sua operação.",
    features: [
      "Sistema 100% personalizado",
      "Painel administrativo",
      "Banco de dados",
      "Relatórios",
      "API integrada",
      "Hospedagem cloud",
      "Suporte 3 meses",
    ],
    timeline: "30 a 60 dias",
    tab: "sites",
  },
  {
    id: "redesign",
    name: "Redesign de Site",
    price: "R$ 2.200",
    description: "Modernização do seu site existente com novo visual.",
    features: [
      "Novo design",
      "Otimização de velocidade",
      "SEO técnico",
      "Responsividade",
      "Manutenção de conteúdo",
    ],
    timeline: "7 a 12 dias",
    tab: "sites",
  },
  {
    id: "manutencao",
    name: "Manutenção Mensal",
    price: "R$ 200",
    period: "/mês",
    description: "Mantenha seu site sempre atualizado e seguro.",
    features: [
      "Atualizações de conteúdo",
      "Backups semanais",
      "Monitoramento de segurança",
      "Pequenos ajustes visuais",
      "Relatório mensal",
    ],
    timeline: "Contínuo",
    tab: "sites",
  },
  // TRÁFEGO PAGO
  {
    id: "trafego-basico",
    name: "Gestão de Tráfego Pago",
    price: "R$ 1.500",
    period: "/mês",
    description: "Gestão de Meta Ads ou Google Ads para seu negócio.",
    features: [
      "Meta Ads ou Google Ads",
      "Criação de campanhas",
      "Gestão de criativos",
      "Relatório mensal",
      "Otimização contínua",
      "Taxa de setup: R$ 500 a R$ 1.000",
    ],
    timeline: "Contínuo",
    popular: true,
    tab: "trafego",
  },
  {
    id: "trafego-completo",
    name: "Tráfego Pago Completo",
    price: "R$ 2.800",
    period: "/mês",
    description: "Meta + Google Ads com relatórios e CRO avançado.",
    features: [
      "Meta Ads + Google Ads",
      "Relatórios detalhados",
      "CRO (otimização de conversão)",
      "Testes A/B",
      "Landing pages inclusas",
      "Reunião estratégica mensal",
      "Taxa de setup: R$ 500 a R$ 1.000",
    ],
    timeline: "Contínuo",
    tab: "trafego",
  },
];

export const pricingNote =
  "Valores base. O orçamento final depende do escopo. A verba de anúncios é paga diretamente pelo cliente e não está inclusa nos valores acima.";
