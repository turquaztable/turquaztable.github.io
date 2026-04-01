# TurquazTable

Website for TurquazTable - a content creator specializing in baking/recipes, art/painting, and lifestyle content.

**Stack:** Astro + Sanity CMS (v4) + Tailwind CSS + React islands
**Design Direction:** "Warm Editorial with Smart Utility"


# Setup

After extracting a session zip the full setup is:

```bash

nvm use
pnpm install
cd sanity && pnpm install && cd ..

```

## Seed Data

Import sample content (17 recipes, 4 art posts, 4 fashion posts, 4 blog posts, 8 affiliate products, categories, and settings):

```bash

npx sanity dataset import seed-data.ndjson --dataset production --project 88s7u2ut --replace

```

For the image upload script, since it's inside the sample-images/ folder and uses @sanity/client from your project dependencies, run it from your project root:

```bash

node --env-file=.env sample-images/upload-sample-images.mjs

```


## Development

```bash
# Astro dev server only
pnpm dev

# Astro + Sanity Studio together
pnpm dev:all
```


## Sanity Studio

```bash
cd sanity
pnpm sanity dev
```



## Environment Variables

The `.env` file is included with the project. Values:

```
PUBLIC_SANITY_PROJECT_ID=88s7u2ut
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2026-03-12
SANITY_WRITE_TOKEN=skB3eGTKbXCcFFIXi5BY2i3TNL7qh8OkO3oWQhIR3ShgviQ2vZZ9YKFRPOIVJgThLKm2wyT7YmfCYcIToVTA17YTq8jfg7Y8xeW9KY1WwrlCWWtrpqdyf9iCgfjOHusV5njsowD947lCSkj9se4JTUt3XptIGQUwjK1e60nu6M9nmNWA0K9Z
```



Then start both applications:

```bash

pnpm dev:all

```


## Sessions Completed

1. Project scaffolding, Sanity schemas, design tokens
2. Global layout shell, navigation, design system components
3. Full homepage (8 sections)
4. Recipe system (list with filters + detail with schema.org)
5. Art, fashion, blog, shop, about, and contact pages
6. CMS customization (color theming, section visibility, editable text), Studio reorganization, deployment guide, client documentation
7. SEO, performance, accessibility, social sharing, analytics prep, and polish (404 page, RSS feed, print stylesheet, share buttons, robots.txt)
8. Stretch enhancements: dark mode toggle, newsletter provider integration, Jump to Recipe button, art image download protection, loading states for tab toggle
9. Renamed to TurquazTable, turquoise-green palette, BTK door rework, homepage section reordering via Sanity
10. Page-level CMS customization: 5 new page settings singletons (About, Shop, Contact, Art, Fashion), Local Orders section on shop page, all page text and sections editable from Sanity Studio
# turquaztable
