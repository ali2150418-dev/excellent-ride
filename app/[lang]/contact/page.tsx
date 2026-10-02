import type { Metadata } from "next"
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react"
import { contact } from "@/lib/data"
import { PageHero } from "@/components/sections/Blocks"
import { ContactForm } from "@/components/ContactForm"
import { Container } from "@/components/ui"
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons"
import { Reveal, Stagger, StaggerItem } from "@/components/motion"
import { getDict } from "@/lib/content"
import { pageMeta, resolveLang } from "@/lib/meta"

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const lang = await resolveLang(params)
  const d = getDict(lang)
  return pageMeta(lang, "/contact", d.meta.contact, d.pages.contact.text, "/img/hd/hero-sedan.jpg")
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const lang = await resolveLang(params)
  const d = getDict(lang)
  const c = d.pages.contact

  const channels = [
    { icon: Phone, label: c.call, value: contact.phone, href: contact.phoneHref },
    { icon: WhatsAppIcon, label: c.whatsapp, value: c.whatsappValue, href: contact.whatsapp, external: true },
    { icon: Mail, label: c.email, value: contact.email, href: `mailto:${contact.email}` },
    { icon: Clock, label: c.hours, value: d.company.hours },
  ]

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} accent={c.accent} text={c.text} image="/img/hd/hero-sedan.jpg" />

      <section className="pb-28">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Stagger className="grid gap-4">
              {channels.map((ch) => {
                const body = (
                  <>
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gold/10 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                      <ch.icon className="h-6 w-6" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-xs uppercase tracking-[0.18em] text-mist">{ch.label}</span>
                      <span className="mt-1 block text-lg font-semibold text-white">
                        <bdi>{ch.value}</bdi>
                      </span>
                    </span>
                    {ch.href && <ArrowUpRight className="h-5 w-5 text-white/30 transition group-hover:text-gold rtl:-scale-x-100" />}
                  </>
                )
                const cls =
                  "group flex items-center gap-5 rounded-3xl border border-white/[0.07] bg-ink-2 p-6 transition-colors duration-500 hover:border-gold/40"
                return (
                  <StaggerItem key={ch.label}>
                    {ch.href ? (
                      <a href={ch.href} className={cls} {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {body}
                      </a>
                    ) : (
                      <div className={cls}>{body}</div>
                    )}
                  </StaggerItem>
                )
              })}
            </Stagger>

            <Reveal delay={0.2} className="mt-6 rounded-3xl border border-white/[0.07] bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
              <p className="flex items-center gap-2 text-sm text-white">
                <MapPin className="h-4 w-4 text-gold" /> {c.serving}
              </p>
              <div className="mt-5 flex gap-3">
                <a
                  href={contact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-gold hover:text-gold"
                >
                  <FacebookIcon className="h-4 w-4" /> Facebook
                </a>
                <a
                  href={contact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-gold hover:text-gold"
                >
                  <InstagramIcon className="h-4 w-4" /> Instagram
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  )
}
