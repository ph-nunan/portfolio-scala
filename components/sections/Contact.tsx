"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { track, getScrollPct } from "@/lib/analytics"

const WA_LINK = "https://wa.me/556181894189?text=Oi!%20Vim%20pelo%20site%20da%20Scala%20e%20quero%20confirmar%20meu%20diagn%C3%B3stico%20gratuito."

const benefits = [
  "Diagnóstico gratuito do seu ecossistema de vendas",
  "Identificação dos gargalos que estão fazendo você perder leads",
  "Plano de automação personalizado — sem custo, sem compromisso",
  "Implementação em 7 dias ou o dinheiro de volta",
]

const VAGAS_TOTAL = 5
const VAGAS_OCUPADAS = 4

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="s-wrap" id="diagnostico">
      <div className="s-inner">
        <div className="g-2col">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="s-label">Próximo Passo</p>
            <h2 className="s-title" style={{ marginBottom: "16px" }}>
              Confirme seu
              <br />
              <span className="mark">diagnóstico gratuito.</span>
            </h2>
            <p style={{ color: "var(--text-2)", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "32px" }}>
              Em 30 minutos, mapeamos seu ecossistema de vendas, identificamos os
              gargalos e apresentamos um plano de automação personalizado.
              Você sai sabendo exatamente o que está custando leads — e como resolver.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                >
                  <span style={{ width: "16px", height: "16px", borderRadius: "50%", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px", fontSize: "0.5rem", color: "var(--accent)" }}>
                    ✓
                  </span>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-2)", lineHeight: 1.6 }}>{b}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Urgency bar */}
            <div style={{ marginBottom: "16px", padding: "12px 16px", background: "var(--surface)", border: "1px solid var(--accent-border)", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-2)" }}>
                  Vagas disponíveis este mês
                </span>
                <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)", color: "var(--accent)", fontWeight: 600 }}>
                  {VAGAS_TOTAL - VAGAS_OCUPADAS} de {VAGAS_TOTAL}
                </span>
              </div>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "4px" }}>
                <div style={{ width: `${(VAGAS_OCUPADAS / VAGAS_TOTAL) * 100}%`, height: "100%", background: "var(--accent)", borderRadius: "4px", transition: "width 1s ease" }} />
              </div>
            </div>

            <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "40px 32px", gap: "0" }}>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("wa_button_click", { location: "contact", scroll_pct: getScrollPct() })
                  track("portfolio_site_cta_click", { location: "contact", scroll_pct: getScrollPct() })
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 28px",
                  background: "#25D366",
                  color: "#fff",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                  width: "100%",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <WhatsAppIcon />
                Confirmar Diagnóstico Gratuito →
              </a>

              <p style={{ fontSize: "0.8125rem", color: "var(--text-3)", lineHeight: 1.6 }}>
                Resposta em segundos, 24h. Sem formulário, sem espera.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
