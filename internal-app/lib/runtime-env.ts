export function getRuntimeEnvValue(name: string) {
  return process.env[name];
}

export function getAiBinding(): Cloudflare.Env["AI"] | undefined {
  return undefined;
}
