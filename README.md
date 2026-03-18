# Portfolio Scala

Landing page da [Scala](https://portfolio-scala.vercel.app) — automação de atendimento e vendas com IA.

Construída com **Next.js 15 + App Router**, deployada na **Vercel**.

---

## Stack

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS
- **Deploy:** Vercel (auto-deploy via push no `main`)
- **Domínio:** https://portfolio-scala.vercel.app

---

## Estrutura

```
app/
  layout.tsx        # Layout raiz — metadata, GTM, JSON-LD
  page.tsx          # Página principal (landing page)
  sitemap.ts        # Sitemap gerado automaticamente (/sitemap.xml)
  opengraph-image.tsx
  api/contact/      # API route para formulário de contato
```

---

## Analytics & Tracking

### Google Tag Manager
- **Container ID:** `GTM-TH5VGFDP`
- **Versão publicada:** 2 (publicada em 17/03/2026)
- Configurado via variável de ambiente `NEXT_PUBLIC_GTM_ID`

#### Tags configuradas (10)
| Tag | Tipo | Trigger |
|-----|------|---------|
| GA4 — Configuration | Google Tag | Initialization All Pages |
| GA4 — WhatsApp Click | GA4 Event (`wa_button_click`) | WhatsApp Button Click |
| GA4 — Scroll Depth | GA4 Event (`scroll_depth`) | Scroll Depth 25/50/75 |
| GA4 — Section View | GA4 Event (`section_view`) | Section View Event |
| GA4 — Time on Page | GA4 Event (`engaged_time`) | Time on Page Event |
| Section Observer | Custom HTML | Window Loaded — All Pages |
| Time on Page Tracker | Custom HTML | All Pages |
| Meta Pixel — Base Code | Custom HTML | All Pages |
| Meta Pixel — Lead | Custom HTML | WhatsApp Button Click |
| Microsoft Clarity | Custom HTML | All Pages |

#### Triggers (5)
- WhatsApp Button Click (clique em link `wa.me`)
- Scroll Depth 25/50/75%
- Window Loaded — All Pages
- Section View Event (dataLayer push)
- Time on Page Event (dataLayer push)

#### Variáveis (12)
- Click URL, Click Text, Scroll Depth Threshold, Scroll Depth Units, Scroll Direction (built-ins)
- DL — section_name, DL — time_seconds (dataLayer)
- Page URL, Page Path, Page Hostname, Referrer, Event (automáticas)

---

### Google Analytics 4
- **Measurement ID:** `G-ZQ2Q9PT017`
- **Propriedade:** Scala
- **Retenção de dados:** 14 meses
- **Google Signals:** Ativado
- **Key Event pendente:** `wa_button_click` (marcar após primeiro tráfego)

---

### Meta Pixel
- **Pixel ID:** `854431830954678`
- Eventos: PageView (todas as páginas) + Lead (clique no WhatsApp)

---

### Microsoft Clarity
- **Project ID:** `vxe392gf60`
- Integração com GA4: Conectada (propriedade Scala)

---

### Google Search Console
- **Propriedade:** https://portfolio-scala.vercel.app
- **Verificação:** Meta tag HTML (`app/layout.tsx` → `metadata.verification.google`)
- **Sitemap:** https://portfolio-scala.vercel.app/sitemap.xml (enviado em 17/03/2026)
- **Vinculação GA4:** Automática (Fluxo de dados: Scala — Site)

---

## Variáveis de Ambiente

```env
NEXT_PUBLIC_GTM_ID=GTM-TH5VGFDP
NEXT_PUBLIC_SITE_URL=https://portfolio-scala.vercel.app
```

Configuradas no painel da Vercel em **Settings → Environment Variables**.

---

## SEO

- **Metadata completa** via Next.js `Metadata` API (`app/layout.tsx`)
- **JSON-LD** estruturado: Organization, WebSite, Service, FAQPage
- **Sitemap** automático via `app/sitemap.ts`
- **robots:** index + follow para Googlebot
- **OpenGraph + Twitter Card** configurados

---

## Deploy Local

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

---

## Histórico de configurações relevantes

| Data | Ação |
|------|------|
| 17/03/2026 | GTM publicado (Versão 2) com 10 tags |
| 17/03/2026 | GA4 — Google Signals ativado, retenção 14 meses |
| 17/03/2026 | Search Console verificado + sitemap enviado |
| 17/03/2026 | Clarity conectado ao GA4 |
| 17/03/2026 | Acessibilidade: ARIA roles, focus-visible, contraste WCAG AA |
| 17/03/2026 | Performance mobile: grain animation desativado, prefers-reduced-motion |
