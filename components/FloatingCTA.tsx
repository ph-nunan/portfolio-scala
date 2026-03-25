"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { track, getScrollPct } from "@/lib/analytics"

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
      setVisible(window.scrollY > 320)
    }
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          className="floating-cta-wrap"
        >
          <a
            href="https://wa.me/556181894189?text=Oi!%20Vim%20pelo%20site%20da%20Scala%20e%20quero%20agendar%20meu%20diagn%C3%B3stico%20gratuito."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("wa_button_click", { location: "floating", scroll_pct: getScrollPct() })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              background: "var(--accent)",
              color: "#0a0a0a",
              borderRadius: "100px",
              fontWeight: 600,
              fontSize: "0.875rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(74,222,128,0.2)",
            }}
          >
            Diagnóstico Gratuito →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
