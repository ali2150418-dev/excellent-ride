"use client"
import { useState } from "react"
import { ArrowRight, CalendarDays, Car, Layers, MapPin, Sparkles } from "lucide-react"
import { waLink } from "@/lib/data"
import { useI18n } from "@/components/I18nProvider"
import { cn } from "@/lib/utils"

/** Quick booking form — composes a WhatsApp message for the dispatch team. */
export function BookingCard({ className, variant = "card" }: { className?: string; variant?: "card" | "bar" }) {
  const { dict } = useI18n()
  const b = dict.booking
  const [service, setService] = useState(dict.services[0].title)
  const [plan, setPlan] = useState(dict.plans[3].name)
  const [date, setDate] = useState("")
  const [area, setArea] = useState("")

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const msg = [
      b.msgHello,
      `${b.msgService}: ${service}`,
      `${b.msgPlan}: ${plan}`,
      date && `${b.msgDate}: ${date}`,
      area && `${b.msgArea}: ${area}`,
    ]
      .filter(Boolean)
      .join("\n")
    window.open(waLink(msg), "_blank", "noopener")
  }

  const field =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm text-white outline-none transition focus:border-gold/60 focus:bg-white/[0.07] [&>option]:bg-ink-2"

  const serviceSelect = (
    <select value={service} onChange={(e) => setService(e.target.value)} className={field} aria-label={b.service}>
      {dict.services.map((s) => (
        <option key={s.slug}>{s.title}</option>
      ))}
    </select>
  )
  const planSelect = (
    <select value={plan} onChange={(e) => setPlan(e.target.value)} className={field} aria-label={b.plan}>
      {dict.plans.map((p) => (
        <option key={p.name} value={p.name}>
          {p.name} · {p.price.toLocaleString("en-US")} {dict.aed}
        </option>
      ))}
    </select>
  )
  const dateInput = (
    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={cn(field, "[color-scheme:dark]")} aria-label={b.date} />
  )
  const areaInput = (
    <input
      value={area}
      onChange={(e) => setArea(e.target.value)}
      placeholder={b.areaPlaceholder}
      className={cn(field, "placeholder:text-white/30")}
      aria-label={b.area}
    />
  )

  if (variant === "bar") {
    const cells = [
      { icon: Car, label: b.service, el: serviceSelect, span: "lg:col-span-3" },
      { icon: Layers, label: b.plan, el: planSelect, span: "lg:col-span-3" },
      { icon: CalendarDays, label: b.date, el: dateInput, span: "lg:col-span-3" },
      { icon: MapPin, label: b.area, el: areaInput, span: "lg:col-span-3" },
    ]
    return (
      <form
        onSubmit={submit}
        className={cn(
          "glass flex flex-col gap-3 rounded-[1.75rem] p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] lg:flex-row lg:items-end",
          className,
        )}
      >
        <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {cells.map((c) => (
            <label key={c.label} className={cn("block rounded-2xl px-2 pt-2", c.span)}>
              <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-mist">
                <c.icon className="h-3.5 w-3.5 text-gold" /> {c.label}
              </span>
              {c.el}
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="group flex h-[50px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-gold px-7 text-sm font-semibold text-ink transition hover:bg-gold-soft lg:mb-0"
        >
          {b.submit}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={submit} className={cn("glass rounded-3xl p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] sm:p-7", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{b.eyebrow}</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{b.title}</h3>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/10 text-gold">
          <Sparkles className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-6 space-y-3">
        <label className="block">
          <span className="mb-1.5 block text-xs text-mist">{b.service}</span>
          {serviceSelect}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1.5 block text-xs text-mist">{b.plan}</span>
            {planSelect}
          </label>
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1 text-xs text-mist">
              <CalendarDays className="h-3 w-3" /> {b.date}
            </span>
            {dateInput}
          </label>
        </div>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1 text-xs text-mist">
            <MapPin className="h-3 w-3" /> {b.area}
          </span>
          {areaInput}
        </label>
      </div>

      <button
        type="submit"
        className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3.5 text-sm font-semibold text-ink transition hover:bg-gold-soft"
      >
        {b.submit}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
      </button>
      <p className="mt-3 text-center text-[11px] text-mist">{b.note}</p>
    </form>
  )
}
