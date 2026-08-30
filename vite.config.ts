import { config as loadEnv } from "dotenv"
import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import { nitro } from "nitro/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { wgslVitePlugin } from "@vgpu/wgsl/loader-vite"

loadEnv({ path: ".env" })
loadEnv({ path: ".env.local", override: true })

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    watch: {
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/.output/**",
        "**/drizzle/**",
        "**/.nitro/**",
      ],
    },
  },
  plugins: [
    devtools(),
    tailwindcss(),
    wgslVitePlugin(),
    tanstackStart(),
    nitro(),
    viteReact(),
  ],
})

export default config
