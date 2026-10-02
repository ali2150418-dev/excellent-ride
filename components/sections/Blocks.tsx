"use client"
import { useLayoutEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { ArrowUpRight, Check, Quote, Star } from "lucide-react"
import { contact } from "@/lib/data"
import { useI18n } from "@/components/I18nProvider"
import { Button, Container, Eyebrow } from "@/components/ui"
import { ServiceIcon } from "@/components/icons"
import { Counter, Reveal, SplitText, Stagger, StaggerItem, ease } from "@/components/motion"
import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  accent,
  text,
  align = "left",
  light,
}: {
  eyebrow: string
  title: string
  accent?: string
  text?: string
  align?: "left" | "center"
  light?: boolean
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <Eyebrow className={light ? "border-ink/15 bg-ink/[0.04] text-gold-deep" : undefined}>{eyebrow}</Eyebrow>
      </Reveal>
      <h2
        className={cn(
          "mt-6 text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.03em]",
          light ? "text-ink" : "text-white",
        )}
      >
        <SplitText text={title} />
        {accent && (
          <>
            {" "}
            <SplitText text={accent} delay={0.15} className="font-serif font-normal italic text-gradient-gold" />
          </>
        )}
      </h2>
      {text && (
        <Reveal delay={0.15}>
          <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", light ? "text-ink/65" : "text-mist")}>{text}</p>
        </Reveal>
      )}
    </div>
  )
}

/** Image that wipes open and settles from a slight zoom as it enters the viewport. */
export function ImageReveal({
  src,
  alt,
  className,
  sizes = "(min-width:1024px) 50vw, 100vw",
  priority,
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.3, ease }}
      className={cn("relative overflow-hidden", className)}
    >
      <motion.div
        initial={{ scale: 1.3 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.8, ease }}
        className="absolute inset-0"
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </motion.div>
  )
}

/* ---------------------------------- Trust marquee ---------------------------------- */

export function TrustMarquee() {
  const { dict } = useI18n()
  const items = dict.marquee
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-ink-2 py-6" dir="ltr">
      <div className="mask-fade-x flex">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pe-10">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10 text-sm font-medium uppercase tracking-[0.2em] text-white/55">
              {t}
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------- Manifesto (scroll-lit words) ---------------------------------- */

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  )
}

