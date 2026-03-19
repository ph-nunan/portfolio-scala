import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidade | Scala",
  description: "Política de privacidade da Scala — como coletamos e usamos seus dados.",
  robots: { index: false, follow: false },
}

export default function PrivacidadePage() {
  const lastUpdated = "19 de março de 2026"

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px", color: "#e5e5e5", fontFamily: "sans-serif", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>Política de Privacidade</h1>
      <p style={{ color: "#888", marginBottom: 40 }}>Última atualização: {lastUpdated}</p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>1. Quem somos</h2>
        <p>A Scala é uma empresa de automação de atendimento e vendas com inteligência artificial, com sede em Brasília, DF, Brasil. Este site é operado pela Scala e pode ser acessado em <strong>portfolio-scala.vercel.app</strong>.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>2. Dados que coletamos</h2>
        <p>Coletamos apenas os dados necessários para prestar nossos serviços:</p>
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li>Dados de navegação (páginas visitadas, tempo no site) via Google Analytics 4</li>
          <li>Eventos de interação (cliques no botão WhatsApp) via Meta Pixel</li>
          <li>Dados de heatmap e sessão via Microsoft Clarity</li>
          <li>Dados fornecidos voluntariamente ao entrar em contato via WhatsApp</li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>3. Como usamos seus dados</h2>
        <ul style={{ paddingLeft: 20 }}>
          <li>Melhorar a experiência do site e nossos serviços</li>
          <li>Veicular anúncios relevantes em plataformas como Meta e Google</li>
          <li>Entender o comportamento de navegação para otimizar o conteúdo</li>
          <li>Responder às suas mensagens e solicitações de diagnóstico</li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>4. Compartilhamento de dados</h2>
        <p>Não vendemos seus dados. Compartilhamos apenas com ferramentas de analytics e publicidade (Google, Meta, Microsoft) conforme suas políticas de privacidade. Esses serviços possuem suas próprias políticas de privacidade.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>5. Cookies</h2>
        <p>Usamos cookies para análise de tráfego e personalização de anúncios. Ao continuar navegando, você concorda com o uso de cookies conforme esta política.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>6. Seus direitos (LGPD)</h2>
        <p>Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a acessar, corrigir ou solicitar a exclusão dos seus dados. Entre em contato via WhatsApp: <strong>+55 61 8189-4189</strong>.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>7. Contato</h2>
        <p>Dúvidas sobre privacidade? Fale conosco via WhatsApp: <a href="https://wa.me/556181894189" style={{ color: "#4ade80" }}>+55 61 8189-4189</a></p>
      </section>
    </main>
  )
}
