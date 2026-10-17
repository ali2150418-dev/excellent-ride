import { Check } from "lucide-react"
import { toCards, waLink, type Block } from "@/lib/site"

/** Turns "h3 + p + (labels…, values…) li list" blocks into rate cards. */
export function parseRates(items: Block[]) {
  return toCards(items).cards.filter((c) => c.body.length > 1).map((c) => {
    const [desc, ...li] = c.body
    const half = Math.floor(li.length / 2)
    const rows = li.slice(0, half).map((label, i) => [label, li[half + i]] as const)
    return { title: c.heading, desc, rows }
  })
}

export function RateCards({ items }: { items: Block[] }) {
  const rates = parseRates(items)
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {rates.map((r) => {
        const price = r.rows[0]?.[1]
        const featured = r.title === "Monthly Driver"
        return (
          <article
            key={r.title}
            className={`flex flex-col rounded-2xl border p-7 transition hover:-translate-y-1 ${
              featured ? "border-transparent bg-[#0a0a0a] text-white shadow-[var(--shadow)]" : "border-transparent bg-surface-2"
            }`}
          >
            <h3 className="font-display text-lg font-semibold">{r.title}</h3>
            <p className={`mt-5 inline-block self-start rounded-lg px-4 py-2 font-display text-3xl font-semibold ${featured ? "bg-accent text-black" : "bg-[#0a0a0a] text-white"}`}>{price}</p>
            <p className={`mt-4 text-sm leading-relaxed ${featured ? "text-white/70" : "text-muted"}`}>{r.desc}</p>
            <ul className={`mt-6 grid gap-3 border-t pt-6 text-sm ${featured ? "border-white/15" : "border-line"}`}>
              {r.rows.slice(1).map(([label, value]) => (
                <li key={label} className="flex items-center justify-between gap-3">
                  <span className={`flex items-center gap-2 ${featured ? "text-white/70" : "text-muted"}`}>
                    <Check size={15} className="text-accent" /> {label}
                  </span>
                  <span className="font-semibold">{value}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-7">
              <a
                href={waLink(`Hello Excellent Ride, I would like to book: ${r.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn w-full ${featured ? "btn-primary" : "btn-ghost"}`}
              >
                Book Now
              </a>
            </div>
          </article>
        )
      })}
    </div>
  )
}
