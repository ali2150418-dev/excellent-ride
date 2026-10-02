"use client"
import { useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion"
import { cn } from "@/lib/utils"

export const ease = [0.22, 1, 0.36, 1] as const

/** Fade + rise into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Staggered container; children should be <StaggerItem>. */
export function Stagger({
  children,
  className,
  gap = 0.08,
}: {
  children: React.ReactNode
  className?: string
  gap?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Word-by-word masked headline reveal. */
export function SplitText({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  text: string
  className?: string
  delay?: number
  as?: "span" | "h1" | "h2"
}) {
  const words = text.split(" ")
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: delay + i * 0.06 }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Number that counts up when scrolled into view. */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString("en-US")}
      {suffix}
    </span>
  )
}

/** Element that gently follows the cursor while hovered. */
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/** Parallax wrapper: shifts children vertically as the section scrolls. */
export function Parallax({
  children,
  className,
  offset = 80,
}: {
  children: React.ReactNode
  className?: string
  offset?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute inset-[-12%_0]">
        {children}
      </motion.div>
    </div>
  )
}

/** Thin gold progress bar fixed to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-gold-soft via-gold to-gold-deep"
    />
  )
}
