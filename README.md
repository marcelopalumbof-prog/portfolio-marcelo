# Portfólio Marcelo — Criação de Sites e Tráfego Pago

Site profissional de portfólio focado em conversão, construído com Next.js, TypeScript, Tailwind CSS e Framer Motion.

## Stack

- **Next.js 14** — Framework React com App Router
- **TypeScript** — Tipagem estática
- **Tailwind CSS** — Estilização utilitária
- **Framer Motion** — Animações suaves

## Como Executar

```bash
# Instalar dependências
npm install

# Copiar as variáveis de ambiente (obrigatório para a calculadora)
cp .env.example .env.local   # Windows: copy .env.example .env.local

# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start
```

O site estará disponível em `http://localhost:3000`.

### Rotas

| Rota | Visibilidade | Descrição |
|---|---|---|
| `/` | Pública | Página única (home) |
| `/tabela-de-preco` | **Pública** | **Módulo A** — tabela de serviços com abas por categoria |
| `/cases/[slug]` | Pública | Detalhe dos cases |
| `/calculadora` | **Restrita** | **Módulo B** — calculadora de precificação e divisão (senha) |

## Estrutura do Projeto

```
├── app/
│   ├── layout.tsx              # Layout principal com SEO
│   ├── page.tsx                # Página inicial
│   ├── globals.css             # Estilos globais
│   ├── sitemap.ts              # Sitemap dinâmico
│   ├── robots.ts               # Robots.txt (bloqueia /calculadora)
│   ├── cases/[slug]/           # Páginas de detalhe dos cases
│   ├── tabela-de-preco/        # Módulo A — página pública de preços
│   │   └── page.tsx
│   └── calculadora/            # Módulo B — área restrita
│       ├── page.tsx            #   verificação de sessão (servidor)
│       └── actions.ts          #   server actions (login/logout)
├── components/
│   ├── Navbar.tsx              # Menu de navegação
│   ├── Hero.tsx / About.tsx / Services.tsx / Portfolio.tsx
│   ├── Pricing.tsx             # Seção de preços da home
│   ├── PricingTable.tsx        # Módulo A — cards + abas por categoria
│   ├── PageShell.tsx           # Shell compartilhado das rotas internas
│   ├── calculator/             # Módulo B
│   │   ├── LoginGate.tsx       #   tela de senha
│   │   ├── Calculator.tsx      #   cálculo, parâmetros e gráfico
│   │   ├── SplitPieChart.tsx   #   gráfico de pizza (SVG)
│   │   ├── DealsList.tsx       #   carteira de vendas + totais + export
│   │   └── MinPriceSimulator.tsx #  simulador de preço mínimo
│   └── ... (demais da home)
├── data/
│   ├── profile.ts              # Dados pessoais e contato
│   ├── cases.ts                # Cases de exemplo
│   ├── pricing.ts              # Planos exibidos na home
│   ├── agency-pricing.ts       # Módulo A — catálogo público de serviços/preços
│   └── split-config.ts         # Módulo B — percentuais e nomes padrão
├── lib/
│   ├── format.ts               # Formatação BRL/percentual/data
│   ├── pricing-math.ts         # Cálculo de divisão e preço mínimo
│   ├── deals.ts                # Persistência (localStorage) + totais
│   ├── export.ts               # Exportação CSV e PDF (impressão)
│   └── auth.ts                 # Hash/comparação da senha da área restrita
└── .env.example / .env.local   # Variáveis de ambiente
```

## Como Personalizar

### 1. Dados Pessoais e Contato

Edite `data/profile.ts`:

