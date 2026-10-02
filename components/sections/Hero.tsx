"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { BadgeCheck, Clock, Star } from "lucide-react"
import { useI18n } from "@/components/I18nProvider"
import { useIntroReady } from "@/components/Intro"
import { Button, Container } from "@/components/ui"
import { BookingCard } from "@/components/BookingCard"
import { Magnetic, ease } from "@/components/motion"
import { cn } from "@/lib/utils"

const SLIDES = ["/img/hd/hero-skyline.jpg", "/img/hd/hero-burj.jpg", "/img/hd/hero-sedan.jpg"]
const DURATION = 6500

export function Hero() {
  const { dict, href } = useI18n()
  const h = dict.hero
  const ready = useIntroReady()
  const ref = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"])
  const fade = useTransform(scrollYProgress, [0.45, 0.95], [1, 0])

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), DURATION)
    return () => clearInterval(t)
  }, [index])

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease, delay },
  })

  const badges = [BadgeCheck, Clock, Star]

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden">
      {/* Slideshow */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[index]}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="animate-kenburns object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/35 to-transparent rtl:bg-gradient-to-l" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/10 to-ink/45" />
      <div className="absolute inset-0 -z-10 grid-lines opacity-30 [mask-image:radial-gradient(ellipse_at_left,black,transparent_60%)]" />

      <motion.div style={{ opacity: fade, y: contentY }}>
        <Container className="flex min-h-[100svh] flex-col justify-end pb-6 pt-32 sm:pb-8">
          <div className="max-w-4xl">
            <motion.div {...show(0.1)} className="flex flex-wrap items-center gap-2.5">
              {h.badges.map((label, i) => {
                const Icon = badges[i]
                return (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3.5 py-1.5 text-xs text-white/85 backdrop-blur-md"
                  >
                    <Icon className={cn("h-3.5 w-3.5 text-gold", i === 2 && "fill-gold")} /> {label}
                  </span>
                )
              })}
            </motion.div>

            <h1 className="mt-8 text-[clamp(2.9rem,7.4vw,6.25rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
              {[h.line1, h.line2].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={ready ? { y: "0%" } : undefined}
                    transition={{ duration: 1.2, ease, delay: 0.2 + i * 0.12 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
              <span className="block overflow-hidden pb-[0.14em]">
                <motion.span
                  className="block font-serif text-[1.08em] font-normal italic tracking-[-0.01em] text-gradient-gold"
                  initial={{ y: "110%" }}
                  animate={ready ? { y: "0%" } : undefined}
                  transition={{ duration: 1.2, ease, delay: 0.44 }}
                >
                  {h.accent}
                </motion.span>
              </span>
            </h1>

            <motion.p {...show(0.65)} className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              {h.text}
            </motion.p>

            <motion.div {...show(0.8)} className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Button href={href("/contact")}>{h.primary}</Button>
              </Magnetic>
              <Magnetic>
                <Button href={href("/pricing")} variant="ghost" className="backdrop-blur-md">
                  {h.secondary}
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Slide indicator */}
          <motion.div {...show(1)} className="mt-8 hidden items-end justify-end gap-6 md:flex">
            {h.slides.map((label, i) => (
              <button key={label} onClick={() => setIndex(i)} className="group w-40 text-start" aria-label={label}>
                <span className="flex items-baseline gap-2 text-xs">
                  <span className={cn("font-mono transition-colors", i === index ? "text-gold" : "text-white/40")}>0{i + 1}</span>
                  <span className={cn("transition-colors", i === index ? "text-white" : "text-white/45 group-hover:text-white/80")}>
                    {label}
                  </span>
                </span>
                <span className="mt-2.5 block h-px w-full overflow-hidden bg-white/15">
                  {i === index && (
                    <motion.span
                      key={index}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: DURATION / 1000, ease: "linear" }}
                      className="block h-full origin-left bg-gold rtl:origin-right"
                    />
                  )}
                </span>
              </button>
            ))}
          </motion.div>

          <motion.div {...show(1.05)} className="mt-5">
            <BookingCard variant="bar" />
          </motion.div>
        </Container>
      </motion.div>
    </section>
  )
}
