"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { waLink } from "@/lib/data"
import { useI18n } from "@/components/I18nProvider"

/** Contact form — hands the enquiry to WhatsApp so the team can reply instantly. */
export function ContactForm() {
  const { dict } = useI18n()
  const c = dict.pages.contact
  const [sent, setSent] = useState(false)

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const msg = [
      `${c.msgHello} ${d.get("name")}.`,
      `${dict.booking.msgService}: ${d.get("service")}`,
      d.get("phone") && `${c.msgPhone}: ${d.get("phone")}`,
      d.get("message") && `${c.msgMessage}: ${d.get("message")}`,
    ]
      .filter(Boolean)
      .join("\n")
    window.open(waLink(msg), "_blank", "noopener")
    setSent(true)
  }

  const field =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-gold/60 focus:bg-white/[0.06] [&>option]:bg-ink-2"
  const label = "mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-mist"

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-white/[0.08] bg-ink-2 p-7 sm:p-10">
      <h2 className="text-2xl font-semibold text-white">{c.formTitle}</h2>
      <p className="mt-2 text-sm text-mist">{c.formSub}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={label}>{c.name}</span>
          <input name="name" required placeholder={c.namePh} className={field} />
        </label>
        <label className="block">
          <span className={label}>{c.phone}</span>
          <input name="phone" type="tel" dir="ltr" placeholder="+971 ..." className={`${field} rtl:text-right`} />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>{dict.common.service}</span>
          <select name="service" className={field}>
            {dict.services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>{c.message}</span>
          <textarea name="message" rows={5} placeholder={c.messagePh} className={field} />
        </label>
      </div>

      <button
        type="submit"
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-ink transition hover:bg-gold-soft sm:w-auto"
      >
        {c.send}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
      </button>

      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 flex items-center gap-2 text-sm text-gold"
          >
            <CheckCircle2 className="h-4 w-4" /> {c.sent}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}
