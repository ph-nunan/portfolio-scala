"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const feedEvents = [
  { icon: "↗", label: "Lead captado",           detail: "@Meta Ads",      time: "agora"    },
  { icon: "◎", label: "Respondido pela IA",      detail: "WhatsApp · 3s",  time: "há 3s"    },
  { icon: "◈", label: "Lead qualificado",        detail: "Score 87/100",   time: "há 2min"  },
  { icon: "↺", label: "Follow-up enviado",       detail: "2º contato",     time: "há 14min" },
  { icon: "✦", label: "Reunião agendada",        detail: "amanhã 10h",     time: "há 32min" },
  { icon: "✓", label: "Venda fechada",           detail: "R$ 4.800",       time: "há 1h"    },
]

const stats = [
  { value: "4.6×",  label: "Mais Fechamentos"     },
  { value: "<5s",   label: "Tempo de Resposta"     },
  { value: "24/7",  label: "Operação Automática"   },
]

const integrations = ["n8n", "WhatsApp", "OpenAI", "Meta Ads", "Google Ads", "Evolution API"]

function LiveFeed() {
  const [queue, setQueue] = useState(() =>
    feedEvents.slice(0, 4).map((e, i) => ({ ...e, id: i }))
  )
  const counterRef = useRef(4)

  useEffect(() => {
    const id = setInterval(() => {
      const idx = counterRef.current % feedEvents.length
      const newItem = { ...feedEvents[idx], id: counterRef.current }
      counterRef.current++
      setQueue((prev) => [newItem, ...prev.slice(0, 3)])
    }, 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay: 1.0 }}
      style={{
        maxWidth: "540px",
        margin: "0 auto 40px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        overflow: "hidden",
      }}
    >
      {/* Terminal chrome */}
      <div style={{
        padding: "10px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.015)",
      }}>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,95,87,0.55)", display: "block" }} />
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,189,46,0.4)", display: "block" }} />
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(40,200,64,0.4)", display: "block" }} />
        </div>
        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.625rem", color: "var(--text-3)", letterSpacing: "0.06em" }}>
          automation-feed · seu negócio
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", display: "block", animation: "pulse 1.5s ease-in-out infinite" }} />
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.5625rem", color: "var(--accent)", letterSpacing: "0.1em" }}>LIVE</span>
        </div>
      </div>

      {/* Feed rows */}
      <div style={{ overflow: "hidden" }}>
        <AnimatePresence mode="popLayout" initial={false}>
          {queue.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -36 }}
              animate={{ opacity: Math.max(0.12, 1 - i * 0.22), y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 16px",
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.03)" : "none",
              }}
            >
              <span style={{
                width: "26px", height: "26px", borderRadius: "6px",
                background: i === 0 ? "var(--accent-dim)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${i === 0 ? "var(--accent-border)" : "rgba(255,255,255,0.05)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.6875rem",
                color: i === 0 ? "var(--accent)" : "var(--text-3)",
                flexShrink: 0,
              }}>
                {item.icon}
              </span>
              <span style={{
                flex: 1,
                fontSize: "0.8125rem",
                color: i === 0 ? "rgba(245,245,245,0.95)" : "var(--text-2)",
                fontWeight: i === 0 ? 500 : 400,
              }}>
                {item.label}
              </span>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.625rem", color: "var(--text-3)", whiteSpace: "nowrap" }}>
                {item.detail}
              </span>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.5625rem", color: "var(--text-3)", whiteSpace: "nowrap", minWidth: "52px", textAlign: "right" }}>
                {item.time}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      paddingTop: "80px",
      paddingBottom: "40px",
    }}>
      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(255,255,255,0.045) 0%, transparent 70%)",
      }} />

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)",
      }} />

      <div style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        maxWidth: "760px",
        margin: "0 auto",
        padding: "0 24px",
        textAlign: "center",
      }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "5px 14px", marginBottom: "28px",
            borderRadius: "100px", border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "0.625rem", color: "var(--text-3)",
            fontFamily: "var(--font-geist-mono)", letterSpacing: "0.1em", textTransform: "uppercase",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", display: "inline-block", animation: "pulse 2s ease-in-out infinite", flexShrink: 0 }} />
          Automação · n8n · IA
        </motion.div>

        {/* Headline — line 1 */}
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{
            fontSize: "clamp(2.6rem, 8vw, 5.75rem)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.035em",
            color: "#f5f5f5",
            marginBottom: "10px",
          }}
        >
          Feche 4.6× Mais Vendas
        </motion.h1>

        {/* Headline — line 2 (accent) */}
        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{
            fontSize: "clamp(2.6rem, 8vw, 5.75rem)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.035em",
            color: "var(--accent)",
            marginBottom: "28px",
          }}
        >
          com os Mesmos Leads.
        </motion.p>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.75,
            color: "var(--text-2)",
            maxWidth: "520px",
            margin: "0 auto 32px",
          }}
        >
          Respondemos seus leads em segundos, qualificamos com IA e acompanhamos até o fechamento —{" "}
          <span style={{ color: "rgba(245,245,245,0.9)", fontWeight: 500 }}>sem aumentar sua equipe.</span>
        </motion.p>

        {/* Stats card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.46 }}
          style={{
            display: "flex",
            justifyContent: "center",
            maxWidth: "440px",
            margin: "0 auto 28px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{
              flex: 1,
              padding: "16px 12px",
              textAlign: "center",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "1.375rem", fontWeight: 700, color: "#f5f5f5", lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.5625rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "5px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.54 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "48px" }}
        >
          <a
            href="#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "13px 28px",
              background: "var(--accent)", color: "#0a0a0a",
              borderRadius: "8px", fontWeight: 700, fontSize: "0.9375rem",
              textDecoration: "none", transition: "opacity 0.2s",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Quero Fechar Mais →
          </a>
          <a
            href="#how-it-works"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "13px 24px",
              border: "1px solid rgba(255,255,255,0.1)", color: "#f5f5f5",
              borderRadius: "8px", fontSize: "0.875rem",
              textDecoration: "none", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Ver Como Funciona
          </a>
        </motion.div>

        {/* Live feed */}
        <LiveFeed />

        {/* Integrations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
        >
          <p style={{ fontSize: "0.5625rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Integrado com
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
            {integrations.map((tool) => (
              <span key={tool} className="tag">{tool}</span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
