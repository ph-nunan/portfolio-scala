"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const steps = [
  {
    num: "01",
    icon: "↗",
    title: "Tráfego Pago",
    desc: "Automação de campanhas Google Ads e Meta Ads via API. IA analisa performance em tempo real, otimiza lances e escala o que funciona.",
    colClass: "eco-span3",
  },
  {
    num: "02",
    icon: "◎",
    title: "Captação",
    desc: "Lead entra no ecossistema automaticamente ao interagir com o anúncio.",
    colClass: "eco-span3",
  },
  {
    num: "03",
    icon: "◈",
    title: "Qualificação",
    desc: "IA classifica e prioriza leads quentes com base em perfil e comportamento.",
    colClass: "eco-span3",
  },
  {
    num: "04",
    icon: "◉",
    title: "Atendimento",
    desc: "Resposta em segundos, 24 horas por dia, sem intervenção humana.",
    colClass: "eco-span3",
  },
  {
    num: "05",
    icon: "↺",
    title: "Follow-up",
    desc: "Sequências humanizadas com contexto real de cada conversa.",
    colClass: "eco-r2-1",
  },
  {
    num: "06",
    icon: "✦",
    title: "Fechamento",
    desc: "Time de vendas foca apenas em quem está pronto para comprar.",
    colClass: "eco-r2-2",
  },
  {
    num: "07",
    icon: "≡",
    title: "Pós-fechamento",
    desc: "Relatórios personalizados gerados automaticamente das campanhas e enviados pelo WhatsApp do cliente.",
    colClass: "eco-r2-3",
  },
]

function EcoCard({ step, i, inView }: { step: typeof steps[0]; i: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={step.colClass}
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: 0.05 + i * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--accent-dim)" : "var(--surface)",
        border: `1px solid ${hovered ? "var(--accent-border)" : "var(--border)"}`,
        borderRadius: "12px",
        padding: "20px",
        transition: "background 0.2s, border-color 0.2s",
        cursor: "default",
      }}
    >
      {/* Top row: step badge + icon */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <span style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.625rem",
          color: hovered ? "var(--accent)" : "var(--text-3)",
          background: hovered ? "var(--accent-dim)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${hovered ? "var(--accent-border)" : "rgba(255,255,255,0.06)"}`,
          padding: "2px 8px",
          borderRadius: "100px",
          transition: "all 0.2s",
          letterSpacing: "0.06em",
        }}>
          {step.num}
        </span>
        <span style={{
          fontSize: "1rem",
          color: hovered ? "var(--accent)" : "var(--text-3)",
          transition: "color 0.2s",
          lineHeight: 1,
        }}>
          {step.icon}
        </span>
      </div>

      <h3 style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#f5f5f5", marginBottom: "6px", lineHeight: 1.35 }}>
        {step.title}
      </h3>
      <p style={{ fontSize: "0.75rem", color: "var(--text-2)", lineHeight: 1.6 }}>
        {step.desc}
      </p>
    </motion.div>
  )
}

export default function Ecosystem() {
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
          <p className="s-label">Ecossistema</p>
          <h2 className="s-title">Seu Ecossistema de Vendas 100% Automatizado</h2>
          <p className="s-sub">
            Do clique no anúncio ao relatório pós-fechamento. Cada etapa conectada,
            inteligente e funcionando 24 horas por dia.
          </p>
        </motion.div>

        <div className="eco-grid">
          {/* Row 1: steps 01–04 */}
          {steps.slice(0, 4).map((step, i) => (
            <EcoCard key={i} step={step} i={i} inView={inView} />
          ))}

          {/* Row connector */}
          <motion.div
            className="eco-full"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: "10px", padding: "4px 0" }}
          >
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }} />
            <span style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.625rem",
              color: "var(--text-3)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "3px 12px",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "100px",
              whiteSpace: "nowrap",
            }}>
              fluxo contínuo ↓
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }} />
          </motion.div>

          {/* Row 2: steps 05–07 (centered) */}
          {steps.slice(4).map((step, i) => (
            <EcoCard key={i + 4} step={step} i={i + 4} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
