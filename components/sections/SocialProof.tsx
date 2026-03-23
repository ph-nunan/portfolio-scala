"use client"

import { motion } from "framer-motion"

// Substitua pelos seus números reais
const signals = [
  { value: "34",     label: "automações entregues"           },
  { value: "7 dias", label: "do zero ao ecossistema rodando" },
  { value: "4.6×",   label: "mais fechamentos*"              },
  { value: "24/7",   label: "operação sem interrupção"       },
  { value: "8.2h",   label: "economizadas/cliente/mês"       },
  { value: "30 dias", label: "garantia ou reembolso total"   },
]

function SignalItem({ s, i, dimmed }: { s: { value: string; label: string }; i: number; dimmed?: boolean }) {
  return (
    <div
      aria-hidden={dimmed}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "16px 28px",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        flexShrink: 0,
        opacity: dimmed ? 0.5 : 1,
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
  )
}

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
        position: "relative",
      }}
    >
      {/* Fade masks on left/right */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to right, #1a1a1a, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to left, #1a1a1a, transparent)", zIndex: 2, pointerEvents: "none" }} />

      <div className="sp-marquee">
        {/* First set */}
        <div className="sp-track">
          {signals.map((s, i) => <SignalItem key={i} s={s} i={i} />)}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="sp-track" aria-hidden>
          {signals.map((s, i) => <SignalItem key={i} s={s} i={i} dimmed />)}
        </div>
      </div>
    </motion.div>
  )
}