export function Manifesto() {
  const { dict } = useI18n()
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] })
  const words = dict.manifesto.text.split(" ")
  return (
    <section className="relative overflow-hidden py-28 sm:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[140px]" />
      <Container className="relative">
        <Reveal>
          <Eyebrow>{dict.manifesto.eyebrow}</Eyebrow>
        </Reveal>
        <p
          ref={ref}
          className="mt-10 max-w-6xl text-[clamp(1.8rem,4.2vw,3.6rem)] font-medium leading-[1.2] tracking-[-0.025em] text-white"
        >
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>
        <Stagger className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] lg:grid-cols-4">
          {dict.stats.map((s) => (
            <StaggerItem key={s.label} className="bg-ink p-7 sm:p-9">
              <span dir="ltr" className="inline-block">
                <Counter
                  to={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  className="text-4xl font-semibold tracking-tight text-gradient-gold sm:text-5xl"
                />
              </span>
              <p className="mt-3 text-sm text-mist">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}

/* ---------------------------------- Services ---------------------------------- */

export function ServicesGrid({ limit }: { limit?: number }) {
  const { dict, href } = useI18n()
  const list = limit ? dict.services.slice(0, limit) : dict.services
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s, i) => (
        <StaggerItem key={s.slug}>
          <Link
            href={href(`/services/${s.slug}`)}
            className="group relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-2 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40"
          >
            <Image
              src={s.image}
              alt=""
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover opacity-30 grayscale-[40%] transition-all duration-[1.2s] ease-out group-hover:scale-110 group-hover:opacity-50 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/85 to-ink-2/30" />
            <div className="pointer-events-none absolute -end-20 -top-20 h-48 w-48 rounded-full bg-gold/0 blur-3xl transition-all duration-700 group-hover:bg-gold/20" />

            <div className="relative flex items-start justify-between">
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-ink/40 text-gold backdrop-blur transition-all duration-500 group-hover:rotate-[-8deg] group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                <ServiceIcon name={s.icon} className="h-6 w-6" strokeWidth={1.6} />
              </span>
              <span className="font-mono text-xs text-white/35">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="relative mt-auto pt-12">
              <h3 className="text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{s.short}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold">
                {dict.common.exploreService}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              </span>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  )
}

/* ---------------------------------- Fleet (pinned horizontal gallery) ---------------------------------- */

export function Fleet() {
  const { dict, isRtl } = useI18n()
  const f = dict.fleet
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 48))
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, [0, 1], [0, isRtl ? distance : -distance])

  const cards = f.items.map((item, i) => (
    <div
      key={item.name}
      className="group relative h-[62vh] max-h-[560px] min-h-[380px] w-[78vw] shrink-0 overflow-hidden rounded-[2rem] border border-white/[0.07] sm:w-[52vw] lg:w-[34vw]"
    >
      <Image
        src={item.image}
        alt={item.name}
        fill
        sizes="(min-width:1024px) 34vw, 80vw"
        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      <span className="absolute start-6 top-6 font-mono text-xs text-white/70">0{i + 1}</span>
      <div className="absolute inset-x-6 bottom-6">
        <h3 className="text-2xl font-semibold text-white sm:text-3xl">{item.name}</h3>
        <p className="mt-2 text-sm text-white/60">
          <bdi>{item.examples}</bdi>
        </p>
      </div>
    </div>
  ))

  return (
    <section ref={section} className="relative lg:h-[260vh]">
      <div className="py-24 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow={f.eyebrow} title={f.title} accent={f.accent} />
            <Reveal className="max-w-md text-mist">{f.text}</Reveal>
          </div>
        </Container>
        {/* Desktop: scroll-driven track */}
        <motion.div ref={track} style={{ x }} className="mt-12 hidden gap-5 px-6 lg:flex">
          {cards}
          <div className="w-[10vw] shrink-0" />
        </motion.div>
        {/* Touch: native swipe */}
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 lg:hidden" data-lenis-prevent-horizontal>
          {cards.map((c, i) => (
            <div key={i} className="snap-start">
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------- Pricing ---------------------------------- */

export function PricingGrid() {
  const { dict, href } = useI18n()
  return (
    <Stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {dict.plans.map((p) => (
        <StaggerItem key={p.name} className="h-full">
          <div
            className={cn(
              "group relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-2",
              p.featured
                ? "border-gold/60 bg-gradient-to-b from-gold/[0.16] via-ink-2 to-ink-2 shadow-[0_30px_80px_-30px_rgba(245,165,36,0.45)]"
                : "border-white/[0.08] bg-ink-2 hover:border-white/20",
            )}
          >
            {p.featured && (
              <span className="absolute end-5 top-5 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-ink">
                {dict.common.bestValue}
              </span>
            )}
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{p.name}</p>
            <div className="mt-6 flex items-end gap-2">
              <span className="text-5xl font-semibold tracking-tight text-white">{p.price.toLocaleString("en-US")}</span>
              <span className="pb-2 text-sm text-mist">{dict.aed}</span>
            </div>
            <p className="mt-1 text-sm text-mist">{p.unit}</p>
            <p className="mt-5 text-sm leading-relaxed text-white/70">{p.summary}</p>

            <dl className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3 text-center">
              {[
                [dict.common.hours, p.hours],
                [dict.common.days, p.days],
                [dict.common.overtime, p.overtime],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[10px] uppercase tracking-[0.12em] text-mist">{k}</dt>
                  <dd className="mt-1 text-xs font-semibold text-white">{v}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 space-y-3 text-sm">
              {p.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-white/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <Link
                href={href("/contact")}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition",
                  p.featured ? "bg-gold text-ink hover:bg-gold-soft" : "border border-white/15 text-white hover:bg-white hover:text-ink",
                )}
              >
                {dict.common.choose} {p.name} <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
            </div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  )
}

/* ---------------------------------- Testimonials ---------------------------------- */

export function Testimonials() {
  const { dict } = useI18n()
  const r = dict.reviewsSection
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={r.eyebrow} title={r.title} accent={r.accent} text={r.text} />
          <Reveal className="flex items-center gap-4">
            <div className="flex -space-x-3 rtl:space-x-reverse">
              {dict.reviews.map((rv) => (
                <Image key={rv.name} src={rv.avatar} alt="" width={44} height={44} className="rounded-full ring-2 ring-ink" />
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-1 text-xs text-mist">{r.rated}</p>
            </div>
          </Reveal>
        </div>
      </Container>

      <div className="mask-fade-x mt-16 flex overflow-hidden" dir="ltr">
        <div className="flex shrink-0 animate-marquee gap-5 pe-5 [animation-duration:70s] hover:[animation-play-state:paused]">
          {[...dict.reviews, ...dict.reviews].map((rv, i) => (
            <figure
              key={i}
              dir={dict.dir}
              className="relative w-[340px] shrink-0 rounded-3xl border border-white/[0.07] bg-ink-2 p-7 sm:w-[420px]"
            >
              <Quote className="absolute end-6 top-6 h-10 w-10 text-gold/15" />
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-5 text-[15px] leading-relaxed text-white/80">“{rv.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                <Image src={rv.avatar} alt={rv.name} width={42} height={42} className="rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-white">{rv.name}</p>
                  <p className="text-xs text-mist">{rv.location}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------- Areas ---------------------------------- */

export function AreasBand() {
  const { dict } = useI18n()
  const areas = dict.areas
  const half = Math.ceil(areas.length / 2)
  const rows = [areas.slice(0, half), areas.slice(half)]
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-ink-2 py-20">
      <Image src="/img/hd/marina.jpg" alt="" fill sizes="100vw" className="object-cover opacity-[0.12]" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-2 via-transparent to-ink-2" />
      <Container className="relative">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{dict.areasSection.eyebrow}</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {dict.areasSection.title}{" "}
            <span className="font-serif font-normal italic text-gradient-gold">{dict.areasSection.accent}</span>
          </h3>
        </Reveal>
      </Container>
      <div className="relative mt-12 space-y-4" dir="ltr">
        {rows.map((row, r) => (
          <div key={r} className="mask-fade-x flex overflow-hidden">
            <div className={cn("flex shrink-0 gap-4 pe-4", r ? "animate-marquee-rev" : "animate-marquee")}>
              {[...row, ...row, ...row, ...row].map((a, i) => (
                <span
                  key={i}
                  className="shrink-0 rounded-full border border-white/10 bg-ink/40 px-6 py-3 text-lg font-medium text-white/75 backdrop-blur transition hover:border-gold hover:text-gold"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------- Insights ---------------------------------- */

export function InsightsGrid({ exclude }: { exclude?: string }) {
  const { posts, href } = useI18n()
  const list = posts.filter((p) => p.slug !== exclude)
  return (
    <Stagger className={cn("grid gap-6", list.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
      {list.map((p) => (
        <StaggerItem key={p.slug}>
          <Link href={href(`/blog/${p.slug}`)} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width:768px) 33vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="absolute start-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {p.category}
              </span>
              <span className="absolute bottom-4 end-4 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-gold text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" />
              </span>
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.15em] text-mist">{p.readTime}</p>
            <h3 className="mt-2 text-xl font-semibold leading-snug text-white transition-colors group-hover:text-gold">{p.title}</h3>
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-mist">{p.excerpt}</p>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  )
}

/* ---------------------------------- CTA ---------------------------------- */

export function CTABand() {
  const { dict, href } = useI18n()
  const c = dict.cta
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-br from-gold via-gold to-gold-deep p-10 sm:p-16">
            <Image
              src="/img/safe.png"
              alt=""
              width={723}
              height={1024}
              className="pointer-events-none absolute -bottom-10 end-0 hidden h-[125%] w-auto object-contain mix-blend-multiply lg:block rtl:-scale-x-100"
            />
            <div className="pointer-events-none absolute -start-20 -top-20 h-72 w-72 rounded-full border-[40px] border-white/10" />
            <div className="relative max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink/70">{c.eyebrow}</p>
              <h2 className="mt-5 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
                {c.title} <span className="font-serif font-normal italic">{c.accent}</span>
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/75">{c.text}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button href={href("/contact")} variant="dark">
                  {c.primary}
                </Button>
                <Button href={contact.phoneHref} variant="ghost" className="border-ink/25 text-ink hover:border-ink hover:bg-ink/5" icon={false}>
                  {c.call} <span dir="ltr">{contact.phone}</span>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* ---------------------------------- Inner page hero ---------------------------------- */

export function PageHero({
  eyebrow,
  title,
  accent,
  text,
  image,
}: {
  eyebrow: string
  title: string
  accent?: string
  text?: string
  image: string
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  return (
    <section ref={ref} className="relative isolate overflow-hidden pb-20 pt-44 sm:pb-28 sm:pt-52">
      <motion.div style={{ y }} className="absolute inset-0 -z-20">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease }}
          className="absolute inset-0"
        >
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-55" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 via-ink/75 to-ink" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 to-transparent rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[50rem] -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]" />
      <Container>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <h1 className="mt-7 max-w-4xl text-[clamp(2.6rem,6.5vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
          <SplitText text={title} />
          {accent && (
            <>
              {" "}
              <SplitText text={accent} delay={0.2} className="font-serif font-normal italic text-gradient-gold" />
            </>
          )}
        </h1>
        {text && (
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70">{text}</p>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
