# Guia de Configuração — GTM + GA4 + Meta Pixel + Clarity
**Tempo estimado:** 3–4 horas para configuração completa
**Custo total:** R$ 0 (todas as ferramentas são gratuitas)

---

## Índice
1. [Contas a criar (pré-requisitos)](#1-contas-a-criar)
2. [Google Tag Manager — container e snippet](#2-google-tag-manager)
3. [Google Analytics 4 — instalação e configuração](#3-google-analytics-4)
4. [Evento principal: wa_button_click (conversão WhatsApp)](#4-evento-wa_button_click)
5. [Scroll Depth 25/50/75%](#5-scroll-depth)
6. [Section View — qual seção o visitante viu](#6-section-view)
7. [Time on Page — 30s / 60s / 120s](#7-time-on-page)
8. [Meta Pixel — Facebook/Instagram Ads](#8-meta-pixel)
9. [Microsoft Clarity — heatmaps e gravações](#9-microsoft-clarity)
10. [Google Search Console](#10-google-search-console)
11. [Adicionar GTM_ID no Vercel](#11-vercel-env-var)
12. [Checklist final de verificação](#12-checklist)

---

## 1. Contas a Criar

Crie todas as contas antes de configurar o GTM. Anote os IDs de cada uma.

| Ferramenta | Link | ID que você vai receber |
|---|---|---|
| Google Tag Manager | tagmanager.google.com | `GTM-XXXXXXX` |
| Google Analytics 4 | analytics.google.com | `G-XXXXXXXXXX` |
| Google Search Console | search.google.com/search-console | — |
| Meta Events Manager | business.facebook.com/events_manager | `XXXXXXXXXXXXXXXX` |
| Microsoft Clarity | clarity.microsoft.com | `XXXXXXXXXX` (10 chars) |

**Dica:** Use a mesma conta Google (ph.nunan@gmail.com) para GTM, GA4 e Search Console.

---

## 2. Google Tag Manager

### Criar container
1. Acesse [tagmanager.google.com](https://tagmanager.google.com)
2. Crie uma conta com nome **"Scala"**
3. Crie um container: tipo **Web**, nome do domínio: `portfolio-scala.vercel.app`
4. Anote o ID do container: **GTM-XXXXXXX**

### Instalar no site (automatizado)
O snippet do GTM já está integrado no código via variável de ambiente.
**Você só precisa adicionar o ID no Vercel** → [Passo 11](#11-vercel-env-var).

---

## 3. Google Analytics 4

### Criar propriedade GA4
1. Acesse [analytics.google.com](https://analytics.google.com)
2. Crie conta: **"Scala"**
3. Crie propriedade: nome do site, fuso **Brasília (GMT-3)**, moeda **Real Brasileiro (BRL)**
4. Crie um data stream Web → anote o **Measurement ID**: `G-XXXXXXXXXX`

### Configurações obrigatórias após criar
- **Data Retention:** Admin → Data Settings → Data Retention → **14 meses**
- **Google Signals:** Admin → Data Settings → Data Collection → ativar
- **Enhanced Measurement:** Admin → Data Streams → Web → ativar tudo

### Tag no GTM

**Tag 1 — GA4 Configuration (instala o GA4):**
```
Tipo: Google Tag
Nome: GA4 — Configuration
Tag ID: G-XXXXXXXXXX  ← seu Measurement ID
Trigger: All Pages
```

---

## 4. Evento wa_button_click

Este é o evento mais importante — toda conversão (clique no botão WhatsApp) será rastreada aqui.

### Variável (criar primeiro)
```
Nome: Click URL
Tipo: Auto-Event Variable
Variable Type: Click URL
```

### Trigger
```
Nome: WhatsApp Button Click
Tipo: Click — Just Links
Fires on: Some Link Clicks
Condição: Click URL → contém → wa.me
```

### Tag GA4
```
Nome: GA4 — WhatsApp Click
Tipo: Google Analytics: GA4 Event
Measurement ID: G-XXXXXXXXXX
Event Name: wa_button_click
Event Parameters:
  link_url    → {{Click URL}}
  link_text   → {{Click Text}}
  page_location → {{Page URL}}
Trigger: WhatsApp Button Click
```

### Marcar como conversão
Após publicar e receber os primeiros eventos:
GA4 → Admin → Events → encontre `wa_button_click` → ative o toggle **"Mark as key event"**

---

## 5. Scroll Depth

### Trigger
```
Nome: Scroll Depth 25/50/75
Tipo: Scroll Depth
Scroll Depth Type: Vertical Scroll Depths
Percentages: 25, 50, 75
Fires on: All Pages
```

### Variável (criar)
```
Nome: Scroll Depth Threshold
Tipo: Auto-Event Variable
Variable Type: Scroll Depth Threshold
```

### Tag GA4
```
Nome: GA4 — Scroll Depth
Tipo: Google Analytics: GA4 Event
Event Name: scroll_depth
Event Parameters:
  percent_scrolled → {{Scroll Depth Threshold}}
  page_location    → {{Page URL}}
Trigger: Scroll Depth 25/50/75
```

---

## 6. Section View

Detecta qual seção do site o visitante realmente viu (Intersection Observer).

### Tag — Custom HTML (observador)
```
Nome: Section Observer (Custom HTML)
Tipo: Custom HTML
Código:
```

```html
<script>
(function() {
  var sections = document.querySelectorAll('[data-section]');
  if (!sections.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var sectionName = entry.target.dataset.section || entry.target.id || 'unknown';
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'section_view',
          'section_name': sectionName
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function(section) {
    observer.observe(section);
  });
})();
</script>
```

```
Trigger: Window Loaded (All Pages)
```

### Variável Data Layer
```
Nome: DL — section_name
Tipo: Data Layer Variable
Data Layer Variable Name: section_name
```

### Trigger para evento GA4
```
Nome: Section View Event
Tipo: Custom Event
Event Name: section_view
```

### Tag GA4
```
Nome: GA4 — Section View
Tipo: Google Analytics: GA4 Event
Event Name: section_view
Event Parameters:
  section_name → {{DL — section_name}}
  page_location → {{Page URL}}
Trigger: Section View Event
```

---

## 7. Time on Page

### Tag — Custom HTML (timer)
```
Nome: Time on Page Tracker (Custom HTML)
Tipo: Custom HTML
Código:
```

```html
<script>
(function() {
  var thresholds = [30, 60, 120];
  var fired = {};

  thresholds.forEach(function(seconds) {
    setTimeout(function() {
      if (!fired[seconds]) {
        fired[seconds] = true;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'time_on_page',
          'time_seconds': seconds
        });
      }
    }, seconds * 1000);
  });
})();
</script>
```

```
Trigger: All Pages (Page View)
```

### Variável Data Layer
```
Nome: DL — time_seconds
Tipo: Data Layer Variable
Data Layer Variable Name: time_seconds
```

### Trigger para evento GA4
```
Nome: Time on Page Event
Tipo: Custom Event
Event Name: time_on_page
```

### Tag GA4
```
Nome: GA4 — Time on Page
Tipo: Google Analytics: GA4 Event
Event Name: engaged_time
Event Parameters:
  time_seconds  → {{DL — time_seconds}}
  page_location → {{Page URL}}
Trigger: Time on Page Event
```

---

## 8. Meta Pixel

### Criar pixel
1. Acesse [Meta Events Manager](https://business.facebook.com/events_manager)
2. Crie um novo Pixel → anote o ID: `XXXXXXXXXXXXXXXX`

### Tag 1 — Pixel Base Code
```
Nome: Meta Pixel — Base Code
Tipo: Custom HTML
Trigger: All Pages
Código:
```

```html
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'XXXXXXXXXXXXXXXX');
fbq('track', 'PageView');
</script>
<noscript>
<img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=XXXXXXXXXXXXXXXX&ev=PageView&noscript=1"/>
</noscript>
```

> Substitua `XXXXXXXXXXXXXXXX` pelo seu Pixel ID real.

### Tag 2 — Lead Event (conversão WhatsApp)
```
Nome: Meta Pixel — Lead (WhatsApp Click)
Tipo: Custom HTML
Trigger: WhatsApp Button Click  ← o mesmo trigger do passo 4
Código:
```

```html
<script>
fbq('track', 'Lead', {
  content_name: 'WhatsApp Diagnostico',
  content_category: 'Conversion'
});
</script>
```

---

## 9. Microsoft Clarity

### Criar projeto
1. Acesse [clarity.microsoft.com](https://clarity.microsoft.com)
2. Login com conta Microsoft
3. Crie projeto: nome **"Scala"**, URL: `portfolio-scala.vercel.app`
4. Anote o **Project ID**: `XXXXXXXXXX` (10 caracteres)

### Tag no GTM
```
Nome: Microsoft Clarity
Tipo: Custom HTML
Trigger: All Pages
Código:
```

```html
<script type="text/javascript">
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "XXXXXXXXXX");
</script>
```

> Substitua `XXXXXXXXXX` pelo seu Project ID real.

### Integrar Clarity com GA4
No painel do Clarity → Settings → **Google Analytics Integration** → conectar propriedade GA4.

---

## 10. Google Search Console

1. Acesse [search.google.com/search-console](https://search.google.com/search-console)
2. Adicione propriedade: tipo **Domínio** → `portfolio-scala.vercel.app`
3. Verifique via tag HTML (ou crie uma tag Custom HTML no GTM com o snippet de verificação)
4. Após verificar: Sitemaps → submeter `https://portfolio-scala.vercel.app/sitemap.xml`
5. URL Inspection → solicitar indexação da URL principal
6. Conectar ao GA4: GA4 → Admin → Product Links → Search Console Links

---

## 11. Vercel Env Var

Após obter o ID do GTM, adicione no Vercel:

1. Acesse [vercel.com](https://vercel.com) → projeto `portfolio-scala`
2. Settings → **Environment Variables**
3. Adicione:
   ```
   Nome:  NEXT_PUBLIC_GTM_ID
   Valor: GTM-XXXXXXX   ← seu ID real
   Environments: Production, Preview, Development
   ```
4. Clique **Save**
5. Faça um novo deploy (ou aguarde o próximo push para main)

> O código já está preparado para receber esta variável. Assim que configurar, o GTM será ativado automaticamente em produção.

---

## 12. Checklist Final

### Ferramentas
- [ ] Conta GTM criada + ID anotado (`GTM-XXXXXXX`)
- [ ] Conta GA4 criada + Measurement ID anotado (`G-XXXXXXXXXX`)
- [ ] Google Signals ativado no GA4
- [ ] Data Retention alterado para 14 meses no GA4
- [ ] Enhanced Measurement ativado
- [ ] Search Console verificado + sitemap submetido
- [ ] GA4 conectado ao Search Console
- [ ] Meta Pixel criado + ID anotado
- [ ] Microsoft Clarity criado + Project ID anotado
- [ ] Clarity integrado com GA4

### Tags no GTM (10 tags no total)
- [ ] GA4 Configuration (All Pages)
- [ ] GA4 — WhatsApp Click (Trigger: wa.me)
- [ ] GA4 — Scroll Depth (25/50/75%)
- [ ] GA4 — Section View (Custom Event)
- [ ] GA4 — Time on Page (Custom Event)
- [ ] Meta Pixel — Base Code (All Pages)
- [ ] Meta Pixel — Lead (Trigger: wa.me)
- [ ] Microsoft Clarity (All Pages)
- [ ] Section Observer — Custom HTML (Window Loaded)
- [ ] Time Tracker — Custom HTML (All Pages)

### Conversão
- [ ] `wa_button_click` marcado como Key Event no GA4
- [ ] Variável `Click URL` criada no GTM
- [ ] Trigger `WhatsApp Button Click` criado

### Vercel
- [ ] `NEXT_PUBLIC_GTM_ID` adicionado nas env vars
- [ ] Deploy feito após adicionar a env var
- [ ] Verificar no console do Chrome que o GTM está disparando (Tag Assistant Extension)

### Pós-configuração (verificação)
- [ ] Abrir site + Tag Assistant Chrome Extension → confirmar GTM verde
- [ ] Clicar em um botão WhatsApp → verificar evento `wa_button_click` no GA4 Realtime
- [ ] Rolar a página → verificar evento `scroll_depth` no GA4 Realtime
- [ ] Clarity → verificar se gravação de sessão apareceu

---

## Resumo: O Que Você Vai Rastrear

```
Visita ao site
  ↓ [taxa de engajamento — GA4]
Scroll 25% → 50% → 75%
  ↓ [qual seção prendeu atenção — section_view]
Visualização da seção "contact"
  ↓ [taxa de conversão do CTA]
Clique no botão WhatsApp → wa_button_click (CONVERSÃO)
  ↓ [análise visual — Clarity heatmap + gravação]
Comportamento de rage clicks e dead clicks detectados
```

**Funil completo visível em:** GA4 → Explore → Funnel Exploration
