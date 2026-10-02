import type { Metadata } from "next"
import { CTABand, InsightsGrid, PageHero } from "@/components/sections/Blocks"
import { Container } from "@/components/ui"
import { getDict } from "@/lib/content"
import { pageMeta, resolveLang } from "@/lib/meta"

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const lang = await resolveLang(params)
  const d = getDict(lang)
  return pageMeta(lang, "/blog", d.meta.blog, d.pages.blog.text, "/img/hd/night-road.jpg")
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const lang = await resolveLang(params)
  const b = getDict(lang).pages.blog
  return (
    <>
      <PageHero eyebrow={b.eyebrow} title={b.title} accent={b.accent} text={b.text} image="/img/hd/night-road.jpg" />
      <section className="pb-24">
        <Container>
          <InsightsGrid />
        </Container>
      </section>
      <CTABand />
    </>
  )
}
