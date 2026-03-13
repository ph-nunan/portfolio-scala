"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const services = [
  {
    icon: "↗",
    title: "Automação de Meta Ads & Google Ads",
    desc: "IA analisa suas campanhas em tempo real, sugere otimizações, gera prompts para criativos vencedores e escala o que funciona automaticamente.",
    tags: ["Meta Ads", "Google Ads", "Criativos IA"],
  },
  {
    icon: "◎",
    title: "Atendimento Automático 24/7 com IA",
    desc: "Agente de IA no WhatsApp e Instagram que responde em segundos, entende o contexto do seu negócio e atende como um humano treinado.",
    tags: ["WhatsApp", "Instagram DM", "IA Humanizada"],
  },
  {
    icon: "⬡",
    title: "Qualificação Inteligente de Leads",
    desc: "IA classifica e prioriza leads quentes automaticamente. Seu time de vendas só fala com quem está pronto para comprar.",
    tags: ["Lead Scoring", "IA", "Priorização"],
  },
  {
    icon: "⊞",
    title: "CRM Automatizado",
    desc: "Pipeline de vendas que se alimenta sozinho. Cada lead é registrado, categorizado e movido no funil sem intervenção manual.",
    tags: ["Pipeline", "Auto-Registro", "Funil"],
  },
  {
    icon: "↺",
    title: "Follow-up Humanizado com IA",
    desc: "Mensagens programadas com contexto da conversa anterior. A IA sabe o nome, o interesse e o momento certo de reengajar cada lead.",
    tags: ["Sequências", "Contexto", "Reengajamento"],
  },
  {
    icon: "⊟",
    title: "Relatórios & Dashboards Inteligentes",
    desc: "Relatórios automáticos em PDF enviados no WhatsApp do seu cliente. Dashboards em tempo real com métricas que importam.",
    tags: ["PDF Automático", "WhatsApp", "Dashboard"],
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="services" ref={ref} className="s-wrap">
      <div className="s-inner">
        <motion.div
          className="s-head"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="s-label">Serviços</p>
          <h2 className="s-title">6 Automações que Escalam Suas Vendas</h2>
          <p className="s-sub">
            Cada serviço é um módulo do seu ecossistema. Juntos, eles transformam
            sua operação em uma máquina de vendas autônoma.
          </p>
        </motion.div>

        <div className="g-3">
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="card"
              style={{ display: "flex", flexDirection: "column" }}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.55, delay: 0.05 + i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.1)" }}
            >
              <span style={{ fontSize: "1.25rem", opacity: 0.45, display: "block", marginBottom: "16px" }}>
                {s.icon}
              </span>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#f5f5f5", lineHeight: 1.4, marginBottom: "8px" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-2)", lineHeight: 1.65, flex: 1, marginBottom: "16px" }}>
                {s.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {s.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
