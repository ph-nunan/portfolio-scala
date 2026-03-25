"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const feedEvents = [
  { icon: "⏸", label: "Campanha pausada automaticamente", detail: "CPL acima do limite · Meta", time: "agora"    },
  { icon: "◎", label: "Lead captado e registrado",        detail: "@Meta Ads · Formulário",    time: "há 3s"    },
  { icon: "◈", label: "Respondido e qualificado",         detail: "WhatsApp · Score 91/100",   time: "há 48s"   },
  { icon: "↗", label: "ROAS subiu 23% após otimização",   detail: "Google Ads · automático",   time: "há 1min"  },
  { icon: "≡", label: "CRM atualizado",                   detail: "Sem intervenção humana",    time: "há 2min"  },
  { icon: "◐", label: "Novo criativo ativado pela IA",    detail: "CTR caiu — A/B ativado",    time: "há 8min"  },
  { icon: "↺", label: "Follow-up personalizado",          detail: "2º contato · contexto real", time: "há 14min" },
  { icon: "✦", label: "Relatório enviado ao cliente",     detail: "WhatsApp · automático",     time: "há 1h"    },
]

const integrations = ["n8n", "WhatsApp Business API", "OpenAI", "Claude", "Meta Ads", "Google Ads", "Firecrawl", "Apify"]

export default function HeroLiveFeed() {
  const [queue, setQueue] = useState(() =>
    feedEvents.map((e, i) => ({ ...e, id: i }))
  )
  const counterRef = useRef(feedEvents.length)

  useEffect(() => {
    const id = setInterval(() => {
      const idx = counterRef.current % feedEvents.length
      const newItem = { ...feedEvents[idx], id: counterRef.current }
      counterRef.current++
      setQueue((prev) => [newItem, ...prev.slice(0, 5)])
    }, 4000)
    return () => clearInterval(id)
  }, [])

  const visible = queue.slice(0, 4)

  return (
    <>
      {/* Live feed */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, delay: 0.6 }}
        style={{
          maxWidth: "560px",
          margin: "0 auto 40px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          overflow: "hidden",
        }}
      >
        {/* Terminal chrome */}
        <div style={{
          padding: "10px 18px",
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
            ecosystem-feed · seu negócio
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", display: "block", animation: "pulse 1.5s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.5625rem", color: "var(--accent)", letterSpacing: "0.1em" }}>LIVE</span>
          </div>
        </div>

        {/* Feed */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "56px",
            background: "linear-gradient(to bottom, transparent, var(--surface))",
            zIndex: 2, pointerEvents: "none",
          }} />
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "11px 18px",
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                }}
              >
                <span style={{
                  width: "28px", height: "28px", borderRadius: "7px",
                  background: i === 0 ? "var(--accent-dim)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${i === 0 ? "var(--accent-border)" : "rgba(255,255,255,0.05)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", color: i === 0 ? "var(--accent)" : "var(--text-3)",
                  flexShrink: 0, transition: "all 0.3s",
                }}>{item.icon}</span>
                <span className="feed-label" style={{
                  flex: 1, fontSize: "0.8125rem",
                  color: i === 0 ? "rgba(245,245,245,0.95)" : "rgba(245,245,245,0.45)",
                  fontWeight: i === 0 ? 500 : 400, transition: "color 0.3s",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>{item.label}</span>
                <span className="feed-detail" style={{
                  fontFamily: "var(--font-geist-mono)", fontSize: "0.625rem",
                  color: i === 0 ? "var(--text-2)" : "rgba(255,255,255,0.2)",
                  whiteSpace: "nowrap", transition: "color 0.3s",
                }}>{item.detail}</span>
                <span style={{
                  fontFamily: "var(--font-geist-mono)", fontSize: "0.5625rem",
                  color: i === 0 ? "var(--text-3)" : "rgba(255,255,255,0.15)",
                  whiteSpace: "nowrap", minWidth: "52px", textAlign: "right", transition: "color 0.3s",
                }}>{item.time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Integrations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
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
    </>
  )
}
