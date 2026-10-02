import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, Clock } from "lucide-react"
import { CTABand, ImageReveal, SectionHeading, InsightsGrid } from "@/components/sections/Blocks"
import { BookingCard } from "@/components/BookingCard"
import { Container, Eyebrow } from "@/components/ui"
import { Reveal, SplitText } from "@/components/motion"
import { getDict, getPosts } from "@/lib/content"
import { posts } from "@/lib/content/posts"
import { localePath } from "@/lib/i18n"
import { pageMeta, resolveLang } from "@/lib/meta"

export function generateStaticParams() {
  return posts.en.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const lang = await resolveLang(params)
  const { slug } = await params
  const post = getPosts(lang).find((p) => p.slug === slug)
  if (!post) return {}
  return pageMeta(lang, `/blog/${slug}`, post.title, post.excerpt, post.image)
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const lang = await resolveLang(params)
  const { slug } = await params
  const d = getDict(lang)
  const post = getPosts(lang).find((p) => p.slug === slug)
  if (!post) notFound()
  const date = new Intl.DateTimeFormat(lang === "ar" ? "ar-AE-u-nu-latn" : "en-GB", { dateStyle: "long" }).format(
    new Date(post.date),
  )

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden pb-14 pt-40 sm:pt-48">
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[50rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
          <Container className="max-w-4xl">
            <Reveal>
              <Link
                href={localePath(lang, "/blog")}
                className="inline-flex items-center gap-2 text-sm text-mist transition hover:text-gold"
              >
                <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" /> {d.insights.backToAll}
              </Link>
            </Reveal>
            <Reveal delay={0.05} className="mt-8 flex flex-wrap items-center gap-4 text-sm text-mist">
              <Eyebrow>{post.category}</Eyebrow>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-gold" /> {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-gold" /> {post.readTime}
              </span>
            </Reveal>
            <h1 className="mt-8 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
              <SplitText text={post.title} />
            </h1>
            <Reveal delay={0.2}>
              <p className="mt-6 text-xl leading-relaxed text-white/70">{post.excerpt}</p>
            </Reveal>
          </Container>
        </header>

        <Container>
          <ImageReveal src={post.image} alt={post.title} priority sizes="(min-width:1280px) 1216px, 100vw" className="aspect-[21/9] rounded-[2rem]" />
        </Container>

        <Container className="grid gap-16 py-20 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-1">
            {post.sections.map((s, i) => (
              <Reveal key={s.heading} className="mb-14">
                <h2 className="flex items-baseline gap-4 text-2xl font-semibold text-white sm:text-3xl">
                  <span className="font-mono text-sm text-gold">0{i + 1}</span>
                  {s.heading}
                </h2>
                {s.paragraphs.map((p, k) => (
                  <p
                    key={k}
                    className={
                      i === 0 && k === 0
                        ? "mt-6 text-lg leading-[1.85] text-white/80 first-letter:float-start first-letter:me-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-gold"
                        : "mt-6 text-lg leading-[1.85] text-white/70"
                    }
                  >
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <BookingCard />
            </div>
          </aside>
        </Container>
      </article>

      <section className="border-t border-white/[0.06] py-24">
        <Container>
          <SectionHeading eyebrow={d.insights.eyebrow} title={d.insights.related} />
          <div className="mt-12">
            <InsightsGrid exclude={post.slug} />
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  )
}
