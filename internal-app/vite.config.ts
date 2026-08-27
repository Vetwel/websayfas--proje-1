import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";

const cloudflareRuntimeEnv = fileURLToPath(
  new URL("./lib/runtime-env.cloudflare.ts", import.meta.url),
);
const defaultRuntimeEnv = fileURLToPath(
  new URL("./lib/runtime-env.ts", import.meta.url),
);

export default defineConfig({
  plugins: [
    {
      name: "vetwel-cloudflare-runtime-env",
      enforce: "pre",
      resolveId(source) {
        if (
          source === "@/lib/runtime-env" ||
          source === defaultRuntimeEnv ||
          source === defaultRuntimeEnv.slice(0, -3)
        ) {
          return cloudflareRuntimeEnv;
        }
        return null;
      },
    },
    vinext(),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
