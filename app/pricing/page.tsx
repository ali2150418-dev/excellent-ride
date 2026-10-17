import type { Metadata } from "next"
import { Banknote, CalendarCheck, Clock, ShieldCheck, UserCheck } from "lucide-react"
import { RateCards } from "@/components/Rates"
import { Reveal } from "@/components/Reveal"
import { CtaLink, PageHero, Paragraphs } from "@/components/ui"
import { contact, pages, paras, sectionBy, toCards, toSections } from "@/lib/site"

export const metadata: Metadata = { title: pages.pricing.title }

export default function PricingPage() {
  const secs = toSections(pages.pricing.blocks)
  const titleSec = secs[0]
  const quick = ["Hourly Plan", "Per Day", "Inter-emirates", "Per Rides", "Weekly", "Monthly"].map((t) => sectionBy(secs, t))
  const flexible = sectionBy(secs, "Flexible Safe Driver Dubai.")
  const exr = sectionBy(secs, "Solution of Driver Services in DUBAI.")
  const how = toCards(exr.items)
  const steps = ["Make a Booking", "Get a Driver", "Payment"].map((t) => sectionBy(secs, t, 1) ?? sectionBy(secs, t))
  const inquiries = sectionBy(secs, "Clients Inquiries")
  const feats = toCards(inquiries.items)
  const stepIcons = [CalendarCheck, UserCheck, Banknote]
  const rates = sectionBy(secs, "Safe Driver Service")

  return (
    <>
      <PageHero title="Pricing" crumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]} image="/site/E-Safe-Driver.png" />

      <section className="container-x py-16 md:py-24">
        <h2 className="text-balance text-3xl font-semibold md:text-4xl">{titleSec.title}</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {quick.map((q, i) => {
            const lines = paras(q.items)
            const bookNow = q.title === "Weekly" || q.title === "Monthly"
            return (
              <Reveal key={q.title} delay={(i % 3) * 70}>
                <article className="card h-full p-7">
                  <h3 className="font-display text-xl font-semibold">
                    <span className="mr-2 text-accent">0{i + 1}</span>
                    {q.title}
                  </h3>
                  <ul className="mt-5 grid gap-3">
                    {lines.map((l) => {
                      const [a, b] = l.includes(">") && !/^only/.test(l) ? l.split(">").map((s) => s.trim()) : [l, ""]
                      return (
                        <li key={l} className="flex items-center justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
                          <span className={b ? "text-muted" : bookNow && /^only/.test(l) ? "font-display text-2xl font-semibold text-accent" : "text-muted"}>{a}</span>
                          {b && <span className="font-display font-semibold">{b}</span>}
                        </li>
                      )
                    })}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
        <div className="mt-8">
          <CtaLink href={contact.whatsapp} external>
            Book Now
          </CtaLink>
        </div>
      </section>

      <section className="bg-surface-2/60 py-16 md:py-24">
        <div className="container-x">
          <span className="eyebrow">{rates.title}</span>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{flexible.title}</h2>
          <Paragraphs items={toCards(flexible.items).intro} className="mt-6 max-w-3xl" />
          <div className="mt-12">
            <RateCards items={flexible.items} />
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="eyebrow">EXR - Safe Driver Dubai</span>
            <h2 className="mt-3 text-balance text-3xl font-semibold md:text-4xl">{exr.title}</h2>
            <p className="mt-5 leading-[1.8] text-muted">{how.intro[0]}</p>
            <h3 className="mt-10 font-display text-xl font-semibold">{how.cards[0]?.heading}</h3>
            <p className="mt-3 leading-[1.8] text-muted">{how.cards[0]?.body[0]}</p>
          </div>
          <div className="grid gap-4">
            {steps.map((s, i) => {
              const Icon = stepIcons[i]
              return (
                <Reveal key={s.title} delay={i * 80}>
                  <div className="card flex items-start gap-4 p-6">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-accent-ink">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">
                        <span className="mr-2 text-accent">0{i + 1}</span>
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{paras(s.items)[0]}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="container-x pb-16 md:pb-24">
        <div className="overflow-hidden rounded-2xl bg-navy p-8 text-white md:p-14">
          <h2 className="text-balance text-3xl font-semibold uppercase md:text-4xl">HIRE A SAFE DRIVER IN DUBAI.</h2>
          <h3 className="mt-8 font-display text-xl font-semibold text-accent">{inquiries.title}</h3>
          <p className="mt-3 max-w-3xl leading-[1.8] text-white/70">{feats.intro[0]}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {feats.cards.map((c, i) => {
              const Icon = [Banknote, ShieldCheck, Clock][i]
              return (
                <div key={c.heading} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <Icon className="text-accent" />
                  <h3 className="mt-4 font-display text-lg font-semibold">{c.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{c.body[0]}</p>
                  {c.body.length > 1 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.body.slice(1).map((t) => (
                        <span key={t} className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
