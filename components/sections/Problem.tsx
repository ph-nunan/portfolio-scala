"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const etapas = [
  {
    numero: "01",
    prazo: "Dia 0",
    titulo: "Diagnóstico Gratuito",
    descricao: "Mapeamos seu ecossistema de vendas completo: tráfego, atendimento, qualificação e follow-up. Identificamos os gargalos que estão fazendo você perder leads hoje.",
    entregavel: "Relatório de gargalos + plano de automação personalizado",
  },
  {
    numero: "02",
    prazo: "Dias 1–2",
    titulo: "Arquitetura do Sistema",
    descricao: "Projetamos a solução específica para o seu contexto: quais módulos implementar, em que ordem, e como integrar com as ferramentas que você já usa.",
    entregavel: "Diagrama do ecossistema + cronograma de implementação",
  },
  {
    numero: "03",
    prazo: "Dias 3–6",
    titulo: "Implementação",
    descricao: "Construímos, configuramos e testamos cada automação. Você acompanha o progresso em tempo real e valida cada entrega antes de avançar.",
    entregavel: "Sistema funcionando em ambiente de teste + validação sua",
  },
  {
    numero: "04",
    prazo: "Dia 7",
    titulo: "Entrega & Ativação",
    descricao: "Ativamos o sistema em produção, fazemos o handoff completo e te entregamos a documentação. A partir daí, você opera — ou a gente cuida.",
    entregavel: "Ecossistema ativo + documentação + suporte pós-entrega",
  },
]

export default function Problem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="s-wrap" id="como-funciona">
      <div className="s-inner">
        <div className="s-head" style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto 56px" }}>
          <p className="s-label" style={{ display: "inline-block" }}>Como Funciona</p>
          <h2 className="s-title" style={{ marginTop: "12px" }}>
            Do diagnóstico ao sistema ativo{" "}
            <span className="mark">em 7 dias.</span>
          </h2>
          <p className="s-sub" style={{ margin: "16px auto 0", textAlign: "center" }}>
            Processo estruturado, sem surpresas. Cada etapa tem entregável
            concreto e você valida antes de avançar.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {etapas.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1px 1fr",
                gap: "0 24px",
                paddingBottom: i < etapas.length - 1 ? "40px" : "0",
              }}
            >
              {/* Prazo */}
              <div style={{ textAlign: "right", paddingTop: "2px" }}>
                <span style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "0.625rem", fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: "0.1em",
                  color: "var(--text-3)",
                }}>{e.prazo}</span>
              </div>

              {/* Linha + dot */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: "10px", height: "10px", borderRadius: "50%",
                  background: "var(--accent)", border: "2px solid var(--bg)",
                  flexShrink: 0, marginTop: "4px",
                  boxShadow: "0 0 0 3px rgba(255,255,255,0.08)",
                }} />
                {i < etapas.length - 1 && (
                  <div style={{
                    flex: 1, width: "1px",
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.04))",
                    marginTop: "8px",
                  }} />
                )}
              </div>

              {/* Conteúdo */}
              <div style={{ paddingBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
                  <span style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "0.5625rem", fontWeight: 700,
                    color: "var(--text-3)", letterSpacing: "0.06em",
                  }}>{e.numero}</span>
                  <h3 style={{
                    fontSize: "1.0625rem", fontWeight: 700,
                    letterSpacing: "-0.02em", color: "#f5f5f5",
                  }}>{e.titulo}</h3>
                </div>
                <p style={{
                  fontSize: "0.875rem", color: "var(--text-2)",
                  lineHeight: 1.7, marginBottom: "12px",
                }}>{e.descricao}</p>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "6px 12px",
                  background: "var(--accent-dim)",
                  border: "1px solid var(--accent-border)",
                  borderRadius: "6px",
                }}>
                  <span style={{ fontSize: "0.625rem", color: "var(--accent)" }}>✓</span>
                  <span style={{
                    fontSize: "0.75rem", color: "var(--text-2)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}>{e.entregavel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            marginTop: "48px", textAlign: "center",
            fontSize: "0.8125rem", color: "var(--text-3)",
            fontStyle: "italic",
          }}
        >
          Não conseguindo em 7 dias? <span style={{ color: "var(--text-2)" }}>Reembolso total — sem perguntas.</span>
        </motion.p>
      </div>
    </section>
  )
}
