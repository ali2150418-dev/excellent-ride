import type { Locale } from "@/lib/i18n"
import en, { type Dict } from "./en"
import ar from "./ar"
import { posts } from "./posts"

export type { Dict, IconName } from "./en"
export type { Post } from "./posts"

const dicts: Record<Locale, Dict> = { en, ar }

export const getDict = (lang: Locale) => dicts[lang]
export const getPosts = (lang: Locale) => posts[lang]

/** Lightweight post list for client components (no article bodies). */
export const getPostSummaries = (lang: Locale) =>
  posts[lang].map(({ slug, title, excerpt, category, image, readTime, date }) => ({
    slug,
    title,
    excerpt,
    category,
    image,
    readTime,
    date,
  }))

export type PostSummary = ReturnType<typeof getPostSummaries>[number]
