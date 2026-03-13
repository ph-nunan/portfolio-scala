"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  { num: "01", title: "Tráfego Pago", desc: "Anúncios inteligentes capturam o lead certo" },
  { num: "02", title: "Captação", desc: "Lead entra no ecossistema automaticamente" },
  { num: "03", title: "Qualificação", desc: "IA classifica e prioriza leads quentes" },
  { num: "04", title: "Atendimento", desc: "Resposta em segundos, 24 horas por dia" },
  { num: "05", title: "Follow-up", desc: "Sequências humanizadas com contexto real" },
  { num: "06", title: "Fechamento", desc: "Time foca apenas em quem está pronto" },
]

export default function Ecosystem() {
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
          <p className="s-label">Ecossistema</p>
          <h2 className="s-title">Seu Ecossistema de Vendas 100% Automatizado</h2>
          <p className="s-sub">
            Do clique no anúncio ao fechamento da venda. Cada etapa conectada,
            inteligente e funcionando 24 horas por dia.
          </p>
        </motion.div>

        <div className="g-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="card"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.09, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ borderColor: "rgba(255,255,255,0.1)", scale: 1.02 }}
            >
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6875rem", color: "var(--text-3)", display: "block", marginBottom: "10px" }}>
                {step.num}
              </span>
              <h3 style={{ fontSize: "0.8125rem", fontWeight: 600, marginBottom: "6px", color: "#f5f5f5" }}>
                {step.title}
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-2)", lineHeight: 1.55 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
