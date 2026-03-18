# Análise Completa — Portfolio Scala
**Versão:** 1.0 — Março 2026
**Projeto:** Landing page de alta conversão para a Scala (automação de vendas)
**URL:** https://portfolio-scala.vercel.app

---

## 1. Visão Geral

O site da Scala é uma **landing page de vendas B2B** construída com Next.js 16, focada em converter gestores de tráfego, donos de agência e empresários em leads qualificados via WhatsApp. A arquitetura segue um framework de 12 etapas de persuasão baseado em psicologia de conversão, com 20 componentes de seção orquestrados em sequência narrativa.

O objetivo central é um: **levar o visitante a clicar no botão WhatsApp** com uma mensagem pré-escrita para agendar um diagnóstico gratuito.

---

## 2. Stack Técnica

### Framework & Runtime
| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Next.js | 16.1.6 |
| Runtime | React | 19.2.3 |
| Linguagem | TypeScript | 5.x |
| Estilo | CSS puro (CSS Variables) + Tailwind CSS | v4 |
| Animações | Framer Motion | 12.36.0 |
| Deploy | Vercel (auto-deploy via GitHub main) | — |

### Design System
- **Tema:** Dark (sem modo claro)
- **Background:** `#1a1a1a` (charcoal)
- **Accent:** `#ffffff` (branco) + verde WhatsApp `#25D366`
- **Tipografia:** Geist Sans (body) + Geist Mono (números/labels) + Space Grotesk (headings)
- **Grid:** CSS Grid customizado via classes utilitárias (`.g-2col`, `.g-3`, `.g-4`, etc.)

### Integrações Ativas
- **WhatsApp Business API** via `wa.me` (todos os CTAs)
- **Google Sheets** via Apps Script webhook (legado — substituído pelo WhatsApp direto)
- **Vercel** (hosting + CI/CD)
- **GitHub** (repositório: `ph-nunan/portfolio-scala`)

---

## 3. Arquitetura de Componentes

### Fluxo de Seções (sequência narrativa)

```
Navbar (fixo)
  ↓
Hero              → Gancho + proposta de valor + LiveFeed
SocialProof       → Prova social imediata (6 métricas)
Problem           → Dor quantificada (contadores animados)
PatternInterrupt  → Von Restorff Effect (quebra visual)
MidCTA            → Calculadora de perda (interativa)
FunnelComparison  → Antes vs. Depois (100 leads → X fechamentos)
Ecosystem         → Pipeline de 7 etapas (navegável)
Services          → Serviços + Pacotes + Escassez
ForWhom           → Qualificação (para quem é / não é)
Comparison        → Tabela competitiva (5 de 6 critérios)
HowItWorks        → 3 passos (zigzag com mockups)
Results           → KPIs + Garantia de 30 dias
Cases             → 3 casos com métricas reais
FuturePacing      → Projeção emocional ("imagine segunda-feira...")
KPIs              → ROAS / CAC / Conversão
TechStack         → Marquee de 14 ferramentas
Founder           → História + Transparência radical
FAQ               → 6 perguntas (accordion)
Contact           → CTA final WhatsApp
Footer            → Links + copyright
FloatingCTA       → Botão flutuante (mobile/scroll)
```

### Componentes Compartilhados
- **Navbar** — Fixa, blur ao scroll, CTA dinâmica ("Diagnóstico Gratuito" → "3 vagas disponíveis" ao rolar), menu mobile com hamburger animado
- **FloatingCTA** — Aparece após 320px de scroll, some quando a seção Contact está visível

---

## 4. Como Foi Construído

### Processo de Desenvolvimento
O site foi construído iterativamente seguindo PDFs de especificação com instruções de copywriting e UX baseadas em psicologia de conversão. Cada seção foi implementada com base em princípios específicos:

#### Psicologia de Conversão Aplicada
| Princípio | Seção | Implementação |
|-----------|-------|---------------|
| Von Restorff (destaque) | PatternInterrupt | Fundo verde contrastante, texto em branco |
| Future Pacing | FuturePacing | "Imagine acordar segunda-feira e..." |
| Transparência Radical | Founder | Lista explícita do que automação NÃO faz |
| Escassez real | Services + Contact | "3 de 5 vagas" com barra de progresso |
| Prova social numérica | Cases + SocialProof | Dados de testes reais, não depoimentos |
| Reciprocidade | MidCTA | Calculadora gratuita que mostra perda do usuário |
| Ancoragem de preço | Comparison | Compara R$3-5k (SDR) vs R$450-1.8k (Scala) |

