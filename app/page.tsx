import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import FloatingCTA from "@/components/FloatingCTA"
// Above-fold: carregam eager para LCP rápido
import Hero from "@/components/sections/Hero"
import SocialProof from "@/components/sections/SocialProof"
// Below-fold: lazy — reduz bundle inicial e elimina Framer Motion do chunk inicial
const Problem          = dynamic(() => import("@/components/sections/Problem"))
const PatternInterrupt = dynamic(() => import("@/components/sections/PatternInterrupt"))
const MidCTA           = dynamic(() => import("@/components/sections/MidCTA"))
const FunnelComparison = dynamic(() => import("@/components/sections/FunnelComparison"))
const Ecosystem        = dynamic(() => import("@/components/sections/Ecosystem"))
const Services         = dynamic(() => import("@/components/sections/Services"))
const ForWhom          = dynamic(() => import("@/components/sections/ForWhom"))
const Comparison       = dynamic(() => import("@/components/sections/Comparison"))
const HowItWorks       = dynamic(() => import("@/components/sections/HowItWorks"))
const Results          = dynamic(() => import("@/components/sections/Results"))
const Cases            = dynamic(() => import("@/components/sections/Cases"))
const FuturePacing     = dynamic(() => import("@/components/sections/FuturePacing"))
const KPIs             = dynamic(() => import("@/components/sections/KPIs"))
const TechStack        = dynamic(() => import("@/components/sections/TechStack"))
const Founder          = dynamic(() => import("@/components/sections/Founder"))
const FAQ              = dynamic(() => import("@/components/sections/FAQ"))
const Contact          = dynamic(() => import("@/components/sections/Contact"))
const Footer           = dynamic(() => import("@/components/sections/Footer"))

export default function Home() {
  return (
    <main>
      <Navbar />
      <FloatingCTA />

      {/* 1. Fisgar — proposta de valor + prova imediata */}
      <div id="hero" data-section="hero">
        <Hero />
      </div>
      <div id="social-proof" data-section="social-proof">
        <SocialProof />
      </div>

      {/* 2. Dor — quantificar o problema */}
      <div id="problema" data-section="problema">
        <Problem />
      </div>

      {/* Pattern interrupt: quebrar o ritmo e criar urgência */}
      <div id="pattern-interrupt" data-section="pattern-interrupt">
        <PatternInterrupt />
      </div>

      <div id="calculadora" data-section="calculadora">
        <MidCTA />
      </div>

      {/* 3. Transformação — mostrar o antes/depois */}
      <div id="comparativo-funil" data-section="comparativo-funil">
        <FunnelComparison />
      </div>

      {/* 4. Solução — como o ecossistema funciona */}
      <div id="ecosystem" data-section="ecosystem">
        <Ecosystem />
      </div>
      <div id="services" data-section="services">
        <Services />
      </div>

      {/* 5. Qualificação — para quem é e para quem não é */}
      <div id="para-quem" data-section="para-quem">
        <ForWhom />
      </div>

      {/* 6. Comparativo — por que Scala vs alternativas */}
      <div id="comparativo" data-section="comparativo">
        <Comparison />
      </div>

      {/* 7. Processo — como é contratar */}
      <div id="how-it-works" data-section="how-it-works">
        <HowItWorks />
      </div>

      {/* 8. Risco zero — garantia + resultados */}
      <div id="results" data-section="results">
        <Results />
      </div>

      {/* 9. Prova social — evidência real de automações */}
      <div id="cases" data-section="cases">
        <Cases />
      </div>

      {/* 10. Future Pacing — último empurrão emocional antes da ação */}
      <div id="future-pacing" data-section="future-pacing">
        <FuturePacing />
      </div>

      {/* 11. Prova técnica — para quem ainda tem dúvida */}
      <div id="kpis" data-section="kpis">
        <KPIs />
      </div>
      <div id="tech-stack" data-section="tech-stack">
        <TechStack />
      </div>

      {/* 12. Humanização + Transparência radical */}
      <div id="founder" data-section="founder">
        <Founder />
      </div>

      {/* 13. Conversão final */}
      <div id="faq" data-section="faq">
        <FAQ />
      </div>
      <div id="contact" data-section="contact">
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
