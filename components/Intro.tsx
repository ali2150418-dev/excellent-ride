"use client"
import { createContext, useContext, useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { useLenis } from "lenis/react"
import { useI18n } from "@/components/I18nProvider"
import { ease } from "@/components/motion"

const IntroContext = createContext<{ ready: boolean; finish: () => void }>({ ready: true, finish: () => {} })

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  return <IntroContext.Provider value={{ ready, finish: () => setReady(true) }}>{children}</IntroContext.Provider>
}

/** True once the opening curtain has lifted — hero animations wait for it. */
export const useIntroReady = () => useContext(IntroContext).ready

/** Brand curtain shown on a hard page load. */
export function Preloader() {
  const { dict } = useI18n()
  const { finish } = useContext(IntroContext)
  const [show, setShow] = useState(true)
  const lenis = useLenis()

  useEffect(() => {
    lenis?.stop()
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const t = setTimeout(() => {
      setShow(false)
      finish()
      lenis?.start()
    }, reduce ? 200 : 1900)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis])

  const name = dict.company.name.toUpperCase()

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease }}
          className="intro-failsafe fixed inset-0 z-[100] grid place-items-center bg-ink"
          style={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse,black,transparent_65%)]" />
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease }}
              className="relative h-20 w-20 overflow-hidden rounded-full ring-1 ring-gold/50"
            >
              <Image src="/img/logo-badge.png" alt="" fill sizes="80px" className="scale-[1.04] object-cover" priority />
            </motion.div>
            <p className="mt-7 flex overflow-hidden text-xl font-extrabold tracking-[0.35em] text-white" dir="ltr">
              {"EXCELLENT RIDE".split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.7, ease, delay: 0.3 + i * 0.035 }}
                  className="inline-block"
                >
                  {c === " " ? " " : c}
                </motion.span>
              ))}
            </p>
            <span className="sr-only">{name}</span>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-3 text-xs uppercase tracking-[0.3em] text-mist"
            >
              {dict.intro}
            </motion.p>
            <div className="mt-8 h-px w-48 overflow-hidden bg-white/10">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
                className="h-full origin-left bg-gradient-to-r from-gold-soft via-gold to-gold-deep rtl:origin-right"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
