"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState } from "react"

const steps = [
  {
    num: "01", icon: "↗", label: "Tráfego",
    tagline: "Google & Meta Ads via IA",
    description: "A IA cria, monitora e otimiza suas campanhas em tempo real, por comandos simples — ajusta lances, pausa o que não converte e escala o que funciona. Você define os objetivos uma vez; a automação executa 24/7.",
    features: [
      "Otimização de lances via API do Google e Meta Ads",
      "Alertas automáticos de anomalia em CPL e ROAS",
      "Relatório de performance enviado automaticamente",
    ],
    kpi: "ROAS ↑  ·  CPL ↓",
  },
  {
    num: "02", icon: "◎", label: "Captura",
    tagline: "Lead entra no funil em segundos",
    description: "Cada lead captado — de formulário, WhatsApp ou landing page — é registrado e categorizado automaticamente por origem, campanha e intenção. Zero latência entre clique e primeiro contato.",
    features: [
      "Integração com qualquer formulário ou landing page",
      "Classificação automática por canal e campanha",
      "Disparo imediato do fluxo de atendimento",
    ],
    kpi: "Latência < 3s",
  },
  {
    num: "03", icon: "◈", label: "Atendimento",
    tagline: "IA responde em menos de 5 segundos",
    description: "A IA atende o lead via WhatsApp Business API oficial em segundos, coleta dados, responde dúvidas e agenda reuniões — 24 horas por dia, sem custo de equipe adicional.",
    features: [
      "WhatsApp Business API oficial — sem risco de ban",
      "Qualificação automática com score 0–100",
      "Agendamento automático no Google Calendar",
    ],
    kpi: "24/7  ·  < 5s",
  },
  {
    num: "04", icon: "◉", label: "Qualificação",
    tagline: "Score automático de cada lead",
    description: "Cada conversa é analisada pela IA. O lead recebe um score baseado em perfil, intenção e engajamento. Leads quentes vão direto para vendas; frios entram em nutrição automática.",
    features: [
      "Score 0–100 com critérios personalizados",
      "Segmentação: quente · morno · frio",
      "Roteamento automático para vendas ou nutrição",
    ],
    kpi: "Conversão ↑ 4.6×",
  },
  {
    num: "05", icon: "≡", label: "CRM",
    tagline: "Atualizado sem intervenção humana",
    description: "O CRM é preenchido automaticamente a cada interação. Histórico completo, tags de segmentação e sugestão de próxima ação — sem o vendedor precisar digitar nada.",
    features: [
      "Atualização automática a cada interação",
      "Histórico completo de conversas e eventos",
      "Próxima ação sugerida por IA",
    ],
    kpi: "40h/mês economizadas",
  },
  {
    num: "06", icon: "↺", label: "Follow-up",
    tagline: "Mensagens com contexto real",
    description: "O follow-up usa o contexto real da conversa anterior para criar mensagens personalizadas. O lead não sente que está em uma lista — sente que foi lembrado. Churn cai. LTV sobe.",
    features: [
      "Mensagens personalizadas com contexto real da conversa",
      "Sequências automáticas por estágio do funil",
      "Detecção de interesse para acionar vendedor",
    ],
    kpi: "Churn ↓  ·  LTV ↑",
  },
  {
    num: "07", icon: "✦", label: "Pós-venda",
    tagline: "Relatórios automáticos ao cliente",
    description: "Após o fechamento, o cliente recebe relatórios personalizados via WhatsApp automaticamente — performance das campanhas, resultados do período e insights acionáveis. Retenção no piloto automático.",
    features: [
      "Relatório de campanha gerado e enviado automaticamente no WhatsApp ou email",
      "Dashboard personalizado por cliente",
      "Touchpoints de retenção e upsell programados",
    ],
    kpi: "Retenção ↑  ·  NPS ↑",
  },
]

