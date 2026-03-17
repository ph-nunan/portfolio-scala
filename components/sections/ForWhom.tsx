"use client"

// PDF Seção 3.1 — "Para Quem É / Para Quem NÃO É"
// O elemento mais contra-intuitivo e mais poderoso da lista.
// Dizer para quem NÃO é gera: seleção positiva, escassez percebida e filtragem de leads ruins.

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const forYes = [
  {
    icon: "◎",
    text: "Gestores de tráfego que investem R$ 5.000+/mês em ads e perdem leads por resposta lenta",
  },
  {
    icon: "⬡",
    text: "Agências que atendem 5+ clientes e não conseguem escalar o atendimento sem contratar mais gente",
  },
  {
    icon: "↗",
    text: "Empresários que sabem que precisam de automação mas não sabem por onde começar",
  },
]

const forNo = [
  {
    text: "Quem busca a solução mais barata do mercado (existem opções de R$ 49/mês, mas não são personalizadas)",
  },
  {
    text: "Quem não tem tráfego pago rodando (automação sem leads é como motor sem combustível)",
  },
  {
    text: "Quem quer resultado em 24 horas (implementação leva 7 dias, resultados aparecem em 14–30)",
  },
]

export default function ForWhom() {
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
          <p className="s-label">Fit</p>
          <h2 className="s-title">A Scala é para você?</h2>
          <p className="s-sub">
            Não atendemos todo mundo. Essa escolha nos permite entregar resultados reais para quem faz sentido.
          </p>
        </motion.div>

        <div className="g-2col">
          {/* Para quem É */}
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{
              background: "var(--accent-dim)",
              border: "1px solid var(--accent-border)",
              borderRadius: "16px",
              padding: "32px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <span style={{ fontSize: "1rem", color: "var(--accent)" }}>✓</span>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f5f5f5" }}>
                Para quem a Scala é ideal
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {forYes.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}
                >
                  <span style={{
                    width: "32px", height: "32px", borderRadius: "8px",
                    background: "rgba(74,222,128,0.12)", border: "1px solid var(--accent-border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.875rem", color: "var(--accent)",
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </span>
                  <p style={{ fontSize: "0.9rem", color: "rgba(245,245,245,0.85)", lineHeight: 1.65 }}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              style={{ marginTop: "28px" }}
            >
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
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Me encaixo — agendar diagnóstico →
              </a>
            </motion.div>
          </motion.div>

          {/* Para quem NÃO É */}
          <motion.div
            initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,80,80,0.15)",
              borderRadius: "16px",
              padding: "32px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <span style={{ fontSize: "1rem", color: "rgba(255,100,100,0.7)" }}>✗</span>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f5f5f5" }}>
                Para quem a Scala NÃO é
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {forNo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}
                >
                  <span style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "rgba(255,100,100,0.4)", marginTop: "8px",
                    flexShrink: 0,
                  }} />
                  <p style={{ fontSize: "0.9rem", color: "var(--text-2)", lineHeight: 1.65 }}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
              style={{
                marginTop: "28px",
                padding: "16px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p style={{ fontSize: "0.8125rem", color: "var(--text-3)", lineHeight: 1.6, fontStyle: "italic" }}>
                "Se não é para qualquer um, deve ser bom." A exclusão gera desejo — e filtra quem não vai ter resultado mesmo assim.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
