"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { ArrowUpRight, ChevronDown, Globe, Menu, Phone, X } from "lucide-react"
import { contact, navKeys } from "@/lib/data"
import { localePath, stripLocale } from "@/lib/i18n"
import { useI18n } from "@/components/I18nProvider"
import { ServiceIcon } from "@/components/icons"
import { ScrollProgress, ease } from "@/components/motion"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  const { dict, href } = useI18n()
  return (
    <Link href={href("/")} className={cn("group flex items-center gap-3", className)} aria-label={dict.company.name}>
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/40 transition-transform duration-500 group-hover:rotate-[-12deg]">
        <Image src="/img/logo-badge.png" alt="" fill sizes="44px" className="scale-[1.04] object-cover" priority />
      </span>
      <span className="leading-none" dir="ltr">
        <span className="block text-[15px] font-extrabold tracking-[0.18em] text-white">EXCELLENT RIDE</span>
        <span className="mt-1 block text-[9.5px] font-medium tracking-[0.28em] text-mist">FLEET VEHICLE MANAGEMENT</span>
      </span>
    </Link>
  )
}

function LangSwitch({ className }: { className?: string }) {
  const { lang, dict } = useI18n()
  const pathname = usePathname()
  const target = lang === "en" ? "ar" : "en"
  return (
    <a
      href={localePath(target, stripLocale(pathname))}
      hrefLang={target}
      className={cn(
        "flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-2 text-sm font-medium text-white/85 transition hover:border-gold/50 hover:text-white",
        className,
      )}
    >
      <Globe className="h-4 w-4 text-gold" />
      <span className={target === "ar" ? "font-[family-name:var(--font-plex-ar)]" : ""}>{dict.nav.switchTo}</span>
    </a>
  )
}

export function Header() {
  const { dict, href } = useI18n()
  const pathname = stripLocale(usePathname())
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > 400 && y > prev && !open)
  })

  const isActive = (p: string) => (p === "/" ? pathname === "/" : pathname.startsWith(p))

  return (
    <>
      <ScrollProgress />
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6",
            scrolled || open ? "glass shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]" : "border border-transparent",
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-0.5 lg:flex" onMouseLeave={() => setMega(false)}>
            {navKeys.map((l) =>
              l.key === "services" ? (
                <div key={l.key} className="relative" onMouseEnter={() => setMega(true)}>
                  <Link
                    href={href(l.href)}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      isActive(l.href) ? "text-gold" : "text-white/75 hover:text-white",
                    )}
                  >
                    {dict.nav[l.key]}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", mega && "rotate-180")} />
                  </Link>
                  <AnimatePresence>
                    {mega && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.3, ease }}
                        className="absolute left-1/2 top-full w-[760px] -translate-x-1/2 pt-4"
                      >
                        <div className="glass grid grid-cols-3 gap-1 rounded-2xl bg-ink-2/95 p-3 shadow-2xl">
                          {dict.services.map((s) => (
                            <Link
                              key={s.slug}
                              href={href(`/services/${s.slug}`)}
                              onClick={() => setMega(false)}
                              className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                            >
                              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                                <ServiceIcon name={s.icon} className="h-4 w-4" />
                              </span>
                              <span>
                                <span className="block text-sm font-semibold text-white">{s.title}</span>
                                <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-mist">{s.short}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={l.key}
                  href={href(l.href)}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive(l.href) ? "text-gold" : "text-white/75 hover:text-white",
                  )}
                >
                  {dict.nav[l.key]}
                  {isActive(l.href) && (
                    <motion.span layoutId="nav-dot" className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
                  )}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitch className="hidden md:flex" />
            <a
              href={contact.phoneHref}
              aria-label={contact.phone}
              className="hidden h-10 w-10 place-items-center rounded-full border border-white/10 text-gold transition hover:border-gold/50 xl:grid"
            >
              <Phone className="h-4 w-4" />
            </a>
            <Link
              href={href("/contact")}
              className="hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-gold-soft sm:flex lg:hidden xl:flex"
            >
              {dict.nav.book} <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white lg:hidden"
              aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink px-6 pb-10 pt-28 lg:hidden"
            data-lenis-prevent
          >
            <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />
            <nav className="relative flex flex-col">
              {navKeys.map((l, i) => (
                <motion.div
                  key={l.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease }}
                >
                  <Link
                    href={href(l.href)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between border-b border-white/10 py-5 text-3xl font-semibold",
                      isActive(l.href) ? "text-gold" : "text-white",
                    )}
                  >
                    {dict.nav[l.key]}
                    <ArrowUpRight className="h-6 w-6 text-white/30 rtl:-scale-x-100" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative mt-10 space-y-4 text-mist"
            >
              <LangSwitch className="w-fit" />
              <a href={contact.phoneHref} className="block text-lg text-white" dir="ltr">
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="block">
                {contact.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
