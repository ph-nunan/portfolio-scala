import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import FloatingCTA from "@/components/FloatingCTA"
// Above-fold: eager para LCP rápido
import Hero from "@/components/sections/Hero"
// Below-fold: lazy (Ecossistema agora usa Framer Motion, não é marquee leve)
const SocialProof      = dynamic(() => import("@/components/sections/SocialProof"))
const Problem          = dynamic(() => import("@/components/sections/Problem"))
const FunnelComparison = dynamic(() => import("@/components/sections/FunnelComparison"))
const HowItWorks       = dynamic(() => import("@/components/sections/HowItWorks"))
const Testimonials     = dynamic(() => import("@/components/sections/Testimonials"))
const Founder          = dynamic(() => import("@/components/sections/Founder"))
const Contact          = dynamic(() => import("@/components/sections/Contact"))
const Footer           = dynamic(() => import("@/components/sections/Footer"))

export default function Home() {
  return (
    <main>
      <Navbar />
      <FloatingCTA />

      {/* 1. Posicionamento — declaração de autoridade */}
      <div id="hero" data-section="hero">
        <Hero />
      </div>

      {/* 2. Ecossistema — 4 módulos que trabalham juntos */}
      <div id="ecossistema" data-section="ecossistema">
        <SocialProof />
      </div>

      {/* 3. Como Funciona — 4 etapas, do diagnóstico à entrega */}
      <div id="como-funciona" data-section="como-funciona">
        <Problem />
      </div>

      {/* 4. Para Quem É — 3 perfis de identificação */}
      <div id="para-quem" data-section="para-quem">
        <FunnelComparison />
      </div>

      {/* 5. Portfólio — 4 projetos técnicos com métricas reais */}
      <div id="portfolio" data-section="portfolio">
        <HowItWorks />
      </div>

      {/* 6. Números de Mercado — urgência competitiva com dados */}
      <div id="numeros" data-section="numeros">
        <Testimonials />
      </div>

      {/* 7. Por Que a Scala — diferenciação e quem está por trás */}
      <div id="sobre" data-section="sobre">
        <Founder />
      </div>

      {/* 8. CTA Final — confirmar diagnóstico gratuito */}
      <div id="diagnostico" data-section="diagnostico">
        <Contact />
      </div>

      <Footer />
    </main>
  )
}
