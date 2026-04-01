import { defineType, defineField } from "sanity";

/**
 * Homepage Settings - Singleton Document
 *
 * The creator's curation panel. She uses this to control
 * every dynamic section of the homepage without developer involvement.
 *
 * Fieldsets:
 * 1. Featured Content - featured recipe, popular recipes
 * 2. The Latest Section - mode toggle, manual picks
 * 3. Video Section - featured video, video list
 * 4. Beyond the Kitchen - portal text, images, CTAs
 * 5. Search Bar - heading, placeholder, button text
 * 6. Newsletter - heading, subheading, button text, CTA
 * 7. Section Visibility - show/hide toggles for each homepage section
 * 8. Social Links - social media profile links
 * 9. Season / Branding - seasonal label and emoji
 */
export default defineType({
  name: "homepageSettings",
  title: "Homepage Settings",
  type: "document",
  fieldsets: [
    {
      name: "featuredContent",
      title: "Featured Content",
      description: "Choose which recipes appear in the hero and popular sections.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "latestSection",
      title: "The Latest Section",
      description: "Control what appears in the Latest recipes tab.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "videoSection",
      title: "Video Section",
      description: "Manage the Watch the Latest video tab.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "beyondKitchen",
      title: "Beyond the Kitchen",
      description: "Content for the portal section that links to Art and Shop pages.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "searchBar",
      title: "Search Bar",
      description: "Customize the text in the search bar section.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "newsletter",
      title: "Newsletter",
      description: "Customize newsletter section text and the utility bar CTA.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "sectionVisibility",
      title: "Homepage Section Order",
      description: "Drag to reorder sections. Toggle each section on or off. Hiding a section does not delete its content.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "socialLinks",
      title: "Social Links",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "seasonBranding",
      title: "Season / Branding",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // ─── FEATURED CONTENT ───
    defineField({
      name: "featuredRecipe",
      title: "Featured Recipe",
      type: "reference",
      to: [{ type: "recipe" }],
      description: "The recipe shown in the large hero section at the top of the homepage.",
      validation: (Rule) => Rule.required(),
      fieldset: "featuredContent",
    }),
    defineField({
      name: "popularRecipes",
      title: "Popular Recipes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "recipe" }] }],
      description: 'Hand-pick up to 5 recipes for the "Popular Right Now" section.',
      validation: (Rule) => Rule.max(5),
      fieldset: "featuredContent",
    }),

    // ─── THE LATEST SECTION ───
    defineField({
      name: "latestSectionMode",
      title: "Latest Section Mode",
      type: "string",
      options: {
        list: [
          { title: "Auto (newest by date)", value: "auto" },
          { title: "Manual (hand-picked)", value: "manual" },
        ],
        layout: "radio",
      },
      description:
        "Auto shows the 8 most recent recipes. Manual lets you choose specific recipes.",
      initialValue: "auto",
      fieldset: "latestSection",
    }),
    defineField({
      name: "manualLatestRecipes",
      title: "Manual Latest Recipes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "recipe" }] }],
      description: 'Pick recipes to show in "The Latest" when in manual mode. Select up to 8.',
      hidden: ({ parent }) => parent?.latestSectionMode !== "manual",
      validation: (Rule) => Rule.max(8),
      fieldset: "latestSection",
    }),

    // ─── VIDEO SECTION ───
    defineField({
      name: "featuredVideo",
      title: "Featured Video",
      type: "object",
      description: 'The large featured video in the "Watch the Latest" tab.',
      fieldset: "videoSection",
      fields: [
        defineField({
          name: "videoUrl",
          title: "Video URL",
          type: "url",
        }),
        defineField({
          name: "title",
          title: "Video Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "platform",
          title: "Platform",
          type: "string",
          options: {
            list: [
              { title: "Instagram", value: "instagram" },
              { title: "TikTok", value: "tiktok" },
              { title: "YouTube", value: "youtube" },
            ],
          },
        }),
        defineField({
          name: "duration",
          title: "Duration",
          type: "string",
          description: 'e.g., "14:32", "0:58"',
        }),
      ],
    }),
    defineField({
      name: "manualLatestVideos",
      title: "Latest Videos",
      type: "array",
      of: [
        {
          type: "object",
          name: "videoEntry",
          title: "Video",
          fields: [
            defineField({
              name: "videoUrl",
              title: "Video URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "YouTube", value: "youtube" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "duration",
              title: "Duration",
              type: "string",
              description: 'e.g., "14:32", "0:58"',
            }),
          ],
          preview: {
            select: { title: "title", platform: "platform", duration: "duration" },
            prepare({ title, platform, duration }) {
              return {
                title,
                subtitle: [platform, duration].filter(Boolean).join(" - "),
              };
            },
          },
        },
      ],
      description: 'Videos for the "Watch the Latest" tab. First video is the featured (large) card.',
      fieldset: "videoSection",
    }),

    // ─── BEYOND THE KITCHEN ───
    defineField({
      name: "beyondKitchenLabel",
      title: "Section Label",
      type: "string",
      description: 'Small uppercase label above the heading. Default: "Beyond the Kitchen".',
      fieldset: "beyondKitchen",
    }),
    defineField({
      name: "beyondKitchenHeading",
      title: "Heading",
      type: "string",
      description: 'Main heading. Default: "Step Through & See What Else I Create".',
      fieldset: "beyondKitchen",
    }),
    defineField({
      name: "beyondKitchenSubheading",
      title: "Subheading",
      type: "text",
      rows: 2,
      description: 'Supporting text below the heading. Default: "The kitchen is my happy place - but it\'s not my only one. Come explore my other creative passions."',
      fieldset: "beyondKitchen",
    }),
    defineField({
      name: "beyondKitchenHeadingColor",
      title: "Heading Text Color",
      type: "string",
      description: "Color for the main heading text in this section. Default: uses the Primary Accent Color (turquoise). Enter a hex code to override.",
      fieldset: "beyondKitchen",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #FFFFFF"),
    }),
    defineField({
      name: "beyondKitchenSubheadingColor",
      title: "Subheading Text Color",
      type: "string",
      description: "Color for the subheading text in this section. Default: uses the Secondary Text Color (dark gray). Enter a hex code to override.",
      fieldset: "beyondKitchen",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #D0E0D8"),
    }),
    defineField({
      name: "beyondKitchenDoorImage",
      title: "Doorway Image",
      type: "image",
      options: { hotspot: true },
      description: "The image revealed behind the door when it swings open. This creates the feeling of peering through a doorway into another creative space. Portrait orientation works best (3:4 or taller). If empty, a soft glow effect is shown instead.",
      fieldset: "beyondKitchen",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "beyondKitchenArtPost",
      title: "Art Portal Card - Featured Post",
      type: "reference",
      to: [{ type: "artPost" }],
      description: "The art post featured in the Art portal card. Its title and description are shown on the card.",
      fieldset: "beyondKitchen",
    }),
    defineField({
      name: "beyondKitchenArtCardImage",
      title: "Art Portal Card - Custom Image",
      type: "image",
      options: { hotspot: true },
      description: "Optional custom image for the Art portal card. If empty, a gradient placeholder is shown.",
      fieldset: "beyondKitchen",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "beyondKitchenArtCtaText",
      title: "Art Portal Card - Button Text",
      type: "string",
      description: 'Default: "Explore My Art".',
      fieldset: "beyondKitchen",
    }),
    defineField({
      name: "beyondKitchenShopText",
      title: "Shop Portal Card - Text",
      type: "object",
      description: "Content for the shop portal card.",
      fieldset: "beyondKitchen",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          initialValue: "Tools & Ingredients I Swear By",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 2,
          initialValue:
            "Everything I use in my kitchen, studio, and workshop - curated picks I genuinely love.",
        }),
        defineField({
          name: "ctaText",
          title: "Button Text",
          type: "string",
          initialValue: "Shop My Favorites",
        }),
      ],
    }),
    defineField({
      name: "beyondKitchenShopCardImage",
      title: "Shop Portal Card - Custom Image",
      type: "image",
      options: { hotspot: true },
      description: "Optional custom image for the Shop portal card. If empty, a gradient placeholder is shown.",
      fieldset: "beyondKitchen",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),

    // ─── SEARCH BAR ───
    defineField({
      name: "searchBandHeading",
      title: "Heading",
      type: "string",
      description: 'Default: "What would you like to make today?"',
      fieldset: "searchBar",
    }),
    defineField({
      name: "searchBandPlaceholder",
      title: "Search Placeholder",
      type: "string",
      description: 'Default: "Search recipes..."',
      fieldset: "searchBar",
    }),
    defineField({
      name: "searchBandButtonText",
      title: "Button Text",
      type: "string",
      description: 'Default: "Browse All Recipes"',
      fieldset: "searchBar",
    }),

    // ─── NEWSLETTER ───
    defineField({
      name: "newsletterCta",
      title: "Utility Bar CTA Text",
      type: "string",
      description: 'Text shown in the top bar. Default: "Sign up for free weekly recipes!"',
      initialValue: "Sign up for free weekly recipes!",
      fieldset: "newsletter",
    }),
    defineField({
      name: "newsletterHeading",
      title: "Section Heading",
      type: "string",
      description: 'Default: "Recipes in Your Inbox"',
      fieldset: "newsletter",
    }),
    defineField({
      name: "newsletterSubheading",
      title: "Section Subheading",
      type: "text",
      rows: 2,
      description: 'Default: "New recipes, baking tips, and behind-the-scenes updates. No spam."',
      fieldset: "newsletter",
    }),
    defineField({
      name: "newsletterButtonText",
      title: "Subscribe Button Text",
      type: "string",
      description: 'Default: "Subscribe"',
      fieldset: "newsletter",
    }),
    defineField({
      name: "newsletterPlaceholder",
      title: "Email Placeholder",
      type: "string",
      description: 'Default: "your@email.com"',
      fieldset: "newsletter",
    }),

    // ─── SECTION ORDERING ───
    defineField({
      name: "showUtilityBar",
      title: "Show Utility Bar",
      type: "boolean",
      description: "The dark teal bar at the very top of the page with newsletter CTA and social icons.",
      initialValue: true,
      fieldset: "sectionVisibility",
    }),
    defineField({
      name: "showNewsletterCta",
      title: "Show Newsletter CTA in Utility Bar",
      type: "boolean",
      description: "Show or hide just the newsletter text in the utility bar. Social icons remain visible.",
      initialValue: true,
      fieldset: "sectionVisibility",
    }),
    defineField({
      name: "homepageSections",
      title: "Homepage Sections",
      type: "array",
      description: "Drag to reorder. Toggle each section on or off with the Enabled switch.",
      fieldset: "sectionVisibility",
      of: [
        {
          type: "object",
          name: "homepageSection",
          fields: [
            defineField({
              name: "sectionKey",
              title: "Section",
              type: "string",
              options: {
                list: [
                  { title: "Browse by Category", value: "categoryGrid" },
                  { title: "Featured Recipe", value: "featuredRecipe" },
                  { title: "Search Bar", value: "searchBand" },
                  { title: "The Latest / Watch the Latest", value: "latestToggle" },
                  { title: "Popular Right Now", value: "popularRecipes" },
                  { title: "About Block", value: "aboutBlock" },
                  { title: "Beyond the Kitchen", value: "beyondTheKitchen" },
                  { title: "Newsletter Signup", value: "newsletterSection" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "enabled",
              title: "Enabled",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: { key: "sectionKey", enabled: "enabled" },
            prepare({ key, enabled }) {
              const labels: Record<string, string> = {
                categoryGrid: "Browse by Category",
                featuredRecipe: "Featured Recipe",
                searchBand: "Search Bar",
                latestToggle: "The Latest / Watch the Latest",
                popularRecipes: "Popular Right Now",
                aboutBlock: "About Block",
                beyondTheKitchen: "Beyond the Kitchen",
                newsletterSection: "Newsletter Signup",
              };
              return {
                title: labels[key] || key,
                subtitle: enabled === false ? "Hidden" : "Visible",
              };
            },
          },
        },
      ],
    }),

    // ─── SOCIAL LINKS ───
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          title: "Social Link",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "Pinterest", value: "pinterest" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Twitter / X", value: "twitter" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Profile URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { platform: "platform", url: "url" },
            prepare({ platform, url }) {
              return { title: platform, subtitle: url };
            },
          },
        },
      ],
      fieldset: "socialLinks",
    }),

    // ─── SEASON / BRANDING ───
    defineField({
      name: "seasonLabel",
      title: "Season Label",
      type: "string",
      description: 'Optional seasonal label, e.g., "Spring 2026", "Holiday Baking".',
      fieldset: "seasonBranding",
    }),
    defineField({
      name: "seasonEmoji",
      title: "Season Emoji",
      type: "string",
      description: 'Decorative emoji for the season. Used in code only.',
      fieldset: "seasonBranding",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage Settings" };
    },
  },
});
