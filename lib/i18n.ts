export const locales = ["en", "ar"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

export const hasLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l)

/** Public URL for a path in a locale. English lives at the root, Arabic under /ar. */
export function localePath(lang: Locale, path: string) {
  const clean = path === "/" ? "" : path
  return lang === "en" ? path : `/ar${clean}`
}

/** Strip any locale prefix from a browser pathname. */
export function stripLocale(pathname: string) {
  const stripped = pathname.replace(/^\/(en|ar)(?=\/|$)/, "")
  return stripped === "" ? "/" : stripped
}

export const siteUrl = "https://excellentride.ae"

export function alternates(lang: Locale, path: string) {
  return {
    canonical: localePath(lang, path),
    languages: { en: localePath("en", path), ar: localePath("ar", path) },
  }
}
