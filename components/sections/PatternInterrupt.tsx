"use client"

// PDF Seção 2.4 — Efeito Von Restorff (Isolamento / Pattern Interrupt)
// Quebra o ritmo visual do scroll. O cérebro lembra melhor de itens que se destacam.
// Posição ideal: entre a seção de Problema e o Funil Comparativo.

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function PatternInterrupt() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        background: "linear-gradient(135deg, rgba(74,222,128,0.07) 0%, rgba(74,222,128,0.03) 100%)",
        borderTop: "1px solid rgba(74,222,128,0.15)",
        borderBottom: "1px solid rgba(74,222,128,0.15)",
        padding: "48px 24px",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative quotes */}
      <div style={{
        position: "absolute",
        top: "-20px",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "8rem",
        color: "rgba(74,222,128,0.06)",
        fontFamily: "Georgia, serif",
        lineHeight: 1,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        "
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{
          fontSize: "clamp(1.25rem, 3vw, 2rem)",
          fontWeight: 700,
          color: "#f5f5f5",
          letterSpacing: "-0.025em",
          lineHeight: 1.35,
          maxWidth: "720px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        Enquanto você lê isso, 3 leads do seu cliente{" "}
        <span style={{ color: "var(--accent)" }}>acabaram de ser ignorados.</span>
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          marginTop: "16px",
          fontSize: "0.875rem",
          color: "var(--text-3)",
          fontFamily: "var(--font-geist-mono)",
          position: "relative",
          zIndex: 1,
        }}
      >
        78% dos leads são perdidos nos primeiros 5 minutos sem resposta
      </motion.p>
    </motion.div>
  )
}
