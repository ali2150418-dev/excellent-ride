"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { ReactLenis, useLenis } from "lenis/react"

function ResetScrollOnRoute() {
  const pathname = usePathname()
  const lenis = useLenis()
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
  }, [pathname, lenis])
  return null
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      <ResetScrollOnRoute />
      {children}
    </ReactLenis>
  )
}
