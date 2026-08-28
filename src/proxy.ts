import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * SwiftRide AI Professional Security Proxy Engine (proxy.ts)
 * 1. Unauthenticated users CANNOT access /user/* or /admin/* -> Redirected to /login
 * 2. Standard users (role !== 'admin') CANNOT access /admin/* -> Redirected to /user/dashboard
 * 3. Logged-in users CANNOT access /login or /register -> Redirected to their respective dashboard
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authRoleCookie = request.cookies.get("swiftride_auth_role")?.value;
  const authUserCookie = request.cookies.get("swiftride_auth_user")?.value;

  let role: string | null = authRoleCookie || null;
  let isLoggedIn = false;

  if (authUserCookie && authUserCookie.trim() !== "") {
    try {
      const parsed = JSON.parse(decodeURIComponent(authUserCookie));
      if (parsed && parsed.email) {
        isLoggedIn = true;
        if (!role) {
          role = parsed.role || (parsed.email.toLowerCase() === "admin@swiftride.com" ? "admin" : "user");
        }
      }
    } catch {
      if (authRoleCookie && authRoleCookie.trim() !== "") isLoggedIn = true;
    }
  } else if (authRoleCookie && authRoleCookie.trim() !== "") {
    isLoggedIn = true;
  }

  // RULE 1: Protected Admin Routes (/admin/*)
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }
  }

  // RULE 2: Protected User Dashboard Routes (/user/*)
  if (pathname.startsWith("/user")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // RULE 3: Auth Pages (/login, /register)
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (isLoggedIn) {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/login",
    "/register",
  ],
};

export default proxy;
