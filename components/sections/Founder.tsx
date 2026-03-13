"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const credentials = [
  { icon: "▦", label: "5 anos em Marketing Digital" },
  { icon: "</>", label: "3 anos em Programação" },
  { icon: "⚡", label: "Especialista em n8n & IA" },
  { icon: "◎", label: "Ecossistemas de Vendas Automatizados" },
]

export default function Founder() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="founder" ref={ref} className="s-wrap">
      <div className="s-inner">
        <div className="founder-layout">

          {/* ── Left: Photo column ── */}
          <motion.div
            className="founder-photo-col"
            initial={{ opacity: 0, x: -28, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Photo frame */}
            <div style={{
              position: "relative",
              width: "100%",
              borderRadius: "16px",
              overflow: "hidden",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              aspectRatio: "4/5",
            }}>
              <Image
                src="/paulo.jpg"
                alt="Paulo Nunan — Founder Scala"
                fill
                style={{ objectFit: "cover", filter: "grayscale(100%)" }}
                priority
              />
              {/* Bottom gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, transparent 55%, rgba(10,10,10,0.6) 100%)",
                pointerEvents: "none",
              }} />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{
                position: "absolute",
                bottom: "20px",
                right: "-16px",
                background: "rgba(10,10,10,0.94)",
                border: "1px solid var(--accent-border)",
                backdropFilter: "blur(20px)",
                borderRadius: "12px",
                padding: "14px 18px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              <p style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "1.125rem", fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1, marginBottom: "4px",
                background: "linear-gradient(135deg, #ffffff 0%, #b0b0b0 50%, #e8e8e8 100%)",
                WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                +8 anos
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-2)", whiteSpace: "nowrap" }}>
                Tecnologia & Marketing
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: Text column ── */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
            initial={{ opacity: 0, x: 28, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <p className="s-label" style={{ marginBottom: "20px" }}>Quem está por trás</p>

            {/* Headline com hierarquia */}
            <h2 style={{
              fontSize: "2rem", fontWeight: 700,
              letterSpacing: "-0.03em", lineHeight: 1.15,
              marginBottom: "32px",
            }}>
              <span style={{ color: "#f5f5f5" }}>Tecnologia com visão</span>
              <br />
              <span className="mark">de negócio.</span>
            </h2>

            {/* Paragraphs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "36px" }}>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-2)", lineHeight: 1.75 }}>
                Com 5 anos imerso no marketing digital e 3 anos em programação, eu entendo os
                dois lados da moeda:{" "}
                <strong style={{ color: "#f5f5f5", fontWeight: 600 }}>
                  a estratégia que vende e a tecnologia que escala.
                </strong>
              </p>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-2)", lineHeight: 1.75 }}>
                Migrei para a gestão de automação porque vi que a maioria das empresas perde
                dinheiro não por falta de tráfego,{" "}
                <strong style={{ color: "#f5f5f5", fontWeight: 600 }}>mas por falta de processo.</strong>{" "}
                Leads que não são respondidos, follow-ups que não acontecem, relatórios que ninguém gera.
              </p>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-2)", lineHeight: 1.75 }}>
                Minha missão é simples:{" "}
                <strong style={{ color: "#f5f5f5", fontWeight: 600 }}>
                  transformar seu ecossistema de vendas em uma máquina que funciona 24/7
                </strong>
                , usando n8n, inteligência artificial e automações que trabalham enquanto você dorme.
              </p>
            </div>

            {/* Credential pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "36px" }}>
              {credentials.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: "8px", padding: "8px 14px",
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: "var(--accent)" }}>{c.icon}</span>
                  <span style={{ fontSize: "0.8125rem", color: "var(--text-2)", whiteSpace: "nowrap" }}>
                    {c.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* LinkedIn CTA */}
            <a
              href="https://linkedin.com/in/paulonunan"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontSize: "0.9rem", color: "var(--text-2)", textDecoration: "none",
                transition: "color 0.2s", width: "fit-content",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
            >
              <span>🔗</span>
              Conecte-se no LinkedIn →
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
