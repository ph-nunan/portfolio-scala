"use client"

import { motion, useInView, animate } from "framer-motion"
import { useRef, useState, useEffect } from "react"

// Animated count-up number
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

// Animated fill bar
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

// Live cost ticker
function LiveTicker({ inView }: { inView: boolean }) {
  const [seconds, setSeconds] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!inView || started) return
    setStarted(true)
  }, [inView, started])

  useEffect(() => {
    if (!started) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [started])

  // avg company loses ~R$15.000/month = R$500/day = R$0.34/min ≈ R$0.0058/sec
  const perdaTotal = (seconds * 0.0058 * 15000) / 500
  const formatted = perdaTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.8 }}
      style={{
        marginTop: "56px",
        padding: "20px 28px",
        background: "var(--surface)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite", flexShrink: 0 }} />
        <span style={{ fontSize: "0.8125rem", color: "var(--text-2)", fontFamily: "var(--font-geist-mono)" }}>
          Enquanto você lê isso, você perdeu aproximadamente
        </span>
      </div>
      <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "1.25rem", fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.02em", minWidth: "160px", textAlign: "right" }}>
        {started ? formatted : "R$ 0,00"}
      </div>
    </motion.div>
  )
}

const items = [
  {
    stat: 78,
    suffix: "%",
    barPct: 78,
    title: "Leads sem resposta nos primeiros 5 min",
    body: "Enquanto sua equipe dorme ou está ocupada, seus leads quentes esfriaram e foram para o concorrente.",
  },
  {
    stat: 40,
    suffix: "h",
    barPct: 60, // 40h de 168h semanais ≈ visual representativo
    title: "Por mês gastas em tarefas repetitivas",
    body: "Relatórios manuais, preenchimento de CRM, envio de follow-ups. Tempo que poderia ser estratégia.",
  },
  {
    stat: 35,
    suffix: "%",
    barPct: 35,
    title: "Das vendas perdidas por falta de follow-up",
    body: "O lead demonstrou interesse, mas ninguém fez o acompanhamento. A venda morreu no silêncio.",
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
          <h2 className="s-title">Você está perdendo vendas agora mesmo</h2>
          <p className="s-sub">Cada minuto sem automação é dinheiro deixado na mesa.</p>
        </motion.div>

        {/* Stats — horizontal rows */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: "40px",
                alignItems: "start",
                padding: "32px 0",
                borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              {/* Big number */}
              <div>
                <div style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "clamp(3.5rem, 6vw, 5rem)",
                  fontWeight: 700,
                  color: "#f5f5f5",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}>
                  <Counter to={item.stat} suffix={item.suffix} />
                </div>
              </div>

              {/* Title + bar + body */}
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#f5f5f5", lineHeight: 1.4, marginBottom: "4px" }}>
                  {item.title}
                </h3>
                <Bar pct={item.barPct} delay={0.4 + i * 0.12} inView={inView} />
                <p style={{ fontSize: "0.875rem", color: "var(--text-2)", lineHeight: 1.7 }}>
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live cost ticker */}
        <LiveTicker inView={inView} />
      </div>
    </section>
  )
}
