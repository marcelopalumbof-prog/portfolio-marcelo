# Brag-plan — Marcelo Palumbo (Instagram Reels)

## Especificações técnicas
- Formato: vertical 9:16, 1080 × 1920 px, 30 fps, MP4
- Duração: 20–25 segundos
- Sem narração. Legendas curtas em português do Brasil na tela (muitos assistem sem som)
- Música animada + efeitos sonoros (clique, whoosh, pop) sincronizados com cada interação
- Área segura do Reels: nada importante nos ~250 px do topo nem nos ~400 px da base
- Interface REAL do site (cores, fontes, textos e componentes do `index.html`)
- Site dentro de moldura de celular (recorte vertical), ocupando a maior parte da tela
- Cursor animado simulando uso: rolagem suave, hover, cliques e arrasto
- Feedback visual em cada clique (efeito ripple)
- Câmera com zoom suave nos momentos-chave

## Identidade visual (extraída do `index.html`)
- Fundo: `#0A0B0A` (quase preto)
- Superfícies: `#151615`, `#0E0F0E`
- Acento (neon laranja): `#E85D04` | hover: `#FF7A1F` | glow: `rgba(232,93,4,.35)`
- Texto principal: `#FFFFFF` | texto secundário: `#8A8C8A`
- Borda: `rgba(255,255,255,.14)`
- Fonte títulos: Syne | Fonte corpo: Inter
- Ease de assinatura: `cubic-bezier(.05,.7,.1,1)`
- Botão flutuante WhatsApp: laranja `#E85D04` com sombra

## Elementos reais do site (copiados do código)
- Logo: `Marcelo Palumbo.` (laranja)
- H1 hero: `Sites que <accent>vendem</accent>, sistemas que <accent>organizam</accent> e anúncios que <accent>trazem clientes</accent>.`
- Social proof: `+80 projetos entregues` em Salvador e todo o Brasil, avaliação `★★★★★ 5,0`
- Mockup hero: browser + celular em HTML/CSS (URL `marcelopalumbo.com.br`, faturamento `R$ 18.420`, painel de pedidos)
- Portfólio: 6 cards (Restaurante Sabor antes/depois, Clínica odontológica, Construtora, Painel de pedidos, Barbearia, Loja de moda)
- Filtros portfólio: Todos (6), Sites (3), Sistemas (2), Tráfego pago (1)
- Slider antes/depois do Restaurante Sabor (`--pos:55%`)
- Métricas flutuantes: `R$ 4,20` de retorno por R$ 1 investido, `−38%` no custo por lead, `+120` leads por mês
- Abas planos: Sites, Sistemas e Redesign, Tráfego Pago
- Contato final: `Falar no WhatsApp` | `marcelo.palumbof@gmail.com` | `https://www.instagram.com/marcelopalumbo_/`
- WhatsApp: `5571981061578`

## Storyboard quadro a quadro (total ~22 s)

| Tempo | Cena | Ação do cursor / câmera | Legenda na tela | SFX |
|-------|------|------------------------|-----------------|-----|
| 0.0–0.6 | Preto total. Só o logo `Marcelo Palumbo.` centralizado no laranja. | Fade-in lento | — | Pop |
| 0.6–1.4 | Gancho tipográfico. Palavras aparecem uma a uma. | Zoom leve na palavra destacada | “Sites que vendem.” | Whoosh |
| 1.4–2.2 | Continuação da tipografia | — | “Sistemas que organizam.” | Whoosh |
| 2.2–3.0 | Fim do gancho | — | “Anúncios que trazem clientes.” | Pop |
| 3.0–4.0 | Gancho de transição | Desfoque suave, aparece o celular | “Tudo em um lugar.” | — |
| 4.0–6.0 | Hero: site no celular. Cursor passa no botão “Quero meu projeto”. | Zoom suave no mockup | “Quero meu projeto” | Clique |
| 6.0–6.6 | Botão laranja pressionado, ripple branco | Ripple expande do ponto do clique | “+80 projetos entregues” | Pop |
| 6.6–7.4 | Rating aparece abaixo do botão | Câmera puxa um pouco | “★★★★★ 5,0” | — |
| 7.4–8.4 | Scroll suave para Serviços. Cursor passa nos cards: Landing Page, Site Institucional, Sistema Web Sob Medida, Gestão de Tráfego Pago. | Zoom nos cards em sequência | “Landing Page / Site Institucional / Sistema Web / Tráfego Pago” | Clique (cada hover) |
| 8.4–9.4 | Filtros do portfólio: Todos → Sistemas → Tráfego pago | Clique em cada chip, cards somem/aparecem | “Todos → Sistemas → Tráfego pago” | Clique |
| 9.4–12.0 | Card Restaurante Sabor. Cursor arrasta o slider antes/depois. | Destaque visual no slider, câmera aproxima | “Antes / Depois” | Whoosh (arrasto) |
| 12.0–13.4 | Blocos métricas flutuantes aparecem com contagem animada | Câmera sobe para os blocos | “R$ 4,20 de retorno por R$ 1” | Pop |
| 13.4–14.2 | Bloco seguinte | — | “−38% no custo por lead” | Pop |
| 14.2–15.0 | Bloco seguinte | — | “+120 leads por mês” | Pop |
| 15.0–16.0 | Planos: clique rápido nas abas Sites → Sistemas e Redesign → Tráfego Pago | Câmera acompanha a troca de aba | “Sites / Sistemas / Tráfego Pago” | Clique (cada aba) |
| 16.0–18.0 | CTA: cursor clica em “Falar no WhatsApp”. Tela final. | Zoom suave no botão flutuante | “Marcelo Palumbo.” | Clique |
| 18.0–20.0 | Tela final: nome, CTA, Instagram, site | Fade-in dos textos | “Orçamento direto no WhatsApp” | Música sobe |
| 20.0–22.0 | Final: handle e domínio | Hold | “@marcelopalumbo_ · marcelopalumbo.vercel.app” | — |

## Notas de produção
- Todos os textos acima existem literalmente no `index.html` (não há métricas inventadas).
- O cursor deve ter sombra leve e ripple branco ao clicar.
- A moldura do celular fica centralizada na vertical, respeitando a área segura do Reels (topo e base livres de texto importante).
- Música: animada, moderna, estilo agência digital premium.
- Entregáveis: `brag.mp4`, `brag-plan.md` (este arquivo) e legenda para o post.

## Legenda para o post (pt-BR)
Sites que vendem, sistemas que organizam, anúncios que trazem clientes. 🚀

Crio landing pages, sites institucionais e sistemas web sob medida para negócios de Salvador e de todo o Brasil — com foco total em resultado, não em vaidade de design.

Orçamento direto no WhatsApp. Link na bio.

@marcelopalumbo_ · marcelopalumbo.vercel.app

#designweb #siteseinstitucionais #sistemasweb #tráfegopago #metaads #googleads #salvador #ba #empreendedor #desenvolvedorweb #landingpage #marketingdigital