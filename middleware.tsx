import { clerkMiddleware, createRouteMatcher, ClerkMiddlewareAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { CreateUsers } from "./lib/action/user.action";
// Define your public routes here
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

const handler =async (auth: ClerkMiddlewareAuth, req: NextRequest) => {
 //const user = await currentUser()
  const path = req.nextUrl.pathname;
  // ✅ Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // ✅ Redirect unauthenticated users
  if (!auth) {
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // ✅ Authenticated, allow access

  return NextResponse.next();
}

export default clerkMiddleware(handler);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};