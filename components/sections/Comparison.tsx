"use client"

// PDF Seção 3.2 — Comparativo com Alternativas (Tabela de Decisão)
// O visitante não precisa sair do site para comparar. A decisão acontece ali.

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const criteria = [
  {
    label: "Custo mensal",
    manual:  "R$ 0 (seu tempo)",
    saas:    "R$ 200–500",
    sdr:     "R$ 3.000–5.000",
    scala:   "R$ 450–1.800",
    winner: "scala",
  },
  {
    label: "Tempo de resposta ao lead",
    manual:  "30 min–2h",
    saas:    "5–15 min",
    sdr:     "5–30 min",
    scala:   "< 5 segundos",
    winner: "scala",
  },
  {
    label: "Funciona 24/7",
    manual:  "Não",
    saas:    "Parcial",
    sdr:     "Não",
    scala:   "Sim",
    winner: "scala",
  },
  {
    label: "Personalizado ao seu negócio",
    manual:  "—",
    saas:    "Não",
    sdr:     "Sim",
    scala:   "Sim",
    winner: "tie",
  },
  {
    label: "Escala sem custo extra",
    manual:  "Não",
    saas:    "Limitado",
    sdr:     "Não (novo SDR)",
    scala:   "Sim",
    winner: "scala",
  },
  {
    label: "Tempo de implementação",
    manual:  "Imediato",
    saas:    "1–2 semanas",
    sdr:     "1–3 meses",
    scala:   "7 dias",
    winner: "scala",
  },
]

const columns = ["Fazer Manual", "SaaS Genérico", "Contratar SDR", "Scala"]

export default function Comparison() {
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
          <p className="s-label">Comparativo</p>
          <h2 className="s-title">Por que escolher a Scala?</h2>
          <p className="s-sub">
            Compare as alternativas antes de decidir. A Scala ganha em 5 de 6 critérios.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ overflowX: "auto" }}
        >
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "560px",
          }}>
            {/* Header */}
            <thead>
              <tr>
                <th style={{
                  padding: "14px 16px",
                  textAlign: "left",
                  fontSize: "0.6875rem",
                  fontFamily: "var(--font-geist-mono)",
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  fontWeight: 400,
                  minWidth: "160px",
                }}>
                  Critério
                </th>
                {columns.map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "14px 16px",
                      textAlign: "center",
                      fontSize: "0.75rem",
                      fontWeight: col === "Scala" ? 700 : 500,
                      color: col === "Scala" ? "var(--accent)" : "var(--text-2)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: col === "Scala" ? "var(--accent-dim)" : "rgba(255,255,255,0.02)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col === "Scala" && <span style={{ marginRight: "4px" }}>✦</span>}
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {criteria.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                >
                  <td style={{
                    padding: "14px 16px",
                    fontSize: "0.8125rem",
                    color: "var(--text-2)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    background: "rgba(255,255,255,0.01)",
                    lineHeight: 1.4,
                  }}>
                    {row.label}
                  </td>
                  {[row.manual, row.saas, row.sdr, row.scala].map((val, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: "14px 16px",
                        textAlign: "center",
                        fontSize: "0.8125rem",
                        fontFamily: ci === 3 ? "var(--font-geist-mono)" : undefined,
                        fontWeight: ci === 3 ? 600 : 400,
                        color: ci === 3
                          ? (row.winner === "scala" ? "var(--accent)" : "var(--text-2)")
                          : "var(--text-3)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        background: ci === 3 ? "rgba(74,222,128,0.03)" : "transparent",
                        lineHeight: 1.4,
                      }}
                    >
                      {val}
                      {ci === 3 && row.winner === "scala" && (
                        <span style={{ marginLeft: "6px", fontSize: "0.5625rem", color: "var(--accent)" }}>✓</span>
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{
            marginTop: "32px",
            padding: "20px 28px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p style={{ fontSize: "0.9rem", color: "var(--text-2)", lineHeight: 1.6 }}>
            Scala ganha em{" "}
            <strong style={{ color: "#f5f5f5" }}>5 de 6 critérios</strong>{" "}
            com o menor custo por lead atendido. A decisão fica óbvia.
          </p>
          <a
            href="https://wa.me/556181894189?text=Oi!%20Vim%20pelo%20site%20da%20Scala%20e%20quero%20agendar%20meu%20diagn%C3%B3stico%20gratuito."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "11px 24px",
              background: "var(--accent)", color: "#0a0a0a",
              borderRadius: "8px", fontWeight: 600, fontSize: "0.875rem",
              textDecoration: "none", transition: "opacity 0.2s",
              whiteSpace: "nowrap", flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Agendar Diagnóstico Gratuito →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
