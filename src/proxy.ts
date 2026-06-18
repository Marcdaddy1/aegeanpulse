import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COUNTRY_COOKIE } from "@/data/pricing";

// Reads Vercel's geo header and stamps a lightweight country cookie so the
// client-side <Price> component can render the visitor's local currency.
// Pages stay fully static — this only touches the cookie.
export function proxy(request: NextRequest) {
  const country =
    request.headers.get("x-vercel-ip-country") ?? // Vercel
    request.headers.get("cf-ipcountry") ??         // Cloudflare (free CDN)
    request.headers.get("x-country") ??             // generic fallback
    "";

  const response = NextResponse.next();
  const existing = request.cookies.get(COUNTRY_COOKIE)?.value;

  if (country && country !== existing) {
    response.cookies.set(COUNTRY_COOKIE, country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  // Run on page routes only — skip static assets, image optimization and API.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
