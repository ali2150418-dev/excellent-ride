"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

const TARGETS = "main .container-x > *, main .card, main article, main figure, main details, main ul > li"

/** Site-wide scroll animation: a progress bar and a fade/slide-in for content blocks. */
export function ScrollEffects() {
  const pathname = usePathname()
  const bar = useRef<HTMLDivElement>(null)

  // Scroll progress bar
  useEffect(() => {
    const on = () => {
      const el = bar.current
      if (!el) return
      const max = document.documentElement.scrollHeight - innerHeight
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`
    }
    on()
    window.addEventListener("scroll", on, { passive: true })
    window.addEventListener("resize", on)
    return () => {
      window.removeEventListener("scroll", on)
      window.removeEventListener("resize", on)
    }
  }, [pathname])

  // Reveal blocks as they enter the viewport (re-scanned on every route change)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    )

    const pending = new Set<HTMLElement>()
    // Fallback: also check positions on scroll, in case the observer is throttled.
    const check = () => {
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < innerHeight * 0.92) {
          el.classList.add("in")
          pending.delete(el)
          io.unobserve(el)
        }
      })
    }
    window.addEventListener("scroll", check, { passive: true })
    window.addEventListener("resize", check)

    const timer = setTimeout(() => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(TARGETS))
      nodes.forEach((el) => {
        if (el.closest(".reveal") || el.classList.contains("reveal")) return
        const siblings = el.parentElement ? Array.from(el.parentElement.children) : []
        const idx = Math.max(0, siblings.indexOf(el))
        el.style.transitionDelay = `${Math.min(idx, 4) * 80}ms`
        el.classList.add("reveal")
        if (el.getBoundingClientRect().top < innerHeight * 0.95) {
          // already on screen: play the entrance right away
          setTimeout(() => el.classList.add("in"), 40)
        } else {
          pending.add(el)
          io.observe(el)
        }
      })
      check()
    }, 60)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
      io.disconnect()
    }
  }, [pathname])

  return <div ref={bar} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left scale-x-0 bg-accent" aria-hidden />
}