#### Animações (Framer Motion)
- **Entrada padrão:** `opacity 0→1, y 24→0, blur 8px→0` (600ms, easing `[0.21, 0.47, 0.32, 0.98]`)
- **Stagger:** 0.06–0.15s por item em listas
- **Trigger:** `useInView` com `margin: "-80px"` (dispara 80px antes de entrar na tela)
- **Tabs/Accordion:** `AnimatePresence mode="wait"` para transições de conteúdo
- **Contadores:** `framer-motion.animate()` com count-up em 1.5–2s

#### Sistema de Grid
Sem framework externo — CSS Grid puro via classes utilitárias definidas em `globals.css`. Responsividade via breakpoints em 1024px, 768px, 640px, 480px.

---

## 5. Principais Erros Identificados e Corrigidos

### 5.1 Integração Google Sheets — POST Body Perdido
**Problema:** O formulário de contato enviava `Content-Type: application/json` para o Apps Script. O Google redireciona requisições POST para outro endpoint (HTTP 302), e o redirect descartava o body da requisição. O Sheets nunca recebia os dados.

**Causa raiz:** Google Apps Script requer `Content-Type: application/x-www-form-urlencoded` para preservar o body em redirects.

**Correção:** `app/api/contact/route.ts` reescrito para usar `URLSearchParams` com o payload serializado como form data.

---

### 5.2 Slider "Tempo em Ads" — Parâmetros Incorretos
**Problema:** O slider da calculadora de Ads estava com `min={2}` e `step={1}`, permitindo valores como 2h, 3h, 4h... A especificação pedia `min={5}` e `step={5}` (5h → 10h → 15h → 20h).

**Correção:** Atualizado para `min={5} max={20} step={5}` em `MidCTA.tsx`.

---

### 5.3 Deploy Vercel — Scope Missing
**Problema:** Primeira tentativa de deploy com `vercel --yes` retornou erro `missing_scope`. O CLI não conseguia identificar o projeto sem o scope da conta.

**Correção:** Deploy realizado com `--scope ph-nunans-projects` explícito. Arquivo `.vercel/project.json` criado e versionado, garantindo deploys futuros automáticos.

---

### 5.4 Formulário vs. WhatsApp — Fricção Alta
**Problema:** O formulário original tinha 5 campos (nome, e-mail, WhatsApp, empresa, cargo), progress bar de Zeigarnik e botão de submit. Alta fricção para o usuário, especialmente mobile. Taxa esperada de abandono alta.

**Correção (por especificação PDF):** Formulário removido completamente. Substituído por botão WhatsApp direto com mensagem pré-escrita. Scarcity bar mantida. Fricção zero.

---

### 5.5 Número WhatsApp Incorreto nos CTAs
**Problema:** O link alternativo no formulário antigo usava `wa.me/5561999999999` (número placeholder). Todos os outros CTAs apontavam para `#contact` (scroll âncora), não para WhatsApp.

**Correção:** Todos os 13 CTAs do site (Navbar desktop, Navbar mobile, FloatingCTA, Hero, MidCTA, ForWhom, FuturePacing, FunnelComparison, Comparison, FAQ, Results, Services ×3) atualizados para `wa.me/556181894189` com mensagem pré-escrita URL-encoded.

---

### 5.6 Edit Tool — "File Has Not Been Read"
**Nota técnica:** Durante o desenvolvimento, alguns edits falharam porque a ferramenta de edição requer leitura prévia do arquivo. Esse padrão de erro foi identificado e evitado em edits subsequentes sempre realizando `Read` antes de `Edit`.

---

## 6. Análise de Qualidade por Seção

