"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus } from "lucide-react"
import { useI18n } from "@/components/I18nProvider"
import { ease } from "@/components/motion"
import { cn } from "@/lib/utils"

export function FaqList() {
  const { dict } = useI18n()
  const faqs = dict.faqs
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="flex items-baseline gap-5">
                <span className="font-mono text-xs text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                <span className={cn("text-lg font-medium transition-colors sm:text-xl", isOpen ? "text-white" : "text-white/75 group-hover:text-white")}>
                  {f.q}
                </span>
              </span>
              <span
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500",
                  isOpen ? "rotate-45 border-gold bg-gold text-ink" : "border-white/15 text-white",
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 ps-10 text-base leading-relaxed text-mist">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
