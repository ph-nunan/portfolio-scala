"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const services = [
  {
    num: "01",
    icon: "◎",
    title: "Atendimento IA 24/7",
    impact: "Seu WhatsApp responde, qualifica e agenda reuniões — mesmo às 3h de um domingo.",
    delivers: [
      "Agente IA treinado com a base de conhecimento do seu negócio",
      "Respostas em linguagem natural, não parece robô",
      "Qualificação automática antes de passar ao humano",
      "Relatório semanal de atendimentos e conversões",
    ],
    price: "R$ 500",
  },
  {
    num: "02",
    icon: "⬡",
    title: "Qualificação de Leads",
    impact: "Pare de gastar tempo com quem nunca vai comprar.",
    delivers: [
      "Score 0–100 baseado em perfil e comportamento",
      "Segmentação automática: quente · morno · frio",
      "Roteamento para vendas ou nutrição automaticamente",
      "Dashboard de leads qualificados em tempo real",
    ],
    price: "R$ 350",
  },
  {
    num: "03",
    icon: "↺",
    title: "Follow-up com IA",
    impact: "Lead que esfriou não é lead perdido. É lead que ninguém fez follow-up.",
    delivers: [
      "Sequências automáticas com contexto da conversa",
      "Mensagens personalizadas por estágio do funil",
      "Detecção de interesse para acionar o vendedor",
      "Recupera 20–30% dos leads considerados mortos",
    ],
    price: "R$ 300",
  },
  {
    num: "04",
    icon: "⊞",
    title: "CRM Automatizado",
    impact: "Leads não somem mais. O CRM se alimenta sozinho, sem ninguém digitar nada.",
    delivers: [
      "Registro automático a cada nova conversa",
      "Pipeline atualizado a cada interação",
      "Histórico completo com tags e segmentação",
      "Próxima ação sugerida por IA",
    ],
    price: "R$ 300",
  },
  {
    num: "05",
    icon: "⊟",
    title: "Relatórios Inteligentes",
    impact: "Seus clientes recebem relatórios no WhatsApp. Automaticamente.",
    delivers: [
      "Dashboard em tempo real com métricas que importam",
      "PDF gerado e enviado automaticamente por semana",
      "Envio via WhatsApp ou e-mail sem intervenção",
      "Métricas de campanha, funil e atendimento",
    ],
    price: "R$ 250",
  },
  {
    num: "06",
    icon: "↗",
    title: "Automação de Ads",
    impact: "Pare de ajustar campanha manualmente. A IA faz isso mais rápido e melhor.",
    delivers: [
      "Regras automáticas de otimização de lances",
      "Alertas inteligentes de anomalia em CPL e ROAS",
      "Relatório de performance gerado automaticamente",
      "Integração com Google Ads e Meta Ads API",
    ],
    price: "R$ 500",
  },
]

