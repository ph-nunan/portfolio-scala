"use client"

const links = [
  { label: "Ecossistema", href: "#ecossistema" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Diagnóstico", href: "#diagnostico" },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "48px 0" }}>
      <div className="footer-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
        <div>
          <a
            href="#"
            style={{ color: "#f5f5f5", fontWeight: 600, fontSize: "0.9375rem", letterSpacing: "-0.02em", textDecoration: "none" }}
          >
            Scala
          </a>
          <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginTop: "4px", fontFamily: "var(--font-geist-mono)" }}>
            Brasília, DF — Brasil
          </p>
        </div>

        <nav style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px" }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{ fontSize: "0.8125rem", color: "var(--text-3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p style={{ fontSize: "0.75rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)" }}>
          © 2026 Scala
        </p>
      </div>
    </footer>
  )
}
