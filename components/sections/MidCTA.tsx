"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function MidCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="s-wrap">
      <div className="s-inner" style={{ textAlign: "center" }}>
        <motion.p
          className="s-label"
          style={{ justifyContent: "center", display: "block" }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Calculadora de Perda
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "20px" }}
        >
          Quanto você está perdendo
          <br />
          <span style={{ color: "var(--text-2)" }}>por mês sem automação?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ color: "var(--text-2)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "40px", maxWidth: "480px", margin: "0 auto 40px" }}
        >
          A maioria das empresas perde entre{" "}
          <span style={{ color: "#f5f5f5", fontWeight: 500 }}>R$ 5.000</span> e{" "}
          <span style={{ color: "#f5f5f5", fontWeight: 500 }}>R$ 30.000/mês</span>{" "}
          em leads que não são atendidos a tempo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
              background: "#f5f5f5",
              color: "#0a0a0a",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.875rem",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e0e0e0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f5f5f5")}
          >
            Calcular Minha Perda
            <span style={{ opacity: 0.5 }}>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
