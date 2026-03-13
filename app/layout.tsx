import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

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
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="grain">{children}</body>
    </html>
  )
}
