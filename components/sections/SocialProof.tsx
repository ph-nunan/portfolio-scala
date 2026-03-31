"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const modulos = [
  {
    icon: "💬",
    titulo: "Atendimento IA",
    subtitulo: "Agente Ana — WhatsApp 24/7",
    features: [
      "Resposta ao lead em menos de 5 segundos",
      "Qualificação automática com SPIN Selling",
      "Agendamento de reuniões sem SDR",
      "Follow-up pós-contato sem esforço humano",
    ],
  },
  {
    icon: "📊",
    titulo: "Marketing Inteligente",
    subtitulo: "Agente Bruno — Campaign Manager",
    features: [
      "Relatórios diários automáticos no WhatsApp",
      "Alertas de queda de performance em tempo real",
      "Análise automática de campanhas Meta e Google",
      "Recomendações de otimização com IA",
    ],
  },
  {
    icon: "💼",
    titulo: "Comercial Automatizado",
    subtitulo: "Funil do lead ao fechamento",
    features: [
      "Sequência de follow-up automática multicanal",
      "Classificação de leads (quente / morno / frio)",
      "Propostas geradas automaticamente via CRM",
      "Dashboard de vendas atualizado em tempo real",
    ],
  },
  {
    icon: "⚙️",
    titulo: "Operações & Dados",
    subtitulo: "Backoffice inteligente",
    features: [
      "Integrações entre plataformas sem código",
      "Dashboards automáticos por área do negócio",
      "Alertas de KPIs críticos no WhatsApp",
      "Eliminação de tarefas manuais repetitivas",
    ],
  },
]

export default function SocialProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="s-wrap" id="ecossistema">
      <div className="s-inner">
        <div className="s-head" style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 56px" }}>
          <p className="s-label" style={{ display: "inline-block" }}>O Ecossistema</p>
          <h2 className="s-title" style={{ marginTop: "12px" }}>
            Quatro sistemas que trabalham{" "}
            <span className="mark">juntos por você.</span>
          </h2>
          <p className="s-sub" style={{ margin: "16px auto 0", textAlign: "center" }}>
            Cada módulo resolve um gargalo do seu negócio. Unidos,
            formam o ecossistema que escala sem aumentar equipe.
          </p>
        </div>

        <div className="g-4" style={{ gap: "16px" }}>
          {modulos.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Header */}
              <div>
                <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "12px" }}>{m.icon}</span>
                <p style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "1rem", fontWeight: 700,
                  letterSpacing: "-0.02em", color: "#f5f5f5",
                  marginBottom: "4px",
                }}>{m.titulo}</p>
                <p style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "0.6875rem", color: "var(--text-3)",
                  textTransform: "uppercase", letterSpacing: "0.08em",
                }}>{m.subtitulo}</p>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "var(--border)" }} />

              {/* Features */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {m.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{
                      width: "14px", height: "14px", borderRadius: "50%",
                      border: "1px solid var(--accent-border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: "1px",
                      fontSize: "0.5rem", color: "var(--accent)",
                    }}>✓</span>
                    <span style={{ fontSize: "0.8125rem", color: "var(--text-2)", lineHeight: 1.55 }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
