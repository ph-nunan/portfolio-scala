"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const links = [
  { label: "Serviços", href: "#services" },
  { label: "Como Funciona", href: "#how-it-works" },
  { label: "Resultados", href: "#results" },
  { label: "FAQ", href: "#faq" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
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
        background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-white font-semibold text-base tracking-tight">
          Scala
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{ color: "var(--text-2)", fontSize: "0.8125rem" }}
              className="hover:text-white transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="text-sm text-white px-4 py-2 rounded-lg transition-all duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: "0.8125rem",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            Diagnóstico Gratuito
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span
            className="block w-5 h-px bg-white transition-all duration-200"
            style={{ transform: open ? "rotate(45deg) translateY(4px)" : "none" }}
          />
          <span
            className="block w-5 h-px bg-white mt-1.5 transition-all duration-200"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-white mt-1.5 transition-all duration-200"
            style={{ transform: open ? "rotate(-45deg) translateY(-4px)" : "none" }}
          />
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
              background: "rgba(10,10,10,0.96)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
            className="md:hidden px-6 py-4"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm transition-colors duration-200"
                style={{
                  color: "var(--text-2)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block mt-4 text-center py-3 text-sm text-white rounded-lg"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Diagnóstico Gratuito
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