export default function Ecosystem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [active, setActive] = useState(0)

  const step = steps[active]

  return (
    <section ref={ref} id="ecosystem" className="s-wrap">
      <div className="s-inner">

        {/* Header */}
        <motion.div
          className="s-head"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="s-label">Ecossistema</p>
          <h2 className="s-title">Do Anúncio ao Relatório, em 7 Etapas</h2>
          <p className="s-sub">Cada etapa é automatizada e conectada à próxima. Clique para explorar.</p>
        </motion.div>

        {/* ── PIPELINE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Node track */}
          <div style={{ position: "relative", marginBottom: "24px" }}>

            {/* Base connecting line */}
            <div style={{
              position: "absolute",
              top: "19px",
              left: 0, right: 0,
              height: "1px",
              background: "rgba(255,255,255,0.07)",
              zIndex: 0,
            }} />

            {/* Animated progress line */}
            <motion.div
              style={{
                position: "absolute",
                top: "19px",
                left: 0,
                height: "1px",
                background: "linear-gradient(to right, var(--accent), rgba(74,222,128,0.5))",
                zIndex: 0,
              }}
              initial={{ width: "0%" }}
              animate={inView ? { width: `${(active / (steps.length - 1)) * 100}%` } : { width: "0%" }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            />

            {/* Nodes */}
            <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
              {steps.map((s, i) => {
                const isActive = active === i
                const isPast = i < active
                return (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      padding: "0", display: "flex", flexDirection: "column",
                      alignItems: "center", gap: "8px", outline: "none",
                    }}
                  >
                    {/* Circle */}
                    <motion.div
                      animate={{
                        background: isActive ? "var(--accent-dim)" : isPast ? "rgba(74,222,128,0.06)" : "var(--surface)",
                        borderColor: isActive ? "var(--accent)" : isPast ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.1)",
                        scale: isActive ? 1.18 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      style={{
                        width: "38px", height: "38px", borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "var(--surface)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.875rem",
                        color: isActive ? "var(--accent)" : isPast ? "rgba(74,222,128,0.6)" : "var(--text-3)",
                        transition: "color 0.2s",
                        boxShadow: isActive ? "0 0 0 4px rgba(74,222,128,0.08)" : "none",
                      }}
                    >
                      {s.icon}
                    </motion.div>
                    {/* Step number */}
                    <span style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.5rem",
                      color: isActive ? "var(--accent)" : "var(--text-3)",
                      letterSpacing: "0.08em",
                      transition: "color 0.2s",
                    }}>{s.num}</span>
                    {/* Label */}
                    <span className="eco-node-label" style={{
                      fontSize: "0.6875rem",
                      color: isActive ? "#f5f5f5" : "var(--text-3)",
                      fontWeight: isActive ? 500 : 400,
                      transition: "color 0.2s",
                      whiteSpace: "nowrap",
                    }}>{s.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              {/* Panel header */}
              <div style={{
                padding: "18px 28px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.015)",
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap", gap: "12px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <span style={{
                    fontFamily: "var(--font-geist-mono)", fontSize: "0.625rem",
                    color: "var(--accent)", background: "var(--accent-dim)",
                    border: "1px solid var(--accent-border)",
                    padding: "3px 10px", borderRadius: "100px", letterSpacing: "0.06em",
                  }}>{step.num}</span>
                  <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#f5f5f5", letterSpacing: "-0.02em" }}>
                    {step.label}
                  </h3>
                  <span style={{ fontSize: "0.8125rem", color: "var(--text-2)" }}>
                    — {step.tagline}
                  </span>
                </div>
                <span style={{
                  fontFamily: "var(--font-geist-mono)", fontSize: "0.5625rem",
                  color: "var(--accent)", background: "var(--accent-dim)",
                  border: "1px solid var(--accent-border)",
                  padding: "4px 12px", borderRadius: "100px", letterSpacing: "0.08em",
                  whiteSpace: "nowrap",
                }}>{step.kpi}</span>
              </div>

              {/* Panel body */}
              <div className="eco-panel-body">
                <p style={{ fontSize: "0.9rem", color: "var(--text-2)", lineHeight: 1.75 }}>
                  {step.description}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {step.features.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.07 }}
                      style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
                    >
                      <span style={{
                        width: "16px", height: "16px", borderRadius: "50%",
                        background: "var(--accent-dim)", border: "1px solid var(--accent-border)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, fontSize: "0.45rem", color: "var(--accent)", marginTop: "2px",
                      }}>✓</span>
                      <span style={{ fontSize: "0.875rem", color: "rgba(245,245,245,0.85)", lineHeight: 1.55 }}>
                        {f}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next + counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
            style={{ marginTop: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <button
              onClick={() => setActive(a => Math.max(0, a - 1))}
              disabled={active === 0}
              style={{
                background: "none", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px", padding: "6px 14px",
                cursor: active === 0 ? "not-allowed" : "pointer",
                color: active === 0 ? "var(--text-3)" : "var(--text-2)",
                fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)",
                transition: "all 0.2s", opacity: active === 0 ? 0.4 : 1,
              }}
            >← anterior</button>

            <span style={{
              fontFamily: "var(--font-geist-mono)", fontSize: "0.5625rem",
              color: "var(--text-3)", letterSpacing: "0.08em",
            }}>
              {active + 1} / {steps.length}
            </span>

            <button
              onClick={() => setActive(a => Math.min(steps.length - 1, a + 1))}
              disabled={active === steps.length - 1}
              style={{
                background: "none", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px", padding: "6px 14px",
                cursor: active === steps.length - 1 ? "not-allowed" : "pointer",
                color: active === steps.length - 1 ? "var(--text-3)" : "var(--text-2)",
                fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)",
                transition: "all 0.2s", opacity: active === steps.length - 1 ? 0.4 : 1,
              }}
            >próximo →</button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
