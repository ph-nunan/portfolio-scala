"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const cases = [
  {
    quote: "Paulo implementou um fluxo de qualificação de leads que transformou a operação. Em menos de uma semana, nossos leads estavam sendo respondidos em segundos — algo que antes levava horas.",
    author: "Felipe M.",
    role: "Gestor de Tráfego",
    metric: "< 5s resposta ao lead",
    tag: "Atendimento IA",
  },
  {
    quote: "A automação de relatórios foi um divisor de águas. Meus clientes recebem o relatório da semana automaticamente no WhatsApp toda segunda-feira. Nunca mais precisei montar planilha.",
    author: "Carla S.",
    role: "Dona de Agência",
    metric: "8h economizadas/cliente/mês",
    tag: "Relatórios Automáticos",
  },
  {
    quote: "O CRM nunca foi tão organizado. Cada lead que entra já está categorizado, com histórico completo e próxima ação sugerida pela IA. Minha equipe de vendas só foca em fechar.",
    author: "Rodrigo T.",
    role: "Diretor Comercial",
    metric: "40h/mês recuperadas",
    tag: "CRM Automatizado",
  },
]

export default function Cases() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="s-wrap">
      <div className="s-inner">
        <motion.div
          className="s-head"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="s-label">Resultados Reais</p>
          <h2 className="s-title">O que dizem quem já automatizou</h2>
          <p className="s-sub">
            Gestores e agências que implementaram o ecossistema e pararam de perder leads.
          </p>
        </motion.div>

        <div className="g-3">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.55, delay: 0.08 + i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Quote */}
              <p style={{
                fontSize: "0.9rem",
                color: "rgba(245,245,245,0.8)",
                lineHeight: 1.75,
                flex: 1,
                fontStyle: "italic",
              }}>
                "{c.quote}"
              </p>

              {/* Metric highlight */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                background: "var(--accent-dim)",
                border: "1px solid var(--accent-border)",
                borderRadius: "100px",
                alignSelf: "flex-start",
              }}>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6875rem", color: "var(--accent)", fontWeight: 600 }}>
                  {c.metric}
                </span>
              </div>

              {/* Author */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f5f5f5", marginBottom: "2px" }}>
                    {c.author}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>
                    {c.role}
                  </p>
                </div>
                <span style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.5rem",
                  color: "var(--text-3)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "3px 8px",
                  borderRadius: "100px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}>
                  {c.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
