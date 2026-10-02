import type { Metadata } from "next"
import { Check, Minus } from "lucide-react"
import { CTABand, PageHero, PricingGrid, SectionHeading } from "@/components/sections/Blocks"
import { FaqList } from "@/components/sections/Faq"
import { Container } from "@/components/ui"
import { Reveal } from "@/components/motion"
import { getDict } from "@/lib/content"
import { pageMeta, resolveLang } from "@/lib/meta"
import { cn } from "@/lib/utils"

export async function generateMetadata({ params }: PageProps<"/[lang]/pricing">): Promise<Metadata> {
  const lang = await resolveLang(params)
  const d = getDict(lang)
  return pageMeta(lang, "/pricing", d.meta.pricing, d.pricingSection.text, "/img/hd/interior-rolls.jpg")
}

export default async function PricingPage({ params }: PageProps<"/[lang]/pricing">) {
  const lang = await resolveLang(params)
  const d = getDict(lang)
  const p = d.pages.pricing
  const c = d.compare
  const plans = d.plans

  const rows: { label: string; values: (string | boolean)[] }[] = [
    { label: c.rows.initial, values: plans.map((x) => `${x.price.toLocaleString("en-US")} ${d.aed}`) },
    { label: c.rows.hours, values: plans.map((x) => x.hours) },
    { label: c.rows.days, values: plans.map((x) => x.days) },
    { label: c.rows.overtime, values: plans.map((x) => x.overtime) },
    { label: c.rows.rta, values: [true, true, true, true] },
    { label: c.rows.book, values: [true, true, true, true] },
    { label: c.rows.same, values: [false, true, true, true] },
    { label: c.rows.family, values: [false, false, true, true] },
    { label: c.rows.priority, values: [false, false, false, true] },
  ]

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} accent={p.accent} text={p.text} image="/img/hd/interior-rolls.jpg" />

      <section className="pb-24">
        <Container>
          <PricingGrid />
        </Container>
      </section>

      <section className="border-t border-white/[0.06] py-24 sm:py-32">
        <Container>
          <SectionHeading align="center" eyebrow={c.eyebrow} title={c.title} accent={c.accent} />
          <Reveal className="mt-14 overflow-x-auto rounded-3xl border border-white/[0.07]" data-lenis-prevent-horizontal>
            <table className="w-full min-w-[720px] text-start text-sm">
              <thead>
                <tr className="bg-ink-2">
                  <th className="p-5 text-start font-medium text-mist">{c.plan}</th>
                  {plans.map((x) => (
                    <th key={x.name} className={cn("p-5 text-start text-base font-semibold", x.featured ? "text-gold" : "text-white")}>
                      {x.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-t border-white/[0.06] transition-colors hover:bg-white/[0.02]">
                    <td className="p-5 text-mist">{r.label}</td>
                    {r.values.map((v, i) => (
                      <td key={i} className={cn("p-5 text-white", plans[i].featured && "bg-gold/[0.04]")}>
                        {typeof v === "string" ? v : v ? <Check className="h-5 w-5 text-gold" /> : <Minus className="h-5 w-5 text-white/20" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="mt-6 text-center text-sm text-mist">{c.payments}</p>
        </Container>
      </section>

      <section className="border-t border-white/[0.06] py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={d.faqSection.eyebrow} title={d.faqSection.pricingTitle} accent={d.faqSection.pricingAccent} />
          </div>
          <div className="lg:col-span-7">
            <FaqList />
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  )
}
