function normalize(value: string | undefined) {
  return value?.trim() || "";
}

function extractClerkKey(value: string | undefined, kind: "pk" | "sk") {
  const raw = normalize(value);
  if (!raw) return "";

  // Current Clerk publishable keys can contain base64 characters and end with a `$`
  // delimiter. Secret keys may also contain characters outside a simple alphanumeric
  // token. Extract the complete key while still tolerating a whole `.env` line pasted
  // into Vercel.
  const pattern = kind === "pk"
    ? /pk_(?:test|live)_[A-Za-z0-9_+=\/.$-]+/
    : /sk_(?:test|live)_[A-Za-z0-9_+=\/.$-]+/;

  return raw.match(pattern)?.[0] || "";
}

export function getClerkPublishableKey() {
  return extractClerkKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, "pk");
}

export function getClerkSecretKey() {
  return extractClerkKey(process.env.CLERK_SECRET_KEY, "sk");
}

const normalizedPublishableKey = getClerkPublishableKey();
const normalizedSecretKey = getClerkSecretKey();

// Vercel values are sometimes pasted as a whole `.env` line/block. Normalize them
// server-side so Clerk still receives only the actual key token.
if (normalizedPublishableKey) {
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = normalizedPublishableKey;
}
if (normalizedSecretKey) {
  process.env.CLERK_SECRET_KEY = normalizedSecretKey;
}

export function isValidClerkPublishableKey(value = getClerkPublishableKey()) {
  return /^pk_(test|live)_/.test(value);
}

export function isValidClerkSecretKey(value = getClerkSecretKey()) {
  return /^sk_(test|live)_/.test(value);
}

export function isClerkConfigured() {
  return isValidClerkPublishableKey() && isValidClerkSecretKey();
}

export function isOpenAIConfigured() {
  return Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_VECTOR_STORE_ID);
}

export function getInternalSetupStatus() {
  const rawPublishable = normalize(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const rawSecret = normalize(process.env.CLERK_SECRET_KEY);

  return {
    clerk: isClerkConfigured(),
    clerkPublishableKey: isValidClerkPublishableKey(),
    clerkSecretKey: isValidClerkSecretKey(),
    clerkPublishablePresent: Boolean(rawPublishable),
    clerkSecretPresent: Boolean(rawSecret),
    clerkPublishableLength: rawPublishable.length,
    clerkSecretLength: rawSecret.length,
    clerkPublishablePrefix: rawPublishable.startsWith("pk_live_") || rawPublishable.startsWith("pk_test_"),
    clerkSecretPrefix: rawSecret.startsWith("sk_live_") || rawSecret.startsWith("sk_test_"),
    openaiKey: Boolean(process.env.OPENAI_API_KEY),
    vectorStore: Boolean(process.env.OPENAI_VECTOR_STORE_ID),
    model: process.env.OPENAI_MODEL || "gpt-5.6",
  };
}
