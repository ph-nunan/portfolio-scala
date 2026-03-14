import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Validate required fields
    if (!data.nome || !data.email || !data.whatsapp) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const payload = {
      ...data,
      timestamp: new Date().toISOString(),
      source: "portfolio-scala",
    }

    const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL

    if (sheetsUrl) {
      const res = await fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        console.error("[Contact API] Sheets webhook error:", res.status)
      }
    } else {
      // Local dev: just log
      console.log("[Contact form]", payload)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[Contact API]", err)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
