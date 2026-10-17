import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { contact } from "@/lib/site"
import { Logo } from "./Header"
import { Facebook, Instagram, Pinterest } from "./social"

export function Footer() {
  return (
    <footer className="bg-[#111113] text-[#f3f3f1]">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              At Excellent Ride, we’re further than just a driver service; we’re your trusted mate in safe, accessible,
              and dependable transportation across the stunning megacity of Dubai.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold">Quick Links</h3>
            <ul className="mt-5 grid gap-3 text-sm text-white/70">
              {[
                ["Home", "/"],
                ["About us", "/about"],
                ["Services", "/services"],
                ["Pricing", "/pricing"],
                ["Contact us", "/contact"],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="transition hover:text-accent">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold">Follow us</h3>
            <ul className="mt-5 grid gap-3 text-sm text-white/70">
              <li>
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition hover:text-accent">
                  <Facebook size={16} /> Facebook
                </a>
              </li>
              <li>
                <a href={contact.pinterest} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition hover:text-accent">
                  <Pinterest size={16} /> Pinterest
                </a>
              </li>
              <li>
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition hover:text-accent">
                  <Instagram size={16} /> Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold leading-snug">
              CALL NOW - Solution Of All CHAUFFEUR SERVICE Needs in DUBAI.
            </h3>
            <a href={contact.phoneHref} className="mt-5 flex items-center gap-2 font-semibold text-accent">
              <Phone size={17} /> {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="mt-3 flex items-center gap-2 text-sm text-white/70 hover:text-accent">
              <Mail size={16} /> {contact.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