| Seção | Qualidade | Observações |
|-------|-----------|-------------|
| Hero | ★★★★★ | LiveFeed animado é o diferencial visual. Copy forte. |
| SocialProof | ★★★★☆ | Números sólidos. Falta logo de clientes reais. |
| Problem | ★★★★★ | Contadores + LiveTicker criam urgência real. |
| PatternInterrupt | ★★★★☆ | Eficaz visualmente. Poderia ter mais peso no mobile. |
| MidCTA (Calculadora) | ★★★★★ | Melhor seção de engajamento. ROI personalizado. |
| FunnelComparison | ★★★★★ | Visual poderoso. 3% vs 14% impacta imediatamente. |
| Ecosystem | ★★★★☆ | Boa UX interativa. Longo — pode perder atenção. |
| Services | ★★★★☆ | Bem estruturado. 3 pacotes claros. Muita informação. |
| ForWhom | ★★★★★ | Qualificação negativa é um recurso poderoso. |
| Comparison | ★★★★☆ | Tabela eficaz. Poderia ter logo das alternativas. |
| HowItWorks | ★★★★☆ | Mockups bem feitos. Processo claro. |
| Results | ★★★★★ | Garantia de 30 dias + métricas = confiança alta. |
| Cases | ★★★☆☆ | Faltam nomes/empresas reais. "Teste controlado" é vago. |
| FuturePacing | ★★★★★ | Projeção emocional muito bem executada. |
| KPIs | ★★★☆☆ | Técnico demais. Audiência pode não conhecer ROAS/CAC. |
| TechStack | ★★★★☆ | Marquee elegante. Transmite credibilidade técnica. |
| Founder | ★★★★★ | Transparência radical é o ponto mais diferenciado. |
| FAQ | ★★★★☆ | Perguntas relevantes. Respostas um pouco longas. |
| Contact | ★★★★★ | WhatsApp direto = conversão máxima. Decisão correta. |
| Footer | ★★★☆☆ | Funcional. Poderia ter links para redes sociais. |

---

## 7. Pontos a Melhorar (Backlog)

### Alta Prioridade

#### 7.1 Analytics e Rastreamento ✅ CONCLUÍDO (17/03/2026)
**Situação atual:** GTM (GTM-TH5VGFDP) publicado com 10 tags, 5 triggers e 12 variáveis. GA4 (G-ZQ2Q9PT017) com Google Signals ativo e retenção de 14 meses. Meta Pixel (854431830954678) com evento Lead no clique WhatsApp. Microsoft Clarity (vxe392gf60) conectado ao GA4. Google Search Console verificado e sitemap enviado.

**Eventos configurados:** `wa_button_click`, `scroll_depth` (25/50/75%), `section_view`, `engaged_time`.

---

#### 7.2 Casos com Prova Mais Específica
**Situação atual:** Cases descritos como "Teste Controlado", "Projeto Piloto", "Implementação" — sem nomes, segmentos ou logotipos reais.

**Ação:** Obter permissão de clientes para usar nome/segmento. Substituir por "Agência X (Brasília, tráfego pago)" com resultados específicos. Adicionar foto ou logo se possível.

---

#### 7.3 OG Tags e SEO Básico ✅ CONCLUÍDO (17/03/2026)
**Situação atual:** `app/layout.tsx` com metadata completa via Next.js Metadata API. Open Graph (og:title, og:description, og:image 1200×630), Twitter Card, JSON-LD (Organization, WebSite, Service, FAQPage), sitemap.xml automático via `app/sitemap.ts`, Google Search Console verificado com meta tag HTML.

---

#### 7.4 Acessibilidade (a11y) ✅ CONCLUÍDO (17/03/2026)
**Correções aplicadas:**
- `--text-3` corrigido de `#6b6b6b` → `#858585` (contraste WCAG AA ~4.7:1)
- `:focus-visible` global com outline para navegação por teclado
- FAQ accordion: `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby`
- MidCTA tabs: `role="tablist"`, `role="tab"`, `aria-selected`
- MidCTA sliders: `aria-label`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- Ecosystem: `role="tablist/tab"`, `aria-label`, `aria-selected`, navegação setas ←→, `outline:none` removido

---

#### 7.5 Performance Mobile ✅ CONCLUÍDO (17/03/2026)
**Correções aplicadas:**
- Animação grain desativada em mobile (≤768px) via media query — reduz CPU/bateria
- `prefers-reduced-motion` respeita preferência do sistema operacional
- `text-size-adjust: 100%` e `font-size: max(16px, 1em)` em inputs para evitar zoom automático no iOS Safari

---

### Média Prioridade

#### 7.6 Página de Obrigado / Confirmação
**Situação atual:** Ao clicar no botão WhatsApp, o usuário é redirecionado sem nenhum tracking ou confirmação no site.

