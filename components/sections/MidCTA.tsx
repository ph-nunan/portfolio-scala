"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"

const tickets = [
  { label: "R$ 500", value: 500 },
  { label: "R$ 1.000", value: 1000 },
  { label: "R$ 2.000", value: 2000 },
  { label: "R$ 5.000", value: 5000 },
  { label: "R$ 10.000", value: 10000 },
]

function formatBRL(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
}

export default function MidCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const [tab, setTab] = useState<"leads" | "ads">("leads")

  // Tab 1 — Leads perdidos
  const [leads, setLeads] = useState(100)
  const [ticket, setTicket] = useState(2000)
  const perda = Math.round(leads * 0.78 * 0.35 * ticket * 0.25)

  // Tab 2 — Tempo perdido em ads (PDF 4.3)
  const [horasAds, setHorasAds] = useState(10)
  // 4 weeks/mês; cada hora "liberada" pode atender ~2 novos clientes em prospecção
  const horasMes = horasAds * 4
  const clientesPotenciais = Math.round(horasMes / 3)

  return (
    <section ref={ref} className="s-wrap">
      <div className="s-inner" style={{ textAlign: "center" }}>
        <motion.p
          className="s-label"
          style={{ display: "block" }}
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
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "32px",
            color: "#f5f5f5",
          }}
        >
          Quanto você está perdendo por mês?
        </motion.h2>

        {/* Tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          role="tablist"
          aria-label="Calculadora de perda"
          style={{
            display: "inline-flex",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "4px",
            marginBottom: "28px",
            gap: "4px",
          }}
        >
          {[
            { key: "leads", label: "Leads perdidos" },
            { key: "ads",   label: "Tempo em Ads" },
          ].map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key as "leads" | "ads")}
              style={{
                padding: "8px 20px",
                borderRadius: "7px",
                fontSize: "0.8125rem",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                background: tab === t.key ? "var(--accent)" : "transparent",
                color: tab === t.key ? "#0a0a0a" : "var(--text-2)",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card"
          style={{ maxWidth: "480px", margin: "0 auto 32px", textAlign: "left" }}
        >
          <AnimatePresence mode="wait">
            {tab === "leads" ? (
              <motion.div
                key="leads"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {/* Leads slider */}
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)" }}>
                      Leads por mês
                    </label>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f5f5f5", fontFamily: "var(--font-geist-mono)" }}>
                      {leads}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={500}
                    step={10}
                    value={leads}
                    onChange={(e) => setLeads(Number(e.target.value))}
                    aria-label={`Leads por mês: ${leads}`}
                    aria-valuemin={20}
                    aria-valuemax={500}
                    aria-valuenow={leads}
                    style={{ width: "100%", accentColor: "var(--accent)" }}
                  />
                </div>

                {/* Ticket selector */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)", marginBottom: "10px" }}>
                    Ticket médio
                  </label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {tickets.map((t) => (
                      <button
                        key={t.value}
                        onClick={() => setTicket(t.value)}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontFamily: "var(--font-geist-mono)",
                          border: ticket === t.value ? "1px solid var(--accent-border)" : "1px solid rgba(255,255,255,0.08)",
                          background: ticket === t.value ? "var(--accent-dim)" : "transparent",
                          color: ticket === t.value ? "var(--accent)" : "var(--text-2)",
                          cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Result */}
                <div style={{ padding: "20px", background: "var(--surface-2)", borderRadius: "8px", textAlign: "center", marginBottom: "12px" }}>
                  <p style={{ fontSize: "0.6875rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                    Perda estimada por mês
                  </p>
                  <div style={{ fontSize: "2.5rem", fontWeight: 700, fontFamily: "var(--font-geist-mono)", letterSpacing: "-0.03em", lineHeight: 1, background: "linear-gradient(135deg, #ffffff 0%, #a8a8a8 50%, #e0e0e0 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {formatBRL(perda)}
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginTop: "8px" }}>
                    em leads que não foram atendidos a tempo
                  </p>
                </div>
                <div style={{ padding: "12px 16px", background: "var(--accent-dim)", border: "1px solid var(--accent-border)", borderRadius: "8px", textAlign: "center" }}>
                  <p style={{ fontSize: "0.8125rem", color: "rgba(245,245,245,0.85)", lineHeight: 1.55 }}>
                    O plano Pro{" "}
                    <span style={{ fontFamily: "var(--font-geist-mono)", color: "var(--accent)", fontWeight: 600 }}>
                      (a partir de R$ 1.200)
                    </span>{" "}
                    se paga com{" "}
                    <strong style={{ color: "#f5f5f5" }}>
                      {Math.ceil(1200 / ticket)} lead{Math.ceil(1200 / ticket) > 1 ? "s" : ""} recuperado{Math.ceil(1200 / ticket) > 1 ? "s" : ""}.
                    </strong>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="ads"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {/* Horas por semana slider */}
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)" }}>
                      Horas/semana ajustando campanhas
                    </label>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f5f5f5", fontFamily: "var(--font-geist-mono)" }}>
                      {horasAds}h
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={20}
                    step={5}
                    value={horasAds}
                    onChange={(e) => setHorasAds(Number(e.target.value))}
                    aria-label={`Horas por semana ajustando campanhas: ${horasAds}h`}
                    aria-valuemin={5}
                    aria-valuemax={20}
                    aria-valuenow={horasAds}
                    style={{ width: "100%", accentColor: "var(--accent)" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                    <span style={{ fontSize: "0.625rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)" }}>5h</span>
                    <span style={{ fontSize: "0.625rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)" }}>20h</span>
                  </div>
                </div>

                {/* Resultado */}
                <div style={{ padding: "20px", background: "var(--surface-2)", borderRadius: "8px", textAlign: "center", marginBottom: "12px" }}>
                  <p style={{ fontSize: "0.6875rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                    Horas recuperadas por mês
                  </p>
                  <div style={{ fontSize: "2.5rem", fontWeight: 700, fontFamily: "var(--font-geist-mono)", letterSpacing: "-0.03em", lineHeight: 1, background: "linear-gradient(135deg, #ffffff 0%, #a8a8a8 50%, #e0e0e0 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {horasMes}h
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginTop: "8px" }}>
                    em operação manual que pode ser automatizada
                  </p>
                </div>
                <div style={{ padding: "12px 16px", background: "var(--accent-dim)", border: "1px solid var(--accent-border)", borderRadius: "8px", textAlign: "center" }}>
                  <p style={{ fontSize: "0.8125rem", color: "rgba(245,245,245,0.85)", lineHeight: 1.55 }}>
                    Com a Scala, você recupera{" "}
                    <span style={{ fontFamily: "var(--font-geist-mono)", color: "var(--accent)", fontWeight: 600 }}>
                      {horasMes}h/mês
                    </span>
                    {" "}— o equivalente a{" "}
                    <strong style={{ color: "#f5f5f5" }}>
                      {clientesPotenciais} novos clientes que você poderia estar atendendo.
                    </strong>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <a
            href="https://wa.me/556181894189?text=Oi!%20Vim%20pelo%20site%20da%20Scala%20e%20quero%20agendar%20meu%20diagn%C3%B3stico%20gratuito."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
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
            Quero esses números no meu negócio →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
