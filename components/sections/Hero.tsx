import HeroLiveFeed from "./HeroLiveFeed"
import HeroCTAs from "./HeroCTAs"

// Gatilhos ativos nesta seção:
// - Identificação imediata: H1 nomeia a dor exata do público
// - FOMO: badge "concorrentes já automatizaram"
// - Prova de resultado: stats com números concretos
// - Redução de risco: "diagnóstico gratuito · sem compromisso"
// - Urgência suave: "resposta em segundos" vs "você demora horas"

const stats = [
  { value: "<5s",  label: "Resposta ao Lead"   },
  { value: "7d",   label: "Para Implementar"   },
  { value: "30d",  label: "Garantia Total"      },
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
      {/* Background grid */}
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

        {/* Badge — identificação do público + FOMO */}
        <div className="hero-badge" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "5px 14px", marginBottom: "28px",
          borderRadius: "100px", border: "1px solid rgba(255,255,255,0.1)",
          fontSize: "0.625rem", color: "var(--text-3)",
          fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "var(--accent)", display: "inline-block",
            animation: "pulse 2s ease-in-out infinite", flexShrink: 0,
          }} />
          Para gestores de tráfego e agências
        </div>

        {/* H1 — nomeia a dor exata em 5 palavras */}
        <h1 className="hero-h1" style={{
          fontSize: "clamp(2.4rem, 7.5vw, 5.5rem)",
          fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.035em",
          color: "#f5f5f5", marginBottom: "8px",
        }}>
          Você gera leads.
        </h1>

        {/* H2 — amplifica a dor com o problema real */}
        <p className="hero-h2" style={{
          fontSize: "clamp(2.4rem, 7.5vw, 5.5rem)",
          fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.035em",
          background: "linear-gradient(135deg, #ffffff 0%, #909090 42%, #e0e0e0 100%)",
          WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: "28px",
        }}>
          Ninguém responde a tempo.
        </p>

        {/* Subtítulo — solução concreta com prazo e garantia */}
        <p className="hero-sub" style={{
          fontSize: "1.0625rem", lineHeight: 1.75,
          color: "var(--text-2)", maxWidth: "520px", margin: "0 auto 32px",
        }}>
          A Scala implementa em 7 dias o sistema que atende leads em segundos via WhatsApp,
          qualifica automaticamente e agenda reuniões —{" "}
          <span className="mark" style={{ fontWeight: 600 }}>sem você mover um dedo.</span>
        </p>

        {/* Stats — somente desktop (não empurra CTA no mobile) */}
        <div className="hero-stats-desktop" style={{ maxWidth: "400px", margin: "0 auto 28px" }}>
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
                  fontFamily: "var(--font-space-grotesk)", fontSize: "1.375rem",
                  fontWeight: 700, lineHeight: 1,
                  background: "linear-gradient(135deg, #ffffff 0%, #b0b0b0 50%, #e8e8e8 100%)",
                  WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>{s.value}</div>
                <div style={{
                  fontSize: "0.5625rem", color: "var(--text-3)",
                  fontFamily: "var(--font-space-grotesk)", textTransform: "uppercase",
                  letterSpacing: "0.08em", marginTop: "5px",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <p style={{
            fontSize: "0.5625rem", color: "var(--text-3)",
            fontFamily: "var(--font-geist-mono)", textAlign: "center",
            marginTop: "8px", letterSpacing: "0.04em",
          }}>
            implementado em GoAlpha · H3imob · DonaSol · Hugo Borges
          </p>
        </div>

        {/* CTAs */}
        <HeroCTAs />

        {/* Live feed — prova social em tempo real */}
        <HeroLiveFeed />

        {/* Scroll hint */}
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
