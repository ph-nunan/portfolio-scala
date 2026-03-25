"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const testimonials = [
  {
    quote: "Perdi clientes por demorar a responder lead. Desde a Scala, a resposta vai em segundos — isso sozinho mudou minha taxa de fechamento.",
    name: "Hugo Borges",
    role: "Gestor de Tráfego",
  },
  {
    quote: "No mercado imobiliário quem responde primeiro fecha. A Scala garantiu que nenhum lead nosso fica mais de 5 segundos sem resposta — em qualquer horário.",
    name: "H3imob",
    role: "Imobiliária",
  },
  {
    quote: "Peguei 3 novos clientes sem contratar ninguém. Os relatórios vão automáticos, o monitoramento é 24/7 e o cliente recebe update antes de precisar perguntar.",
    name: "GoAlpha",
    role: "Agência de Marketing",
  },
  {
    quote: "Antes era caos: pedido perdido, cliente sem resposta, tudo manual. Agora o sistema cuida do atendimento e a gente foca no que sabe fazer.",
    name: "DonaSol",
    role: "Delivery",
  },
]

export default function Testimonials() {
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
          <p className="s-label">Clientes Reais</p>
          <h2 className="s-title">Quem já automatizou fala.</h2>
          <p className="s-sub">
            Agência, imobiliária, gestor de tráfego, delivery — o ecossistema funciona em qualquer nicho que depende de resposta rápida e relatório constante.
          </p>
        </motion.div>

        <div className="g-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.55, delay: 0.08 + i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "28px 28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Quote mark */}
              <span style={{
                fontFamily: "Georgia, serif",
                fontSize: "3rem",
                lineHeight: 1,
                color: "var(--accent)",
                opacity: 0.35,
                display: "block",
                marginBottom: "-8px",
              }}>
                &ldquo;
              </span>

              {/* Quote text */}
              <p style={{
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: "rgba(245,245,245,0.85)",
                fontWeight: 400,
                flex: 1,
              }}>
                {t.quote}
              </p>

              {/* Attribution */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "var(--accent-dim)",
                  border: "1px solid var(--accent-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  flexShrink: 0,
                  fontFamily: "var(--font-space-grotesk)",
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <p style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#f5f5f5",
                    lineHeight: 1.3,
                  }}>
                    {t.name}
                  </p>
                  <p style={{
                    fontSize: "0.6875rem",
                    color: "var(--text-3)",
                    fontFamily: "var(--font-geist-mono)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
