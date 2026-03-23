import dynamic from "next/dynamic"

// LiveFeed é client-only (useState/setInterval) — carrega após o conteúdo crítico
const HeroLiveFeed = dynamic(() => import("./HeroLiveFeed"), { ssr: false })

const stats = [
  { value: "4.6×", label: "Mais Fechamentos"  },
  { value: "<5s",  label: "Resposta ao Lead"   },
  { value: "7d",   label: "Para Implementar"   },
]

export default function Hero() {
  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      paddingTop: "80px",
      paddingBottom: "40px",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(255,255,255,0.045) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)",
      }} />

      <div style={{
        position: "relative", zIndex: 10,
        width: "100%", maxWidth: "760px",
        margin: "0 auto", padding: "0 24px",
        textAlign: "center",
      }}>
        <div className="hero-badge" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "5px 14px", marginBottom: "28px",
          borderRadius: "100px", border: "1px solid rgba(255,255,255,0.1)",
          fontSize: "0.625rem", color: "var(--text-3)",
          fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", display: "inline-block", animation: "pulse 2s ease-in-out infinite", flexShrink: 0 }} />
          Do Anúncio ao Relatório · Tudo Automatizado
        </div>

        <h1 className="hero-h1" style={{
          fontSize: "clamp(2.6rem, 8vw, 5.75rem)",
          fontWeight: 700, lineHeight: 1, letterSpacing: "-0.035em",
          color: "#f5f5f5", marginBottom: "10px",
        }}>
          Do Anúncio ao Relatório.
        </h1>

        <p className="hero-h2" style={{
          fontSize: "clamp(2.6rem, 8vw, 5.75rem)",
          fontWeight: 700, lineHeight: 1, letterSpacing: "-0.035em",
          background: "linear-gradient(135deg, #ffffff 0%, #c0c0c0 42%, #f0f0f0 100%)",
          WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: "28px",
        }}>
          Tudo no Piloto Automático.
        </p>

        <p className="hero-sub" style={{
          fontSize: "1.0625rem", lineHeight: 1.75,
          color: "var(--text-2)", maxWidth: "560px", margin: "0 auto 32px",
        }}>
          Construímos a automação que otimiza suas campanhas, responde leads em segundos,
          atualiza o CRM e envia relatórios ao cliente —{" "}
          <span className="mark" style={{ fontWeight: 600 }}>você no controle, a IA executando.</span>
        </p>

        <div className="hero-stats hero-stats-card" style={{
          display: "flex", justifyContent: "center",
          maxWidth: "400px", margin: "0 auto 28px",
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: "12px", overflow: "hidden",
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: "16px 12px", textAlign: "center",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <div style={{
                fontFamily: "var(--font-space-grotesk)", fontSize: "1.375rem", fontWeight: 700, lineHeight: 1,
                background: "linear-gradient(135deg, #ffffff 0%, #b0b0b0 50%, #e8e8e8 100%)",
                WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>{s.value}</div>
              <div style={{ fontSize: "0.5625rem", color: "var(--text-3)", fontFamily: "var(--font-space-grotesk)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "5px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="hero-cta" style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "48px" }}>
          <a href="#contact" className="btn-shimmer btn-primary-hero" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "13px 28px", background: "var(--accent)", color: "#1a1a1a",
            borderRadius: "8px", fontWeight: 700, fontSize: "0.9375rem",
            textDecoration: "none", letterSpacing: "-0.01em",
          }}>Agendar Diagnóstico Gratuito →</a>
          <a href="#how-it-works" className="btn-secondary-hero" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "13px 24px", border: "1px solid rgba(255,255,255,0.1)", color: "#f5f5f5",
            borderRadius: "8px", fontSize: "0.875rem", textDecoration: "none",
          }}>Ver Como Funciona</a>
        </div>

        <HeroLiveFeed />
      </div>
    </section>
  )
}
