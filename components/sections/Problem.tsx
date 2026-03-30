"use client"

import { motion, useInView, animate } from "framer-motion"
import { useRef, useState, useEffect } from "react"

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) })
    return c.stop
  }, [inView, to])
  return <span ref={ref}>{val}{suffix}</span>
}

function Bar({ pct, delay = 0, inView }: { pct: number; delay?: number; inView: boolean }) {
  return (
    <div style={{ height: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden", margin: "20px 0" }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ duration: 1.4, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ height: "100%", background: "linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,0.5))", borderRadius: "2px" }}
      />
    </div>
  )
}

const items = [
  {
    stat: 78,
    suffix: "%",
    barPct: 78,
    title: "dos leads não recebem resposta nos primeiros 5 minutos",
    body: "Esse é o intervalo crítico. Depois de 5 min, a chance de contato cai 21×. Enquanto você está em outra reunião, o lead já fechou com o concorrente.",
  },
  {
    stat: 35,
    suffix: "%",
    barPct: 35,
    title: "das vendas são perdidas por falta de follow-up",
    body: "O lead demonstrou interesse, mas ninguém fez o acompanhamento. Sem um sistema automático, essa venda morre no silêncio — toda semana.",
  },
]

export default function Problem() {
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
          <p className="s-label">O Problema</p>
          <h2 className="s-title">O tráfego chega.<br /><span className="mark">O atendimento falha.</span></h2>
          <p className="s-sub">Não é o criativo. Não é o budget. É o que acontece depois do clique.</p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="problem-row"
              style={{
                padding: "32px 0",
                borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <div className="problem-stat">
                <div style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "clamp(3.5rem, 6vw, 5rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, #ffffff 0%, #b0b0b0 50%, #e0e0e0 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  <Counter to={item.stat} suffix={item.suffix} />
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#f5f5f5", lineHeight: 1.4, marginBottom: "4px" }}>
                  {item.title}
                </h3>
                <Bar pct={item.barPct} delay={0.4 + i * 0.15} inView={inView} />
                <p style={{ fontSize: "0.875rem", color: "var(--text-2)", lineHeight: 1.7 }}>
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bridge to solution */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: "40px",
            padding: "24px 28px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "12px",
            borderLeft: "3px solid rgba(255,255,255,0.15)",
          }}
        >
          <p style={{ fontSize: "1rem", fontWeight: 600, color: "#f5f5f5", marginBottom: "8px", lineHeight: 1.4 }}>
            A Scala implementa o sistema que resolve os dois em menos de 7 dias.
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-2)", lineHeight: 1.7 }}>
            Resposta automática em segundos via WhatsApp, qualificação inteligente e follow-up programado —{" "}
            <strong style={{ color: "rgba(245,245,245,0.7)" }}>sem você mover um dedo.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
