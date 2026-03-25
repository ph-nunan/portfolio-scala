"use client"

import { motion, useInView, animate } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { track, getScrollPct } from "@/lib/analytics"

const WA_LINK = "https://wa.me/556181894189?text=Oi!%20Vim%20pelo%20site%20da%20Scala%20e%20quero%20agendar%20meu%20diagn%C3%B3stico%20gratuito."

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
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

  return <span ref={ref}>{val}{suffix}</span>
}

const metrics = [
  { value: 30, suffix: "%", label: "Leads Recuperados", context: "que antes iam para o concorrente" },
  { value: 40, suffix: "h", label: "Economizadas / Mês", context: "em tarefas manuais e repetitivas" },
  { display: "24/7", label: "Atendimento IA", context: "sem interrupção, sem custo extra" },
  { value: 7, suffix: " dias", label: "Para Implementar", context: "do zero ao ecossistema rodando" },
]

const wins = [
  "Leads respondidos em segundos — não em horas",
  "CRM preenchido automaticamente, sem intervenção da equipe",
  "Follow-up disparado com contexto real de cada conversa",
  "Relatórios das campanhas chegando no WhatsApp do cliente",
  "Time de vendas focado só em fechar, não em operar",
  "Visibilidade total do funil em tempo real",
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
          <h2 className="s-title">Números que <span className="mark">Falam por Si</span></h2>
          <p className="s-sub">Baseado em resultados reais de automações n8n em operações comerciais similares.</p>
        </motion.div>

        {/* Metrics row */}
        <div className="g-4" style={{ marginBottom: "48px" }}>
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
                padding: "24px 20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "2.25rem", fontWeight: 700, marginBottom: "4px", lineHeight: 1, background: "linear-gradient(135deg, #ffffff 0%, #b0b0b0 50%, #e0e0e0 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {m.display ?? <Counter to={m.value!} suffix={m.suffix} />}
              </div>
              <div style={{ fontSize: "0.6875rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                {m.label}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-3)", lineHeight: 1.5, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
                {m.context}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom: Guarantee (left) + 30-day wins (right) */}
        <div className="g-2col">

          {/* Guarantee card */}
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="card-lg"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--accent-border)",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Guarantee badge */}
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--accent-dim)",
                border: "1px solid var(--accent-border)",
                borderRadius: "100px",
                padding: "4px 14px",
                marginBottom: "28px",
              }}>
                <span style={{ fontSize: "0.875rem" }}>✦</span>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.625rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Garantia de Resultado
                </span>
              </div>

              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f5f5f5", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "16px" }}>
                Se em 30 dias você não ver resultado,{" "}
                <span style={{ color: "var(--accent)" }}>devolvemos 100%</span>{" "}
                do investimento.
              </h3>

              <p style={{ fontSize: "0.9rem", color: "var(--text-2)", lineHeight: 1.7, marginBottom: "28px" }}>
                Confiamos tanto no que construímos que eliminamos o risco para você.
                Sem letras miúdas, sem condições absurdas. Se não funcionar, você não paga.
              </p>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "20px" }}>
              <p style={{ fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)", color: "var(--text-3)", lineHeight: 1.6 }}>
                Válido para implementação completa do ecossistema.
                Resultado = redução mensurável no tempo de resposta aos leads.
              </p>
            </div>
          </motion.div>

          {/* 30-day wins list */}
          <motion.div
            initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <p className="s-label" style={{ marginBottom: "20px" }}>O que muda nos primeiros 30 dias</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {wins.map((win, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    padding: "14px 0",
                    borderBottom: i < wins.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <span style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "var(--accent-dim)",
                    border: "1px solid var(--accent-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "1px",
                    fontSize: "0.5rem",
                    color: "var(--accent)",
                  }}>
                    ✓
                  </span>
                  <span style={{ fontSize: "0.9rem", color: "rgba(245,245,245,0.85)", lineHeight: 1.5 }}>
                    {win}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.0 }}
              style={{ marginTop: "28px" }}
            >
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("wa_button_click", { location: "results", scroll_pct: getScrollPct() })}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 22px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#f5f5f5",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-border)"
                  e.currentTarget.style.color = "var(--accent)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.color = "#f5f5f5"
                }}
              >
                Começar sem risco →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
