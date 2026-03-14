"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

/* ── Visual Mockups ─────────────────────────────────── */

function DiagnosticMockup() {
  const items = [
    { label: "Tráfego Pago", status: "ok" },
    { label: "Atendimento / Speed-to-lead", status: "error" },
    { label: "Qualificação de Leads", status: "error" },
    { label: "Follow-up Pós-contato", status: "error" },
  ]
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "14px",
      overflow: "hidden",
    }}>
      {/* Chrome */}
      <div style={{
        padding: "10px 16px",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: "6px",
        background: "var(--surface-2)",
      }}>
        {["rgba(255,80,80,0.55)", "rgba(255,180,0,0.45)", "rgba(74,222,128,0.45)"].map((c, i) => (
          <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />
        ))}
        <span style={{ marginLeft: "8px", fontFamily: "var(--font-geist-mono)", fontSize: "0.5rem", color: "var(--text-3)", letterSpacing: "0.04em" }}>
          diagnóstico — ecossistema de vendas
        </span>
      </div>
      {/* Audit items */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "10px 14px", background: "var(--bg)", borderRadius: "8px", border: "1px solid var(--border)" }}>
            <span style={{ fontSize: "0.8125rem", color: "var(--text-2)" }}>{item.label}</span>
            <span style={{
              fontFamily: "var(--font-geist-mono)", fontSize: "0.5625rem", fontWeight: 600,
              padding: "2px 10px", borderRadius: "100px",
              background: item.status === "ok" ? "rgba(74,222,128,0.1)" : "rgba(255,80,80,0.1)",
              color: item.status === "ok" ? "#4ade80" : "#ff6060",
              border: `1px solid ${item.status === "ok" ? "rgba(74,222,128,0.2)" : "rgba(255,80,80,0.2)"}`,
            }}>
              {item.status === "ok" ? "OK" : "Gargalo"}
            </span>
          </div>
        ))}
        {/* Summary */}
        <div style={{ marginTop: "8px", padding: "12px 14px", borderRadius: "8px", background: "rgba(255,80,80,0.05)", border: "1px solid rgba(255,80,80,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>Gargalos identificados</span>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "1rem", fontWeight: 700, color: "#ff6060" }}>3</span>
        </div>
      </div>
    </div>
  )
}

function WorkflowMockup() {
  const nodes = [
    { label: "WhatsApp", sub: "novo lead", color: "#4ade80" },
    { label: "n8n", sub: "automação", color: "#ffffff" },
    { label: "CRM", sub: "registro", color: "#4ade80" },
  ]
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "14px",
      overflow: "hidden",
    }}>
      {/* Chrome */}
      <div style={{
        padding: "10px 16px",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: "6px",
        background: "var(--surface-2)",
      }}>
        {["rgba(255,80,80,0.55)", "rgba(255,180,0,0.45)", "rgba(74,222,128,0.45)"].map((c, i) => (
          <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />
        ))}
        <span style={{ marginLeft: "8px", fontFamily: "var(--font-geist-mono)", fontSize: "0.5rem", color: "var(--text-3)", letterSpacing: "0.04em" }}>
          n8n — workflow editor
        </span>
      </div>
      <div style={{ padding: "24px" }}>
        {/* Node flow row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", marginBottom: "20px" }}>
          {nodes.map((n, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                padding: "12px 16px", borderRadius: "10px",
                background: "var(--bg)", border: `1px solid ${i === 1 ? "rgba(255,255,255,0.15)" : "var(--border)"}`,
                minWidth: "80px",
              }}>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6875rem", fontWeight: 700, color: n.color }}>{n.label}</span>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.4375rem", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{n.sub}</span>
              </div>
              {i < nodes.length - 1 && (
                <div style={{ width: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: "20px", height: "1px", background: "var(--border)" }} />
                  <span style={{ fontSize: "0.5rem", color: "var(--text-3)", marginLeft: "-2px" }}>›</span>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Secondary branches */}
        <div style={{ display: "flex", gap: "8px" }}>
          {["IA Agent — qualificação", "Follow-up — sequência", "Relatório — auto"].map((label, i) => (
            <div key={i} style={{
              flex: 1, padding: "8px 10px", borderRadius: "8px", textAlign: "center",
              background: "var(--bg)", border: "1px solid var(--border)",
            }}>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.4375rem", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "16px", padding: "10px 14px", background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: "8px", textAlign: "center" }}>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.5625rem", color: "#4ade80" }}>✓ Workflow ativo — 7 dias de implementação</span>
        </div>
      </div>
    </div>
  )
}

