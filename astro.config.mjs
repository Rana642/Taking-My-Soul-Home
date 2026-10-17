import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://takingmysoulhome.com",
  output: "static",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    define: {
      "process.env": "{}",
    },
    resolve: {
      alias: {
        "next/link": path.resolve(__dirname, "src/shims/next-link.tsx"),
        "next/navigation": path.resolve(__dirname, "src/shims/next-navigation.tsx"),
        "next/font/google": path.resolve(__dirname, "src/shims/next-font-google.ts"),
      },
    },
  },
  redirects: {
    "/privacy": "/legal/privacy",
    "/terms": "/legal/terms",
    "/disclaimer": "/legal/disclaimer",
  },
});
