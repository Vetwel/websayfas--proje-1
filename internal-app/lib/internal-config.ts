export function isClerkConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
  );
}

export function isOpenAIConfigured() {
  return Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_VECTOR_STORE_ID);
}

export function getInternalSetupStatus() {
  return {
    clerk: isClerkConfigured(),
    openaiKey: Boolean(process.env.OPENAI_API_KEY),
    vectorStore: Boolean(process.env.OPENAI_VECTOR_STORE_ID),
    model: process.env.OPENAI_MODEL || "gpt-5.6",
  };
}