function DashboardMockup() {
  const metrics = [
    { label: "Leads Atendidos", value: "247", sub: "este mês", delta: "+62%" },
    { label: "Taxa de Conv.", value: "14%", sub: "do funil total", delta: "+11pp" },
    { label: "Tempo Resposta", value: "<5s", sub: "ao novo lead", delta: "antes: 4h" },
  ]
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "14px",
      overflow: "hidden",
    }}>
      {/* Chrome */}
      <div style={{
        padding: "10px 16px",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "var(--surface-2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {["rgba(255,80,80,0.55)", "rgba(255,180,0,0.45)", "rgba(74,222,128,0.45)"].map((c, i) => (
            <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />
          ))}
          <span style={{ marginLeft: "8px", fontFamily: "var(--font-geist-mono)", fontSize: "0.5rem", color: "var(--text-3)", letterSpacing: "0.04em" }}>
            dashboard — tempo real
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", animation: "pulse 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.4375rem", color: "#4ade80" }}>LIVE</span>
        </div>
      </div>
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {metrics.map((m, i) => (
          <div key={i} style={{
            padding: "14px 16px", borderRadius: "10px",
            background: "var(--bg)", border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.5rem", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>{m.label}</p>
              <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "1.25rem", fontWeight: 700, color: "#f5f5f5", lineHeight: 1 }}>{m.value}</p>
              <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.4375rem", color: "var(--text-3)", marginTop: "2px" }}>{m.sub}</p>
            </div>
            <span style={{
              fontFamily: "var(--font-geist-mono)", fontSize: "0.5625rem", fontWeight: 600,
              padding: "3px 10px", borderRadius: "100px",
              background: "rgba(74,222,128,0.1)", color: "#4ade80",
              border: "1px solid rgba(74,222,128,0.2)",
            }}>{m.delta}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Main Component ─────────────────────────────────── */

const steps = [
  {
    num: "01", time: "30 MIN",
    title: "Diagnóstico Gratuito",
    desc: "Analisamos seu ecossistema de vendas atual: tráfego, atendimento, CRM e follow-up. Identificamos os gargalos que estão fazendo você perder dinheiro.",
    note: "Consultoria sem compromisso — você decide se faz sentido",
    cta: { label: "Agendar Meu Diagnóstico →", href: "#contact" },
    visual: "diagnostic" as const,
    flip: false,
  },
  {
    num: "02", time: "7 DIAS",
    title: "Implementação em 7 Dias",
    desc: "Construímos seus fluxos de automação no n8n, configuramos a IA de atendimento e integramos tudo ao seu CRM. Você não precisa entender de tecnologia.",
    note: "Setup completo com treinamento da equipe",
    visual: "workflow" as const,
    flip: true,
  },
  {
    num: "03", time: "24/7",
    title: "Escala no Piloto Automático",
    desc: "Seu ecossistema de vendas funciona 24/7. Leads são atendidos em segundos, qualificados automaticamente e acompanhados até o fechamento.",
    note: "Suporte contínuo + otimizações mensais",
    visual: "dashboard" as const,
    flip: false,
  },
]

function StepVisual({ type }: { type: "diagnostic" | "workflow" | "dashboard" }) {
  if (type === "diagnostic") return <DiagnosticMockup />
  if (type === "workflow") return <WorkflowMockup />
  return <DashboardMockup />
}

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
            Simples, rápido e sem dor de cabeça. Você foca no estratégico,
            a tecnologia cuida do operacional.
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="hiw-zigzag-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "56px",
                alignItems: "center",
                direction: step.flip ? "rtl" : "ltr",
              }}
            >
              {/* Text side */}
              <div style={{ direction: "ltr" }}>
                {/* Step badge row */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                  <span style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.625rem",
                    color: "var(--accent)",
                    background: "var(--accent-dim)",
                    border: "1px solid var(--accent-border)",
                    padding: "3px 12px",
                    borderRadius: "100px",
                    letterSpacing: "0.06em",
                  }}>
                    {step.num}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--text-3)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "3px 10px",
                    borderRadius: "100px",
                    letterSpacing: "0.06em",
                  }}>
                    {step.time}
                  </span>
                </div>

                {/* Ghost number */}
                <div style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "4.5rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.04)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  marginBottom: "12px",
                  userSelect: "none",
                }}>
                  {step.num}
                </div>

                <h3 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--text)", marginBottom: "14px", letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-2)", lineHeight: 1.75, marginBottom: "24px" }}>
                  {step.desc}
                </p>

                <div style={{ paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <p style={{ fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)", color: "var(--text-3)", marginBottom: step.cta ? "20px" : "0" }}>
                    {step.note}
                  </p>
                  {step.cta && (
                    <a
                      href={step.cta.href}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "11px 24px",
                        background: "var(--accent)",
                        color: "#0a0a0a",
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      {step.cta.label}
                    </a>
                  )}
                </div>
              </div>

              {/* Visual side */}
              <div style={{ direction: "ltr" }}>
                <StepVisual type={step.visual} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
