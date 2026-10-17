import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Phone } from "lucide-react"
import { ServiceBody } from "@/components/ServiceBody"
import { CtaLink, PageHero } from "@/components/ui"
import { contact, pages, services } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = pages[slug]
  return page ? { title: page.title } : {}
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  const page = pages[slug]
  if (!service || !page) notFound()

  return (
    <>
      <PageHero
        title={service.label}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.label }]}
        image={page.imgs[0]}
      />
      <ServiceBody page={page} />
      <section className="container-x pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-navy p-10 text-center text-white md:p-16">
          <div className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-accent/30 blur-3xl" aria-hidden />
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Book A Ride Now</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CtaLink href={contact.whatsapp} external>
              Let&apos;s Ride Now!
            </CtaLink>
            <a href={contact.phoneHref} className="btn border border-white/25 text-white hover:bg-white/10">
              <Phone size={16} /> {contact.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
