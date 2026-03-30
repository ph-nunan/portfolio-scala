"use client"

import { useEffect, useState } from "react"
import { track, getScrollPct } from "@/lib/analytics"

const WA_LINK = "https://wa.me/556181894189?text=Oi!%20Vim%20pelo%20site%20da%20Scala%20e%20quero%20saber%20mais."

// Detecta Instagram/Facebook In-App Browser
function isInAppBrowser(): boolean {
  if (typeof navigator === "undefined") return false
  const ua = navigator.userAgent || ""
  return /Instagram|FBAN|FBAV|FB_IAB/i.test(ua)
}

export default function HeroCTAs() {
  const [inApp, setInApp] = useState(false)

  useEffect(() => {
    setInApp(isInAppBrowser())
  }, [])

  const handleClick = () => {
    track("wa_button_click", {
      location: "hero_primary",
      scroll_pct: getScrollPct(),
      trigger: "hero_cta",
      browser: inApp ? "in_app" : "native",
    })
    // Pixel Meta — Lead
    if (typeof window !== "undefined" && (window as any).fbq) {
      try { (window as any).fbq("track", "Lead", { content_name: "hero_primary" }) } catch {}
    }
  }

  return (
    <div
      className="hero-cta"
      style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "48px" }}
    >
      {inApp ? (
        /* In-App Browser: instrução explícita para abrir no WhatsApp */
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", width: "100%",
        }}>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer btn-primary-hero"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "15px 32px", background: "var(--accent)", color: "#1a1a1a",
              borderRadius: "8px", fontWeight: 700, fontSize: "1rem",
              textDecoration: "none", letterSpacing: "-0.01em", width: "100%",
              justifyContent: "center",
            }}
            onClick={handleClick}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar com Especialista no WhatsApp
          </a>
          <p style={{
            fontSize: "0.6875rem", color: "var(--text-3)",
            fontFamily: "var(--font-geist-mono)", letterSpacing: "0.04em",
          }}>
            Toque para abrir o WhatsApp → diagnóstico gratuito
          </p>
        </div>
      ) : (
        /* Browser normal */
        <>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer btn-primary-hero"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "15px 32px", background: "var(--accent)", color: "#1a1a1a",
              borderRadius: "8px", fontWeight: 700, fontSize: "1rem",
              textDecoration: "none", letterSpacing: "-0.01em",
            }}
            onClick={handleClick}
          >
            Quero Automatizar Meu Atendimento →
          </a>

          {/* Botão secundário apenas em desktop */}
          <a
            href="#how-it-works"
            className="btn-secondary-hero hero-secondary-desktop"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "15px 24px", border: "1px solid rgba(255,255,255,0.1)", color: "#f5f5f5",
              borderRadius: "8px", fontSize: "0.875rem", textDecoration: "none",
            }}
            onClick={() => track("cta_click", { location: "hero_secondary", scroll_pct: getScrollPct() })}
          >
            Ver Como Funciona
          </a>
        </>
      )}

      {/* Microtext de redução de risco */}
      <p style={{
        width: "100%", textAlign: "center",
        fontSize: "0.6875rem", color: "var(--text-3)",
        fontFamily: "var(--font-geist-mono)", letterSpacing: "0.04em",
        marginTop: "4px",
      }}>
        Diagnóstico gratuito · Sem compromisso · 30 dias de garantia
      </p>
    </div>
  )
}
