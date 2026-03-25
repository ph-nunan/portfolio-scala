"use client"

import { useEffect } from "react"
import { track, getScrollPct } from "@/lib/analytics"

// Tracks: time milestones, scroll depth, exit intent, section engagement,
// section dwell time, and Core Web Vitals — all via dataLayer/GTM.
export default function Analytics() {
  useEffect(() => {
    // ── 1. Time on page milestones ─────────────────────────────────────────
    const MILESTONES = [30, 60, 120, 180, 300]
    const timers = MILESTONES.map((s) =>
      setTimeout(() => track("time_milestone", { seconds: s }), s * 1000)
    )

    // ── 2. Scroll depth ────────────────────────────────────────────────────
    const DEPTHS = [25, 50, 75, 90, 100]
    const reached = new Set<number>()
    const onScroll = () => {
      const pct = getScrollPct()
      for (const d of DEPTHS) {
        if (!reached.has(d) && pct >= d) {
          reached.add(d)
          track("scroll_depth_reached", { percent: d })
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    // ── 3. Exit intent (desktop only) ──────────────────────────────────────
    let exitFired = false
    const onMouseLeave = (e: MouseEvent) => {
      if (exitFired) return
      if (e.clientY <= 10) {
        exitFired = true
        track("exit_intent", { scroll_pct: getScrollPct() })
      }
    }
    document.addEventListener("mouseleave", onMouseLeave)

    // ── 4. Section engagement — viewed ≥2s + section dwell time ───────────
    const sectionTimers = new Map<string, ReturnType<typeof setTimeout>>()
    const sectionEnterTime = new Map<string, number>()
    const viewedSections = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = (entry.target as HTMLElement).dataset.section
          if (!name) continue

          if (entry.isIntersecting) {
            sectionEnterTime.set(name, Date.now())
            // Fire section_viewed after 2s continuous visibility
            if (!viewedSections.has(name)) {
              const t = setTimeout(() => {
                viewedSections.add(name)
                track("section_viewed", { section: name, scroll_pct: getScrollPct() })
              }, 2000)
              sectionTimers.set(name, t)
            }
          } else {
            // Clear pending viewed timer
            const t = sectionTimers.get(name)
            if (t) { clearTimeout(t); sectionTimers.delete(name) }
            // Fire section_time_spent
            const entered = sectionEnterTime.get(name)
            if (entered) {
              const seconds = Math.round((Date.now() - entered) / 1000)
              if (seconds >= 1) {
                track("section_time_spent", { section: name, seconds })
              }
              sectionEnterTime.delete(name)
            }
          }
        }
      },
      { threshold: 0.4 }
    )

    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el))

    // ── 5. Core Web Vitals via PerformanceObserver ─────────────────────────
    const vitalsObservers: PerformanceObserver[] = []

    const tryObserve = (type: string, cb: (entries: PerformanceObserverEntryList) => void) => {
      try {
        const po = new PerformanceObserver(cb)
        po.observe({ type, buffered: true })
        vitalsObservers.push(po)
      } catch {}
    }

    // LCP
    tryObserve("largest-contentful-paint", (list) => {
      const entries = list.getEntries()
      if (entries.length > 0) {
        const lcp = entries[entries.length - 1]
        track("web_vitals", { metric: "LCP", metric_value: Math.round(lcp.startTime) })
      }
    })

    // FCP
    tryObserve("paint", (list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          track("web_vitals", { metric: "FCP", metric_value: Math.round(entry.startTime) })
        }
      }
    })

    // CLS
    let clsValue = 0
    tryObserve("layout-shift", (list) => {
      for (const entry of list.getEntries()) {
        const ls = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
        if (!ls.hadRecentInput) clsValue += ls.value
      }
    })

    // FID / INP (first-input)
    tryObserve("first-input", (list) => {
      for (const entry of list.getEntries()) {
        const fi = entry as PerformanceEntry & { processingStart: number }
        const fid = Math.round(fi.processingStart - fi.startTime)
        track("web_vitals", { metric: "FID", metric_value: fid })
      }
    })

    // Send CLS on page hide (best practice)
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        track("web_vitals", { metric: "CLS", metric_value: Math.round(clsValue * 1000) / 1000 })
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      sectionTimers.forEach(clearTimeout)
      observer.disconnect()
      vitalsObservers.forEach((po) => po.disconnect())
    }
  }, [])

  return null
}
