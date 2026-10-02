import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import {
  AreasBand,
  CTABand,
  Fleet,
  InsightsGrid,
  Manifesto,
  PricingGrid,
  SectionHeading,
  ServicesGrid,
  Testimonials,
  TrustMarquee,
} from "@/components/sections/Blocks"
import { AboutIntro, Process, WhyUs } from "@/components/sections/Story"
import { FaqList } from "@/components/sections/Faq"
import { Button, Container } from "@/components/ui"
import { Reveal } from "@/components/motion"
import { getDict } from "@/lib/content"
import { localePath } from "@/lib/i18n"
import { pageMeta, resolveLang } from "@/lib/meta"

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = await resolveLang(params)
  return pageMeta(lang, "/")
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = await resolveLang(params)
  const d = getDict(lang)
  const href = (p: string) => localePath(lang, p)

  return (
    <>
      <Hero />
      <TrustMarquee />
      <Manifesto />
      <AboutIntro />

      <section className="relative py-28 sm:py-36">
        <div className="pointer-events-none absolute end-0 top-40 h-96 w-96 rounded-full bg-gold/10 blur-[140px]" />
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={d.servicesSection.eyebrow}
              title={d.servicesSection.title}
              accent={d.servicesSection.accent}
              text={d.servicesSection.text}
            />
            <Reveal>
              <Button href={href("/services")} variant="ghost">
                {d.common.allServices}
              </Button>
            </Reveal>
          </div>
          <div className="mt-16">
            <ServicesGrid limit={6} />
          </div>
        </Container>
      </section>

      <Fleet />
      <Process />
      <WhyUs />

      <section className="relative overflow-hidden border-t border-white/[0.06] py-28 sm:py-36">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-[140px]" />
        <Container className="relative">
          <SectionHeading
            align="center"
            eyebrow={d.pricingSection.eyebrow}
            title={d.pricingSection.title}
            accent={d.pricingSection.accent}
            text={d.pricingSection.text}
          />
          <div className="mt-16">
            <PricingGrid />
          </div>
        </Container>
      </section>

      <Testimonials />
      <AreasBand />

      <section className="py-28 sm:py-36">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={d.faqSection.eyebrow}
              title={d.faqSection.title}
              accent={d.faqSection.accent}
              text={d.faqSection.text}
            />
            <Reveal delay={0.2} className="mt-10">
              <Button href={href("/contact")}>{d.faqSection.cta}</Button>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <FaqList />
          </div>
        </Container>
      </section>

      <section className="border-t border-white/[0.06] py-28 sm:py-36">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow={d.insights.eyebrow} title={d.insights.title} accent={d.insights.accent} />
            <Reveal>
              <Button href={href("/blog")} variant="ghost">
                {d.common.viewAll}
              </Button>
            </Reveal>
          </div>
          <div className="mt-14">
            <InsightsGrid />
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  )
}
