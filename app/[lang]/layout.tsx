import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { Aref_Ruqaa, IBM_Plex_Sans_Arabic, Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google"
import "../globals.css"
import { alternates, hasLocale, locales, siteUrl } from "@/lib/i18n"
import { getDict, getPostSummaries } from "@/lib/content"
import { I18nProvider } from "@/components/I18nProvider"
import { IntroProvider, Preloader } from "@/components/Intro"
import { SmoothScroll } from "@/components/SmoothScroll"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { FloatingActions } from "@/components/FloatingActions"
import { Cursor } from "@/components/Cursor"

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" })
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
})
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-ar",
  display: "swap",
  preload: false,
})
const ruqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-ruqaa",
  display: "swap",
  preload: false,
})

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export const viewport: Viewport = { themeColor: "#07080b" }

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const d = getDict(lang)
  return {
    metadataBase: new URL(siteUrl),
    title: { default: d.meta.title, template: `%s | ${d.company.name}` },
    description: d.meta.description,
    alternates: alternates(lang, "/"),
    icons: { icon: "/img/logo-badge.png" },
    openGraph: {
      type: "website",
      siteName: d.company.name,
      title: d.meta.title,
      description: d.meta.description,
      images: ["/img/hd/hero-skyline.jpg"],
      locale: lang === "ar" ? "ar_AE" : "en_AE",
    },
  }
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDict(lang)

  return (
    <html
      lang={lang}
      dir={dict.dir}
      className={`${jakarta.variable} ${instrument.variable} ${plexArabic.variable} ${ruqaa.variable}`}
    >
      <body className="font-sans">
        <I18nProvider lang={lang} dict={dict} posts={getPostSummaries(lang)}>
          <IntroProvider>
            <SmoothScroll>
              <Preloader />
              <Cursor />
              <Header />
              <main>{children}</main>
              <Footer />
              <FloatingActions />
            </SmoothScroll>
          </IntroProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
