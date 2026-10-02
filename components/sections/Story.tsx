"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { BadgeCheck, CreditCard, Headphones, ShieldCheck, Smartphone } from "lucide-react"
import { useI18n } from "@/components/I18nProvider"
import { Button, Container } from "@/components/ui"
import { Reveal, Stagger, StaggerItem } from "@/components/motion"
import { ImageReveal, SectionHeading } from "@/components/sections/Blocks"

/** About intro: overlapping images with scroll parallax + copy. */
export function AboutIntro() {
  const { dict, href } = useI18n()
  const a = dict.about
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 80])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <div ref={ref} className="relative mx-auto h-[520px] w-full max-w-[540px] sm:h-[620px]">
          <motion.div style={{ y: y1 }} className="absolute start-0 top-0 h-[78%] w-[68%]">
            <ImageReveal src="/img/hd/chauffeur-van.jpg" alt={a.rtaSub} className="h-full w-full rounded-[2rem]" sizes="(min-width:1024px) 370px, 70vw" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-0 end-0 h-[55%] w-[60%] rounded-[2rem] border-8 border-ink">
            <ImageReveal src="/img/hd/interior-rolls.jpg" alt="" className="h-full w-full rounded-[1.5rem]" sizes="(min-width:1024px) 330px, 60vw" />
          </motion.div>
          <motion.div
            style={{ rotate }}
            className="absolute end-[6%] top-[6%] grid h-32 w-32 place-items-center rounded-full bg-gold text-ink shadow-[0_20px_60px_-10px_rgba(245,165,36,0.6)]"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <defs>
                <path id="circ" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
              </defs>
              <text className="fill-ink text-[10px] font-bold tracking-[0.12em]">
                <textPath href="#circ">{a.ring + a.ring}</textPath>
              </text>
            </svg>
            <ShieldCheck className="h-8 w-8" />
          </motion.div>
          <Reveal
            delay={0.3}
            className="glass absolute bottom-[16%] start-[-4%] flex items-center gap-3 rounded-2xl px-5 py-4 sm:start-[2%]"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-gold">
              <BadgeCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{a.rta}</p>
              <p className="text-xs text-mist">{a.rtaSub}</p>
            </div>
          </Reveal>
        </div>

        <div>
          <SectionHeading eyebrow={a.eyebrow} title={a.title} accent={a.accent} />
          <Reveal delay={0.1}>
            <p className="mt-7 text-lg leading-relaxed text-white/75">{a.lead}</p>
            <p className="mt-5 leading-relaxed text-mist">{a.body}</p>
          </Reveal>
          <Stagger className="mt-10 grid grid-cols-2 gap-4">
            {a.chips.map((x) => (
              <StaggerItem
                key={x.k}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors duration-500 hover:border-gold/30"
              >
                <p className="text-lg font-semibold text-white">{x.k}</p>
                <p className="mt-1 text-sm text-mist">{x.v}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mt-10">
            <Button href={href("/about")}>{a.cta}</Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/** Three-step booking process with an animated connecting line. */
export function Process() {
  const { dict } = useI18n()
  const p = dict.process
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] })
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const icons = [Smartphone, BadgeCheck, ShieldCheck]
  return (
    <section className="relative overflow-hidden bg-cream py-28 text-ink sm:py-36">
      <Container>
        <SectionHeading light align="center" eyebrow={p.eyebrow} title={p.title} accent={p.accent} />
        <div ref={ref} className="relative mt-20">
          <div className="absolute inset-x-[16.6%] top-10 hidden h-px bg-ink/10 md:block">
            <motion.div style={{ scaleX }} className="h-full origin-left bg-gradient-to-r from-gold-deep to-gold rtl:origin-right" />
          </div>
          <Stagger className="grid gap-12 md:grid-cols-3" gap={0.15}>
            {p.steps.map((s, i) => {
              const Icon = icons[i]
              return (
                <StaggerItem key={s.title} className="relative text-center">
                  <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full border border-ink/10 bg-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]">
                    <Icon className="h-7 w-7 text-gold-deep" strokeWidth={1.6} />
                    <span className="absolute -end-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-ink text-xs font-bold text-gold">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold">{s.title}</h3>
                  <p className="mx-auto mt-3 max-w-xs leading-relaxed text-ink/60">{s.text}</p>
                </StaggerItem>
              )
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  )
}

/** Why-us section: sticky visual + pillars list. */
export function WhyUs() {
  const { dict } = useI18n()
  const w = dict.why
  const icons = [ShieldCheck, Headphones, Smartphone, CreditCard]
  return (
    <section className="relative py-28 sm:py-36">
      <Container className="grid gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHeading eyebrow={w.eyebrow} title={w.title} accent={w.accent} text={w.text} />
          <ImageReveal
            src="/img/hd/interior-mercedes.jpg"
            alt=""
            className="mt-10 aspect-[16/10] rounded-3xl"
            sizes="(min-width:1024px) 600px, 100vw"
          />
        </div>
        <Stagger className="grid gap-4 self-end" gap={0.12}>
          {w.pillars.map((p, i) => {
            const Icon = icons[i]
            return (
              <StaggerItem
                key={p.title}
                className="group relative flex gap-6 overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-2 p-7 transition-colors duration-500 hover:border-gold/40 hover:bg-ink-3"
              >
                <span className="pointer-events-none absolute -end-4 -top-6 font-serif text-[7rem] leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-gold/10">
                  {i + 1}
                </span>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gold/10 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <div className="relative">
                  <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-mist">{p.text}</p>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </Container>
    </section>
  )
}
