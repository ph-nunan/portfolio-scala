import Navbar from "@/components/Navbar"
import FloatingCTA from "@/components/FloatingCTA"
import Hero from "@/components/sections/Hero"
import Problem from "@/components/sections/Problem"
import FunnelComparison from "@/components/sections/FunnelComparison"
import KPIs from "@/components/sections/KPIs"
import Ecosystem from "@/components/sections/Ecosystem"
import Services from "@/components/sections/Services"
import MidCTA from "@/components/sections/MidCTA"
import HowItWorks from "@/components/sections/HowItWorks"
import Results from "@/components/sections/Results"
import TechStack from "@/components/sections/TechStack"
import FAQ from "@/components/sections/FAQ"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/sections/Footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <FloatingCTA />
      <Hero />
      <Problem />
      <FunnelComparison />
      <KPIs />
      <Ecosystem />
      <Services />
      <MidCTA />
      <HowItWorks />
      <Results />
      <TechStack />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
