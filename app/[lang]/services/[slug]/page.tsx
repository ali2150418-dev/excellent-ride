import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Check, Users } from "lucide-react"
import { CTABand, ImageReveal, PricingGrid, SectionHeading } from "@/components/sections/Blocks"
import { Button, Container, Eyebrow } from "@/components/ui"
import { ServiceIcon } from "@/components/icons"
import { Reveal, SplitText, Stagger, StaggerItem } from "@/components/motion"
import { BookingCard } from "@/components/BookingCard"
import { getDict } from "@/lib/content"
import en from "@/lib/content/en"
import { localePath } from "@/lib/i18n"
import { pageMeta, resolveLang } from "@/lib/meta"

export function generateStaticParams() {
  return en.services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[slug]">): Promise<Metadata> {
  const lang = await resolveLang(params)
  const { slug } = await params
  const s = getDict(lang).services.find((x) => x.slug === slug)
  if (!s) return {}
  return pageMeta(lang, `/services/${slug}`, s.title, s.short, s.image)
}

export default async function ServicePage({ params }: PageProps<"/[lang]/services/[slug]">) {
  const lang = await resolveLang(params)
  const { slug } = await params
  const d = getDict(lang)
  const t = d.pages.serviceDetail
  const index = d.services.findIndex((x) => x.slug === slug)
  if (index === -1) notFound()
  const s = d.services[index]
  const next = d.services[(index + 1) % d.services.length]
  const others = d.services.filter((x) => x.slug !== s.slug).slice(index % 6, (index % 6) + 3)
  const href = (p: string) => localePath(lang, p)

  return (
    <>
      <section className="relative isolate overflow-hidden pb-20 pt-36 sm:pt-44">
        <div className="pointer-events-none absolute start-0 top-0 -z-10 h-96 w-[40rem] rounded-full bg-gold/10 blur-[140px]" />
        <div className="absolute inset-0 -z-10 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]" />
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <Link href={href("/services")} className="inline-flex items-center gap-2 text-sm text-mist transition hover:text-gold">
                <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" /> {t.back}
              </Link>
            </Reveal>
            <Reveal delay={0.05} className="mt-8 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold text-ink">
                <ServiceIcon name={s.icon} className="h-6 w-6" />
              </span>
              <Eyebrow>
                {t.label} {String(index + 1).padStart(2, "0")}
              </Eyebrow>
            </Reveal>
            <h1 className="mt-8 text-[clamp(2.6rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
              <SplitText text={s.title} />
            </h1>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">{s.short}</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-4">
              <Button href={href("/contact")}>{t.book}</Button>
              <Button href={href("/pricing")} variant="ghost">
                {t.rates}
              </Button>
            </Reveal>
          </div>
          <div className="relative">
            <ImageReveal src={s.image} alt={s.title} priority className="aspect-[4/3] rounded-[2rem] border border-white/10" />
            <Reveal delay={0.6} className="glass absolute bottom-5 end-5 start-5 flex items-center justify-between rounded-2xl px-5 py-4">
              <div>
                <p className="text-xs text-mist">{d.common.from}</p>
                <p className="text-lg font-semibold text-white">{d.common.perRide}</p>
              </div>
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold">{d.common.available}</span>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={t.overview} title={t.overviewTitle} accent={t.overviewAccent} />
            <Reveal delay={0.1}>
              <p className="mt-7 text-lg leading-relaxed text-white/70">{s.description}</p>
            </Reveal>
            <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
              {s.features.map((f) => (
                <StaggerItem key={f} className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-ink-2 p-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-ink">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-white/85">{f}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="mt-10 rounded-3xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-7">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                <Users className="h-4 w-4" /> {t.idealFor}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.idealFor.map((x) => (
                  <span key={x} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">
                    {x}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <BookingCard />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-white/[0.06] py-24 sm:py-32">
        <Container>
          <SectionHeading align="center" eyebrow={t.ratesEyebrow} title={t.ratesTitle} accent={t.ratesAccent} />
          <div className="mt-14">
            <PricingGrid />
          </div>
        </Container>
      </section>

      <section className="border-t border-white/[0.06] py-24">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading eyebrow={t.moreEyebrow} title={t.moreTitle} accent={t.moreAccent} />
            <Link
              href={href(`/services/${next.slug}`)}
              className="group hidden items-center gap-3 text-sm text-mist transition hover:text-white md:flex"
            >
              {t.next}: <span className="font-semibold text-white">{next.title}</span>
              <ArrowUpRight className="h-4 w-4 text-gold transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 rtl:-scale-x-100" />
            </Link>
          </div>
          <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <StaggerItem key={o.slug}>
                <Link
                  href={href(`/services/${o.slug}`)}
                  className="group flex items-center gap-5 rounded-3xl border border-white/[0.07] bg-ink-2 p-6 transition hover:border-gold/40"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-ink">
                    <ServiceIcon name={o.icon} className="h-5 w-5" />
                  </span>
                  <span className="flex-1 font-semibold text-white">{o.title}</span>
                  <ArrowUpRight className="h-5 w-5 text-white/30 transition group-hover:text-gold rtl:-scale-x-100" />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CTABand />
    </>
  )
}
