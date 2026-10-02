import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { alternates, hasLocale, type Locale } from "@/lib/i18n"
import { getDict } from "@/lib/content"

/** Resolve and validate the [lang] param. */
export async function resolveLang(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return lang
}

export function pageMeta(lang: Locale, path: string, title?: string, description?: string, image?: string): Metadata {
  const d = getDict(lang)
  return {
    ...(title ? { title } : {}),
    description: description ?? d.meta.description,
    alternates: alternates(lang, path),
    openGraph: {
      title: title ? `${title} | ${d.company.name}` : d.meta.title,
      description: description ?? d.meta.description,
      ...(image ? { images: [image] } : {}),
    },
  }
}
