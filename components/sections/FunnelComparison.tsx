"use client"

import { motion, useInView, animate } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const stages = [
  { label: "Leads captados",      without: 100, with: 100 },
  { label: "Atendidos em 5 min",  without: 22,  with: 95  },
  { label: "Qualificados",        without: 7,   with: 40  },
  { label: "Fechamentos",         without: 3,   with: 14  },
]

function CountUp({ to, inView, delay }: { to: number; inView: boolean; delay: number }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.5, delay, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) })
    return c.stop
  }, [inView, to, delay])
  return <>{val}</>
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

        {/* Main visualization card */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {/* Card header — window chrome */}
          <div style={{
            padding: "14px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255,255,255,0.015)",
          }}>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,95,87,0.6)", display: "block" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,189,46,0.4)", display: "block" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(40,200,64,0.4)", display: "block" }} />
            </div>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6875rem", color: "var(--text-3)", letterSpacing: "0.04em" }}>
              funnel-analysis · 100 leads
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", display: "block", animation: "pulse 1.5s ease-in-out infinite" }} />
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.625rem", color: "var(--text-3)", letterSpacing: "0.08em" }}>LIVE</span>
            </div>
          </div>

          {/* Column labels */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 148px 1fr",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            <div style={{ padding: "12px 24px", textAlign: "right" }}>
              <span style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.625rem",
                color: "rgba(248,113,113,0.7)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}>
                ← Sem Automação
              </span>
            </div>
            <div style={{
              padding: "12px 0",
              textAlign: "center",
              borderLeft: "1px solid rgba(255,255,255,0.04)",
              borderRight: "1px solid rgba(255,255,255,0.04)",
            }} />
            <div style={{ padding: "12px 24px" }}>
              <span style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.625rem",
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}>
                Com Automação →
              </span>
            </div>
          </div>

          {/* Data rows */}
          {stages.map((stage, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 148px 1fr",
                borderBottom: i < stages.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
            >
              {/* Left — Sem automação */}
              <div style={{ padding: "20px 16px 20px 24px", display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "rgba(248,113,113,0.85)",
                  minWidth: "36px",
                  textAlign: "right",
                  letterSpacing: "-0.02em",
                }}>
                  <CountUp to={stage.without} inView={inView} delay={0.3 + i * 0.1} />
                </span>
                {/* Bar track — right-aligned so bar grows from center outward left */}
                <div style={{ flex: 1, height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "100px", overflow: "hidden", display: "flex", justifyContent: "flex-end" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${stage.without}%` } : { width: 0 }}
                    transition={{ duration: 1.3, delay: 0.4 + i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                    style={{
                      height: "100%",
                      background: i === 0
                        ? "rgba(248,113,113,0.5)"
                        : "rgba(248,113,113,0.7)",
                      borderRadius: "100px",
                    }}
                  />
                </div>
              </div>

              {/* Center — stage label */}
              <div style={{
                padding: "20px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderLeft: "1px solid rgba(255,255,255,0.04)",
                borderRight: "1px solid rgba(255,255,255,0.04)",
              }}>
                <span style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.625rem",
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}>
                  {stage.label}
                </span>
              </div>

              {/* Right — Com automação */}
              <div style={{ padding: "20px 24px 20px 16px", display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Bar track — left-aligned, grows from center outward right */}
                <div style={{ flex: 1, height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "100px", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${stage.with}%` } : { width: 0 }}
                    transition={{ duration: 1.3, delay: 0.5 + i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                    style={{
                      height: "100%",
                      background: i === 0
                        ? "rgba(74,222,128,0.45)"
                        : "var(--accent)",
                      borderRadius: "100px",
                    }}
                  />
                </div>
                <span style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  minWidth: "36px",
                  letterSpacing: "-0.02em",
                }}>
                  <CountUp to={stage.with} inView={inView} delay={0.5 + i * 0.12} />
                </span>
              </div>
            </div>
          ))}

          {/* Result footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.0 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 148px 1fr",
              background: "rgba(255,255,255,0.015)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ padding: "16px 24px", textAlign: "right" }}>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "rgba(248,113,113,0.6)" }}>
                taxa de fechamento
              </span>
              <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "1.5rem", fontWeight: 700, color: "rgba(248,113,113,0.85)", lineHeight: 1.1, marginTop: "2px" }}>
                3%
              </div>
            </div>
            <div style={{
              padding: "16px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderLeft: "1px solid rgba(255,255,255,0.04)",
              borderRight: "1px solid rgba(255,255,255,0.04)",
              flexDirection: "column",
              gap: "2px",
            }}>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "1.25rem", fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.02em" }}>
                4.6×
              </span>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.5625rem", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                mais vendas
              </span>
            </div>
            <div style={{ padding: "16px 24px" }}>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "rgba(74,222,128,0.6)" }}>
                taxa de fechamento
              </span>
              <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "1.5rem", fontWeight: 700, color: "var(--accent)", lineHeight: 1.1, marginTop: "2px" }}>
                14%
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA below card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
          style={{ marginTop: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}
        >
          <p style={{ fontSize: "0.875rem", color: "var(--text-2)" }}>
            Mesmos leads. Mesmo tráfego.{" "}
            <span style={{ color: "var(--accent)", fontWeight: 500 }}>4.6× mais fechamentos.</span>
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
              transition: "opacity 0.2s",
              whiteSpace: "nowrap",
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
