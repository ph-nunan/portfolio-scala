import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import FloatingCTA from "@/components/FloatingCTA"
// Above-fold: eager para LCP rápido
import Hero from "@/components/sections/Hero"
import SocialProof from "@/components/sections/SocialProof"
// Below-fold: lazy
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

      {/* 1. Fisgar — identificação imediata com a dor */}
      <div id="hero" data-section="hero">
        <Hero />
      </div>

      {/* 2. Autoridade — números que geram credibilidade imediata */}
      <div id="social-proof" data-section="social-proof">
        <SocialProof />
      </div>

      {/* 3. Consciência — quantificar o problema que ele já sente */}
      <div id="problema" data-section="problema">
        <Problem />
      </div>

      {/* 4. Desejo — antes/depois visual, transformação concreta */}
      <div id="comparativo-funil" data-section="comparativo-funil">
        <FunnelComparison />
      </div>

      {/* 5. Confiança no processo — desmistificar e mostrar caminho */}
      <div id="how-it-works" data-section="how-it-works">
        <HowItWorks />
      </div>

      {/* 6. Prova social — voz de quem já passou pela transformação */}
      <div id="testimonials" data-section="testimonials">
        <Testimonials />
      </div>

      {/* 7. Humanização — quem está por trás, por que confiar */}
      <div id="founder" data-section="founder">
        <Founder />
      </div>

      {/* 8. Conversão — CTA final para lead quente */}
      <div id="contact" data-section="contact">
        <Contact />
      </div>

      <Footer />
    </main>
  )
}