```ts
export const profile = {
  name: "Seu Nome",
  role: "Criação de Sites e Tráfego Pago",
  tagline: "Sua proposta de valor aqui...",
  photo: "/images/sua-foto.jpg",
  summary: "Sua descrição...",
  stats: [
    { value: 80, suffix: "+", label: "Projetos entregues" },
    // ...
  ],
  social: {
    whatsapp: "5511999999999", // Seu número com DDI+DDD
    whatsappMessage: "Mensagem padrão...",
    instagram: "https://instagram.com/seuusuario",
    linkedin: "https://linkedin.com/in/seuusuario",
    github: "https://github.com/seuusuario",
    email: "seu@email.com",
  },
  company: {
    name: "Sua Empresa",
    cnpj: "00.000.000/0001-00",
    city: "Sua Cidade, UF",
  },
};
```

### 2. Adicionar Novo Case

Edite `data/cases.ts` e adicione um novo objeto ao array `cases`:

```ts
{
  slug: "nome-do-case", // URL amigável
  client: "Nome do Cliente",
  segment: "Segmento do cliente",
  category: "institucional", // ou "landing-page", "ecommerce", "sistema"
  title: "Título do projeto",
  shortDescription: "Descrição curta...",
  coverImage: "/images/cases/nome-do-case/cover.jpg",
  gallery: [
    "/images/cases/nome-do-case/1.jpg",
    "/images/cases/nome-do-case/2.jpg",
  ],
  technologies: ["Next.js", "Tailwind CSS"],
  result: "+50% em vendas", // opcional
  liveUrl: "https://site-do-cliente.com",
  featured: true, // opcional
}
```

**Importante:** Substitua as imagens de placeholder pelas imagens reais dos projetos.

### 3. Alterar Preços

Edite `data/pricing.ts`:

```ts
{
  id: "landing-page",
  name: "Landing Page",
  price: "R$ 1.500",
  description: "Descrição do serviço...",
  features: ["Item 1", "Item 2"],
  timeline: "5 a 7 dias",
  popular: true, // destaque visual
  tab: "sites", // ou "trafego"
}
```

### 4. Adicionar Imagens

Coloque as imagens na pasta `public/images/`:

```
public/
└── images/
    ├── profile.jpg          # Sua foto
    └── cases/
        ├── clinica-vida-saudavel/
        │   ├── cover.jpg
        │   ├── 1.jpg
        │   └── 2.jpg
        └── ...
```

---

## Módulo A — Tabela de Preço pública (`/tabela-de-preco`)

Página pública com item de menu **"Tabela de Preço"** no Navbar. Mostra os
serviços em abas por categoria; cada card traz nome, "a partir de R$ X",
entregáveis, prazo médio e o botão **"Solicitar proposta"** (WhatsApp).

### Como mudar os preços

Edite `data/agency-pricing.ts` e altere o campo `basePrice` (número, em R$):

```ts
{
  id: "landing-page",
  name: "Landing Page",
  category: "sites",          // aba onde o serviço aparece
  basePrice: 2500,            // ← altere aqui (R$)
  period: "/mês",             // opcional, só para recorrentes
  description: "Página única de alta conversão...",
  deliverables: ["...", "..."],
  avgTimeline: "5 a 7 dias úteis",
  popular: true,              // opcional: destaque "Mais procurado"
}
```

A formatação `R$ 2.500` é automática (Intl `pt-BR`) — não digite texto em
`basePrice`.

**Observação comercial** (obrigatória): altere `agencyPricingNote` no mesmo
arquivo. Padrão: *"Valores base. Cada projeto recebe proposta personalizada."*

**Categorias/abas:** edite o array `pricingCategories` (mesmo arquivo). Os
ids permitidos em `category` são `"sites" | "sistemas" | "ia" | "suporte"`.

> ⚠️ `data/pricing.ts` é a tabela antiga exibida na **home**. Mantenha os
> valores coerentes entre os dois arquivos se quiser consistência total.

---

## Módulo B — Calculadora interna (`/calculadora`)

Área **restrita** (não aparece no menu, bloqueada no `robots.txt`) para
precificar projetos e dividir o valor entre os sócios.

### Como proteger o acesso

1. Copie `.env.example` para `.env.local`.
2. Defina a senha:

```bash
# .env.local
CALCULATOR_PASSWORD=sua-senha-aqui
```

