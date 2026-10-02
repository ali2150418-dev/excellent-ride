import { NextResponse, type NextRequest } from "next/server"

// English is served at the root (/about), Arabic under /ar (/ar/about).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/ar" || pathname.startsWith("/ar/")) return

  // Canonicalise /en/... to the un-prefixed URL.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(3) || "/"
    return NextResponse.redirect(url, 308)
  }

  const url = request.nextUrl.clone()
  url.pathname = `/en${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/((?!_next|api|img|favicon.ico|.*\\..*).*)"],
}
