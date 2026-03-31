"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const perfis = [
  {
    icone: "📈",
    titulo: "Gestores de Tráfego e Agências",
    descricao: "Você entrega leads qualificados para os clientes, mas o atendimento deles é lento — e você paga o preço no churn.",
    dor: "Cliente reclamando que os leads 'não convertem'",
    solucao: "Você entrega o ecossistema de atendimento junto com o tráfego — e para de ser responsabilizado pela lentidão deles.",
    tags: ["Meta Ads", "Google Ads", "Relatórios automáticos"],
  },
  {
    icone: "🎯",
    titulo: "Prestadores de Serviço",
    descricao: "Clínicas, consultores, coaches, advogados. Você tem um bom serviço, mas perde horas qualificando leads manualmente.",
    dor: "Você vira o gargalo: agenda lotada, leads esperando",
    solucao: "A Ana qualifica, agenda e faz o follow-up. Você entra na conversa só quando o lead está pronto para comprar.",
    tags: ["WhatsApp 24/7", "Agendamento automático", "Qualificação SPIN"],
  },
  {
    icone: "🚀",
    titulo: "Empresas em Crescimento",
    descricao: "SaaS, e-commerces, varejo. Você está escalando, mas o volume de leads está crescendo mais rápido do que a equipe.",
    dor: "Mais leads = mais contratações = custo crescente sem fim",
    solucao: "Você escala com automação, não com headcount. O sistema acompanha o crescimento sem você precisar contratar.",
    tags: ["CRM automatizado", "Follow-up multicanal", "Dashboard de vendas"],
  },
]

export default function FunnelComparison() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="s-wrap" id="para-quem">
      <div className="s-inner">
        <div className="s-head" style={{ maxWidth: "520px" }}>
          <p className="s-label">Para Quem É</p>
          <h2 className="s-title" style={{ marginTop: "12px" }}>
            Feito para quem já sabe{" "}
            <span className="mark">que automação é o caminho.</span>
          </h2>
          <p className="s-sub" style={{ marginTop: "16px" }}>
            Não trabalhamos com quem ainda está testando a ideia.
            Trabalhamos com quem quer implementar agora.
          </p>
        </div>

        <div className="g-3" style={{ marginTop: "48px" }}>
          {perfis.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
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
                <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "14px" }}>{p.icone}</span>
                <h3 style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "0.9375rem", fontWeight: 700,
                  letterSpacing: "-0.02em", color: "#f5f5f5",
                  marginBottom: "10px",
                }}>{p.titulo}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-2)", lineHeight: 1.65 }}>{p.descricao}</p>
              </div>

              {/* Dor */}
              <div style={{
                padding: "12px 16px",
                background: "rgba(255,80,80,0.04)",
                border: "1px solid rgba(255,80,80,0.14)",
                borderRadius: "8px",
              }}>
                <p style={{ fontSize: "0.625rem", color: "rgba(255,100,100,0.7)", fontFamily: "var(--font-space-grotesk)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                  Dor típica
                </p>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-2)", lineHeight: 1.55 }}>{p.dor}</p>
              </div>

              {/* Solução */}
              <div style={{
                padding: "12px 16px",
                background: "var(--accent-dim)",
                border: "1px solid var(--accent-border)",
                borderRadius: "8px",
              }}>
                <p style={{ fontSize: "0.625rem", color: "var(--accent)", fontFamily: "var(--font-space-grotesk)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                  Como resolvemos
                </p>
                <p style={{ fontSize: "0.8125rem", color: "rgba(245,245,245,0.85)", lineHeight: 1.55 }}>{p.solucao}</p>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {p.tags.map((t, j) => (
                  <span key={j} style={{
                    padding: "4px 10px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "100px",
                    fontSize: "0.625rem",
                    color: "var(--text-3)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