3. Reinicie o servidor (`npm run dev`). A senha é validada **somente no
   servidor** e a sessão usa cookie `httpOnly` — ela nunca chega ao bundle
   do cliente.

> Sem `CALCULATOR_PASSWORD` definida, a rota mostra apenas o login e nega o
> acesso. O `.env.local` está no `.gitignore`.

### Como alterar os percentuais padrão

Edite `data/split-config.ts`:

```ts
export const defaultSplitConfig: SplitConfig = {
  taxPercent: 6,      // Impostos (Simples Nacional, ajustável)
  costPercent: 8,     // Custos operacionais/ferramentas/hospedagem
  reservePercent: 20, // Caixa da agência (reserva)
  partners: 4,        // Número de sócios
  executionBonusPercent: 0, // Bônus extra p/ sócio executor (opcional)
};

export const defaultMinPriceConfig = {
  hourlyCost: 120,           // R$/h interno
  targetNetPerPartner: 1500, // líquido mínimo por sócio
};

export const defaultPartnerNames = ["Sócio 1", "Sócio 2", "Sócio 3", "Sócio 4"];
```

Os mesmos valores são editáveis **direto na tela** da calculadora; o que você
alterar lá fica salvo no `localStorage` e tem prioridade sobre esses padrões.
O botão **"Restaurar padrões"** volta aos valores deste arquivo.

### Como funciona o cálculo

```
Receita bruta
  − Impostos         (bruta × taxPercent%)
  − Custos           (bruta × costPercent%)
  − Caixa da agência (bruta × reservePercent%)
  = Valor líquido a distribuir
  ÷ Nº de sócios     = parcela-base por sócio
  + Bônus de execução (% do líquido, pago ao sócio executor, se > 0)
```

**Exemplo conferido:** R$ 10.000 → impostos R$ 600 (6%), custos R$ 800 (8%),
caixa R$ 2.000 (20%) → líquido **R$ 6.600** → **R$ 1.650 por sócio**.

### Recursos disponíveis

- **Cards + gráfico de pizza** (SVG) com impostos, custos, caixa e sócios.
- **Nomes dos sócios editáveis** (1 a 12, default 4).
- **Carteira de projetos** com cliente, serviço, valor, data e status
  (proposta / fechado / pago) — salva em `localStorage`.
- **Totais acumulados**: faturamento, total no caixa da agência, líquido e
  total por sócio.
- **Exportar CSV** (abre no Excel/Sheets, separador `;`, UTF-8) e
  **Exportar PDF** (caixa de impressão do navegador → "Salvar como PDF").
- **Simulador de preço mínimo**: informe custo de horas e meta por sócio e
  veja o menor preço que mantém a divisão saudável.

### Segurança — o que isto NÃO é

Proteção de conveniência para esconder a ferramenta interna do público.
Não é autenticação multiusuário, não há recuperação de senha e a carteira é
armazenada localmente no navegador. Para dados sensíveis de verdade, use um
backend com banco e sessões com expiração/2FA.

---

## Deploy na Vercel

1. Crie uma conta na [Vercel](https://vercel.com)
2. Conecte seu repositório GitHub/GitLab
3. A Vercel detecta automaticamente o Next.js e faz o deploy
4. Em **Settings → Environment Variables**, cadastre `CALCULATOR_PASSWORD`
   (obrigatório para a área restrita `/calculadora`)

## SEO

O site já inclui:
- Metadados completos (title, description, keywords)
- Open Graph para redes sociais
- Twitter Cards
- Sitemap dinâmico
- Robots.txt
- Schema.org (via metadados estruturados)

## Personalização do Design

As cores estão configuradas em `tailwind.config.ts`:

```ts
colors: {
  brand: {
    50: "#eef6ff",
    100: "#d9eaff",
    // ... até 950
  },
}
```

Para alterar a cor principal, modifique os valores `brand` no arquivo de configuração.

## Suporte

Em caso de dúvidas, entre em contato pelo WhatsApp configurado no `data/profile.ts`.
