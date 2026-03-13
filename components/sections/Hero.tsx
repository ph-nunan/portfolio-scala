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

const stats = [
  { display: null, value: 30, suffix: "%", label: "Leads Recuperados" },
  { display: null, value: 40, suffix: "h", label: "Economizadas / mês" },
  { display: "24/7", value: null, suffix: "", label: "Atendimento IA" },
]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Radial center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(255,255,255,0.045) 0%, transparent 70%)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-10 rounded-full"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "0.6875rem",
            color: "var(--text-2)",
            fontFamily: "var(--font-geist-mono)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.5)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          Automação com IA para Ecossistemas de Vendas
        </motion.div>

        {/* Headline — word blur reveal */}
        <h1
          className="font-bold leading-none tracking-tight mb-7"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
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
              className="inline-block"
              style={{ marginRight: "0.24em", color: "#f5f5f5" }}
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
            lineHeight: "1.75",
            maxWidth: "600px",
            margin: "0 auto 2.5rem",
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
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16"
        >
          <a
            href="#contact"
            className="px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 w-full sm:w-auto text-center"
            style={{ background: "#f5f5f5", color: "#0a0a0a" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e0e0e0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f5f5f5")}
          >
            Agendar Diagnóstico Gratuito
          </a>
          <a
            href="#how-it-works"
            className="px-6 py-3 text-sm text-white rounded-lg transition-all duration-200 w-full sm:w-auto text-center"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            Ver Como Funciona
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center"
          style={{ gap: 0 }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center px-8 py-4"
              style={{
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <span
                className="font-bold"
                style={{ fontSize: "1.5rem", color: "#f5f5f5", fontFamily: "var(--font-geist-mono)" }}
              >
                {s.display ?? <Counter to={s.value!} suffix={s.suffix} />}
              </span>
              <span
                className="mt-0.5"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--text-3)",
                  fontFamily: "var(--font-geist-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
