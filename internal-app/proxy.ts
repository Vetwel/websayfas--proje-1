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
  // vinext rejects Clerk's negative-lookahead matcher as an ambiguous route
  // expansion. Running the lightweight middleware for every path keeps auth
  // coverage intact and uses route syntax supported by both Next.js and vinext.
  matcher: ["/:path*"],
};
