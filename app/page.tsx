import Navbar from "@/components/Navbar"
import FloatingCTA from "@/components/FloatingCTA"
import Hero from "@/components/sections/Hero"
import SocialProof from "@/components/sections/SocialProof"
import Problem from "@/components/sections/Problem"
import MidCTA from "@/components/sections/MidCTA"
import FunnelComparison from "@/components/sections/FunnelComparison"
import Ecosystem from "@/components/sections/Ecosystem"
import Services from "@/components/sections/Services"
import HowItWorks from "@/components/sections/HowItWorks"
import Results from "@/components/sections/Results"
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
      <MidCTA />

      {/* 3. Transformação — mostrar o antes/depois */}
      <FunnelComparison />

      {/* 4. Solução — como o ecossistema funciona */}
      <Ecosystem />
      <Services />

      {/* 5. Processo — como é contratar */}
      <HowItWorks />

      {/* 6. Risco zero — garantia + resultados */}
      <Results />

      {/* 7. Prova técnica — para quem ainda tem dúvida */}
      <KPIs />
      <TechStack />

      {/* 8. Humanização — founder após toda a prova técnica */}
      <Founder />

      {/* 9. Conversão final */}
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
