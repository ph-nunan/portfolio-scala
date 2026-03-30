"use client"

import { useEffect, useState } from "react"
import { track, getScrollPct } from "@/lib/analytics"

const WA_LINK = "https://wa.me/556181894189?text=Oi!%20Vim%20pelo%20site%20da%20Scala%20e%20quero%20saber%20mais."

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fn = () => {
      const contact = document.getElementById("contact")
      if (contact) {
        const rect = contact.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setVisible(false)
          return
        }
      }
      setVisible(window.scrollY > 80)
    }
    window.addEventListener("scroll", fn, { passive: true })
    fn()
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <div
      className="floating-cta-wrap"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          track("wa_button_click", { location: "floating", scroll_pct: getScrollPct(), trigger: "floating_cta" })
          if (typeof window !== "undefined" && (window as any).fbq) {
            try { (window as any).fbq("track", "Lead", { content_name: "floating_cta" }) } catch {}
          }
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "14px 28px",
          background: "var(--accent)",
          color: "#0a0a0a",
          borderRadius: "100px",
          fontWeight: 700,
          fontSize: "0.875rem",
          textDecoration: "none",
          whiteSpace: "nowrap",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.15)",
        }}
      >
        Falar com Especialista →
      </a>
    </div>
  )
}
