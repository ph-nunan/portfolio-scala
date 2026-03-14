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
      <Hero />
      <SocialProof />

      {/* 2. Dor — quantificar o problema */}
      <Problem />

      {/* Pattern interrupt: quebrar o ritmo e criar urgência (PDF 2.4) */}
      <PatternInterrupt />

      <MidCTA />

      {/* 3. Transformação — mostrar o antes/depois */}
      <FunnelComparison />

      {/* 4. Solução — como o ecossistema funciona */}
      <Ecosystem />
      <Services />

      {/* 5. Qualificação — para quem é e para quem não é (PDF 3.1) */}
      <ForWhom />

      {/* 6. Comparativo — por que Scala vs alternativas (PDF 3.2) */}
      <Comparison />

      {/* 7. Processo — como é contratar */}
      <HowItWorks />

      {/* 8. Risco zero — garantia + resultados */}
      <Results />

      {/* 9. Prova social — evidência real de automações (PDF 3.3) */}
      <Cases />

      {/* 10. Future Pacing — último empurrão emocional antes da ação (PDF 2.2) */}
      <FuturePacing />

      {/* 11. Prova técnica — para quem ainda tem dúvida */}
      <KPIs />
      <TechStack />

      {/* 12. Humanização + Transparência radical (PDF 5.2 + 5.1) */}
      <Founder />

      {/* 13. Conversão final */}
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
