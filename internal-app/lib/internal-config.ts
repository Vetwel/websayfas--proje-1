import { getRuntimeEnvValue } from "@/lib/runtime-env";

function normalize(value: string | undefined) {
  return value?.trim() || "";
}

function extractClerkKey(value: string | undefined, kind: "pk" | "sk") {
  const raw = normalize(value);
  if (!raw) return "";

  const pattern = kind === "pk"
    ? /pk_(?:test|live)_[A-Za-z0-9_+=\\/.$-]+/
    : /sk_(?:test|live)_[A-Za-z0-9_+=\\/.$-]+/;

  return raw.match(pattern)?.[0] || "";
}

export function getClerkPublishableKey() {
  return extractClerkKey(getRuntimeEnvValue("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"), "pk");
}

export function getClerkSecretKey() {
  return extractClerkKey(getRuntimeEnvValue("CLERK_SECRET_KEY"), "sk");
}

const normalizedPublishableKey = getClerkPublishableKey();
const normalizedSecretKey = getClerkSecretKey();

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

export function getInternalSetupStatus() {
  const rawPublishable = normalize(
    getRuntimeEnvValue("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"),
  );
  const rawSecret = normalize(getRuntimeEnvValue("CLERK_SECRET_KEY"));

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
    workersAI: true,
    aiProvider: "Cloudflare Workers AI",
    aiBillingMode: "Free allocation only",
  };
}
