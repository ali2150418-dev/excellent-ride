"use client"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { contact, navKeys } from "@/lib/data"
import { useI18n } from "@/components/I18nProvider"
import { Container } from "@/components/ui"
import { Logo } from "@/components/Header"
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons"

export function Footer() {
  const { dict, href } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink-2 pt-20">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <Container className="relative">
        <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">{dict.footer.about}</p>
            <div className="mt-6 flex gap-3">
              {[
                { href: contact.social.facebook, Icon: FacebookIcon, label: "Facebook" },
                { href: contact.social.instagram, Icon: InstagramIcon, label: "Instagram" },
                { href: contact.whatsapp, Icon: WhatsAppIcon, label: "WhatsApp" },
              ].map(({ href: h, Icon, label }) => (
                <a
                  key={label}
                  href={h}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">{dict.footer.company}</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {navKeys.map((l) => (
                <li key={l.key}>
                  <Link href={href(l.href)} className="text-mist transition hover:text-gold">
                    {dict.nav[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">{dict.footer.services}</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {dict.services.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link href={href(`/services/${s.slug}`)} className="text-mist transition hover:text-gold">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">{dict.footer.contact}</h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={contact.phoneHref} className="flex items-start gap-3 text-mist transition hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 text-gold" /> <span dir="ltr">{contact.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-start gap-3 text-mist transition hover:text-white">
                  <Mail className="mt-0.5 h-4 w-4 text-gold" /> {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-mist">
                <MapPin className="mt-0.5 h-4 w-4 text-gold" /> {dict.company.city}
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="relative select-none overflow-hidden" dir="ltr" aria-hidden>
        <p className="mask-fade-b whitespace-nowrap text-center text-[12.5vw] font-extrabold leading-[0.8] tracking-tighter text-white/[0.04]">
          EXCELLENT RIDE
        </p>
      </div>

      <div className="border-t border-white/[0.06]">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-mist sm:flex-row">
          <p>
            © {year} {dict.company.legalName}. {dict.footer.rights}
          </p>
          <p>{dict.footer.strip}</p>
        </Container>
      </div>
    </footer>
  )
}
