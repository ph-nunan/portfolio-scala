"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const numeros = [
  {
    valor: "65%",
    descricao: "dos leads sem resposta em 5 minutos vão para o concorrente",
    fonte: "Harvard Business Review",
  },
  {
    valor: "7×",
    descricao: "mais chance de qualificar um lead respondendo em menos de 1 hora",
    fonte: "MIT Sloan",
  },
  {
    valor: "+14,5%",
    descricao: "nas vendas B2B com automação de marketing implementada",
    fonte: "Annuitas Group",
  },
  {
    valor: "80%",
    descricao: "dos leads qualificados não compram no primeiro contato — nutrição é o que converte",
    fonte: "Estudo de mercado",
  },
  {
    valor: "−60%",
    descricao: "no custo por lead com follow-up automatizado estruturado",
    fonte: "Benchmark de mercado",
  },
  {
    valor: "3×",
    descricao: "mais conversões em negócios com atendimento automatizado vs manual",
    fonte: "Relatório de automação 2024",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="s-wrap" id="numeros">
      <div className="s-inner">
        <div className="s-head" style={{ maxWidth: "560px" }}>
          <p className="s-label">O Mercado Já Decidiu</p>
          <h2 className="s-title" style={{ marginTop: "12px" }}>
            A automação não é mais diferencial.{" "}
            <span className="mark">É requisito.</span>
          </h2>
          <p className="s-sub" style={{ marginTop: "16px" }}>
            Os números abaixo não são projeções. São dados reais de como o
            mercado já está se comportando — com ou sem você.
          </p>
        </div>

        <div className="g-3" style={{ marginTop: "48px" }}>
          {numeros.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "28px",
              }}
            >
              <div style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "2.5rem", fontWeight: 700,
                letterSpacing: "-0.04em", lineHeight: 1,
                background: "linear-gradient(135deg, #ffffff 0%, #b0b0b0 50%, #e8e8e8 100%)",
                WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
                marginBottom: "12px",
              }}>{n.valor}</div>
              <p style={{
                fontSize: "0.9rem", color: "var(--text-2)",
                lineHeight: 1.65, marginBottom: "16px",
              }}>{n.descricao}</p>
              <p style={{
                fontSize: "0.625rem", color: "var(--text-3)",
                fontFamily: "var(--font-space-grotesk)",
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}>{n.fonte}</p>
            </motion.div>
          ))}
        </div>

        {/* Conclusão */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          style={{
            marginTop: "40px",
            padding: "28px 32px",
            background: "var(--accent-dim)",
            border: "1px solid var(--accent-border)",
            borderRadius: "14px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "1rem", color: "#f5f5f5", lineHeight: 1.7, fontWeight: 500 }}>
            Seus concorrentes já estão automatizando. A questão não é{" "}
            <span className="mark">se você vai</span> — é quando.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
