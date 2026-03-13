"use client"

import { motion } from "framer-motion"

// Substitua pelos seus números reais
const signals = [
  { value: "30+",    label: "automações entregues"           },
  { value: "7 dias", label: "do zero ao ecossistema rodando" },
  { value: "100%",   label: "garantia de resultado"          },
  { value: "24/7",   label: "operação sem interrupção"       },
  { value: "R$ 0",   label: "de risco para você"             },
]

export default function SocialProof() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.015)",
        overflow: "hidden",
      }}
    >
      <div className="sp-inner" style={{
        display: "flex",
        alignItems: "stretch",
        overflowX: "auto",
        scrollbarWidth: "none",
      }}>
        {signals.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 32px",
              borderRight: i < signals.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              flexShrink: 0,
            }}
          >
            <span style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.9375rem",
              fontWeight: 700,
              color: "#f5f5f5",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}>
              {s.value}
            </span>
            <span style={{
              fontSize: "0.75rem",
              color: "var(--text-3)",
              whiteSpace: "nowrap",
            }}>
              {s.label}
            </span>
          </div>
        ))}

        {/* Repeat for visual fullness on wide screens */}
        {signals.map((s, i) => (
          <div
            key={`r-${i}`}
            aria-hidden
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 32px",
              borderRight: i < signals.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              flexShrink: 0,
              opacity: 0.4,
            }}
          >
            <span style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.9375rem",
              fontWeight: 700,
              color: "#f5f5f5",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}>
              {s.value}
            </span>
            <span style={{
              fontSize: "0.75rem",
              color: "var(--text-3)",
              whiteSpace: "nowrap",
            }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
