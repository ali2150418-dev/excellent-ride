import type { Metadata } from "next"
import Image from "next/image"
import { Award, Clock, HeartHandshake, ShieldCheck } from "lucide-react"
import { AreasBand, CTABand, Fleet, ImageReveal, PageHero, SectionHeading, Testimonials } from "@/components/sections/Blocks"
import { Process, WhyUs } from "@/components/sections/Story"
import { Container } from "@/components/ui"
import { Counter, Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion"
import { getDict } from "@/lib/content"
import { pageMeta, resolveLang } from "@/lib/meta"

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const lang = await resolveLang(params)
  const d = getDict(lang)
  return pageMeta(lang, "/about", d.meta.about, d.pages.about.text, "/img/hd/skyline-dusk.jpg")
}

const valueIcons = [ShieldCheck, Clock, Award, HeartHandshake]

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const lang = await resolveLang(params)
  const d = getDict(lang)
  const a = d.pages.about

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} accent={a.accent} text={a.text} image="/img/hd/skyline-dusk.jpg" />

      <section className="py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={a.storyEyebrow} title={a.storyTitle} accent={a.storyAccent} />
            <ImageReveal src="/img/hd/exit-car.jpg" alt="" className="mt-10 hidden aspect-[4/5] rounded-3xl lg:block" sizes="420px" />
          </div>
          <Reveal className="space-y-6 text-lg leading-relaxed text-white/75 lg:col-span-7 lg:pt-24">
            <p className="text-2xl leading-relaxed text-white">{a.story1}</p>
            <p className="text-mist">{a.story2}</p>
          </Reveal>
        </Container>
      </section>

      <Parallax className="mx-auto h-[70vh] max-w-[1400px] sm:mx-5 sm:rounded-[2.5rem] xl:mx-auto" offset={110}>
        <Image src="/img/hd/marina.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink/25" />
      </Parallax>

      <section className="py-24 sm:py-32">
        <Container>
          <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] lg:grid-cols-4">
            {d.stats.map((s, i) => (
              <StaggerItem key={s.label} className="bg-ink p-8 sm:p-10">
                <span dir="ltr" className="inline-block">
                  <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} className="text-4xl font-semibold tracking-tight text-gradient-gold sm:text-5xl" />
                </span>
                <p className="mt-3 text-sm text-mist">{a.statLabels[i]}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-28">
            <SectionHeading align="center" eyebrow={a.valuesEyebrow} title={a.valuesTitle} accent={a.valuesAccent} />
            <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {a.values.map((v, i) => {
                const Icon = valueIcons[i]
                return (
                  <StaggerItem
                    key={v.title}
                    className="group rounded-3xl border border-white/[0.07] bg-ink-2 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/10 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                      <Icon className="h-6 w-6" strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-8 text-xl font-semibold text-white">{v.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{v.text}</p>
                  </StaggerItem>
                )
              })}
            </Stagger>
          </div>
        </Container>
      </section>

      <Process />
      <WhyUs />
      <Fleet />
      <Testimonials />
      <AreasBand />
      <CTABand />
    </>
  )
}
