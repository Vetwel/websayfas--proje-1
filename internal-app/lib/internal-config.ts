function normalize(value: string | undefined) {
  return value?.trim() || "";
}

export function isValidClerkPublishableKey(value = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  return /^pk_(test|live)_[A-Za-z0-9_-]+$/.test(normalize(value));
}

export function isValidClerkSecretKey(value = process.env.CLERK_SECRET_KEY) {
  return /^sk_(test|live)_[A-Za-z0-9_-]+$/.test(normalize(value));
}

export function isClerkConfigured() {
  return isValidClerkPublishableKey() && isValidClerkSecretKey();
}

export function isOpenAIConfigured() {
  return Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_VECTOR_STORE_ID);
}

export function getInternalSetupStatus() {
  return {
    clerk: isClerkConfigured(),
    clerkPublishableKey: isValidClerkPublishableKey(),
    clerkSecretKey: isValidClerkSecretKey(),
    openaiKey: Boolean(process.env.OPENAI_API_KEY),
    vectorStore: Boolean(process.env.OPENAI_VECTOR_STORE_ID),
    model: process.env.OPENAI_MODEL || "gpt-5.6",
  };
}
