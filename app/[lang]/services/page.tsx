import type { Metadata } from "next"
import { CTABand, Fleet, PageHero, ServicesGrid } from "@/components/sections/Blocks"
import { Process } from "@/components/sections/Story"
import { Container } from "@/components/ui"
import { getDict } from "@/lib/content"
import { pageMeta, resolveLang } from "@/lib/meta"

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const lang = await resolveLang(params)
  const d = getDict(lang)
  return pageMeta(lang, "/services", d.meta.services, d.pages.services.text, "/img/hd/night-city.jpg")
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const lang = await resolveLang(params)
  const s = getDict(lang).pages.services
  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} accent={s.accent} text={s.text} image="/img/hd/night-city.jpg" />
      <section className="pb-28 sm:pb-36">
        <Container>
          <ServicesGrid />
        </Container>
      </section>
      <Fleet />
      <Process />
      <CTABand />
    </>
  )
}
