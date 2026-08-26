import { env } from "cloudflare:workers";

export function getRuntimeEnvValue(name: string) {
  const value = (env as unknown as Record<string, unknown>)[name];
  return typeof value === "string" ? value : process.env[name];
}
