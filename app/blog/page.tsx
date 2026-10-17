import type { Metadata } from "next"
import { BlogCard } from "@/components/BlogCard"
import { PageHero } from "@/components/ui"
import { posts } from "@/lib/site"

export const metadata: Metadata = { title: "Blog - Excellent Ride" }

export default function BlogPage() {
  return (
    <>
      <PageHero title="Blog" crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <section className="container-x py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </>
  )
}
