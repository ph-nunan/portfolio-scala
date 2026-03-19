import type { Metadata, Viewport } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import Script from "next/script"
import MetaPixel from "@/components/MetaPixel"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-scala.vercel.app"
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ""

// ── Viewport ───────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

// ── Metadata ───────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "Automação de Atendimento e Vendas com IA | Scala",
  description:
    "Automatize seu atendimento 24/7 no WhatsApp com IA, qualifique leads em segundos e feche mais vendas. Implementação em 7 dias. Diagnóstico gratuito.",

  keywords: [
    "automação de atendimento whatsapp",
    "chatbot para empresas",
    "automação comercial com IA",
    "agente IA atendimento",
    "automação de vendas",
    "como automatizar atendimento no whatsapp",
    "agente de IA para qualificar leads",
    "automação para agências de tráfego",
    "automação de atendimento Brasília",
    "n8n automação",
    "scala automação",
  ],

  authors: [{ name: "Scala", url: SITE_URL }],
  creator: "Scala",
  publisher: "Scala",

  verification: {
    google: "1NHmkAXqqvk-iW4MtX3-5XwXUAGA5If-ZhUitCIvy8A",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Scala",
    title: "Scala — Automação de Atendimento e Vendas com IA",
    description:
      "Automatize seu atendimento 24/7 no WhatsApp com IA, qualifique leads em segundos e feche mais vendas. Implementação em 7 dias. Diagnóstico gratuito.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Scala — Automação de Atendimento e Vendas com IA",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Scala — Automação de Atendimento e Vendas com IA",
    description:
      "Automatize seu atendimento 24/7 no WhatsApp com IA. Qualifique leads em segundos. Implementação em 7 dias.",
    images: ["/opengraph-image"],
  },
}

// ── Structured Data (JSON-LD) ──────────────────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Scala",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-lockup-v2.png`,
        width: 280,
        height: 72,
      },
      description:
        "Automação de atendimento e vendas com inteligência artificial. Atendimento 24/7 no WhatsApp, qualificação de leads, CRM automatizado e relatórios inteligentes.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Brasília",
        addressRegion: "DF",
        addressCountry: "BR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+55-61-8189-4189",
        contactType: "sales",
        availableLanguage: "Portuguese",
      },
      sameAs: ["https://wa.me/556181894189"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Scala",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "pt-BR",
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      name: "Automação de Atendimento e Vendas com IA",
      provider: { "@id": `${SITE_URL}/#organization` },
      description:
        "Ecossistema completo de automação: agente de IA no WhatsApp, qualificação automática de leads, CRM integrado e relatórios inteligentes. Implementação em 7 dias.",
      areaServed: { "@type": "Country", name: "Brasil" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Pacotes Scala",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Pacote Starter",
            price: "450",
            priceCurrency: "BRL",
            description: "Automação de atendimento básica. A partir de R$ 450/mês.",
          },
          {
            "@type": "Offer",
            name: "Pacote Pro",
            price: "1200",
            priceCurrency: "BRL",
            description:
              "Ecossistema completo de vendas automatizado. A partir de R$ 1.200/mês.",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Como funciona a automação de campanhas e atendimento com a Scala?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Integramos diretamente com as APIs do Google Ads e Meta Ads para otimização automática de campanhas. No atendimento, um agente de IA treinado com sua base de conhecimento responde leads via WhatsApp em menos de 5 segundos, 24 horas por dia, 7 dias por semana — sem intervenção humana.",
          },
        },
        {
          "@type": "Question",
          name: "Preciso entender de tecnologia para usar a Scala?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Não. Cuidamos de toda a parte técnica — da configuração ao treinamento da IA. Você só precisa nos dar acesso às ferramentas e descrever seu processo de vendas. Em 7 dias, o ecossistema está em produção.",
          },
        },
        {
          "@type": "Question",
          name: "A IA parece robótica nos atendimentos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Não. O agente é treinado com o tom de voz, linguagem e contexto específico do seu negócio. A maioria dos leads não percebe que está sendo atendido por uma IA nas primeiras interações.",
          },
        },
        {
          "@type": "Question",
          name: "E se eu já uso um CRM?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Integramos com qualquer CRM que tenha API — Kommo, HubSpot, Pipedrive, RD Station e outros. Se não tiver CRM, configuramos uma solução completa no Google Sheets sem custo adicional.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto tempo leva para implementar a automação?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "7 dias úteis para o ecossistema completo. Do primeiro diagnóstico ao sistema em produção, com treinamento da IA e configuração de todos os fluxos.",
          },
        },
        {
          "@type": "Question",
          name: "Qual a diferença entre a Scala e um chatbot comum?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Chatbots comuns seguem fluxos fixos e não entendem contexto. Nossa IA tem memória de conversa, entende perguntas abertas, acessa dados do CRM em tempo real e decide a próxima ação com base no histórico completo do lead.",
          },
        },
      ],
    },
  ],
}

// ── Layout ─────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${dmSans.variable}`}
    >
      <head>
        {/* Google Tag Manager — carregado apenas quando o ID estiver configurado */}
        {GTM_ID && (
          <Script id="gtm-head" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>

      <body className="grain">
        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <MetaPixel />
        {children}
      </body>
    </html>
  )
}
