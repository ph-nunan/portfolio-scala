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

const items = [
  {
    stat: 78, suffix: "%",
    title: "Leads sem resposta nos primeiros 5 min",
    body: "Enquanto sua equipe dorme ou está ocupada, seus leads quentes esfriaram e foram para o concorrente.",
  },
  {
    stat: 40, suffix: "h",
    title: "Por mês gastas em tarefas repetitivas",
    body: "Relatórios manuais, preenchimento de CRM, envio de follow-ups. Tempo que poderia ser estratégia.",
  },
  {
    stat: 35, suffix: "%",
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

        <div className="g-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="card"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "3rem", fontWeight: 700, color: "#f5f5f5", lineHeight: 1, marginBottom: "14px" }}>
                <Counter to={item.stat} suffix={item.suffix} />
              </div>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "rgba(245,245,245,0.85)", marginBottom: "8px", lineHeight: 1.4 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-2)", lineHeight: 1.65 }}>
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
