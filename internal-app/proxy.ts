import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() || "";
const secretKey = process.env.CLERK_SECRET_KEY?.trim() || "";
const clerkReady =
  /^pk_(test|live)_[A-Za-z0-9_-]+$/.test(publishableKey) &&
  /^sk_(test|live)_[A-Za-z0-9_-]+$/.test(secretKey);

export default clerkReady
  ? clerkMiddleware()
  : function setupModeProxy() {
      return NextResponse.next();
    };

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
