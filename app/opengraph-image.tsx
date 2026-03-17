import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Scala — Automação de Atendimento e Vendas com IA"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a1a1a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 32,
            padding: "8px 20px",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#4ade80",
            }}
          />
          <span style={{ color: "#9a9a9a", fontSize: 18, letterSpacing: 2 }}>
            SCALA · AUTOMAÇÃO COM IA
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            color: "#f5f5f0",
            fontSize: 68,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 900,
          }}
        >
          Do Anúncio ao Relatório.{" "}
          <span style={{ color: "#d0d0d0" }}>Tudo no Piloto Automático.</span>
        </div>

        {/* Sub */}
        <div
          style={{
            color: "#6b6b6b",
            fontSize: 26,
            marginTop: 28,
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          Atendimento 24/7 · Qualificação automática · Implementação em 7 dias
        </div>

        {/* CTA pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#ffffff",
            borderRadius: 32,
            padding: "14px 36px",
            marginTop: 52,
          }}
        >
          <span
            style={{ color: "#1a1a1a", fontSize: 22, fontWeight: 700 }}
          >
            Diagnóstico Gratuito
          </span>
          <span style={{ color: "#1a1a1a", fontSize: 22 }}>→</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
