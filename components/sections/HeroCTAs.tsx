"use client"

import { track, getScrollPct } from "@/lib/analytics"

export default function HeroCTAs() {
  return (
    <div
      className="hero-cta"
      style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "48px" }}
    >
      <a
        href="https://wa.me/556181894189?text=Ol%C3%A1%2C%20quero%20agendar%20um%20diagn%C3%B3stico%20gratuito%20da%20Scala!"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-shimmer btn-primary-hero"
        style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "13px 28px", background: "var(--accent)", color: "#1a1a1a",
          borderRadius: "8px", fontWeight: 700, fontSize: "0.9375rem",
          textDecoration: "none", letterSpacing: "-0.01em",
        }}
        onClick={() => track("cta_click", { location: "hero_primary", scroll_pct: getScrollPct() })}
      >
        Agendar Diagnóstico Gratuito →
      </a>
      <a
        href="#how-it-works"
        className="btn-secondary-hero"
        style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "13px 24px", border: "1px solid rgba(255,255,255,0.1)", color: "#f5f5f5",
          borderRadius: "8px", fontSize: "0.875rem", textDecoration: "none",
        }}
        onClick={() => track("cta_click", { location: "hero_secondary", scroll_pct: getScrollPct() })}
      >
        Ver Como Funciona
      </a>
    </div>
  )
}
