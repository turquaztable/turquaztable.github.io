import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Update this once the client picks a domain
  site: "https://example.com",
  integrations: [
    react(),
    tailwind({
      // Use our custom global.css instead of Tailwind's base import
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  output: "static",
});
