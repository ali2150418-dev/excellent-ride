import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </span>
  )
}

type BtnProps = {
  href: string
  children: React.ReactNode
  variant?: "gold" | "ghost" | "dark"
  className?: string
  external?: boolean
  icon?: boolean
}

export function Button({
  href,
  children,
  variant = "gold",
  className,
  external,
  icon = true,
}: BtnProps) {
  const styles = {
    gold: "bg-gold text-ink hover:bg-gold-soft shadow-[0_10px_40px_-10px_rgba(245,165,36,0.6)]",
    ghost: "border border-white/15 text-white hover:border-white/40 hover:bg-white/5",
    dark: "bg-ink text-white hover:bg-ink-3",
  }[variant]
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-black/10">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-5 group-hover:-translate-y-5 rtl:-scale-x-100 rtl:group-hover:-translate-x-5" />
          <ArrowUpRight className="absolute h-4 w-4 -translate-x-5 translate-y-5 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0 rtl:-scale-x-100 rtl:translate-x-5 rtl:group-hover:translate-x-0" />
        </span>
      )}
    </>
  )
  const cls = cn(
    "group inline-flex items-center gap-3 rounded-full py-2 ps-6 text-sm font-semibold transition-all duration-300",
    icon ? "pe-2" : "pe-6 py-3.5",
    styles,
    className,
  )
  if (/^(tel|mailto):/.test(href)) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    )
  }
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  )
}
