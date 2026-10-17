import Link from "next/link"
import { Apple, ArrowLeftRight, Banknote, Briefcase, CalendarCheck, CreditCard, GraduationCap, MapPin, PartyPopper, Plane, ShieldCheck, Smartphone, UserRound } from "lucide-react"
import { BlogCard } from "@/components/BlogCard"
import { BookingForm } from "@/components/BookingForm"
import { RateCards } from "@/components/Rates"
import { Reveal } from "@/components/Reveal"
import { Reviews } from "@/components/Reviews"
import { Band, CtaLink, Faq, Pic, SectionHead } from "@/components/ui"
import { contact, pages, paras, posts, services, toCards, toFaqs, toSections } from "@/lib/site"

const secs = toSections(pages.home.blocks)
const IMG = {
  hero: "/site/middle-aged-woman-exiting-car-assisted-by-chauffeu-2025-11-13-22-08-58-utc-scaled.jpg",
  door: "/site/chauffeur-service.jpg",
  man: "/site/ChatGPT-Image-Jun-27-2026-01_06_18-PM-14.png",
  biz: "/site/african-american-businessman-in-suit-using-smartph-2024-11-14-14-18-09-utc.jpg",
}

const serviceIcons = [ShieldCheck, CalendarCheck, UserRound, Plane, Briefcase, GraduationCap, ArrowLeftRight, MapPin, PartyPopper]
const commitIcons = [CalendarCheck, Plane, GraduationCap, UserRound]
const commitLinks = [
  "/services/monthly-driver-dubai",
  "/services/airport-transfer-dubai",
  "/services/school-pick-up-drop-off",
  "/services/personal-driver-dubai",
]
const reviewers = [
  { name: "Abdul Rehman", avatar: "/site/unnamed.png" },
  { name: "Ferlyn Biliran", avatar: "/site/unnamed-1.png" },
  { name: "Shakil Advertisers", avatar: "/site/unnamed-2.png" },
  { name: "Michael Patrick Foley", avatar: "/site/unnamed-3.png" },
]

