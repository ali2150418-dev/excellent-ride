import raw from "./site-data.json"

export type Block =
  | { t: "h"; l: number; x: string }
  | { t: "p" | "li" | "q"; x: string }

export type PageData = { title: string; blocks: Block[]; imgs: string[] }
export type Post = {
  slug: string
  title: string
  excerpt: string
  cover: string | null
  blocks: Block[]
  imgs: string[]
}

const data = raw as unknown as { pages: Record<string, PageData>; posts: Post[] }

export const pages = data.pages
export const posts = data.posts

export const siteUrl = "https://excellentride.ae"

export const contact = {
  phone: "+97-155-933-9348",
  phoneHref: "tel:+971559339348",
  email: "info@excellentride.ae",
  whatsappNumber: "971559339348",
  whatsapp: "https://api.whatsapp.com/send/?phone=971559339348",
  facebook: "https://www.facebook.com/SafeDriverDubai1",
  instagram: "https://www.instagram.com/excellentride/",
  pinterest: "https://www.pinterest.com/ExcellentRide/",
}

export const waLink = (text: string) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`

/** Service pages, in the same order and with the same labels as the old site menu. */
export const services = [
  { slug: "safe-driver-in-dubai", label: "Safe Driver in Dubai" },
  { slug: "monthly-driver-dubai", label: "Monthly Driver Dubai" },
  { slug: "personal-driver-dubai", label: "Personal Driver Dubai" },
  { slug: "airport-transfer-dubai", label: "Airport Transfer Dubai" },
  { slug: "corporate-driver-dubai", label: "Corporate Driver Dubai" },
  { slug: "school-pick-up-drop-off", label: "School Pick Up Drop Off Service" },
  { slug: "pick-up-and-drop-off-service", label: "Pick Up and Drop Off Service" },
  { slug: "dubai-tour-guide", label: "Dubai Tour Guide" },
  { slug: "after-party-chauffeur", label: "After Party Chauffeur Service" },
] as const

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const

export type Section = { title: string; items: Block[] }

/** Split a flat block list into sections at every h2 (leading h3 counts too). */
export function toSections(blocks: Block[]): Section[] {
  const out: Section[] = []
  let cur: Section = { title: "", items: [] }
  for (const b of blocks) {
    const starts = b.t === "h" && (b.l === 2 || (b.l === 3 && out.length === 0 && cur.items.length === 0 && !cur.title))
    if (starts) {
      if (cur.title || cur.items.length) out.push(cur)
      cur = { title: (b as { x: string }).x, items: [] }
    } else {
      cur.items.push(b)
    }
  }
  if (cur.title || cur.items.length) out.push(cur)
  return out
}

/** Group h3/h4/h5/h6 + following paragraphs into { heading, body[] } cards. */
export function toCards(items: Block[]) {
  const intro: string[] = []
  const cards: { heading: string; body: string[] }[] = []
  for (const b of items) {
    if (b.t === "h") cards.push({ heading: b.x, body: [] })
    else if (b.t === "p" || b.t === "li") {
      if (cards.length) cards[cards.length - 1].body.push(b.x)
      else intro.push(b.x)
    }
  }
  return { intro, cards }
}

export function toFaqs(items: Block[]) {
  const faqs: { q: string; a: string[] }[] = []
  for (const b of items) {
    if (b.t === "q") faqs.push({ q: b.x, a: [] })
    else if (b.t === "p" || b.t === "li") {
      if (faqs.length) faqs[faqs.length - 1].a.push(b.x)
    }
  }
  return faqs
}

export const sectionBy = (secs: Section[], title: string, nth = 0) =>
  secs.filter((s) => s.title === title)[nth]

export const paras = (items: Block[]) => items.filter((b) => b.t === "p").map((b) => b.x)
