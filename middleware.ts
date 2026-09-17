import { verifyAdminSession, ADMIN_COOKIE } from "@/lib/cms/auth";
import { verifyCustomerToken, CUSTOMER_COOKIE } from "@/lib/auth/customer-session";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/checkout" || pathname === "/account") {
    const token = request.cookies.get(CUSTOMER_COOKIE)?.value;
    if (!(await verifyCustomerToken(token))) {
      const login = new URL("/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
    return NextResponse.next();
  }

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!verifyAdminSession(token)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/checkout", "/account"],
};
