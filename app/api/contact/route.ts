import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Validate required fields
    if (!data.nome || !data.email || !data.whatsapp) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL

    if (webhookUrl) {
      // Forward to n8n webhook → Google Sheets
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: "portfolio-scala",
        }),
      })
    } else {
      // Local dev: just log
      console.log("[Contact form]", data)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[Contact API]", err)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
