"use client"
import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

/** Soft gold follower cursor for fine pointers; grows over interactive elements. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [down, setDown] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return
    document.documentElement.classList.add("has-cursor")
    const move = (e: PointerEvent) => {
      setEnabled(true)
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target as HTMLElement | null
      setHover(!!t?.closest("a, button, select, input, textarea, label, [role=button]"))
    }
    const dn = () => setDown(true)
    const up = () => setDown(false)
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerdown", dn)
    window.addEventListener("pointerup", up)
    return () => {
      document.documentElement.classList.remove("has-cursor")
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerdown", dn)
      window.removeEventListener("pointerup", up)
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[110] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold"
      />
      <motion.div
        style={{ x: sx, y: sy }}
        animate={{ scale: down ? 0.8 : hover ? 1.8 : 1, opacity: hover ? 0.9 : 0.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="pointer-events-none fixed left-0 top-0 z-[110] -ml-5 -mt-5 h-10 w-10 rounded-full border border-gold/70 mix-blend-difference"
      />
    </>
  )
}
