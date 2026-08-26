import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  getClerkPublishableKey,
  getClerkSecretKey,
  isClerkConfigured,
} from "@/lib/internal-config";

const publishableKey = getClerkPublishableKey();
const secretKey = getClerkSecretKey();
const clerkReady = isClerkConfigured();

if (publishableKey) {
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = publishableKey;
}
if (secretKey) {
  process.env.CLERK_SECRET_KEY = secretKey;
}

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
