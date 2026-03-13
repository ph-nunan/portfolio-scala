"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="how-it-works" ref={ref} className="s-wrap">
      <div className="s-inner">
        <motion.div
          className="s-head"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="s-label">Como Funciona</p>
          <h2 className="s-title">Do Diagnóstico à Escala em 3 Passos</h2>
          <p className="s-sub">
            Simples, rápido e sem dor de cabeça. Você foca no estratégico,
            a tecnologia cuida do operacional.
          </p>
        </motion.div>

        {/* Split layout: Step 01 hero (left) + Steps 02–03 stacked (right) */}
        <div className="hiw-grid">

          {/* ── Step 01 — Hero card ── */}
          <motion.div
            initial={{ opacity: 0, x: -24, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Top row: step badge + time badge */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <span style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.625rem",
                color: "var(--accent)",
                background: "var(--accent-dim)",
                border: "1px solid var(--accent-border)",
                padding: "3px 10px",
                borderRadius: "100px",
                letterSpacing: "0.06em",
              }}>
                01
              </span>
              <span style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.6875rem",
                color: "var(--text-3)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "3px 10px",
                borderRadius: "100px",
                letterSpacing: "0.06em",
              }}>
                30 MIN
              </span>
            </div>

            {/* Big ghost number */}
            <div style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "6rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.04)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              marginBottom: "20px",
              userSelect: "none",
            }}>
              01
            </div>

            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f5f5f5", marginBottom: "12px", letterSpacing: "-0.02em" }}>
              Diagnóstico Gratuito
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-2)", lineHeight: 1.7, marginBottom: "24px", flex: 1 }}>
              Analisamos seu ecossistema de vendas atual: tráfego, atendimento, CRM e
              follow-up. Identificamos os gargalos que estão fazendo você perder dinheiro.
            </p>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "20px", marginBottom: "24px" }}>
              <p style={{ fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)", color: "var(--text-3)" }}>
                Consultoria sem compromisso — você decide se faz sentido
              </p>
            </div>

            {/* Embedded CTA */}
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px 24px",
                background: "var(--accent)",
                color: "#0a0a0a",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.875rem",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Agendar Meu Diagnóstico →
            </a>
          </motion.div>

          {/* ── Steps 02 + 03 stacked ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>

            {/* Connecting line between 02 and 03 */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: "35px",
                top: "calc(50% - 8px)",
                width: "1px",
                height: "32px",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)",
                transformOrigin: "top",
              }}
            />

            {/* Step 02 */}
            <motion.div
              initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "28px",
                flex: 1,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.625rem",
                  color: "var(--text-3)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "3px 10px",
                  borderRadius: "100px",
                  letterSpacing: "0.06em",
                }}>
                  02
                </span>
                <span style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--accent)",
                  background: "var(--accent-dim)",
                  border: "1px solid var(--accent-border)",
                  padding: "3px 10px",
                  borderRadius: "100px",
                  letterSpacing: "0.06em",
                }}>
                  7 DIAS
                </span>
              </div>
              <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#f5f5f5", marginBottom: "10px", letterSpacing: "-0.02em" }}>
                Implementação em 7 Dias
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-2)", lineHeight: 1.65, marginBottom: "16px" }}>
                Construímos seus fluxos de automação no n8n, configuramos a IA de
                atendimento e integramos tudo ao seu CRM. Você não precisa entender de tecnologia.
              </p>
              <p style={{ fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)", color: "var(--text-3)", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                Setup completo com treinamento da equipe
              </p>
            </motion.div>

            {/* Step 03 */}
            <motion.div
              initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "28px",
                flex: 1,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.625rem",
                  color: "var(--text-3)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "3px 10px",
                  borderRadius: "100px",
                  letterSpacing: "0.06em",
                }}>
                  03
                </span>
                <span style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--accent)",
                  background: "var(--accent-dim)",
                  border: "1px solid var(--accent-border)",
                  padding: "3px 10px",
                  borderRadius: "100px",
                  letterSpacing: "0.06em",
                }}>
                  24/7
                </span>
              </div>
              <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#f5f5f5", marginBottom: "10px", letterSpacing: "-0.02em" }}>
                Escala no Piloto Automático
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-2)", lineHeight: 1.65, marginBottom: "16px" }}>
                Seu ecossistema de vendas funciona 24/7. Leads são atendidos em segundos,
                qualificados automaticamente e acompanhados até o fechamento.
              </p>
              <p style={{ fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)", color: "var(--text-3)", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                Suporte contínuo + otimizações mensais
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
