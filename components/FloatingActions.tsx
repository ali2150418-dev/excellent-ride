"use client"
import { useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { useLenis } from "lenis/react"
import { contact } from "@/lib/data"
import { useI18n } from "@/components/I18nProvider"
import { WhatsAppIcon } from "@/components/icons"

export function FloatingActions() {
  const { dict } = useI18n()
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  const lenis = useLenis()
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600))

  return (
    <div className="fixed bottom-5 end-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => lenis?.scrollTo(0)}
            aria-label={dict.common.backToTop}
            className="glass grid h-11 w-11 place-items-center rounded-full text-white transition hover:text-gold"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
      <a
        href={contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dict.common.whatsapp}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] transition hover:scale-110"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>
    </div>
  )
}
