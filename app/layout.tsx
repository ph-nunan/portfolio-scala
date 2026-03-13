import type { Metadata, Viewport } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Scala — Automação com IA para Ecossistemas de Vendas",
  description:
    "Do tráfego pago ao fechamento. Do primeiro contato ao follow-up. Tudo no piloto automático.",
  openGraph: {
    title: "Scala — Automação com IA",
    description:
      "Automatize seu ecossistema de vendas. Implementação em 7 dias.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="grain">{children}</body>
    </html>
  )
}
