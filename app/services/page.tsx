import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { CtaLink, PageHero, Paragraphs, Pic } from "@/components/ui"
import { contact, pages, services, toSections } from "@/lib/site"

export const metadata: Metadata = { title: pages.services.title }

const photos = ["/site/1.png", "/site/2.png", "/site/4.png", "/site/5.png"]

export default function ServicesPage() {
  const secs = toSections(pages.services.blocks)
  const intro = secs[0]
  const plans = secs.slice(1)
  const chips = plans[plans.length - 1].items.filter((b) => b.t === "h").map((b) => b.x)

  return (
    <>
      <PageHero title="Services" crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]} image="/site/1.png" />

      <section className="container-x py-16 md:py-24">
        <div className="max-w-3xl">
          <h2 className="text-balance text-3xl font-semibold md:text-4xl">{intro.title}</h2>
          <Paragraphs items={intro.items.filter((b) => b.t === "p").map((b) => b.x)} className="mt-6" />
        </div>

        <div className="mt-16 grid gap-8">
          {plans.map((p, i) => (
            <Reveal key={p.title}>
              <article className={`card grid overflow-hidden lg:grid-cols-2 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                <div className="relative min-h-[260px]">
                  <Pic src={photos[i]} sizes="(min-width: 1024px) 45vw, 100vw" />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <span className="font-display text-5xl font-semibold text-accent/70">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-2xl font-semibold md:text-3xl">{p.title}</h3>
                  <p className="mt-4 leading-[1.8] text-muted">{p.items.find((b) => b.t === "p")?.x}</p>
                  <div className="mt-6">
                    <CtaLink href={contact.whatsapp} external>
                      Book Now
                    </CtaLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="marquee overflow-hidden border-y border-line bg-navy py-6 text-white" aria-hidden>
        <div className="marquee-track flex w-max gap-12">
          {[...chips, ...chips].map((c, i) => (
            <span key={i} className="flex items-center gap-12 font-display text-xl font-semibold tracking-wide md:text-3xl">
              {c} <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card group flex items-center justify-between gap-4 p-6 transition hover:-translate-y-1">
              <span className="font-display text-lg font-semibold group-hover:text-accent">{s.label}</span>
              <ArrowUpRight className="text-accent transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
