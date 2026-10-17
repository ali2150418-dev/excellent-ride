import Link from "next/link"

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="font-display text-8xl font-semibold text-accent">404</p>
        <h1 className="mt-4 text-3xl font-semibold">Page not found</h1>
        <Link href="/" className="btn btn-primary mt-8">
          Home
        </Link>
      </div>
    </section>
  )
}
