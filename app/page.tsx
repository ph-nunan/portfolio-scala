import Navbar from "@/components/Navbar"
import FloatingCTA from "@/components/FloatingCTA"
import Hero from "@/components/sections/Hero"
import SocialProof from "@/components/sections/SocialProof"
import Problem from "@/components/sections/Problem"
import PatternInterrupt from "@/components/sections/PatternInterrupt"
import MidCTA from "@/components/sections/MidCTA"
import FunnelComparison from "@/components/sections/FunnelComparison"
import Ecosystem from "@/components/sections/Ecosystem"
import Services from "@/components/sections/Services"
import ForWhom from "@/components/sections/ForWhom"
import Comparison from "@/components/sections/Comparison"
import HowItWorks from "@/components/sections/HowItWorks"
import Results from "@/components/sections/Results"
import Cases from "@/components/sections/Cases"
import FuturePacing from "@/components/sections/FuturePacing"
import KPIs from "@/components/sections/KPIs"
import TechStack from "@/components/sections/TechStack"
import Founder from "@/components/sections/Founder"
import FAQ from "@/components/sections/FAQ"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/sections/Footer"

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