const packages = [
  {
    name: "Starter",
    sub: "Visibilidade & Controle",
    includes: [
      "Relatórios Inteligentes",
      "CRM Automatizado",
    ],
    price: "A partir de R$ 450",
    cta: "Solicitar Diagnóstico",
    featured: false,
  },
  {
    name: "Pro",
    sub: "Conversão Inteligente",
    includes: [
      "Relatórios Inteligentes",
      "CRM Automatizado",
      "Atendimento IA 24/7",
      "Qualificação de Leads",
      "Follow-up com IA",
    ],
    price: "A partir de R$ 1.200",
    cta: "Solicitar Diagnóstico",
    featured: true,
  },
  {
    name: "Enterprise",
    sub: "Ecossistema Completo",
    includes: [
      "Tudo do pacote Pro",
      "Automação de Ads",
      "Consultoria estratégica",
      "SLA garantido",
    ],
    price: "Sob consulta",
    cta: "Falar com Especialista",
    featured: false,
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="services" ref={ref} className="s-wrap">
      <div className="s-inner">

        {/* ── HEADER ── */}
        <motion.div
          className="s-head"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="s-label">Serviços</p>
          <h2 className="s-title">Soluções Individuais</h2>
          <p className="s-sub">
            Contrate apenas o que você precisa. Cada serviço funciona de forma independente
            — ou combine em um pacote com desconto.
          </p>
        </motion.div>

        {/* ── BLOCK 1: 6 service cards ── */}
        <div className="g-3" style={{ marginBottom: "80px" }}>
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="card"
              style={{ display: "flex", flexDirection: "column" }}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.55, delay: 0.05 + i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {/* Top row: icon + num */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <span style={{ fontSize: "1.25rem", opacity: 0.45 }}>{s.icon}</span>
                <span style={{
                  fontFamily: "var(--font-geist-mono)", fontSize: "0.5rem",
                  color: "var(--text-3)", letterSpacing: "0.1em",
                }}>{s.num}</span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#f5f5f5", lineHeight: 1.4, marginBottom: "8px" }}>
                {s.title}
              </h3>

              {/* Impact phrase — Dor do cliente */}
              <p style={{
                fontSize: "0.8125rem", color: "var(--accent)", lineHeight: 1.55,
                marginBottom: "20px", fontStyle: "italic",
              }}>
                {s.impact}
              </p>

              {/* Deliverables */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, marginBottom: "20px" }}>
                {s.delivers.map((d, di) => (
                  <div key={di} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: "var(--accent)", fontSize: "0.55rem", marginTop: "3px", flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-2)", lineHeight: 1.5 }}>{d}</span>
                  </div>
                ))}
              </div>

              {/* Price + CTA */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "16px" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.625rem", color: "var(--text-3)" }}>
                    a partir de
                  </span>
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.9375rem", fontWeight: 700, color: "#f5f5f5" }}>
                    {s.price}
                  </span>
                </div>
                <p style={{ fontSize: "0.6875rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)", marginBottom: "14px", lineHeight: 1.5 }}>
                  Recorrência ajustada ao seu momento. Implementação inclusa.
                </p>
                <a
                  href="#contact"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "9px 16px", borderRadius: "8px", fontSize: "0.8125rem",
                    fontWeight: 600, textDecoration: "none", transition: "all 0.2s",
                    border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-2)",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-border)"
                    e.currentTarget.style.color = "var(--accent)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
                    e.currentTarget.style.color = "var(--text-2)"
                  }}
                >
                  Quero este serviço →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── BLOCK 2: Packages ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div style={{ marginBottom: "40px" }}>
            <p className="s-label">Pacotes</p>
            <h3 style={{
              fontSize: "1.625rem", fontWeight: 700, color: "#f5f5f5",
              letterSpacing: "-0.03em", marginBottom: "8px",
            }}>
              Combine Serviços. Pague Menos.
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-2)" }}>
              Pacotes pensados para cada fase do seu crescimento.
            </p>
          </div>

          <div className="pkg-grid">
            {packages.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                style={{
                  background: p.featured ? "var(--surface)" : "transparent",
                  border: `1px solid ${p.featured ? "var(--accent-border)" : "var(--border)"}`,
                  borderRadius: "16px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  ...(p.featured && { boxShadow: "0 0 48px rgba(74,222,128,0.06)" }),
                }}
              >
                {/* Badge Recomendado */}
                {p.featured && (
                  <div style={{
                    position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)",
                    background: "var(--accent)", color: "#0a0a0a",
                    fontFamily: "var(--font-geist-mono)", fontSize: "0.5625rem",
                    fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "4px 16px", borderRadius: "100px", whiteSpace: "nowrap",
                  }}>
                    Recomendado
                  </div>
                )}

                {/* Name + subtitle */}
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.02em", marginBottom: "4px" }}>
                    {p.name}
                  </h4>
                  <p style={{
                    fontFamily: "var(--font-geist-mono)", fontSize: "0.6875rem",
                    color: p.featured ? "var(--accent)" : "var(--text-3)",
                    letterSpacing: "0.04em",
                  }}>
                    {p.sub}
                  </p>
                </div>

                {/* Includes list */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1, marginBottom: "28px" }}>
                  {p.includes.map((item, ii) => (
                    <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <span style={{
                        width: "16px", height: "16px", borderRadius: "50%", flexShrink: 0,
                        background: p.featured ? "var(--accent-dim)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${p.featured ? "var(--accent-border)" : "rgba(255,255,255,0.06)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.45rem", color: p.featured ? "var(--accent)" : "var(--text-3)",
                        marginTop: "1px",
                      }}>✓</span>
                      <span style={{ fontSize: "0.875rem", color: "rgba(245,245,245,0.8)", lineHeight: 1.5 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "20px", marginBottom: "16px" }}>
                  <p style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: p.price === "Sob consulta" ? "0.9375rem" : "1.125rem",
                    fontWeight: 700,
                    color: p.featured ? "var(--accent)" : "#f5f5f5",
                    letterSpacing: "-0.01em",
                  }}>
                    {p.price}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "11px 20px", borderRadius: "8px", fontSize: "0.875rem",
                    fontWeight: 600, textDecoration: "none", transition: "all 0.2s",
                    background: p.featured ? "var(--accent)" : "transparent",
                    color: p.featured ? "#0a0a0a" : "var(--text-2)",
                    border: p.featured ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    if (p.featured) {
                      e.currentTarget.style.opacity = "0.88"
                    } else {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"
                      e.currentTarget.style.color = "#f5f5f5"
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1"
                    if (!p.featured) {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
                      e.currentTarget.style.color = "var(--text-2)"
                    }
                  }}
                >
                  {p.cta} →
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── SCARCITY: Vagas do mês ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.05 }}
          style={{
            marginTop: "32px",
            padding: "20px 28px",
            background: "var(--accent-dim)",
            border: "1px solid var(--accent-border)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "var(--accent)", flexShrink: 0,
              animation: "pulse 2s ease-in-out infinite",
            }} />
            <div>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f5f5f5", marginBottom: "2px" }}>
                Março 2026 — 3 vagas disponíveis
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-2)" }}>
                Atendo no máximo 5 novos clientes por mês para garantir qualidade na implementação.
              </p>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: "4px" }}>
              {[1,2,3,4,5].map((slot) => (
                <div key={slot} style={{
                  width: "28px", height: "6px", borderRadius: "3px",
                  background: slot <= 2 ? "var(--accent)" : "rgba(74,222,128,0.18)",
                  border: slot <= 2 ? "none" : "1px solid var(--accent-border)",
                }} />
              ))}
            </div>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.5625rem", color: "var(--accent)", letterSpacing: "0.08em" }}>
              3/5
            </span>
          </div>
        </motion.div>

        {/* ── BLOCK 3: CTA Final ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
          style={{
            marginTop: "48px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "56px 40px",
            textAlign: "center",
          }}
        >
          <p className="s-label" style={{ marginBottom: "16px" }}>Não sabe por onde começar?</p>
          <h3 style={{
            fontSize: "1.625rem", fontWeight: 700, color: "#f5f5f5",
            letterSpacing: "-0.03em", marginBottom: "12px", lineHeight: 1.2,
          }}>
            Diagnóstico Gratuito em 15 Minutos
          </h3>
          <p style={{
            fontSize: "0.9375rem", color: "var(--text-2)", lineHeight: 1.75,
            maxWidth: "520px", margin: "0 auto 32px",
          }}>
            Analisamos como seu atendimento funciona hoje e mostramos exatamente onde
            você está perdendo clientes. Sem compromisso. Sem pegadinha. Só dados.
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "13px 32px", background: "var(--accent)", color: "#0a0a0a",
              borderRadius: "8px", fontWeight: 600, fontSize: "0.9375rem",
              textDecoration: "none", transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Agendar Diagnóstico Gratuito →
          </a>
        </motion.div>

      </div>
    </section>
  )
}
