declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...params })
  } catch {}
}

export function getScrollPct(): number {
  const h = document.documentElement
  const scrollable = h.scrollHeight - h.clientHeight
  if (scrollable <= 0) return 0
  return Math.round((window.scrollY / scrollable) * 100)
}
