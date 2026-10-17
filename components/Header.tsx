"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react"
import { contact, nav, services } from "@/lib/site"
import { ThemeToggle } from "./ThemeToggle"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`} aria-label="Excellent Ride home">
      <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full">
        <Image
          src="/site/Excellent_Ride_Logo-01-01-01-removebg-preview.png"
          alt=""
          width={193}
          height={87}
          className="absolute -left-[3px] -top-[5px] max-w-none"
          priority
        />
      </span>
      <span className="leading-none">
        <span className="block whitespace-nowrap font-display text-base font-semibold tracking-tight sm:text-lg">EXCELLENT RIDE</span>
        <span className="mt-1 hidden whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.14em] opacity-60 min-[400px]:block">
          Fleet Vehicle Management LLC
        </span>
      </span>
    </Link>
  )
}

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)

  // Close menus after navigating (adjusting state during render, per React docs).
  const [prevPath, setPrevPath] = useState(pathname)
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    setOpen(false)
    setMenu(false)
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))
  const link = (href: string) =>
    `rounded-lg px-4 py-2 text-[15px] font-medium transition hover:text-accent ${active(href) ? "text-accent" : ""}`

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-accent text-[13px] font-semibold text-black md:block">
        <div className="container-x flex h-10 items-center justify-between">
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:underline">
            <Mail size={14} /> {contact.email}
          </a>
          <a href={contact.phoneHref} className="flex items-center gap-2 hover:underline">
            <Phone size={14} /> {contact.phone}
          </a>
        </div>
      </div>

      <div className="bg-[#0a0a0a] text-white">
        <div className="container-x flex h-[76px] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((n) =>
              n.label === "Services" ? (
                <div key={n.href} className="relative" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
                  <Link href={n.href} className={`flex items-center gap-1 ${link(n.href)}`}>
                    {n.label} <ChevronDown size={14} className={`transition ${menu ? "rotate-180" : ""}`} />
                  </Link>
                  <div
                    className={`absolute left-0 top-full w-72 pt-3 transition ${
                      menu ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
                    }`}
                  >
                    <ul className="card p-2 shadow-[var(--shadow)]">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}`} className="block rounded-lg px-3 py-2 text-sm text-ink hover:bg-surface-2">
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link key={n.href} href={n.href} className={link(n.href)}>
                  {n.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary hidden md:inline-flex">
              Let&apos;s Ride Now!
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/25 text-white lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] bg-bg transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="container-x flex h-[76px] items-center justify-between border-b border-line">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-lg border border-line"
          >
            <X size={20} />
          </button>
        </div>
        <div className="container-x h-[calc(100%-76px)] overflow-y-auto pb-10">
          <ul className="divide-y divide-line">
            {nav.map((n) => (
              <li key={n.href} className="py-4">
                <Link href={n.href} className="block font-display text-xl font-semibold">
                  {n.label}
                </Link>
                {n.label === "Services" && (
                  <ul className="mt-3 grid gap-2 pl-1">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className="text-sm text-muted hover:text-accent">
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6 w-full">
            Let&apos;s Ride Now!
          </a>
        </div>
      </div>
    </header>
  )
}
