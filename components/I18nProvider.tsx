"use client"
import { createContext, useContext } from "react"
import { localePath, type Locale } from "@/lib/i18n"
import type { Dict, PostSummary } from "@/lib/content"

type Ctx = { lang: Locale; dict: Dict; posts: PostSummary[] }

const I18nContext = createContext<Ctx | null>(null)

export function I18nProvider({ children, ...value }: Ctx & { children: React.ReactNode }) {
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>")
  const { lang } = ctx
  return {
    ...ctx,
    isRtl: lang === "ar",
    /** Locale-aware href for internal links. */
    href: (path: string) => localePath(lang, path),
  }
}
