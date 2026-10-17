import type { Metadata } from "next"
import { Mail, Phone } from "lucide-react"
import { BookingForm } from "@/components/BookingForm"
import { PageHero } from "@/components/ui"
import { Facebook, Instagram, WhatsApp } from "@/components/social"
import { contact, pages, toSections } from "@/lib/site"

export const metadata: Metadata = { title: pages.contact.title }

export default function ContactPage() {
  const secs = toSections(pages.contact.blocks)
  const main = secs[0]
  const social = secs[1]
  const text = main.items.find((b) => b.t === "p")!.x
  const [intro, channels] = text.split(/(?=Please feel free)/)

  const items = [
    { Icon: Phone, label: contact.phone, href: contact.phoneHref },
    { Icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
    { Icon: WhatsApp, label: "Whatsapp", href: contact.whatsapp },
  ]

  return (
    <>
      <PageHero title={main.title} crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <section className="container-x py-16 md:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="max-w-2xl text-lg leading-[1.8] text-muted">{intro}</p>
            <p className="mt-4 max-w-2xl text-lg font-medium leading-[1.8]">{channels}</p>

            <ul className="mt-8 grid gap-3">
              {items.map(({ Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="card group flex items-center gap-4 p-5 transition hover:-translate-y-0.5"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-ink">
                      <Icon size={22} />
                    </span>
                    <span className="font-display text-lg font-semibold group-hover:text-accent">{label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-xl font-semibold">{social.title}</h2>
            <div className="mt-4 flex gap-3">
              {[
                { Icon: Facebook, href: contact.facebook, label: "Facebook" },
                { Icon: Instagram, href: contact.instagram, label: "Instagram" },
                { Icon: WhatsApp, href: contact.whatsapp, label: "Whatsapp" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface transition hover:bg-accent hover:text-accent-ink"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          <BookingForm />
        </div>
      </section>
    </>
  )
}