**Ação:** Criar página `/obrigado` com mensagem de confirmação. Disparar evento de conversão para pixels de ads (Meta/Google) via query string ou sessionStorage.

---

#### 7.7 Scarcity Dinâmica
**Situação atual:** "3 vagas disponíveis" é hardcoded (`VAGAS_OCUPADAS = 2`). Sempre mostra o mesmo número.

**Ação:** Conectar a um backend simples (Supabase ou KV store no Vercel) para contar contatos recebidos. Atualizar o número em tempo real. Adicionar data de reset mensal.

---

#### 7.8 Formulário de Fallback
**Situação atual:** Todo o fluxo depende de WhatsApp. Se o usuário preferir e-mail ou não tiver WhatsApp instalado no browser, não há alternativa.

**Ação:** Adicionar link secundário "Prefere e-mail? contato@scala.com.br" abaixo do botão WhatsApp.

---

#### 7.9 Internacionalização (i18n) — Médio Prazo
**Situação atual:** Site 100% em português. Se a audiência crescer, pode ser interessante ter versão em inglês/espanhol.

**Ação:** Next.js suporta i18n nativamente. Separar strings de conteúdo em arquivos de tradução (`/messages/pt-BR.json`, `/messages/en.json`).

---

#### 7.10 Testes A/B no Hero
**Situação atual:** Apenas uma versão do Hero. Headline, CTA e LiveFeed nunca foram testados.

**Ação:** Usar Vercel Edge Middleware para split test entre variantes do headline. Medir taxa de scroll-to-contact e cliques WhatsApp.

---

### Baixa Prioridade

#### 7.11 Blog / Conteúdo SEO
**Situação atual:** Site de página única sem conteúdo orgânico.

**Ação:** Criar seção `/blog` com Next.js MDX para artigos sobre automação, n8n, WhatsApp Business. Alvo de palavras-chave: "automação de atendimento", "n8n agência", "CRM automático".

---

#### 7.12 Chat Widget no Site
**Situação atual:** O próprio produto da Scala é uma IA de atendimento. Faz sentido ter o produto "demonstrando a si mesmo" no site.

**Ação:** Integrar o agente Ana (WhatsApp IA da Scala) como widget de chat no site. Usar a própria stack (n8n + WhatsApp Business API) para atender visitantes.

---

#### 7.13 Dark/Light Mode
**Situação atual:** Tema dark fixo. Alguns usuários preferem light mode.

**Ação:** Adicionar variáveis CSS alternativas para light mode. Detectar preferência via `prefers-color-scheme`. Toggle manual opcional na Navbar.

---

#### 7.14 Video na Seção Hero ou HowItWorks
**Situação atual:** Toda prova é textual/numérica. Não há demonstração visual do produto funcionando.

**Ação:** Gravar screencast de 30–60s mostrando um lead entrando, sendo atendido pela IA, qualificado e registrado no CRM. Autoplay muted com fallback para poster.

---

#### 7.15 Footer Enriquecido
**Situação atual:** Footer mínimo — logo + links + copyright. Sem redes sociais, sem endereço completo, sem política de privacidade.

**Ação:** Adicionar: Instagram/LinkedIn da Scala, CNPJ/endereço (requisito legal para LGPD), links para Política de Privacidade e Termos de Uso.

---

## 8. Débitos Técnicos

### 8.1 API Route `/api/contact` — Orphaned
O endpoint `app/api/contact/route.ts` (integração Google Sheets) existe mas não é mais chamado após a remoção do formulário. O código ainda contém toda a lógica de POST com `URLSearchParams`.

**Ação:** Manter ou remover. Se mantiver, pode ser usado futuramente como backend de tracking. Se remover, apagar o arquivo e a variável de ambiente `GOOGLE_SHEETS_WEBHOOK_URL` no Vercel.

---

### 8.2 Assets Legados em `/public`
Existem `logo-icon.png` e `logo-lockup.png` (versões v1 do logo) além das versões v2 ativas. Arquivos não referenciados em nenhum componente.

**Ação:** Remover `logo-icon.png` e `logo-lockup.png` para reduzir bundle.

---

### 8.3 Variável de Ambiente Não Usada
`GOOGLE_SHEETS_WEBHOOK_URL` está configurada no Vercel mas não tem chamador ativo no código após remoção do formulário.

