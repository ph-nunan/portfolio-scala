"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const benefits = [
  "Diagnóstico gratuito do seu ecossistema de vendas",
  "Mapeamento dos gargalos que estão custando dinheiro",
  "Plano de automação personalizado para o seu negócio",
  "Sem compromisso — você decide se faz sentido",
]

const roles = ["Gestor de Tráfego", "Dono de Agência", "Empresário", "Marketing", "Vendas", "Outro"]

const VAGAS_TOTAL = 5
const VAGAS_OCUPADAS = 2

type FormData = {
  nome: string
  email: string
  whatsapp: string
  empresa: string
  cargo: string
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const [form, setForm] = useState<FormData>({ nome: "", email: "", whatsapp: "", empresa: "", cargo: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  const inputStyle = {
    width: "100%",
    background: "var(--surface-2)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#f5f5f5",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "var(--font-geist-sans)",
    boxSizing: "border-box" as const,
  }

  return (
    <section id="contact" ref={ref} className="s-wrap">
      <div className="s-inner">
        <div className="g-2col">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="s-label">Contato</p>
            <h2 className="s-title" style={{ marginBottom: "16px" }}>
              Pare de Perder Vendas.
              <br />
              <span style={{ color: "var(--text-2)" }}>Automatize Hoje.</span>
            </h2>
            <p style={{ color: "var(--text-2)", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "32px" }}>
              Agende seu diagnóstico gratuito e descubra quanto dinheiro você está
              deixando na mesa. Em 30 minutos, mapeamos seus gargalos e apresentamos
              um plano de ação.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                >
                  <span style={{ width: "16px", height: "16px", borderRadius: "50%", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px", fontSize: "0.5rem", color: "var(--accent)" }}>
                    ✓
                  </span>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-2)", lineHeight: 1.6 }}>{b}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Urgency bar */}
            <div style={{ marginBottom: "16px", padding: "12px 16px", background: "var(--surface)", border: "1px solid var(--accent-border)", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-2)" }}>
                  Vagas disponíveis este mês
                </span>
                <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)", color: "var(--accent)", fontWeight: 600 }}>
                  {VAGAS_TOTAL - VAGAS_OCUPADAS} de {VAGAS_TOTAL}
                </span>
              </div>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "4px" }}>
                <div style={{ width: `${(VAGAS_OCUPADAS / VAGAS_TOTAL) * 100}%`, height: "100%", background: "var(--accent)", borderRadius: "4px", transition: "width 1s ease" }} />
              </div>
            </div>

            {status === "success" ? (
              <div className="card" style={{ textAlign: "center", padding: "48px 32px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>✓</div>
                <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, marginBottom: "0.5rem", color: "#f5f5f5" }}>
                  Recebemos seus dados!
                </h3>
                <p style={{ color: "var(--text-2)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                  Nossa equipe entrará em contato pelo WhatsApp em até 24 horas para agendar seu diagnóstico gratuito.
                </p>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="card"
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                {[
                  { name: "nome", label: "Nome completo", type: "text", placeholder: "João Silva" },
                  { name: "email", label: "E-mail", type: "email", placeholder: "joao@empresa.com" },
                  { name: "whatsapp", label: "WhatsApp", type: "tel", placeholder: "(61) 99999-9999" },
                  { name: "empresa", label: "Empresa", type: "text", placeholder: "Nome da sua empresa" },
                ].map((f) => (
                  <div key={f.name}>
                    <label
                      htmlFor={f.name}
                      style={{ display: "block", fontSize: "0.75rem", color: "var(--text-3)", marginBottom: "6px", fontFamily: "var(--font-geist-mono)" }}
                    >
                      {f.label}
                      {["nome", "email", "whatsapp"].includes(f.name) && (
                        <span style={{ color: "rgba(255,255,255,0.25)", marginLeft: "4px" }}>*</span>
                      )}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.name as keyof FormData]}
                      onChange={handle}
                      required={["nome", "email", "whatsapp"].includes(f.name)}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.2)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.07)")}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="cargo"
                    style={{ display: "block", fontSize: "0.75rem", color: "var(--text-3)", marginBottom: "6px", fontFamily: "var(--font-geist-mono)" }}
                  >
                    Cargo / Função
                  </label>
                  <select
                    id="cargo"
                    name="cargo"
                    value={form.cargo}
                    onChange={handle}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.2)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.07)")}
                  >
                    <option value="">Selecione...</option>
                    {roles.map((r) => (
                      <option key={r} value={r} style={{ background: "#111" }}>{r}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    border: "none",
                    marginTop: "4px",
                    background: status === "loading" ? "rgba(74,222,128,0.5)" : "var(--accent)",
                    color: "#0a0a0a",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => { if (status !== "loading") e.currentTarget.style.opacity = "0.88" }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1" }}
                >
                  {status === "loading" ? "Enviando..." : "Quero Meu Diagnóstico Gratuito"}
                </button>

                {/* WhatsApp alternative */}
                <div style={{ textAlign: "center" }}>
                  <a
                    href="https://wa.me/5561999999999?text=Olá%2C%20tenho%20interesse%20no%20diagnóstico%20gratuito%20da%20Scala"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "0.75rem", color: "var(--text-3)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}
                  >
                    Prefere falar pelo WhatsApp? →
                  </a>
                </div>

                {status === "error" && (
                  <p style={{ textAlign: "center", fontSize: "0.75rem", color: "rgba(255,100,100,0.8)" }}>
                    Erro ao enviar. Tente novamente.
                  </p>
                )}

                <p style={{ textAlign: "center", fontSize: "0.6875rem", color: "var(--text-3)" }}>
                  Seus dados estão seguros. Resposta em até 2 horas úteis.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