export default function Home() {
  const welcome = secs[1]
  const h1 = welcome.items.find((b) => b.t === "h")!.x
  const lead = paras(welcome.items)[0]
  const intro = secs[2]
  const commit = secs[3]
  const commitCards = toCards(commit.items)
  const offer = secs[5]
  const offerCards = toCards(offer.items)
  const reviewSec = secs[6]
  const reviewParas = paras(reviewSec.items)
  const offer2 = secs[7]
  const offer2Cards = toCards(offer2.items)
  const faqs = toFaqs(secs[12].items)
  const rates = secs[10]
  const comma = h1.indexOf(",")

  return (
    <>
      {/* ================= Hero (full width) ================= */}
      <section className="relative isolate z-10 overflow-hidden bg-[#111113] pb-10 text-white [clip-path:polygon(0_0,100%_0,100%_calc(100%-56px),0_100%)] md:pb-14">
        <div className="absolute inset-0 -z-10">
          <Pic src={IMG.hero} sizes="100vw" priority className="object-[60%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        </div>
        <div className="container-x grid items-center gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:py-24">
          <div>
            <span className="eyebrow">{secs[0].title}</span>
            <p className="mt-5 text-sm font-medium text-white/70">{welcome.title}</p>
            <h1 className="mt-3 max-w-2xl text-balance text-4xl font-semibold leading-[1.12] md:text-4xl">
              {h1.slice(0, comma + 1)} <span className="text-accent">{h1.slice(comma + 1).trim()}</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/75">{lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="#book">Book Now</CtaLink>
              <a href={contact.phoneHref} className="btn btn-ghost !border-white/30 !text-white hover:!border-white">
                {contact.phone}
              </a>
            </div>
          </div>
          <div id="book" className="scroll-mt-28 lg:max-w-[460px] lg:justify-self-end lg:w-full">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* ================= Services quick links + payment + apps ================= */}
      <section className="relative z-[5] -mt-14 bg-surface-2 pb-20 pt-24 [clip-path:polygon(0_0,100%_0,100%_100%,0_calc(100%-48px))] md:pb-24 md:pt-28">
        <div className="container-x">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-9">
            {services.map((s, i) => {
              const Icon = serviceIcons[i]
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex h-full flex-col items-center gap-3 rounded-xl bg-surface p-4 text-center text-[13px] font-semibold leading-snug shadow-[var(--shadow)] transition hover:-translate-y-1"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-[#0a0a0a] text-accent">
                      <Icon size={22} />
                    </span>
                    {s.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-xl bg-surface px-6 py-4 shadow-[var(--shadow)]">
            <span className="font-display font-semibold">{offerCards.cards[0].heading} :</span>
            {["Cash", "Cards", "Bank Transfers", "Digital Payments"].map((p) => (
              <span key={p} className="flex items-center gap-2 text-sm font-medium text-muted">
                <CreditCard size={16} className="text-accent" /> {p}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {[
              { l: "Android", Icon: Smartphone },
              { l: "Apple", Icon: Apple },
            ].map(({ l, Icon }) => (
              <span key={l} className="flex items-center gap-3 rounded-lg border border-white/20 bg-[#0a0a0a] px-5 py-2.5 text-white">
                <Icon size={22} />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] uppercase tracking-wider text-white/60">100% Digital</span>
                  <span className="block font-display text-base font-semibold">{l}</span>
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Intro ================= */}
      <Band className="-mt-12 !pt-28 md:!pt-36">
        <div className="grid items-start gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32">
            <div className="relative mx-auto max-w-md pb-6 pr-6 lg:max-w-none">
              <div className="absolute bottom-0 right-0 h-[88%] w-[88%] rounded-2xl bg-accent" aria-hidden />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[var(--shadow)]">
                <Pic src={IMG.door} sizes="(min-width: 1024px) 40vw, 90vw" />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <h2 className="max-w-2xl text-balance text-2xl font-semibold uppercase leading-[1.25] tracking-tight md:text-[32px]">
              {intro.title}
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-accent" aria-hidden />
            {(() => {
              const ps = paras(intro.items)
              return (
                <div className="mt-8 max-w-3xl space-y-6 text-[16px] leading-[1.85] text-muted">
                  <p className="border-l-4 border-accent pl-5 text-[19px] leading-[1.7] text-ink">{ps[0]}</p>
                  {ps.slice(1, -1).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <p className="rounded-xl bg-surface-2 p-6 text-ink">{ps[ps.length - 1]}</p>
                </div>
              )
            })()}
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="#book">Book Now</CtaLink>
              <a href={contact.phoneHref} className="btn btn-ghost">
                {contact.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* ================= What We Commit ================= */}
      <Band tone="alt">
        <SectionHead eyebrow={commit.title} title={commit.title} lead={commitCards.intro[0]} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {commitCards.cards.map((c, i) => {
            const Icon = commitIcons[i]
            return (
              <Reveal key={c.heading} delay={i * 70}>
                <Link href={commitLinks[i]} className="card group flex h-full flex-col p-7 transition hover:-translate-y-1 hover:shadow-[var(--shadow)]">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-ink">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold group-hover:text-accent">{c.heading}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.body[0]}</p>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Band>

      {/* ================= What We Offer (dark band) ================= */}
      <section className="bg-navy text-[#f3f3f1]">
        <div className="grid lg:grid-cols-2">
          <div className="px-5 py-16 md:px-12 lg:py-24 lg:pl-[max(48px,calc((100vw-1480px)/2+64px))] lg:pr-16">
            <span className="eyebrow">{secs[4].title}</span>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight md:text-[40px]">{offer.title}</h2>
            <div className="mt-6 space-y-4 text-[17px] leading-[1.8] text-white/75">
              {offerCards.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative min-h-[320px]">
            <Pic src={IMG.man} sizes="(min-width: 1024px) 50vw, 100vw" className="object-[70%_center]" />
          </div>
        </div>
        <div className="container-x pb-16 pt-4 md:pb-24">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { c: offerCards.cards[0], Icon: Banknote },
              { c: offerCards.cards[1], Icon: ShieldCheck },
              { c: offerCards.cards[2], Icon: Smartphone },
            ].map(({ c, Icon }) => (
              <div key={c.heading} className="rounded-2xl border border-white/12 bg-white/[0.04] p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-ink">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{c.heading}</h3>
                <p className="mt-3 text-[15px] leading-[1.75] text-white/70">{c.body[0]}</p>
                {c.body.length > 1 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.body.slice(1).map((t) => (
                      <span key={t} className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Reviews ================= */}
      <Band>
        <SectionHead eyebrow="Customers Feedback" title={reviewSec.title} lead={reviewParas[0]} />
        <div className="mt-12">
          <Reviews items={reviewers.map((r, i) => ({ ...r, text: reviewParas[i + 1] }))} />
        </div>
      </Band>

      {/* ================= Door-step + priority ================= */}
      <Band tone="alt">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="eyebrow">{secs[7].title}</span>
            <p className="mt-5 leading-[1.8] text-muted">{offer2Cards.intro[0]}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {offer2Cards.cards.slice(0, 2).map((c) => (
                <div key={c.heading} className="card p-6">
                  <h3 className="font-display text-lg font-semibold">{c.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.body[0]}</p>
                  {c.body.length > 1 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.body.slice(1).map((t) => (
                        <span key={t} className="rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-accent-ink">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
              <Pic src={IMG.biz} sizes="(min-width: 1024px) 45vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <h3 className="font-display text-2xl font-semibold">{secs[8].title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{paras(secs[8].items)[0]}</p>
              </div>
            </div>
            <div className="card mt-5 p-7">
              <h3 className="font-display text-xl font-semibold">{secs[9].title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{paras(secs[9].items)[0]}</p>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* ================= Rates ================= */}
      <Band>
        <SectionHead eyebrow="Pricing" title={rates.title} center />
        <div className="mt-12">
          <RateCards items={rates.items} />
        </div>
      </Band>

      {/* ================= Blog ================= */}
      <Band tone="alt">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Our News" title={secs[11].title} />
          <Link href="/blog" className="btn btn-ghost">
            Show All News
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </Band>

      {/* ================= FAQ ================= */}
      <Band>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead eyebrow="FAQ" title={secs[12].title} />
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow)]">
              <Pic src="/site/Jun-19-2026-11_25_03-AM.png" sizes="(min-width: 1024px) 35vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <a href={contact.phoneHref} className="absolute bottom-4 left-4 rounded-lg bg-accent px-5 py-3 font-display font-semibold text-accent-ink">
                {contact.phone}
              </a>
            </div>
          </div>
          <Faq items={faqs} />
        </div>
      </Band>

      {/* ================= Call now (full width) ================= */}
      <section className="bg-accent text-accent-ink">
        <div className="container-x flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
          <h2 className="max-w-2xl text-balance text-2xl font-semibold leading-tight md:text-[34px]">
            CALL NOW - Solution Of All CHAUFFEUR SERVICE Needs in DUBAI.
          </h2>
          <a href={contact.phoneHref} className="rounded-xl bg-[#111113] px-8 py-4 font-display text-xl font-semibold text-white transition hover:scale-[1.03]">
            {contact.phone}
          </a>
        </div>
      </section>
    </>
  )
}
