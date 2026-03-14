"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// Alternativa 2 (PDF seção 3.3): Métricas de Teste Controlado
// Mais crível que depoimentos — porque é verificável
const evidence = [
  {
    type: "Teste Controlado",
    headline: "7 dias de automação no WhatsApp",
    stats: [
      { label: "Mensagens processadas", value: "147" },
      { label: "Tempo médio de resposta", value: "3.2s" },
      { label: "Taxa de qualificação automática", value: "67%" },
      { label: "Leads que agendaram reunião", value: "23" },
    ],
    tag: "Atendimento IA",
  },
  {
    type: "Projeto Piloto",
    headline: "Relatórios automáticos — 30 dias",
    stats: [
      { label: "Clientes recebendo relatório semanal", value: "12" },
      { label: "Horas manuais eliminadas por semana", value: "0h" },
      { label: "Economizadas por cliente/mês", value: "8.2h" },
      { label: "Entregas no prazo (toda segunda-feira)", value: "100%" },
    ],
    tag: "Relatórios Automáticos",
  },
  {
    type: "Implementação",
    headline: "CRM automatizado — 3 meses de dados",
    stats: [
      { label: "Leads registrados automaticamente", value: "341" },
      { label: "Leads perdidos por falta de registro", value: "0" },
      { label: "Pipeline atualizado em tempo real", value: "24/7" },
      { label: "Horas do time de vendas liberadas/mês", value: "40h" },
    ],
    tag: "CRM Automatizado",
  },
]

export default function Cases() {
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
          <p className="s-label">Evidência Real</p>
          <h2 className="s-title">34 automações construídas.</h2>
          <p className="s-sub">
            Números de testes e implementações reais — não depoimentos. Porque evidência verificável vale mais que palavras.
          </p>
        </motion.div>

        <div className="g-3">
          {evidence.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.55, delay: 0.08 + i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header */}
              <div style={{
                padding: "20px 24px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.015)",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.5rem",
                    color: "var(--accent)",
                    background: "var(--accent-dim)",
                    border: "1px solid var(--accent-border)",
                    padding: "2px 10px",
                    borderRadius: "100px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}>
                    {item.type}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.5rem",
                    color: "var(--text-3)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    padding: "2px 8px",
                    borderRadius: "100px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}>
                    {item.tag}
                  </span>
                </div>
                <h3 style={{
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "#f5f5f5",
                  lineHeight: 1.4,
                }}>
                  {item.headline}
                </h3>
              </div>

              {/* Stats grid */}
              <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                {item.stats.map((stat, si) => (
                  <div key={si} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    padding: "10px 14px",
                    background: "var(--bg)",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                  }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-2)", lineHeight: 1.4 }}>
                      {stat.label}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      color: "var(--accent)",
                      whiteSpace: "nowrap",
                    }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Authenticity note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            textAlign: "center",
            fontSize: "0.75rem",
            color: "var(--text-3)",
            fontFamily: "var(--font-geist-mono)",
            marginTop: "32px",
          }}
        >
          * Números de testes reais. Não precisam ser de clientes pagantes para serem evidência.
        </motion.p>
      </div>
    </section>
  )
}
