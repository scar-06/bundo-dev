import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "cookies-next";

import { UserInfoProps } from "../next-auth";
import { ApplicationRoutes } from "../routes";

export default async function middleware(req: NextRequest) {
  try {
    // Get the token from the cookie
    const cookieVal = getCookie("auth_token", { req });

    const token =
      cookieVal !== undefined
        ? (JSON.parse(cookieVal) as UserInfoProps)
        : ({} as UserInfoProps);
    // Redirect user to login page if token does not exist
    if (!token) {
      return NextResponse.redirect(
        new URL(ApplicationRoutes.AUTH_SIGN_IN, req.url),
      );
    }

    const isAuthenticated = !!token;
    const userRole = token?.role;

    // Redirect unauthenticated users from dashboard pages
    if (!isAuthenticated && req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(
        new URL(ApplicationRoutes.AUTH_SIGN_IN, req.url),
      );
    }
    // Redirect authenticated users away from the auth pages
    if (
      isAuthenticated &&
      req.nextUrl.pathname.startsWith(ApplicationRoutes.AUTH_SIGN_IN)
    ) {
      // Redirect to respective dashboard based on user role
      if (userRole === "customer") {
        return NextResponse.redirect(
          new URL(ApplicationRoutes.DASHBOARD_HOME_CUSTOMER, req.url),
        );
      } else if (userRole === "vendor") {
        return NextResponse.redirect(
          new URL(ApplicationRoutes.DASHBOARD_HOME_VENDOR, req.url),
        );
      }
    }

    // Redirect non-customers away from customer dashboard
    if (
      isAuthenticated &&
      userRole !== "customer" &&
      req.nextUrl.pathname.startsWith(ApplicationRoutes.DASHBOARD_HOME_CUSTOMER)
    ) {
      return NextResponse.redirect(
        new URL(ApplicationRoutes.DASHBOARD_HOME_VENDOR, req.url),
      );
    }

    // Redirect non-vendors away from vendor dashboard
    if (
      isAuthenticated &&
      userRole !== "vendor" &&
      req.nextUrl.pathname.startsWith(ApplicationRoutes.DASHBOARD_HOME_VENDOR)
    ) {
      return NextResponse.redirect(
        new URL(ApplicationRoutes.DASHBOARD_HOME_CUSTOMER, req.url),
      );
    }

    // Proceed to the next middleware or the route handler
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}
