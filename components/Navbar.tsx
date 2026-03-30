"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { track, getScrollPct } from "@/lib/analytics"

const links = [
  { label: "Como Funciona", href: "#how-it-works" },
  { label: "Resultados", href: "#testimonials" },
  { label: "Quem Faz", href: "#founder" },
  { label: "Diagnóstico", href: "#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollDeep, setScrollDeep] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 24)
      setScrollDeep(window.scrollY > 400)
    }
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s, border-color 0.3s",
        background: scrolled ? "rgba(26,26,26,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          {/* Lockup completo no desktop, só monograma no mobile */}
          <span className="nav-logo-full">
            <Image src="/logo-lockup-v2.png" alt="Scala" width={140} height={36} style={{ objectFit: "contain" }} priority />
          </span>
          <span className="nav-logo-icon">
            <Image src="/logo-icon-v2.png" alt="Scala" width={32} height={32} style={{ objectFit: "contain" }} priority />
          </span>
        </a>

        {/* Desktop links */}
        <div className="nav-links-desktop">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{ color: "var(--text-2)", fontSize: "0.8125rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
              onClick={() => track("nav_link_click", { label: l.label, href: l.href })}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="nav-cta-desktop">
          <a
            href="https://wa.me/556181894189?text=Oi!%20Vim%20pelo%20site%20da%20Scala%20e%20quero%20agendar%20meu%20diagn%C3%B3stico%20gratuito."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("wa_button_click", { location: "navbar_desktop", scroll_pct: getScrollPct() })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 16px",
              borderRadius: "8px",
              fontSize: "0.8125rem",
              textDecoration: "none",
              transition: "all 0.25s",
              border: scrollDeep ? "1px solid var(--accent-border)" : "1px solid rgba(255,255,255,0.1)",
              background: scrollDeep ? "var(--accent-dim)" : "transparent",
              color: scrollDeep ? "var(--accent)" : "#f5f5f5",
            }}
          >
            {scrollDeep && (
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", display: "inline-block", animation: "pulse 2s ease-in-out infinite", flexShrink: 0 }} />
            )}
            {scrollDeep ? "3 vagas disponíveis" : "Diagnóstico Gratuito"}
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "5px" }}
        >
          <span style={{ display: "block", width: "20px", height: "1px", background: "#f5f5f5", transition: "all 0.2s", transform: open ? "rotate(45deg) translateY(6px)" : "none" }} />
          <span style={{ display: "block", width: "20px", height: "1px", background: "#f5f5f5", transition: "all 0.2s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: "20px", height: "1px", background: "#f5f5f5", transition: "all 0.2s", transform: open ? "rotate(-45deg) translateY(-6px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "rgba(26,26,26,0.97)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "8px 24px 20px",
            }}
            className="nav-mobile-menu"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => { setOpen(false); track("nav_link_click", { label: l.label, href: l.href }) }}
                style={{
                  display: "block",
                  padding: "14px 0",
                  fontSize: "0.875rem",
                  color: "var(--text-2)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  transition: "color 0.2s",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/556181894189?text=Oi!%20Vim%20pelo%20site%20da%20Scala%20e%20quero%20agendar%20meu%20diagn%C3%B3stico%20gratuito."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { setOpen(false); track("wa_button_click", { location: "navbar_mobile", scroll_pct: getScrollPct() }) }}
              style={{
                display: "block",
                marginTop: "16px",
                textAlign: "center",
                padding: "12px",
                fontSize: "0.875rem",
                color: "#f5f5f5",
                textDecoration: "none",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Diagnóstico Gratuito
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
