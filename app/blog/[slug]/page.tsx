import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { BlogCard } from "@/components/BlogCard"
import { CtaLink, PageHero, Pic } from "@/components/ui"
import { contact, posts, type Block } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  return post ? { title: post.title, description: post.excerpt } : {}
}

function Body({ blocks }: { blocks: Block[] }) {
  const out: React.ReactNode[] = []
  let list: string[] = []
  const flush = (key: string) => {
    if (!list.length) return
    out.push(
      <ul key={key}>
        {list.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>,
    )
    list = []
  }
  blocks.forEach((b, i) => {
    if (b.t === "li") {
      list.push(b.x)
      return
    }
    flush(`ul${i}`)
    if (b.t === "p") out.push(<p key={i}>{b.x}</p>)
    else if (b.t === "h") {
      const Tag = (b.l <= 2 ? "h2" : b.l === 3 ? "h3" : "h4") as "h2" | "h3" | "h4"
      out.push(<Tag key={i}>{b.x}</Tag>)
    }
  })
  flush("ul-end")
  return <div className="prose-x">{out}</div>
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const idx = posts.findIndex((p) => p.slug === slug)
  if (idx < 0) notFound()
  const post = posts[idx]
  const more = [1, 2, 3].map((n) => posts[(idx + n) % posts.length])

  return (
    <>
      <PageHero
        title={post.title}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Article" }]}
      />
      <article className="container-x py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          {post.cover && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-card">
              <Pic src={post.cover} sizes="(min-width: 768px) 768px, 100vw" priority />
            </div>
          )}
          <Body blocks={post.blocks} />
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
            <Link href="/blog" className="btn btn-ghost">
              <ArrowLeft size={16} /> Blog
            </Link>
            <CtaLink href={contact.whatsapp} external>
              Let&apos;s Ride Now!
            </CtaLink>
          </div>
        </div>
      </article>
      <section className="container-x pb-20">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">Blog &amp; Articles.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {more.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </>
  )
}
