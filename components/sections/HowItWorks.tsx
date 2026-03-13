"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    num: "01",
    title: "Diagnóstico Gratuito",
    desc: "Analisamos seu ecossistema de vendas atual: tráfego, atendimento, CRM e follow-up. Identificamos os gargalos que estão fazendo você perder dinheiro.",
    note: "30 minutos de consultoria sem compromisso",
  },
  {
    num: "02",
    title: "Implementação em 7 Dias",
    desc: "Construímos seus fluxos de automação no n8n, configuramos a IA de atendimento e integramos tudo ao seu CRM. Você não precisa entender de tecnologia.",
    note: "Setup completo com treinamento da equipe",
  },
  {
    num: "03",
    title: "Escala no Piloto Automático",
    desc: "Seu ecossistema de vendas funciona 24/7. Leads são atendidos em segundos, qualificados automaticamente e acompanhados até o fechamento.",
    note: "Suporte contínuo + otimizações mensais",
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="how-it-works" ref={ref} className="s-wrap">
      <div className="s-inner">
        <motion.div
          className="s-head"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="s-label">Como Funciona</p>
          <h2 className="s-title">Do Diagnóstico à Escala em 3 Passos</h2>
          <p className="s-sub">
            Simples, rápido e sem dor de cabeça. Você foca no estratégico, a tecnologia cuida do operacional.
          </p>
        </motion.div>

        <div className="g-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "4rem", fontWeight: 700, color: "rgba(255,255,255,0.06)", lineHeight: 1, marginBottom: "20px", letterSpacing: "-0.02em" }}>
                {step.num}
              </div>
              <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, color: "#f5f5f5", marginBottom: "12px" }}>
                {step.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-2)", lineHeight: 1.7, marginBottom: "16px" }}>
                {step.desc}
              </p>
              <p style={{ fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)", color: "var(--text-3)", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {step.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
