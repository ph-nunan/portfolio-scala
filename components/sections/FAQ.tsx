"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"

const faqs = [
  {
    q: "Vocês criam as campanhas de Meta Ads e Google Ads do zero, ou só otimizam o que já existe?",
    a: "Fazemos tudo: criamos do zero, configuramos, monitoramos, otimizamos e geramos relatórios — tudo via automação com IA. Você define o objetivo e o orçamento; a automação executa e ajusta em tempo real. Se você já tem campanhas rodando, integramos e melhoramos o que existe.",
  },
  {
    q: "Como funciona a automação de Meta Ads e Google Ads na prática?",
    a: "A IA conecta diretamente nas APIs oficiais do Meta e Google. Ela monitora performance em tempo real, ajusta lances automaticamente, pausa criativos com baixo CTR e escala o que está convertendo — tudo por regras que você aprova uma vez. Quando a campanha fecha o ciclo, o relatório já está no WhatsApp do seu cliente.",
  },
  {
    q: "Os relatórios de campanha chegam automaticamente para o meu cliente?",
    a: "Sim. Geramos relatórios em PDF com as métricas da campanha — CPL, ROAS, conversões — e enviamos automaticamente por WhatsApp ou e-mail para o seu cliente, no dia e horário que você definir. Sem montar planilha, sem copiar print, sem lembrar de mandar.",
  },
  {
    q: "Quanto tempo economizo nas campanhas por mês?",
    a: "Em média, 8 a 12 horas por cliente por mês. Ajuste de lances, análise de performance, geração de relatório — tudo automatizado. Você foca em estratégia e em fechar novos clientes.",
  },
  {
    q: "Preciso entender de tecnologia para usar as automações?",
    a: "Não. Cuidamos de toda a parte técnica: configuração, integração e treinamento. Você só precisa usar os resultados — leads respondidos, CRM preenchido e relatórios prontos no WhatsApp.",
  },
  {
    q: "A IA de atendimento parece robótica?",
    a: "Não. O agente é treinado com o contexto do seu negócio, tom de voz, produtos e objeções comuns. O objetivo é que o lead não perceba a diferença — e os nossos resultados comprovam isso.",
  },
  {
    q: "E se eu já uso um CRM?",
    a: "Integramos com qualquer CRM via API ou webhook: HubSpot, Kommo, Pipedrive, RD Station, Salesforce — e até planilhas Google. Não precisa trocar o que já funciona.",
  },
  {
    q: "Quanto tempo leva para implementar?",
    a: "7 dias úteis para o setup completo. Isso inclui configuração dos fluxos no n8n, integração com seu CRM, WhatsApp e plataformas de anúncio, e treinamento da sua equipe.",
  },
  {
    q: "Qual a diferença de um chatbot comum?",
    a: "Um chatbot comum segue um fluxo fixo de perguntas e respostas. Nossa IA tem memória, contexto, integração com CRM e aprende com as conversas. É como ter um vendedor treinado disponível 24/7.",
  },
  {
    q: "Quais ferramentas vocês usam?",
    a: "Usamos o n8n como plataforma central de automação — open-source, sem lock-in, sem limite de execuções. Integramos com OpenAI, Evolution API, Meta Ads API, Google Ads API, e qualquer ferramenta com API.",
  },
]

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "20px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#f5f5f5", lineHeight: 1.45 }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: "1.25rem", color: "var(--text-3)", flexShrink: 0, lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ color: "var(--text-2)", fontSize: "0.875rem", lineHeight: 1.7, paddingBottom: "20px" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="faq" ref={ref} className="s-wrap">
      <div className="s-inner">
        <div className="g-faq">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="s-label">FAQ</p>
            <h2 className="s-title">Perguntas Frequentes</h2>
            <p style={{ color: "var(--text-2)", marginTop: "12px", lineHeight: 1.7, fontSize: "0.9rem" }}>
              Tem outra dúvida?{" "}
              <a href="#contact" style={{ color: "#f5f5f5", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Fale com a gente.
              </a>
            </p>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {faqs.map((item, i) => (
              <Item key={i} q={item.q} a={item.a} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
