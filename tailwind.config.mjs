/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  // Class-based dark mode — toggle ships in Phase 2, but we're ready for it
  darkMode: "class",

  theme: {
    extend: {
      // All colors reference CSS custom properties so we can:
      // 1. Swap the palette easily when client finalizes branding
      // 2. Toggle dark mode by changing property values on <html>
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "green-bright": "var(--green-bright)",
        "green-deep": "var(--green-deep)",
        copper: "var(--copper)",
        "copper-light": "var(--copper-light)",
        "text-primary": "var(--text)",
        "text-md": "var(--text-md)",
        "text-light": "var(--text-light)",
        cream: "var(--cream)",
        border: "var(--border)",
      },
      fontFamily: {
        serif: [
          "Cormorant Garamond",
          "Georgia",
          "serif",
        ],
        sans: [
          "Libre Franklin",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      letterSpacing: {
        label: "0.15em",   // 1.5px — tight labels
        wider: "0.2em",    // 2px — nav links, CTAs
        widest: "0.25em",  // 2.5px — section labels, badges
        ultra: "0.35em",   // 3.5px — search heading
      },
      maxWidth: {
        content: "1200px",
        narrow: "880px",
        text: "680px",
        newsletter: "500px",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/4": "3 / 4",
        "3/2": "3 / 2",
        "16/9": "16 / 9",
        "16/10": "16 / 10",
      },
    },
  },
  plugins: [],
};
