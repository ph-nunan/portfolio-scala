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

// PDF seção 5.1 — Transparência Radical
const naoFaz = [
  "Não transforma um produto ruim em vendas",
  "Não substitui uma boa oferta",
  "Não funciona sem tráfego pago rodando",
]

const faz = [
  "Garante que nenhum lead seja ignorado",
  "Responde em 3 segundos, 24 horas por dia",
  "Libera 40+ horas/mês do seu time",
]

export default function Founder() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="s-wrap">
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
                34 automações
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-2)", whiteSpace: "nowrap" }}>
                entregues até hoje
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

            {/* Headline */}
            <h2 style={{
              fontSize: "2rem", fontWeight: 700,
              letterSpacing: "-0.03em", lineHeight: 1.15,
              marginBottom: "24px",
            }}>
              <span style={{ color: "#f5f5f5" }}>Tecnologia com visão</span>
              <br />
              <span className="mark">de negócio.</span>
            </h2>

            {/* PDF 5.2 — Storytelling pessoal (3 frases. Problema real. Motivação. Missão.) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-2)", lineHeight: 1.75, fontStyle: "italic", borderLeft: "2px solid var(--accent-border)", paddingLeft: "16px" }}>
                "Trabalhei 5 anos em marketing digital. Vi de perto gestores de tráfego gerando centenas de leads por dia — e perdendo a maioria por falta de velocidade no atendimento. O problema nunca foi o tráfego. Era o que acontecia depois do clique. Foi por isso que criei a Scala: para que nenhum lead seja desperdiçado."
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-2)", lineHeight: 1.7 }}>
                Hoje, com n8n, IA e automações construídas para o contexto real de agências e gestores brasileiros, entrego um ecossistema que funciona{" "}
                <strong style={{ color: "#f5f5f5" }}>24/7 sem precisar de mim para operar.</strong>
              </p>
            </div>

            {/* Credential pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "28px" }}>
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

        {/* PDF 5.1 — Transparência Radical */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: "64px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
          className="transparency-grid"
        >
          {/* O que NÃO faz */}
          <div style={{
            background: "rgba(255,80,80,0.03)",
            border: "1px solid rgba(255,80,80,0.15)",
            borderRadius: "16px",
            padding: "28px",
          }}>
            <p style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "rgba(255,100,100,0.7)",
              marginBottom: "20px",
            }}>
              O que a automação NÃO faz
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {naoFaz.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "rgba(255,100,100,0.6)", fontSize: "0.75rem", marginTop: "1px", flexShrink: 0 }}>✗</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-2)", lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* O que FAZ */}
          <div style={{
            background: "var(--accent-dim)",
            border: "1px solid var(--accent-border)",
            borderRadius: "16px",
            padding: "28px",
          }}>
            <p style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--accent)",
              marginBottom: "20px",
            }}>
              O que a automação FAZ
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {faz.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "var(--accent)", fontSize: "0.75rem", marginTop: "1px", flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: "0.85rem", color: "rgba(245,245,245,0.85)", lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
            <p style={{
              marginTop: "20px",
              fontSize: "0.75rem",
              color: "var(--text-2)",
              fontStyle: "italic",
              lineHeight: 1.6,
              borderTop: "1px solid rgba(74,222,128,0.1)",
              paddingTop: "16px",
            }}>
              "Se ele está me dizendo o que NÃO faz, posso confiar no que ele diz que faz."
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
