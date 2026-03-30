# Versões do Site — Scala Automate

## Como restaurar uma versão anterior

```bash
# Ver todas as versões disponíveis
git tag -l

# Restaurar localmente para inspecionar (sem alterar main)
git checkout v1

# Voltar para a versão atual
git checkout main

# Restaurar uma versão como branch para editar
git checkout -b hotfix/v1-base v1
```

---

## v1 — Site Original (cold traffic)

**Tag git:** `v1`
**Commit:** `63745dc`
**Data:** 2026-03-30 (início do dia)
**Deploy:** https://portfolio-scala.vercel.app (estado anterior ao redesign)

### Estrutura (19 seções)
Hero → SocialProof → PatternInterrupt → Problem → FunnelComparison → MidCTA → HowItWorks → Services → ForWhom → Comparison → Results → Cases → Testimonials → FuturePacing → KPIs → TechStack → Founder → FAQ → Contact

### Características técnicas
- Lighthouse mobile: Score 75 | LCP 4.5s | TBT 300ms | CLS 0.001
- Framer Motion no FloatingCTA (causava INP 840ms)
- LiveTicker no Problem.tsx (setInterval ativo)
- HeroLiveFeed com AnimatePresence no bundle inicial
- Scroll thresholds: 25/50/75/90/100%
- JSON-LD: preços incorretos (R$450 e R$1.200)

### Estratégia de tráfego
- Campanha Meta: LPV (Landing Page Views)
- Público: cold — tráfego direto do anúncio para o site
- Taxa de conversão real: 0% (12 cliques = testes do Paulo)

---

## v2 — Redesign para Lead Quente + CTWA

**Tag git:** `v2`
**Commit:** (ver abaixo)
**Data:** 2026-03-30
**Deploy:** https://portfolio-scala.vercel.app

### Estrutura (8 seções)
Hero → SocialProof → Problem → FunnelComparison → HowItWorks → Testimonials → Founder → Contact

### O que mudou
- **Estratégia:** Pivot de LPV para CTWA (Click to WhatsApp Ads). Site vira documento de credibilidade pré-reunião enviado pela Ana após qualificação — não mais converter cold traffic.
- **Hero:** H1 "Você gera leads." / H2 "Ninguém responde a tempo." — nomeia a dor em 5 palavras. Stats card hidden on mobile. Badge público-alvo.
- **HeroCTAs:** Detecção in-app browser Instagram (WebView), fbq Lead event em todos os cliques WA.
- **SocialProof:** Métricas revisadas — "4.6× mais fechamentos", "30 dias garantia", "R$0 custo de equipe".
- **Problem:** Reduzido de 4 → 2 itens críticos. LiveTicker removido. Bridge CTA adicionado.
- **HowItWorks:** Mockups ocultos no mobile.
- **Testimonials:** Reescrita com result badge + cargo + cidade.
- **Contact:** Copy warm-lead ("Confirme seu diagnóstico gratuito"). Vagas 2→3.
- **Analytics:** Scroll thresholds 5/10/15/20/50/75/100%. Observer threshold 0.2.
- **FloatingCTA:** Framer Motion removido → CSS transitions (fix INP 840ms).
- **layout.tsx:** JSON-LD corrigido — R$1.500 setup + R$400/mês.
- **Navbar:** Links atualizados para seções existentes.
- **fbq pixel:** Disparando em todos os 6 pontos de CTA.
- **HeroLiveFeed:** Convertido para CSS — removido do bundle inicial (fix TBT).
- **IDs duplicados:** Corrigidos em Contact, HowItWorks, Founder.
- **Arquivos órfãos:** 12 seções removidas deletadas.

### Ana (agente WhatsApp)
- Upgrade planejado: GPT-4o-mini → Claude Sonnet 4.6
- Framework: SPIN Selling (Situation, Problem, Implication, Need-payoff)
- Papel: qualificação de leads → envia link do site → fecha reunião de diagnóstico

---

## Próximas versões planejadas

| Versão | O que será | Gatilho |
|--------|-----------|---------|
| v3 | Upgrade Ana para Claude Sonnet 4.6 + SPIN Selling | Após v2 validada com tráfego real |
| v4 | Fase 2 Meta Ads — OFFSITE_CONVERSIONS (pixel 50+ Lead/semana) | Após acumular conversões suficientes |
