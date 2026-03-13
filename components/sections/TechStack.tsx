"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const techs = [
  "n8n",
  "Meta Ads API",
  "Google Ads API",
  "OpenAI GPT-4o",
  "WhatsApp Business API",
  "Claude (Anthropic)",
  "Manus AI",
  "Perplexity AI",
  "Firecrawl",
  "Apify",
  "Kommo CRM",
  "Google Sheets",
  "Supabase",
  "Webhook",
]

const marqueeItems = [...techs, ...techs]

export default function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="s-wrap">
      <div className="s-inner">
        <motion.div
          className="s-head"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="s-label">Tech Stack</p>
          <h2 className="s-title">Ferramentas de Elite Trabalhando Juntas</h2>
          <p className="s-sub">
            Integrações que transformam ferramentas isoladas em um ecossistema inteligente e conectado.
          </p>
        </motion.div>
      </div>

      {/* Marquee — full width, outside s-inner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{
          overflow: "hidden",
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="marquee-track"
          style={{ display: "flex", gap: "16px", padding: "8px 0", width: "max-content" }}
        >
          {marqueeItems.map((tech, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                borderRadius: "8px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontSize: "0.8125rem", color: "var(--text-2)", fontFamily: "var(--font-geist-mono)" }}>
                {tech}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
