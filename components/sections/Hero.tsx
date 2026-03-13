"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { animate, useInView } from "framer-motion"

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return c.stop
  }, [inView, to])

  return <span ref={ref}>{val}{suffix}</span>
}

const words = ["Automatize", "Seu", "Ecossistema", "de", "Vendas", "com", "IA"]
// indices 5 ("com") and 6 ("IA") get accent color

const stats = [
  { display: null, value: 30, suffix: "%", label: "Leads Recuperados" },
  { display: null, value: 40, suffix: "h", label: "Economizadas / mês" },
  { display: "24/7", value: null, suffix: "", label: "Atendimento IA" },
]

const integrations = ["n8n", "WhatsApp", "OpenAI", "Meta Ads", "Google", "Evolution API"]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Radial center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(255,255,255,0.045) 0%, transparent 70%)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "960px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            marginBottom: "40px",
            borderRadius: "100px",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "0.6875rem",
            color: "var(--text-2)",
            fontFamily: "var(--font-geist-mono)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
              animation: "pulse 2s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          Automação com IA para Ecossistemas de Vendas
        </motion.div>

        {/* Headline — word blur reveal */}
        <h1
          style={{
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: "28px",
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(12px)", y: 16 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.25 + i * 0.07,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              style={{
                display: "inline-block",
                marginRight: "0.24em",
                color: i >= 5 ? "var(--accent)" : "#f5f5f5",
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.88 }}
          style={{
            color: "var(--text-2)",
            fontSize: "1.0625rem",
            lineHeight: 1.75,
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}
        >
          Do tráfego pago ao fechamento. Do primeiro contato ao follow-up.{" "}
          <span style={{ color: "rgba(245,245,245,0.85)", fontWeight: 500 }}>
            Tudo no piloto automático.
          </span>{" "}
          Recupere leads perdidos, automatize o atendimento e escale suas vendas sem aumentar sua equipe.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", alignItems: "center", marginBottom: "56px" }}
        >
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "var(--accent)",
              color: "#0a0a0a",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.875rem",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Agendar Diagnóstico Gratuito
          </a>
          <a
            href="#how-it-works"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f5f5f5",
              borderRadius: "8px",
              fontSize: "0.875rem",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Ver Como Funciona
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", marginBottom: "40px" }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "16px 32px",
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <span style={{ fontSize: "1.5rem", color: "#f5f5f5", fontFamily: "var(--font-geist-mono)", fontWeight: 700 }}>
                {s.display ?? <Counter to={s.value!} suffix={s.suffix} />}
              </span>
              <span style={{ fontSize: "0.6875rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Social proof — integrations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
        >
          <p style={{ fontSize: "0.6875rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
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
