import { createClerkClient, verifyToken } from "@clerk/backend";
import { cookies, headers } from "next/headers";
import {
  getClerkPublishableKey,
  getClerkSecretKey,
  isClerkConfigured,
} from "@/lib/internal-config";

type AuthState = {
  userId: string | null;
  sessionId: string | null;
  orgId: string | null;
  orgRole: string | null;
};

function getBackendClient() {
  const secretKey = getClerkSecretKey();
  const publishableKey = getClerkPublishableKey();

  if (!secretKey) {
    throw new Error("CLERK_SECRET_KEY is not configured.");
  }

  return createClerkClient({
    secretKey,
    publishableKey: publishableKey || undefined,
  });
}

export async function getSessionToken() {
  const headerStore = await headers();

  const middlewareToken = headerStore.get("x-clerk-auth-token");
  if (middlewareToken) return middlewareToken;

  const authorization = headerStore.get("authorization");
  if (authorization?.toLowerCase().startsWith("bearer ")) {
    return authorization.slice(7).trim();
  }

  const cookieStore = await cookies();
  return cookieStore.get("__session")?.value || null;
}

export async function auth(): Promise<AuthState> {
  if (!isClerkConfigured()) {
    return { userId: null, sessionId: null, orgId: null, orgRole: null };
  }

  const token = await getSessionToken();
  if (!token) {
    return { userId: null, sessionId: null, orgId: null, orgRole: null };
  }

  try {
    const payload = await verifyToken(token, {
      secretKey: getClerkSecretKey(),
    });

    const claims = payload as Record<string, unknown>;
    return {
      userId: typeof claims.sub === "string" ? claims.sub : null,
      sessionId: typeof claims.sid === "string" ? claims.sid : null,
      orgId: typeof claims.org_id === "string" ? claims.org_id : null,
      orgRole: typeof claims.org_role === "string" ? claims.org_role : null,
    };
  } catch {
    return { userId: null, sessionId: null, orgId: null, orgRole: null };
  }
}

export async function clerkClient() {
  return getBackendClient();
}

export async function currentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  try {
    return await getBackendClient().users.getUser(userId);
  } catch {
    return null;
  }
}
