import type { Metadata } from "next"
import { BadgeCheck, CalendarCheck, CreditCard, Route, UserCheck } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { Reviews } from "@/components/Reviews"
import { PageHero, Paragraphs, Pic } from "@/components/ui"
import { pages, paras, sectionBy, toCards, toSections } from "@/lib/site"

export const metadata: Metadata = { title: pages.about.title }

const reviewers = [
  { name: "Muhammed Ahmed" },
  { name: "Ahmed Al Mansoori" },
  { name: "Sarah Khalid" },
  { name: "Abdul Rehman", avatar: "/site/unnamed-4.png" },
]

export default function AboutPage() {
  const secs = toSections(pages.about.blocks)
  const who = sectionBy(secs, "Who are Excellent Ride safe driver?")
  const why = sectionBy(secs, "Why Choose Excellent Ride Safe Driver?")
  const exp = sectionBy(secs, "Our Experience")
  const own = sectionBy(secs, "Our Safe Driver will transport you in your own car safely.")
  const steps = ["Make a Booking", "Get a Driver", "Payment"].map((t) => sectionBy(secs, t))
  const proof = ["Years of Experience", "RTA Approved", "Quality Drivers"].map((t) => sectionBy(secs, t))
  const dist = sectionBy(secs, "What Distinguishes Us")
  const distCards = toCards(dist.items).cards
  const reviewTexts = distCards[distCards.length - 1].body.slice(1)
  distCards[distCards.length - 1].body = distCards[distCards.length - 1].body.slice(0, 1)
  const stepIcons = [CalendarCheck, UserCheck, CreditCard]
  const proofIcons = [Route, BadgeCheck, UserCheck]

  return (
    <>
      <PageHero
        title={secs[0].title}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image="/site/ChatGPT-Image-Jun-27-2026-01_06_18-PM-14.png"
      />

      <section className="container-x py-16 md:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <Reveal>
            <h2 className="text-balance text-3xl font-semibold leading-tight md:text-4xl">{who.title}</h2>
            <Paragraphs items={paras(who.items)} className="mt-6" />
          </Reveal>
          <Reveal>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-card">
              <Pic src="/site/d8498003-36f5-40bc-9d99-eaddf5e6cfd9.png" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy py-16 text-white md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">{exp.title}</span>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight md:text-4xl">{why.title}</h2>
            <p className="mt-6 leading-[1.8] text-white/70">{paras(why.items)[0]}</p>
            <p className="mt-6 border-l-2 border-accent pl-5 text-lg leading-relaxed">{paras(exp.items)[0]}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {proof.map((p, i) => {
              const Icon = proofIcons[i]
              return (
                <div key={p.title} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-accent-ink">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{paras(p.items)[0]}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-balance text-3xl font-semibold leading-tight md:text-4xl">{own.title}</h2>
            <Paragraphs items={paras(own.items)} className="mt-6" />
          </Reveal>
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

      <section className="bg-surface-2/60 py-16 md:py-24">
        <div className="container-x">
          <h2 className="text-3xl font-semibold md:text-4xl">{dist.title}</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {distCards.map((c, i) => (
              <Reveal key={c.heading} delay={i * 70}>
                <article className="card h-full p-7">
                  <span className="font-display text-4xl font-semibold text-accent/70">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold">{c.heading}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.body[0]}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {["ChatGPT-Image-Jun-27-2026-01_06_18-PM-12.png", "ChatGPT-Image-Jun-27-2026-01_06_18-PM-13.png", "ChatGPT-Image-Jun-27-2026-01_06_18-PM-14.png"].map((f) => (
            <div key={f} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
              <Pic src={`/site/${f}`} sizes="(min-width: 640px) 33vw, 100vw" />
            </div>
          ))}
        </div>
        <div className="mt-16">
          <Reviews items={reviewers.map((r, i) => ({ ...r, text: reviewTexts[i] }))} />
        </div>
      </section>
    </>
  )
}
