"use client"

// PDF Seção 2.2 — Future Pacing (Projeção Futura)
// Faz o visitante se imaginar no futuro já usando o produto.
// Ativa o córtex pré-frontal — a decisão muda de racional para emocional.
// Posição ideal: entre a seção de Garantia/Results e o formulário final.

import { motion, useInView } from "framer-motion"
import { track, getScrollPct } from "@/lib/analytics"

const WA_LINK = "https://wa.me/556181894189?text=Oi!%20Vim%20pelo%20site%20da%20Scala%20e%20quero%20agendar%20meu%20diagn%C3%B3stico%20gratuito."
import { useRef } from "react"

const scenarios = [
  {
    time: "Segunda · 08h00",
    icon: "◎",
    events: [
      { label: "47 leads respondidos durante o fim de semana", highlight: "47" },
      { label: "12 leads qualificados automaticamente", highlight: "12" },
      { label: "3 reuniões agendadas no calendário", highlight: "3" },
    ],
  },
  {
    time: "Segunda · 08h01",
    icon: "≡",
    events: [
      { label: "CRM atualizado com histórico completo", highlight: null },
      { label: "Relatório semanal no seu e-mail", highlight: null },
      { label: "Score de qualificação para cada lead", highlight: null },
    ],
  },
  {
    time: "Segunda · 08h02",
    icon: "✦",
    events: [
      { label: "Você abre o laptop", highlight: null },
      { label: "Só decide com quem falar primeiro", highlight: null },
    ],
    conclusion: true,
  },
]

export default function FuturePacing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="s-wrap">
      <div className="s-inner" style={{ textAlign: "center" }}>
        <motion.div
          className="s-head"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="s-label">Imagine</p>
          <h2 className="s-title" style={{ fontStyle: "italic" }}>
            Imagine acordar segunda-feira e…
          </h2>
        </motion.div>

        {/* Scenario cards */}
        <div style={{ maxWidth: "640px", margin: "0 auto 48px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {scenarios.map((scenario, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                background: scenario.conclusion ? "var(--accent-dim)" : "var(--surface)",
                border: scenario.conclusion ? "1px solid var(--accent-border)" : "1px solid var(--border)",
                borderRadius: "14px",
                padding: "24px 28px",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{
                  width: "32px", height: "32px", borderRadius: "8px",
                  background: scenario.conclusion ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.05)",
                  border: scenario.conclusion ? "1px solid var(--accent-border)" : "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.875rem",
                  color: scenario.conclusion ? "var(--accent)" : "var(--text-3)",
                  flexShrink: 0,
                }}>
                  {scenario.icon}
                </span>
                <span style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.625rem",
                  color: scenario.conclusion ? "var(--accent)" : "var(--text-3)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>
                  {scenario.time}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {scenario.events.map((event, ei) => (
                  <div key={ei} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{
                      width: "5px", height: "5px", borderRadius: "50%",
                      background: scenario.conclusion ? "var(--accent)" : "rgba(255,255,255,0.2)",
                      flexShrink: 0,
                    }} />
                    <p style={{
                      fontSize: "0.9rem",
                      color: scenario.conclusion ? "rgba(245,245,245,0.9)" : "var(--text-2)",
                      lineHeight: 1.5,
                    }}>
                      {event.highlight
                        ? <>
                            <span style={{ fontFamily: "var(--font-geist-mono)", fontWeight: 700, color: "#f5f5f5" }}>
                              {event.highlight}
                            </span>{" "}
                            {event.label.replace(event.highlight, "").trimStart()}
                          </>
                        : event.label
                      }
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Payoff line */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ marginBottom: "40px" }}
        >
          <p style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#f5f5f5",
            letterSpacing: "-0.02em",
            lineHeight: 1.4,
            marginBottom: "8px",
          }}>
            Você não fez nada.
          </p>
          <p style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.4,
            background: "linear-gradient(135deg, var(--accent) 0%, #a3e635 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            A Scala fez.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("wa_button_click", { location: "future_pacing", scroll_pct: getScrollPct() })}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 32px",
              background: "var(--accent)", color: "#0a0a0a",
              borderRadius: "8px", fontWeight: 600, fontSize: "0.9375rem",
              textDecoration: "none", transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Quero essa segunda-feira →
          </a>
          <p style={{ marginTop: "12px", fontSize: "0.75rem", color: "var(--text-3)" }}>
            Diagnóstico gratuito · 30 dias de garantia · 7 dias para implementar
          </p>
        </motion.div>
      </div>
    </section>
  )
}
