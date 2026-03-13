"use client"

import { motion, useInView, animate } from "framer-motion"
import { useRef, useState, useEffect } from "react"

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return c.stop
  }, [inView, to])

  return <span ref={ref}>{prefix}{val}{suffix}</span>
}

const metrics = [
  { value: 30, suffix: "%", label: "Leads Recuperados" },
  { value: 40, suffix: "h", label: "Economizadas / Mês" },
  { display: "24/7", label: "Atendimento IA" },
  { value: 7, suffix: " dias", label: "Para Implementar" },
]

const testimonials = [
  {
    quote: "Antes eu perdia 60% dos leads porque não conseguia responder a tempo. Agora a IA responde em 3 segundos e eu só fecho.",
    author: "Gestor de Tráfego",
    company: "Agência de Performance — Brasília",
    metric: "+47% em conversões",
  },
  {
    quote: "O relatório automático no WhatsApp mudou minha relação com os clientes. Eles sentem que estão sendo acompanhados de perto.",
    author: "Dono de Agência",
    company: "Agência de Marketing Digital — DF",
    metric: "Churn reduzido em 35%",
  },
  {
    quote: "Automatizei o follow-up e o CRM. Minha equipe de 2 pessoas agora atende como se fossem 10.",
    author: "Empreendedor",
    company: "Clínica de Estética — Brasília",
    metric: "3x mais agendamentos",
  },
]

export default function Results() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="results" ref={ref} className="s-wrap">
      <div className="s-inner">
        <motion.div
          className="s-head"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="s-label">Resultados</p>
          <h2 className="s-title">Números que Falam por Si</h2>
        </motion.div>

        {/* Metrics row */}
        <div className="g-4" style={{ marginBottom: "40px" }}>
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.09, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "24px",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "2.25rem", fontWeight: 700, color: "#f5f5f5", marginBottom: "6px", lineHeight: 1 }}>
                {m.display ?? <Counter to={m.value!} suffix={m.suffix} />}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="g-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="card"
              style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <p style={{ fontSize: "0.875rem", color: "rgba(245,245,245,0.8)", lineHeight: 1.7, marginBottom: "1.25rem", fontStyle: "italic" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#f5f5f5" }}>{t.author}</p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginTop: "2px" }}>{t.company}</p>
                <p style={{ fontSize: "0.6875rem", fontFamily: "var(--font-geist-mono)", color: "rgba(255,255,255,0.4)", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {t.metric}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{ textAlign: "center", marginTop: "32px", fontSize: "0.75rem", color: "var(--text-3)", fontStyle: "italic" }}
        >
          * Depoimentos representativos. Resultados reais serão adicionados após os primeiros projetos.
        </motion.p>
      </div>
    </section>
  )
}
