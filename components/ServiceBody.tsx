import { Check } from "lucide-react"
import { Reveal } from "./Reveal"
import { Faq, Paragraphs, Pic } from "./ui"
import { toCards, toFaqs, toSections, type PageData } from "@/lib/site"

/** Renders a scraped service page: prose sections, benefit cards and an FAQ, with the page's own photos. */
export function ServiceBody({ page }: { page: PageData }) {
  const secs = toSections(page.blocks)
  const [img1, img2] = page.imgs
  let imgIndex = 0

  return (
    <div className="container-x py-16 md:py-24">
      {secs.map((s, idx) => {
        const hasFaq = s.items.some((b) => b.t === "q")
        if (hasFaq) {
          return (
            <section key={idx} className="mt-20 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <span className="eyebrow">FAQ</span>
                <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{s.title}</h2>
              </div>
              <Faq items={toFaqs(s.items)} />
            </section>
          )
        }

        const { intro, cards } = toCards(s.items)
        const isCards = cards.length >= 2 && cards.every((c) => c.body.length > 0)
        const isChips = cards.length >= 3 && cards.every((c) => c.body.length === 0)

        if (isCards) {
          return (
            <section key={idx} className="mt-20">
              {s.title && <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-tight md:text-4xl">{s.title}</h2>}
              {intro.length > 0 && <Paragraphs items={intro} className="mt-5 max-w-3xl" />}
              <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((c, i) => (
                  <Reveal key={c.heading} delay={i * 70}>
                    <article className="card relative h-full p-7">
                      <span className="font-display text-4xl font-semibold text-accent/70">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-3 font-display text-lg font-semibold">{c.heading}</h3>
                      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
                        {c.body.map((t, j) => (
                          <p key={j}>{t}</p>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </section>
          )
        }

        if (isChips) {
          return (
            <section key={idx} className="mt-20">
              {s.title && <h2 className="text-3xl font-semibold md:text-4xl">{s.title}</h2>}
              {intro.length > 0 && <Paragraphs items={intro} className="mt-5 max-w-3xl" />}
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((c) => (
                  <li key={c.heading} className="card flex items-center gap-3 px-5 py-4 font-medium">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-accent-ink">
                      <Check size={15} />
                    </span>
                    {c.heading}
                  </li>
                ))}
              </ul>
            </section>
          )
        }

        // Prose section, alternating a page photo to one side when one is available.
        const photo = idx === 0 ? img1 : imgIndex++ === 0 ? img2 : undefined
        return (
          <section key={idx} className={idx === 0 ? "" : "mt-20"}>
            <div className={photo ? "grid items-start gap-10 lg:grid-cols-2 lg:gap-16" : "max-w-4xl"}>
              <Reveal className={photo && idx !== 0 ? "lg:order-2" : ""}>
                {s.title && <h2 className="text-balance text-3xl font-semibold leading-tight md:text-4xl">{s.title}</h2>}
                <div className="mt-6 space-y-5 leading-[1.8] text-muted">
                  {s.items.map((b, i) =>
                    b.t === "p" ? (
                      <p key={i}>{b.x}</p>
                    ) : b.t === "h" ? (
                      <h3 key={i} className="!mt-8 font-display text-xl font-semibold text-ink">
                        {b.x}
                      </h3>
                    ) : b.t === "li" ? (
                      <p key={i} className="flex items-start gap-3 !mt-2">
                        <Check size={16} className="mt-1.5 shrink-0 text-accent" /> {b.x}
                      </p>
                    ) : null,
                  )}
                </div>
              </Reveal>
              {photo && (
                <Reveal className={idx !== 0 ? "lg:order-1" : ""}>
                  <div className="lg:sticky lg:top-28">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
                      <Pic src={photo} sizes="(min-width: 1024px) 45vw, 100vw" />
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}
