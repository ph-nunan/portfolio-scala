"use client"

import { motion, useInView, animate } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const stages = [
  { label: "Leads captados",       without: 100, with: 100 },
  { label: "Atendidos em 5 min",   without: 22,  with: 95  },
  { label: "Qualificados",         without: 7,   with: 40  },
  { label: "Fechamentos",          without: 3,   with: 14  },
]

function CountUp({ to, inView, delay }: { to: number; inView: boolean; delay: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.4, delay, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) })
    return c.stop
  }, [inView, to, delay])
  return <span ref={ref}>{val}</span>
}

function FunnelPanel({
  title,
  field,
  accentColor,
  dimColor,
  borderColor,
  inView,
  delayBase,
}: {
  title: string
  field: "without" | "with"
  accentColor: string
  dimColor: string
  borderColor: string
  inView: boolean
  delayBase: number
}) {
  return (
    <div style={{
      background: "var(--surface)",
      border: `1px solid ${borderColor}`,
      borderRadius: "16px",
      padding: "28px",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <span style={{
          display: "inline-block",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.625rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: accentColor,
          background: dimColor,
          border: `1px solid ${borderColor}`,
          padding: "4px 12px",
          borderRadius: "100px",
        }}>
          {title}
        </span>
      </div>

      {/* Stages */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}>
        {stages.map((stage, i) => {
          const value = stage[field]
          const pct = value // value is already a % of 100

          return (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)" }}>
                  {stage.label}
                </span>
                <span style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: accentColor,
                  fontFamily: "var(--font-geist-mono)",
                  letterSpacing: "-0.02em",
                }}>
                  <CountUp to={value} inView={inView} delay={delayBase + i * 0.15} />
                </span>
              </div>

              {/* Bar track */}
              <div style={{ height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "100px", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${pct}%` } : { width: 0 }}
                  transition={{ duration: 1.3, delay: delayBase + i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                  style={{ height: "100%", background: accentColor, borderRadius: "100px" }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom result */}
      <div style={{ marginTop: "28px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <span style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>
          Taxa de fechamento:
        </span>
        <span style={{
          display: "block",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "1.75rem",
          fontWeight: 700,
          color: accentColor,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginTop: "4px",
        }}>
          {field === "without" ? "3%" : "14%"}
        </span>
      </div>
    </div>
  )
}

export default function FunnelComparison() {
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
          <p className="s-label">Impacto Real</p>
          <h2 className="s-title">O que acontece com seus 100 leads</h2>
          <p className="s-sub">
            A diferença entre uma operação manual e um ecossistema automatizado —
            nos mesmos leads, com o mesmo investimento em tráfego.
          </p>
        </motion.div>

        {/* Funnel panels */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="g-2"
        >
          <FunnelPanel
            title="Sem Automação"
            field="without"
            accentColor="rgba(248, 113, 113, 0.9)"
            dimColor="rgba(248, 113, 113, 0.06)"
            borderColor="rgba(248, 113, 113, 0.2)"
            inView={inView}
            delayBase={0.2}
          />
          <FunnelPanel
            title="Com Automação Scala"
            field="with"
            accentColor="var(--accent)"
            dimColor="var(--accent-dim)"
            borderColor="var(--accent-border)"
            inView={inView}
            delayBase={0.35}
          />
        </motion.div>

        {/* Multiplier callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{
            marginTop: "16px",
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
          <p style={{ fontSize: "0.9rem", color: "rgba(245,245,245,0.8)", lineHeight: 1.5 }}>
            Com os <strong style={{ color: "#f5f5f5" }}>mesmos 100 leads</strong> e o mesmo investimento em tráfego,
            a automação gera{" "}
            <strong style={{ color: "var(--accent)" }}>4.6× mais fechamentos.</strong>
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              background: "var(--accent)",
              color: "#0a0a0a",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.8125rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "opacity 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Quero esses números →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
