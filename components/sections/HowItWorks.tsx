"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const projetos = [
  {
    tag: "Atendimento IA",
    nome: "Ana — Agente WhatsApp",
    cliente: "Rede de clínicas odontológicas",
    problema: "60% dos leads perdidos fora do horário comercial. Recepcionistas respondendo leads no dia seguinte.",
    solucao: "Agente conversacional com SPIN Selling: qualifica, responde objeções e agenda direto no Google Calendar.",
    metricas: [
      { valor: "< 8s", label: "tempo de resposta" },
      { valor: "3×",   label: "agendamentos/semana" },
      { valor: "3 sem", label: "para ver resultado" },
    ],
  },
  {
    tag: "Marketing Inteligente",
    nome: "Bruno — Campaign Manager",
    cliente: "Agência de performance digital",
    problema: "15h/semana gastas em relatórios manuais. Gestores sem visibilidade em tempo real para otimizar campanhas.",
    solucao: "Reports automáticos diários no WhatsApp com análise de CPL, CTR e alertas de anomalia em tempo real.",
    metricas: [
      { valor: "−40%", label: "custo por lead" },
      { valor: "15h",  label: "liberadas por semana" },
      { valor: "100%", label: "visibilidade em tempo real" },
    ],
  },
  {
    tag: "Comercial Automatizado",
    nome: "Sistema de Follow-up",
    cliente: "SaaS de gestão empresarial",
    problema: "70% dos leads esfriavam após o primeiro contato. Time comercial sobrecarregado com follow-up manual.",
    solucao: "Sequência automática de 7 dias: WhatsApp + e-mail, com classificação de leads por temperatura.",
    metricas: [
      { valor: "+31%", label: "taxa de fechamento" },
      { valor: "+22%", label: "ticket médio" },
      { valor: "48h",  label: "tempo médio de resposta (antes: 4 dias)" },
    ],
  },
  {
    tag: "Ecossistema Completo",
    nome: "Stack Completa — H3imob",
    cliente: "Imobiliária — Distrito Federal",
    problema: "Captação, atendimento e comercial funcionando em silos. Leads caindo no esquecimento entre etapas.",
    solucao: "Integração completa: Ana no atendimento + Bruno nos reports + CRM automatizado com classificação de leads.",
    metricas: [
      { valor: "−40%", label: "custo operacional" },
      { valor: "+280%", label: "leads qualificados/mês" },
      { valor: "7 dias", label: "implementação completa" },
    ],
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="s-wrap" id="portfolio">
      <div className="s-inner">
        <div className="s-head" style={{ maxWidth: "520px" }}>
          <p className="s-label">Portfólio</p>
          <h2 className="s-title" style={{ marginTop: "12px" }}>
            O que já{" "}
            <span className="mark">construímos.</span>
          </h2>
          <p className="s-sub" style={{ marginTop: "16px" }}>
            Cada projeto começa com um problema real. O resultado sempre
            aparece nas métricas — não nas promessas.
          </p>
        </div>

        <div style={{ marginTop: "48px", display: "flex", flexDirection: "column", gap: "24px" }}>
          {projetos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }} className="projeto-grid">
                {/* Left */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <span style={{
                      padding: "3px 10px",
                      background: "var(--accent-dim)",
                      border: "1px solid var(--accent-border)",
                      borderRadius: "100px",
                      fontSize: "0.5625rem",
                      color: "var(--text-3)",
                      fontFamily: "var(--font-space-grotesk)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}>{p.tag}</span>
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "1.125rem", fontWeight: 700,
                    letterSpacing: "-0.025em", color: "#f5f5f5",
                    marginBottom: "4px",
                  }}>{p.nome}</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginBottom: "20px" }}>{p.cliente}</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div>
                      <p style={{ fontSize: "0.625rem", color: "rgba(255,100,100,0.7)", fontFamily: "var(--font-space-grotesk)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                        Problema
                      </p>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-2)", lineHeight: 1.6 }}>{p.problema}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.625rem", color: "var(--accent)", fontFamily: "var(--font-space-grotesk)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                        Solução
                      </p>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-2)", lineHeight: 1.6 }}>{p.solucao}</p>
                    </div>
                  </div>
                </div>

                {/* Right — métricas */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px" }}>
                  {p.metricas.map((m, j) => (
                    <div key={j} style={{
                      padding: "16px 20px",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}>
                      <span style={{
                        fontFamily: "var(--font-space-grotesk)",
                        fontSize: "1.375rem", fontWeight: 700,
                        background: "linear-gradient(135deg, #ffffff 0%, #b0b0b0 50%, #e8e8e8 100%)",
                        WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
                        flexShrink: 0, lineHeight: 1,
                      }}>{m.valor}</span>
                      <span style={{ fontSize: "0.8125rem", color: "var(--text-2)", lineHeight: 1.4 }}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