**Ação:** Remover do painel Vercel se a API route for deletada.

---

### 8.4 CSS Variables — Accent Inconsistente
`--accent` é definido como `#ffffff` (branco), mas existem referências a cores verde (`rgba(74,222,128,...)`) hardcoded em vários componentes (grain, pulse, shimmer, accent-dim, accent-border). O design system tem dois "accents" implícitos (branco e verde) sem nomenclatura clara.

**Ação:** Definir explicitamente `--accent-green: #4ADE80` e `--accent-white: #ffffff`. Separar casos de uso de forma consistente.

---

### 8.5 `any` Types Implícitos
Alguns handlers de eventos usam `e.currentTarget.style` sem type casting adequado, e alguns arrays de dados estão sem tipagem explícita.

**Ação:** Executar `tsc --noEmit` para auditoria completa. Tipar todos os arrays de dados com interfaces.

---

## 9. Métricas de Referência para Monitorar

Após deploy com analytics configurado, monitorar:

| Métrica | Benchmark Bom | Meta |
|---------|--------------|------|
| Taxa de clique no WhatsApp | > 3% dos visitantes | > 5% |
| Scroll até Contact | > 40% dos visitantes | > 55% |
| Tempo na página | > 90s | > 2min |
| Bounce rate | < 70% | < 55% |
| Mobile vs Desktop | — | Otimizar para maioria |
| Origem de tráfego | — | Identificar canal principal |

---

## 10. Decisões de Arquitetura Notáveis

### Por que CSS puro em vez de Tailwind classes no JSX?
Os estilos estão aplicados como objetos `style={{ ... }}` inline no JSX, não como classes Tailwind. Isso cria verbosidade nos componentes mas oferece controle granular para animações que alteram estilos via JavaScript (hover handlers, Framer Motion). O Tailwind v4 está instalado mas usado apenas para utilitários globais em `globals.css`.

**Trade-off:** Menos reutilização, mais controle. Funciona bem para site de página única. Se o projeto escalar, migrar para CSS Modules ou solução de tokens.

---

### Por que não usar shadcn/ui ou Radix?
Componentes de UI como Accordion (FAQ) e Tabs (MidCTA) foram implementados do zero sem bibliotecas de componentes. Isso mantém o bundle leve (apenas `next` + `framer-motion` como dependências de runtime) e permite controle total sobre animações.

---

### Por que Next.js App Router (sem SSR real)?
O site é completamente estático (sem dados dinâmicos exceto o endpoint de contato). Next.js foi escolhido pelo ecossistema (Image, fonts, deploy Vercel). Todos os componentes são `"use client"` por causa das animações, o que significa que não há benefício de SSR — o HTML inicial é o shell básico.

**Implicação:** Se SEO for prioridade, considerar converter seções sem interatividade para Server Components (sem `"use client"`).

---

## 11. Histórico de Commits Relevantes

| Hash | Descrição |
|------|-----------|
| `c0cbb7b` | feat: Scala WhatsApp AI Agent (Ana) — estado inicial |
| `da01d90` | feat: Google Calendar integration |
| `d1eb277` | feat: workflow final 20 nodes |
| `6bff9f2` | docs: análise completa com CRM |
| `140b37a` | docs: aprendizado foto de perfil WhatsApp Business |
| `3020336` | fix: usar form-encoded para evitar perda de body no redirect do Apps Script |
| `3a0d2b9` | feat: substituir formulário de contato por botão WhatsApp direto |

---

## 12. Resumo Executivo

**O que foi construído:** Landing page de vendas B2B completa (20 seções, 22 componentes) com framework de conversão baseado em psicologia, calculadora interativa de ROI, pipeline navegável de 7 etapas, tabela comparativa e fluxo 100% orientado a WhatsApp.

**O que foi corrigido:** 5 bugs críticos (POST body perdido no Sheets, slider com parâmetros errados, deploy sem scope, número WhatsApp placeholder, CTAs apontando para formulário removido).

**O que falta:** Analytics, prova social com nomes reais, acessibilidade, OG tags, tracking de conversão pós-clique WhatsApp.

**Qualidade geral:** ★★★★☆ — Site bem executado, copy forte, animações polidas. Gaps principais são rastreabilidade e prova social mais específica.

---

*Documento gerado em 2026-03-16. Atualizar a cada sprint ou grande mudança de funcionalidade.*
