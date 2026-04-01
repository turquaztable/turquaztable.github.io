# TurquazTable - Project Requirements & Checklist

**Client:** Online influencer (baking, life blogs, videos, art, painting)
**Developer:** d
**Stack:** Astro + Sanity CMS + Tailwind CSS, hosted on Netlify
**Target Audience:** ~10-20K followers
**Last Updated:** March 31, 2026
**Site Name:** TurquazTable
**Design Direction:** "Warm Editorial with Smart Utility"

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Design Direction (Finalized)](#2-design-direction-finalized)
3. [Technical Architecture](#3-technical-architecture)
4. [Content Types & Schema Design](#4-content-types--schema-design)
5. [Homepage Section Architecture](#5-homepage-section-architecture)
6. [Work Sessions](#6-work-sessions)
7. [Success Criteria](#7-success-criteria)
8. [Open Questions for Client](#8-open-questions-for-client)
9. [Revision Log](#9-revision-log)

---

## 1. Project Overview

### Goals

- Give the content creator a professional, brandable website she can update independently
- Support structured recipe content as the primary content type
- Showcase secondary content: art/painting portfolio, fashion & makeup (cosplay can live as a subcategory of either art or fashion)
- Maintain a general blog for life updates and miscellaneous posts
- Affiliate / recommended products page ("My Favorites" / Shop)
- Optimize for SEO, especially Google rich results for recipes
- Stay within free-tier limits for all services at current traffic levels

### Non-Goals (Out of Scope for V1)

- E-commerce / payment processing (affiliate links only; no checkout)
- User accounts / comments system
- Multi-language support
- Custom analytics dashboard (use Google Analytics or Plausible)
- Content migration from Instagram (client to decide; may be a separate effort)

### In Scope for V1 (Updated)

- Newsletter signup integration (utility bar CTA + footer form + dedicated section)
- Dark mode (CSS custom properties + Sanity-customizable palettes for both light and dark)
- Video content toggle section on homepage
- Affiliate/recommended products page
- "Beyond the Kitchen" portal section with hover-triggered door animation
- Page-level CMS customization for all pages (about, shop, contact, art, fashion)
- Homepage section reordering via Sanity drag-and-drop

### Cost Targets

| Service       | Free Tier Limits                        | Expected Usage |
|---------------|-----------------------------------------|----------------|
| Sanity CMS    | 100K API req/mo, 10GB bandwidth, 5GB assets | Well under     |
| Netlify       | 100GB bandwidth/mo, 300 build min/mo    | ~5-10GB/mo     |
| GitHub        | Unlimited private repos                 | 1 repo         |
| Domain        | N/A                                     | ~$12/yr        |
| Cloudinary    | 25K transformations/mo (backup for images) | Only if needed |

---

## 2. Design Direction (Finalized)

### Direction: "Warm Editorial with Smart Utility"

Synthesizes Gimme Some Oven's editorial storytelling, Natasha's Kitchen's category depth, Sally's Baking Addiction's filtering utility, and Bake With Zoha's clean confidence.

### Color Palette

> **Note:** Site name finalized as TurquazTable. Color palette shifted from forest green to turquoise-green in Session 9. All colors are CSS custom properties - updating the palette requires only `global.css` and `tailwind.config.mjs`.

| Role | Token | Light Mode | Dark Mode | Usage |
|------|-------|-----------|---------------------|-------|
| Background | `--bg` | `#FAFAF7` | `#101A19` | Page background |
| Surface | `--surface` | `#FFFFFF` | `#1A2A28` | Cards, nav, elevated elements |
| Primary Bright | `--green-bright` | `#2BA89E` | `#4DD8CC` | CTAs, active states, portal section |
| Primary Deep | `--green-deep` | `#1B5E58` | `#3AAA9E` | Headings, nav, search bar bg |
| Accent | `--copper` | `#C47A2E` | `#E0974D` | Badges, featured labels, hover |
| Text Primary | `--text` | `#1A1A1A` | `#F5EDE4` | Body text, headings |
| Text Secondary | `--text-md` | `#4A4A4A` | `#B8A99A` | Descriptions, metadata |
| Text Muted | `--text-light` | `#8A8A8A` | `#887868` | Captions, timestamps |
| Cream | `--cream` | `#F5F0E8` | `#1A2A28` | About block bg, hover states |
| Divider | `--border` | `#E5E2DC` | `#2A3A38` | Section dividers, card borders |

> The dual turquoise system creates a storytelling gradient - the baking sections live in warm copper/cream space; as users scroll toward "Beyond the Kitchen," the teal deepens to guide them into her art world.

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display / Headings | Cormorant Garamond | 300-600 | Section headings, recipe titles, hero text |
| Body / UI | Libre Franklin | 400-700 | Body text, nav, metadata, labels, buttons |
| Accent (optional) | TBD handwritten/script | - | Creator's name, signature, sparse callouts |

### Key Design Rules

- No rounded corners on cards or images (sharp, editorial feel)
- No emoji in UI elements (use text labels and icons)
- All labels use tight uppercase letterspacing (1.5-4px tracking)
- Generous whitespace on homepage; slightly denser on listing pages
- Photography aspect ratios: 4:3 for recipes, 1:1 for art, 3:4 for fashion/makeup, 16:9 for video thumbnails
- Hover effects: subtle translateY(-3px) + box-shadow on cards; scale(1.03) on images
- Section headers use serif font at light weight (400) with horizontal rule divider

### Reference Sites

- **Gimme Some Oven** - editorial flow, featured recipe hero, category layout, utility bar pattern, search bar band
- **Natasha's Kitchen** - category depth, mega-menu, about/personality block
- **Sally's Baking Addiction** - sidebar filtering, dark mode warm browns, category badges
- **Bake With Zoha** - clean minimal grid, strong food photography focus

---

## 3. Technical Architecture

### Stack Summary

- **Framework:** Astro (static site generation, TypeScript)
- **CMS:** Sanity (hosted, structured content, visual editor)
- **Styling:** Tailwind CSS with CSS custom properties for dark mode readiness
- **Hosting:** Netlify (automatic deploys via GitHub, webhook rebuild on Sanity publish)
- **Images:** Sanity CDN with automatic optimization (Cloudinary as fallback)
- **Videos:** Embedded from YouTube / TikTok / Instagram (no self-hosting)

### Repository Structure

```
turquaz-table/
|-- src/
|   |-- components/
|   |   |-- global/            # Header, Footer, UtilityBar, MobileNav (React), DarkModeToggle (React)
|   |   |-- recipe/            # RecipeCard, RecipeFilters (React), IngredientChecklist (React), JumpToRecipe (React)
|   |   |-- video/             # VideoEmbed
|   |   |-- art/               # ArtCard
|   |   |-- blog/              # BlogCard
|   |   |-- fashion/           # FashionCard, FashionFilters (React)
|   |   |-- shop/              # AffiliateCard
|   |   |-- homepage/          # HeroFeatured, CategoryGrid, LatestToggle (React), PopularList, BeyondTheKitchen (React), AboutBlock, SearchBand, NewsletterSection
|   |   +-- shared/            # Badge, SectionLabel, PortableText, ImageGallery (React), ShareButtons
|   |-- layouts/
|   |   |-- BaseLayout.astro
|   |   |-- RecipeLayout.astro
|   |   +-- GalleryLayout.astro
|   |-- pages/
|   |   |-- index.astro        # Homepage (dynamic section ordering)
|   |   |-- 404.astro
|   |   |-- rss.xml.ts
|   |   |-- recipes/
|   |   |-- art/
|   |   |-- fashion/
|   |   |-- blog/
|   |   |-- shop.astro
|   |   |-- about.astro
|   |   +-- contact.astro
|   |-- lib/
|   |   |-- sanity.ts
|   |   |-- image.ts
|   |   |-- recipeHelpers.ts
|   |   |-- homepageQueries.ts
|   |   |-- pageQueries.ts
|   |   |-- socialIcons.ts
|   |   +-- navigation.ts
|   +-- styles/
|       +-- global.css
|-- sanity/
|   |-- schemas/
|   |   |-- recipe.ts
|   |   |-- artPost.ts
|   |   |-- fashionPost.ts
|   |   |-- blogPost.ts
|   |   |-- category.ts
|   |   |-- affiliateProduct.ts
|   |   |-- homepageSettings.ts
|   |   |-- siteSettings.ts
|   |   |-- aboutPageSettings.ts
|   |   |-- shopPageSettings.ts
|   |   |-- contactPageSettings.ts
|   |   |-- artPageSettings.ts
|   |   |-- fashionPageSettings.ts
|   |   +-- blockContent.ts
|   +-- sanity.config.ts
|-- public/
|-- docs/
|-- seed-data.ndjson
|-- astro.config.mjs
|-- tailwind.config.mjs
|-- package.json
|-- .env
|-- .nvmrc
+-- netlify.toml
```

### Key Technical Decisions

- **Video strategy:** Store only URL/ID in Sanity; render platform-specific embeds
- **Image handling:** Sanity CDN with responsive srcset, lazy loading, WebP/AVIF auto-generation, width/height attributes on all images for CLS prevention
- **Build trigger:** Sanity webhook -> Netlify deploy (1-3 min delay on publish)
- **Homepage curation:** Sanity singleton document (`homepageSettings`) with draggable section ordering array allows creator to reorder and toggle homepage sections without developer involvement
- **Dark mode:** All colors as CSS custom properties; toggle in Header + MobileNav with localStorage persistence and system preference detection. Both light and dark palettes customizable through Sanity Studio.
- **Navigation:** Consistent across all pages; RECIPES has dropdown with category links
- **Analytics:** PostHog in cookieless mode (no consent banner needed). Script in BaseLayout, commented out pending API key.

### 3.1 Analytics

(Unchanged from prior version - PostHog as likely choice, table of alternatives, implementation notes)

---

## 4. Content Types & Schema Design

### 4.1-4.6

(Unchanged from prior version - Recipes, Art, Fashion, Blog, Categories, Affiliate Products)

### 4.7 Homepage Settings (Singleton)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| featuredRecipe | reference | Yes | Points to one Recipe for the hero section |
| latestSectionMode | string (enum) | No | "auto" or "manual" |
| manualLatestRecipes | array of references | No | If manual mode |
| featuredVideo | object | No | videoUrl + title + description + platform + duration |
| manualLatestVideos | array of objects | No | Each: videoUrl, title, platform, duration |
| seasonLabel | string | No | e.g., "Spring 2026" |
| popularRecipes | array of references | No | Hand-picked, up to 5 |
| beyondKitchenLabel | string | No | Section label text |
| beyondKitchenHeading | string | No | Section heading text |
| beyondKitchenSubheading | text | No | Section subheading text |
| beyondKitchenHeadingColor | string | No | Hex color for heading (default: accent color) |
| beyondKitchenSubheadingColor | string | No | Hex color for subheading (default: text-md) |
| beyondKitchenDoorImage | image | No | Revealed behind door on hover |
| beyondKitchenArtPost | reference | No | Art post for portal card |
| beyondKitchenArtCardImage | image | No | Custom image for art portal card |
| beyondKitchenArtCtaText | string | No | CTA button text for art card |
| beyondKitchenShopText | object | No | Title + description + ctaText |
| beyondKitchenShopCardImage | image | No | Custom image for shop portal card |
| searchBandHeading | string | No | Search bar heading |
| searchBandPlaceholder | string | No | Search input placeholder |
| searchBandButtonText | string | No | Search button text |
| newsletterHeading | string | No | Newsletter section heading |
| newsletterSubheading | text | No | Newsletter section subheading |
| newsletterButtonText | string | No | Subscribe button text |
| newsletterPlaceholder | string | No | Email input placeholder |
| newsletterCta | string | No | Utility bar CTA text |
| socialLinks | array of objects | No | Each: platform (enum), url |
| showUtilityBar | boolean | No | Show/hide utility bar (default: true) |
| showNewsletterCta | boolean | No | Show/hide newsletter CTA in utility bar (default: true) |
| homepageSections | array of objects | No | Ordered list of sections with sectionKey + enabled toggle. Drag to reorder. |

### 4.8 Site Settings (Singleton)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| siteName | string | Yes | Used in nav, footer, meta tags |
| siteDescription | text | No | Default meta description |
| logo | image | No | |
| defaultOgImage | image | No | Fallback Open Graph image |
| colorBackground - colorBorder | string (x10) | No | Light mode hex colors |
| darkColorBackground - darkColorBorder | string (x10) | No | Dark mode hex colors |
| aboutBlock | object | No | Homepage about section content |
| aboutPageBody | text | No | Full about page text |
| aboutPagePhoto | image | No | Full about page photo |
| showArtNav - showShopNav | boolean (x4) | No | Nav link visibility |
| newsletterFormAction | url | No | Newsletter provider endpoint |
| newsletterFormMethod | string (enum) | No | POST/GET |
| newsletterHiddenFields | array of objects | No | Provider hidden fields |
| footerTagline | string | No | |

### 4.9 Page Settings Singletons

Five page-specific singleton documents provide CMS control over individual page text, sections, and CTAs. All fields have fallback defaults so pages render correctly before settings are customized.

**About Page Settings** (`aboutPageSettings`): introHeading override, connectHeading, connectBody, show/hide + text/link overrides for Get in Touch and Subscribe buttons.

**Shop Page Settings** (`shopPageSettings`): showDisclosure + disclosureText, showTopPicks + topPicksHeading, categoryOrder (drag-sortable array with optional label overrides), Local Orders section (showLocalOrders, heading, description, items array with name/description/price/image, contact instructions, availability note).

**Contact Page Settings** (`contactPageSettings`): pageHeading, pageIntro, show/hide + heading + description for General Inquiries / Press & Collaborations / Art Commissions, customSections array.

**Art Page Settings** (`artPageSettings`): pageHeading, pageIntro, showIntro toggle, callout section (showCallout, calloutHeading, calloutBody, calloutImage).

**Fashion Page Settings** (`fashionPageSettings`): Same structure as Art Page Settings.

---

## 5. Homepage Section Architecture

The homepage section order is now **configurable via Sanity** through a draggable `homepageSections` array. The default narrative flow is: browse -> featured -> search -> latest/videos -> popular -> about -> beyond the kitchen -> newsletter.

Section order table and detail specs unchanged from prior version, except:

**Beyond the Kitchen - Updated Detail:**
- Hover-triggered door animation (not scroll-triggered). Door opens on mouse enter, closes on mouse leave.
- Door is ornate French-style with arched window panes (arch top, vertical divider, 3 rows of glass panes, brass knob).
- Image behind door revealed via Sanity `beyondKitchenDoorImage` field, displayed at 85% opacity with vignette and feathered mask edges.
- Door animation speed: 1.6s cubic-bezier. Clicking the door navigates to /about.
- Section gradient transitions from cream to teal (not white to teal).
- BTK label uses copper color, heading uses accent color, subheading uses standard text color.
- Portal card images render from Sanity `beyondKitchenArtCardImage` and `beyondKitchenShopCardImage`.
- Portal cards visible immediately on scroll (not gated behind door opening).

---

## 6. Work Sessions

Each session is a self-contained conversation with clear inputs, outputs, and a checklist.

> **Continuity protocol:** At the end of each session, Claude provides: (1) the full updated `project-requirements.md`, (2) a session summary, and (3) a ready-to-paste prompt for the next conversation.

---

### Sessions 1-6: COMPLETE

*(Checklists unchanged from prior version)*

---

### Session 7: SEO, Performance & Polish

**Status: COMPLETE**

*(Checklist unchanged from prior version)*

---

### Session 8 (Stretch): Enhancements & Future Features

**Status: COMPLETE**

*(Checklist unchanged from prior version)*

---

### Session 9: Naming, Palette, BTK Rework & Section Reordering

**Status: COMPLETE**

**Goal:** Finalize site branding, update color palette, fix BTK image bugs, rework door animation, add homepage section reordering.

**Checklist:**

Naming:
- [x] Rename all references from "Baked & Brushed" / "Content Creator Site" to "TurquazTable"
- [x] Update package.json, sanity.config.ts, README.md, seed-data.ndjson
- [x] Update all fallback siteName values across components and pages (BaseLayout, Header, Footer, index, about, contact, print, rss)
- [x] Update deployment-guide.md domain examples

Color Palette:
- [x] Shift primary colors from forest green to turquoise-green (#2BA89E / #1B5E58)
- [x] Update dark mode palette to cool teal tones (#4DD8CC / #3AAA9E / #101A19 / #1A2A28)
- [x] Keep copper accent (#C47A2E) as warm complement
- [x] Update all hardcoded color references in BeyondTheKitchen.tsx (gradient, rgba values, portal cards)
- [x] Update recipes/print/[slug].astro hardcoded accent color
- [x] Update siteSettings.ts field descriptions with new default values (all 20 color fields)
- [x] Update cms-guide.md color defaults
- [x] Update global.css dark mode footer/utility bar overrides

BTK Image Fixes:
- [x] Fix portal card image pipeline (images fetched but never passed to component)
- [x] Add artCardImageUrl and shopCardImageUrl props to BeyondTheKitchen.tsx
- [x] Pre-build Sanity CDN URLs in index.astro, pass as string props to React island
- [x] PortalCard renders img tag when URL present, gradient fallback when absent

BTK Door Rework:
- [x] Add beyondKitchenDoorImage field to homepageSettings schema
- [x] Image revealed behind door, clipped to arch shape with feathered mask edges
- [x] Image displayed at 85% opacity with slight desaturation and radial vignette
- [x] Door opens on hover (mouse enter), closes on mouse leave (not scroll-triggered)
- [x] Door opens to -85 degrees (nearly flat against wall)
- [x] Door animation speed: 1.6s (doubled from original 0.8s)
- [x] Ornate French door design with arched window panes, center divider, 3 rows of glass, brass knob
- [x] Clicking door navigates to /about (with keyboard support)
- [x] Portal cards visible immediately on scroll (not gated behind door opening)
- [x] BTK gradient changed from white-to-teal to cream-to-teal

BTK Text:
- [x] "BEYOND THE KITCHEN" label uses copper color (var(--copper))
- [x] Heading uses accent color (var(--green-bright)) as default
- [x] Subheading uses standard text color (var(--text-md)) as default
- [x] Add beyondKitchenHeadingColor and beyondKitchenSubheadingColor Sanity fields
- [x] Text colors configurable from Sanity with CSS variable fallbacks

LatestToggle Tabs:
- [x] Active tab uses var(--green-deep) with var(--green-bright) underline
- [x] Inactive tab uses var(--text-md) (readable gray, not invisible border color)
- [x] Hover on inactive goes to var(--text)

Homepage Section Reordering:
- [x] Replace 8 individual boolean toggles with homepageSections ordered array in homepageSettings schema
- [x] Each array item: sectionKey (enum) + enabled (boolean)
- [x] Drag-sortable in Sanity Studio with preview showing section name and "Visible"/"Hidden"
- [x] index.astro iterates array and renders sections in order, skipping disabled ones
- [x] Backward compatible: default order used when array doesn't exist
- [x] Utility bar and newsletter CTA toggles remain as standalone booleans (not in the array)
- [x] About block disabled by default in seed data
- [x] Updated seed-data.ndjson with homepageSections array

**Deliverables:** session9-output.zip with all changes, session9-summary.md

**Added during session:**
- Full rename to TurquazTable across 15+ files
- Turquoise-green palette replacing forest green (20 color field descriptions updated)
- BeyondTheKitchen.tsx complete rewrite: hover door, ornate French panes, door image reveal with feathered mask, configurable text colors, cream-to-teal gradient, click-to-navigate
- beyondKitchenDoorImage, beyondKitchenHeadingColor, beyondKitchenSubheadingColor fields in homepageSettings
- Portal card image pipeline fixed (artCardImageUrl, shopCardImageUrl props)
- homepageSections ordered array replacing individual section toggles
- index.astro rewritten for dynamic section rendering from Sanity array
- LatestToggle tab colors updated (active: green-deep, inactive: text-md)
- homepageQueries.ts getSectionVisibility rewritten with SectionConfig interface and DEFAULT_SECTIONS
- seed-data.ndjson updated with homepageSections array, TurquazTable name

---

### Session 10: Page-Level CMS Customization

**Status: COMPLETE**

**Goal:** Make every page as CMS-flexible as the homepage. Create page-specific Sanity settings singletons for about, shop, contact, art, and fashion pages. All text, sections, and CTAs should be editable or toggleable from Sanity Studio.

**Prerequisites:** Session 9 complete

**Checklist:**

About Page Settings (`aboutPageSettings` singleton):
- [x] "Let's Connect" section heading (editable text)
- [x] "Let's Connect" subheading/body text (editable text)
- [x] Show/hide "Subscribe" button (boolean toggle)
- [x] Show/hide "Get in Touch" button (boolean toggle)
- [x] "Subscribe" button text (editable, default: "Subscribe")
- [x] "Get in Touch" button text (editable, default: "Get in Touch")
- [x] "Subscribe" button link (url)
- [x] "Get in Touch" button link (url)
- [x] Intro heading text override
- [x] Page-level section ordering or visibility toggles as needed

Shop Page Settings (`shopPageSettings` singleton):
- [x] FTC disclosure text (editable)
- [x] Show/hide FTC disclosure (boolean)
- [x] "Top Picks" section heading (editable)
- [x] Show/hide "Top Picks" section (boolean)
- [x] Category display order (orderable array)
- [x] Local Orders section - enabled/disabled toggle
- [x] Local Orders heading (editable text)
- [x] Local Orders description/body text (editable rich text or text area)
- [x] Local Orders items array (each: name, description, price, optional image)
- [x] Local Orders contact/ordering instructions (editable text)
- [x] Local Orders availability note (e.g., "Available for pickup in [city]")

Contact Page Settings (`contactPageSettings` singleton):
- [x] Page heading (editable)
- [x] Page intro text (editable)
- [x] Show/hide "General Inquiries" section (boolean)
- [x] Show/hide "Press & Collaborations" section (boolean)
- [x] Show/hide "Art Commissions" section (boolean)
- [x] Section headings (editable for each)
- [x] Section descriptions (editable for each)
- [x] Custom additional sections (optional array)

Art Page Settings (`artPageSettings` singleton):
- [x] Gallery page heading (editable)
- [x] Gallery page intro text (editable)
- [x] Show/hide intro text section (boolean)
- [x] Custom callout section (optional, with heading + body + optional image)

Fashion Page Settings (`fashionPageSettings` singleton):
- [x] Gallery page heading (editable)
- [x] Gallery page intro text (editable)
- [x] Show/hide intro text section (boolean)
- [x] Custom callout section (optional)

Studio Organization:
- [x] Add page settings singletons to Sanity sidebar under new "Page Settings" group
- [x] Singleton pattern: fixed IDs, hidden from New Document menu, deletion/duplication prevented
- [x] Update sanity.config.ts structure with new sidebar entries
- [x] Create page-specific query functions in new lib/pageQueries.ts

Frontend Wiring:
- [x] about.astro reads from aboutPageSettings, applies toggles and text overrides
- [x] shop.astro reads from shopPageSettings, renders Local Orders section when enabled
- [x] contact.astro reads from contactPageSettings, applies section toggles
- [x] art/index.astro reads from artPageSettings
- [x] fashion/index.astro reads from fashionPageSettings
- [x] All pages fall back to current hardcoded defaults when settings are empty

Documentation:
- [x] Update cms-guide.md with new page settings sections
- [x] Update seed-data.ndjson with default page settings documents

**Deliverables:** 5 new Sanity singleton schemas, page query helpers, updated page components with CMS-driven text/toggles, Local Orders section on shop page, updated CMS guide, seed data.

---

## 7. Success Criteria

The project is complete when:

1. **Creator independence:** She can add a new recipe, curate the homepage, reorder sections, and manage video content in under 10 minutes without developer help
2. **Performance:** Site loads in under 3 seconds on mobile (3G connection)
3. **SEO:** Recipes appear properly in Google rich results
4. **Content coverage:** Recipes, art, fashion/makeup, blog, and shop sections are functional and styled
5. **Homepage polish:** All sections render correctly, section order is CMS-configurable, tab toggle works, Beyond the Kitchen door animation works on hover
6. **Cost:** Site operates within free tier limits at current traffic levels
7. **Responsiveness:** Site works well on mobile, tablet, and desktop
8. **Accessibility:** Meets WCAG AA minimum standards
9. **Page customization:** All page text, sections, and CTAs are editable or toggleable from Sanity Studio

---

## 8. Open Questions for Client

### Answered

1-10. (Unchanged from prior version)

### Still Open

11. **Logo / name treatment:** Site named TurquazTable. Final logo still pending.
12. **Art sales:** Does she currently sell prints or originals? What platform?
13. **Content migration plan:** With 100-200 existing posts on Instagram, does she want to migrate some/all to the website at launch?
14. **Fashion/makeup content priority:** How much fashion/makeup content does she plan to create?
15. **Local orders:** What city/area for local pickup? What items will she offer? Pricing model?

---

## 8.1 Affiliate Platform Recommendations

(Unchanged from prior version)

---

## 8.2 Newsletter Provider Recommendations

(Unchanged from prior version)

---

## 9. Revision Log

| Date | Changes |
|------|---------|
| 2026-03-09 | Initial requirements document created |
| 2026-03-09 | Design analysis completed - 4 reference sites analyzed |
| 2026-03-09 | Design direction finalized: "Warm Editorial with Smart Utility" |
| 2026-03-09 | Homepage wireframe v3 completed with all sections |
| 2026-03-09 | Updated requirements: Homepage Settings singleton schema, Latest/Videos toggle, Beyond the Kitchen portal, utility bar, affiliate products, recipe filtering fields, cosplay moved to art subsection, nav updated, session checklist expanded |
| 2026-03-09 | Client Q&A captured. Added affiliate platform comparison and newsletter provider recommendations. Marked color palette as provisional. |
| 2026-03-09 | Added analytics section (3.1). PostHog as likely choice. |
| 2026-03-12 | **Session 1 complete.** Project scaffolded. All 9 schemas defined. |
| 2026-03-12 | **Session 2 complete.** Full site shell. Cosplay to Fashion/Makeup migration. |
| 2026-03-28 | **Session 3 complete.** All 8 homepage sections built. |
| 2026-03-28 | **Session 4 complete.** Full recipe system with filtering and schema.org. |
| 2026-03-28 | **Session 5 complete.** All secondary content types. |
| 2026-03-29 | **Session 6 complete.** CMS customization, deployment docs, client guide. |
| 2026-03-29 | **Session 7 complete.** SEO, performance, accessibility, social sharing, analytics prep, polish. |
| 2026-03-30 | **Session 8 complete.** Dark mode, newsletter integration, Jump to Recipe, art image protection, LatestToggle loading bar, print view. |
| 2026-03-30 | **Session 9 complete.** Renamed to TurquazTable. Color palette shifted from forest green to turquoise-green (#2BA89E / #1B5E58). Fixed BTK portal card image pipeline. Added doorway image with feathered mask behind hover-triggered ornate French door. BTK text colors configurable from Sanity (label=copper, heading=accent, subheading=text-md). LatestToggle tab colors fixed (active=green-deep, inactive=text-md). Homepage section reordering via draggable Sanity array replacing individual toggles. About block disabled by default. BTK gradient changed from white-to-teal to cream-to-teal. Door clicks navigate to /about. |
| 2026-03-31 | **Session 10 complete.** Page-level CMS customization. 5 new Sanity singleton schemas (aboutPageSettings, shopPageSettings, contactPageSettings, artPageSettings, fashionPageSettings) with new "Page Settings" sidebar group. New src/lib/pageQueries.ts with typed query functions and fallback defaults. All 5 pages updated to read from their settings singletons. Shop page gains Local Orders section (items, pricing, ordering instructions, availability). Contact page supports custom additional sections. Art and fashion pages gain optional callout sections with images. Updated cms-guide.md with full Page Settings documentation. |
