"use client"

// Gatilhos: autoridade por números específicos, prova de resultado,
// redução de risco (garantia), urgência suave (24/7 sem custo extra)

const signals = [
  { value: "< 5s",    label: "resposta ao primeiro contato"       },
  { value: "7 dias",  label: "do zero ao ecossistema ativo"       },
  { value: "4.6×",    label: "mais fechamentos com o mesmo tráfego" },
  { value: "24/7",    label: "operação sem interrupção"           },
  { value: "30 dias", label: "garantia ou reembolso total"        },
  { value: "R$ 0",    label: "custo de equipe adicional"          },
]

function SignalItem({ s, dimmed }: { s: { value: string; label: string }; dimmed?: boolean }) {
  return (
    <div
      aria-hidden={dimmed}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "16px 28px",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        flexShrink: 0,
        opacity: dimmed ? 0.5 : 1,
      }}
    >
      <span style={{
        fontFamily: "var(--font-geist-mono)",
        fontSize: "0.9375rem",
        fontWeight: 700,
        color: "#f5f5f5",
        letterSpacing: "-0.02em",
        whiteSpace: "nowrap",
      }}>
        {s.value}
      </span>
      <span style={{
        fontSize: "0.75rem",
        color: "var(--text-3)",
        whiteSpace: "nowrap",
      }}>
        {s.label}
      </span>
    </div>
  )
}

export default function SocialProof() {
  return (
    <div
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.015)",
        overflow: "hidden",
        position: "relative",
        animation: "sp-fadein 0.6s ease 0.2s both",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to right, #1a1a1a, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to left, #1a1a1a, transparent)", zIndex: 2, pointerEvents: "none" }} />

      <div className="sp-marquee">
        <div className="sp-track">
          {signals.map((s, i) => <SignalItem key={i} s={s} />)}
        </div>
        <div className="sp-track" aria-hidden>
          {signals.map((s, i) => <SignalItem key={i} s={s} dimmed />)}
        </div>
      </div>
    </div>
  )
}
