"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const kpis = [
  {
    acronym: "ROAS",
    name: "Return on Ad Spend",
    impact: "+↑ Retorno por real investido",
    color: "var(--accent)",
    body: "Quando o lead é atendido em segundos e qualificado automaticamente, mais cliques viram conversões sem aumentar o budget. A IA identifica os criativos e públicos com melhor desempenho e escala o que funciona — o ROAS sobe sem você tocar na conta.",
    tag: "Tráfego Pago",
  },
  {
    acronym: "CAC",
    name: "Custo de Aquisição de Cliente",
    impact: "↓ Menos gasto por cliente fechado",
    color: "#f5f5f5",
    body: "Automação de qualificação elimina o tempo gasto com leads frios. A equipe de vendas foca apenas em quem tem real intenção de compra — o funil fica mais eficiente e o CAC cai mesmo com o mesmo investimento em mídia.",
    tag: "Funil de Vendas",
  },
  {
    acronym: "LTV",
    name: "Lifetime Value",
    impact: "↑ Mais receita por cliente",
    color: "var(--accent)",
    body: "Cliente bem atendido no pós-fechamento compra mais e por mais tempo. Relatórios automáticos com os resultados das campanhas criam percepção de valor contínua — o cliente vê ROI toda semana, a retenção aumenta e o LTV escala.",
    tag: "Pós-Fechamento",
  },
  {
    acronym: "Churn",
    name: "Taxa de Cancelamento",
    impact: "↓ Menos clientes perdidos",
    color: "#f5f5f5",
    body: "80% do churn acontece por falta de acompanhamento pós-venda. Touchpoints automatizados com contexto real de cada cliente — relatórios, alertas e follow-ups programados — mantêm o engajamento ativo e reduzem o cancelamento passivo.",
    tag: "Retenção",
  },
  {
    acronym: "CPL",
    name: "Custo por Lead",
    impact: "↓ Lead mais barato e mais qualificado",
    color: "var(--accent)",
    body: "A automação de campanhas via API ajusta lances em tempo real com base em sinais de performance. Públicos de baixo CPL são escalados automaticamente, os de alto custo são pausados — o resultado é um volume maior de leads com menos investimento.",
    tag: "Tráfego Pago",
  },
  {
    acronym: "Taxa de Conv.",
    name: "Taxa de Conversão do Funil",
    impact: "↑ Mais fechamentos, mesmo tráfego",
    color: "#f5f5f5",
    body: "Com atendimento em segundos, qualificação automática e follow-up com contexto real, a conversão de lead para cliente sai de 3% para até 14% no mesmo funil. Não é mais tráfego — é o ecossistema funcionando como deveria.",
    tag: "Ecossistema",
  },
]

export default function KPIs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="s-wrap">
      <div className="s-inner">
        <motion.div
          className="s-head"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="s-label">Impacto Técnico</p>
          <h2 className="s-title">O que muda nos seus KPIs</h2>
          <p className="s-sub">
            Automação não é sobre tecnologia — é sobre o que acontece com os números que você
            já acompanha. Cada métrica abaixo é impactada diretamente pelo ecossistema.
          </p>
        </motion.div>

        <div className="kpi-grid-inner" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--border)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          overflow: "hidden",
        }}>
          {kpis.map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: 0.06 + i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                background: "var(--bg)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              {/* Top row: acronym + tag */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: kpi.color,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}>
                  {kpi.acronym}
                </span>
                <span style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.5rem",
                  color: "var(--text-3)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "3px 8px",
                  borderRadius: "100px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  marginTop: "4px",
                }}>
                  {kpi.tag}
                </span>
              </div>

              {/* Full name */}
              <p style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.625rem",
                color: "var(--text-3)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "14px",
              }}>
                {kpi.name}
              </p>

              {/* Impact line */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "16px",
                paddingBottom: "16px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}>
                <span style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.6875rem",
                  color: kpi.color,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}>
                  {kpi.impact}
                </span>
              </div>

              {/* Body */}
              <p style={{
                fontSize: "0.8125rem",
                color: "var(--text-2)",
                lineHeight: 1.7,
                flex: 1,
              }}>
                {kpi.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
