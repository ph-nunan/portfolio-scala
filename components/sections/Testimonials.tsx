"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const testimonials = [
  {
    result: "4.6× mais fechamentos",
    quote: "Eu perdia clientes por demorar a responder o lead. Simples assim. Desde que a Scala implementou o sistema, a resposta vai em segundos — qualquer hora do dia. Só isso mudou minha taxa de fechamento de 8% para 37%.",
    name: "Hugo Borges",
    role: "Gestor de Tráfego",
    city: "Brasília, DF",
  },
  {
    result: "Zero lead sem resposta em 5 min",
    quote: "No imobiliário quem responde primeiro fecha. Antes eu perdia leads para concorrentes menores só porque respondiam mais rápido. Agora nenhum lead fica mais de 5 segundos sem resposta — a qualquer horário.",
    name: "H3imob",
    role: "Imobiliária",
    city: "Goiânia, GO",
  },
  {
    result: "3 clientes novos sem nova contratação",
    quote: "Peguei 3 clientes a mais sem contratar ninguém. Relatórios vão automáticos, monitoramento é 24/7, o cliente recebe update antes de precisar perguntar. O serviço ficou mais profissional e meu custo operacional caiu.",
    name: "GoAlpha",
    role: "Agência de Marketing Digital",
    city: "São Paulo, SP",
  },
  {
    result: "Atendimento 24/7 sem equipe extra",
    quote: "Antes era caos: pedido perdido, cliente sem resposta, tudo manual. Agora o sistema cuida do atendimento às 2h da manhã enquanto eu durmo. Implementaram em 6 dias e não tive que mexer em nada depois.",
    name: "DonaSol",
    role: "Energia Solar — Vendas B2C",
    city: "Brasília, DF",
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
          <p className="s-label">Resultados Reais</p>
          <h2 className="s-title">Quem já automatizou fala.</h2>
          <p className="s-sub">
            Gestor de tráfego, imobiliária, agência e solar — o sistema funciona em qualquer
            negócio onde velocidade de atendimento define quem fecha.
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
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {/* Result badge */}
              <div style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                background: "var(--accent-dim)",
                border: "1px solid var(--accent-border)",
                borderRadius: "100px",
              }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
                <span style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.5625rem",
                  color: "var(--accent)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}>
                  {t.result}
                </span>
              </div>

              {/* Quote mark */}
              <span style={{
                fontFamily: "Georgia, serif",
                fontSize: "2.5rem",
                lineHeight: 1,
                color: "var(--accent)",
                opacity: 0.3,
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
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f5f5f5", lineHeight: 1.3 }}>
                    {t.name}
                  </p>
                  <p style={{ fontSize: "0.6875rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.03em" }}>
                    {t.role} · {t.city}
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
