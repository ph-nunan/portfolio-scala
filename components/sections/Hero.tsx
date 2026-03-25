import HeroLiveFeed from "./HeroLiveFeed"
import HeroCTAs from "./HeroCTAs"

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
          Seus concorrentes já automatizaram
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
          color: "var(--text-2)", maxWidth: "520px", margin: "0 auto 32px",
        }}>
          Para agências, imobiliárias e gestores de tráfego — montamos em 7 dias o ecossistema
          que responde leads em &lt;5s, otimiza campanhas e entrega relatórios{" "}
          <span className="mark" style={{ fontWeight: 600 }}>sem você mover um dedo.</span>
        </p>

        <div style={{ maxWidth: "400px", margin: "0 auto 28px" }}>
          <div className="hero-stats hero-stats-card" style={{
            display: "flex", justifyContent: "center",
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
          <p style={{ fontSize: "0.5625rem", color: "var(--text-3)", fontFamily: "var(--font-geist-mono)", textAlign: "center", marginTop: "8px", letterSpacing: "0.04em" }}>
            implementado em GoAlpha · H3imob · DonaSol · Hugo Borges
          </p>
        </div>

        <HeroCTAs />

        <HeroLiveFeed />

        <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px" }}>
          <div style={{
            width: "1px", height: "28px",
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.32), transparent)",
            animation: "scroll-hint 2.6s ease-in-out infinite",
          }} />
        </div>
      </div>

    </section>
  )
}
