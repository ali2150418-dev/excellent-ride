"use client"
import { useI18n } from "@/components/I18nProvider"
import { Button, Container } from "@/components/ui"

export default function NotFound() {
  const { dict, href } = useI18n()
  const t = dict.pages.notFound
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-50 [mask-image:radial-gradient(ellipse,black,transparent_70%)]" />
      <Container className="relative text-center">
        <p className="text-[clamp(6rem,20vw,12rem)] font-extrabold leading-none tracking-tighter text-gradient-gold">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">{t.title}</h1>
        <p className="mt-3 text-mist">{t.text}</p>
        <div className="mt-10 flex justify-center">
          <Button href={href("/")}>{t.cta}</Button>
        </div>
      </Container>
    </section>
  )
}
