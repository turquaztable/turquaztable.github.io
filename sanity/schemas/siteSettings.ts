import { defineType, defineField } from "sanity";

/**
 * Site Settings - Singleton Document
 *
 * Global configuration organized into fieldsets:
 * 1. Site Identity - name, description, logo, OG image
 * 2. Color Theme - all color design tokens (hex, with defaults)
 * 3. About Section - homepage about block + about page content
 * 4. Navigation - show/hide nav links
 * 5. Integrations - newsletter provider, analytics
 * 6. Footer - tagline
 */
export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fieldsets: [
    {
      name: "identity",
      title: "Site Identity",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "colorTheme",
      title: "Color Theme (Light Mode)",
      description:
        "Customize the site colors for light mode. Leave any field empty to use the default value. Changes take effect after the site rebuilds (1-3 minutes).",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "darkColorTheme",
      title: "Color Theme (Dark Mode)",
      description:
        "Customize the site colors for dark mode. These apply when visitors toggle dark mode on. Leave any field empty to use the default dark values.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "about",
      title: "About Section",
      description:
        "Content for the homepage about block and the full About page.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "navigation",
      title: "Navigation",
      description:
        "Show or hide pages in the site navigation. Hiding a nav link does not delete the page - it just removes it from the menu.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "integrations",
      title: "Integrations",
      description:
        "Connect external services like your newsletter provider. Your developer will fill in these values.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "footer",
      title: "Footer",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // --- SITE IDENTITY ---
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      description: "Used in the navigation, footer, and meta tags.",
      validation: (Rule) => Rule.required(),
      fieldset: "identity",
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 2,
      description: "Default meta description for pages without their own.",
      fieldset: "identity",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description:
        "Optional logo image. If not set, the site name text is used.",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
      fieldset: "identity",
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default Sharing Image",
      type: "image",
      description:
        "Fallback image shown when someone shares a page link on social media. Recommended size: 1200 x 630 pixels.",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
      fieldset: "identity",
    }),

    // --- COLOR THEME ---
    defineField({
      name: "colorBackground",
      title: "Page Background",
      type: "string",
      description:
        "The main page background color. Default: #FAFAF7 (warm off-white).",
      fieldset: "colorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #FAFAF7"),
    }),
    defineField({
      name: "colorSurface",
      title: "Card & Panel Background",
      type: "string",
      description:
        "Background for cards, navigation bar, and elevated panels. Default: #FFFFFF (white).",
      fieldset: "colorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #FFFFFF"),
    }),
    defineField({
      name: "colorGreenBright",
      title: "Primary Accent Color",
      type: "string",
      description:
        "Used for buttons, active states, and accent highlights throughout the site. Default: #2BA89E (turquoise).",
      fieldset: "colorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #2BA89E"),
    }),
    defineField({
      name: "colorGreenDeep",
      title: "Primary Dark Color",
      type: "string",
      description:
        "Used for headings, the navigation bar background, search bar, and the newsletter section. Default: #1B5E58 (deep teal).",
      fieldset: "colorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #1B5E58"),
    }),
    defineField({
      name: "colorCopper",
      title: "Secondary Accent Color",
      type: "string",
      description:
        "Used for badges, featured labels, the subscribe button, and hover accents. Default: #C47A2E (warm copper).",
      fieldset: "colorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #C47A2E"),
    }),
    defineField({
      name: "colorText",
      title: "Main Text Color",
      type: "string",
      description:
        "Primary text color for body text and headings. Default: #1A1A1A (near-black).",
      fieldset: "colorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #1A1A1A"),
    }),
    defineField({
      name: "colorTextMd",
      title: "Secondary Text Color",
      type: "string",
      description:
        "Used for descriptions and navigation links. Default: #4A4A4A (dark gray).",
      fieldset: "colorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #4A4A4A"),
    }),
    defineField({
      name: "colorTextLight",
      title: "Muted Text Color",
      type: "string",
      description:
        "Used for captions, timestamps, and metadata. Default: #8A8A8A (light gray).",
      fieldset: "colorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #8A8A8A"),
    }),
    defineField({
      name: "colorCream",
      title: "Warm Background",
      type: "string",
      description:
        "Used for the about section and hover states. Default: #F5F0E8 (warm cream).",
      fieldset: "colorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #F5F0E8"),
    }),
    defineField({
      name: "colorBorder",
      title: "Divider Color",
      type: "string",
      description:
        "Used for section dividers and card borders. Default: #E5E2DC (light warm gray).",
      fieldset: "colorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #E5E2DC"),
    }),

    // --- DARK MODE COLOR THEME ---
    defineField({
      name: "darkColorBackground",
      title: "Page Background (Dark)",
      type: "string",
      description:
        "Dark mode page background. Default: #101A19 (dark teal).",
      fieldset: "darkColorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #101A19"),
    }),
    defineField({
      name: "darkColorSurface",
      title: "Card & Panel Background (Dark)",
      type: "string",
      description:
        "Dark mode background for cards, navigation bar, and panels. Default: #1A2A28.",
      fieldset: "darkColorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #1A2A28"),
    }),
    defineField({
      name: "darkColorGreenBright",
      title: "Primary Accent Color (Dark)",
      type: "string",
      description:
        "Dark mode accent for buttons, active states, highlights. Default: #4DD8CC (bright turquoise).",
      fieldset: "darkColorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #4DD8CC"),
    }),
    defineField({
      name: "darkColorGreenDeep",
      title: "Primary Dark Color (Dark)",
      type: "string",
      description:
        "Dark mode headings, navigation background, search bar. Default: #3AAA9E (muted teal).",
      fieldset: "darkColorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #3AAA9E"),
    }),
    defineField({
      name: "darkColorCopper",
      title: "Secondary Accent Color (Dark)",
      type: "string",
      description:
        "Dark mode badges, featured labels, subscribe button. Default: #E0974D (warm copper).",
      fieldset: "darkColorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #E0974D"),
    }),
    defineField({
      name: "darkColorText",
      title: "Main Text Color (Dark)",
      type: "string",
      description:
        "Dark mode primary text color. Default: #F5EDE4 (warm off-white).",
      fieldset: "darkColorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #F5EDE4"),
    }),
    defineField({
      name: "darkColorTextMd",
      title: "Secondary Text Color (Dark)",
      type: "string",
      description:
        "Dark mode descriptions and navigation links. Default: #B8A99A.",
      fieldset: "darkColorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #B8A99A"),
    }),
    defineField({
      name: "darkColorTextLight",
      title: "Muted Text Color (Dark)",
      type: "string",
      description:
        "Dark mode captions, timestamps, and metadata. Default: #887868.",
      fieldset: "darkColorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #887868"),
    }),
    defineField({
      name: "darkColorCream",
      title: "Warm Background (Dark)",
      type: "string",
      description:
        "Dark mode about section and hover states. Default: #1A2A28.",
      fieldset: "darkColorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #1A2A28"),
    }),
    defineField({
      name: "darkColorBorder",
      title: "Divider Color (Dark)",
      type: "string",
      description:
        "Dark mode section dividers and card borders. Default: #2A3A38.",
      fieldset: "darkColorTheme",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
          name: "hex color",
        }).warning("Enter a valid hex color like #2A3A38"),
    }),

    // --- ABOUT SECTION ---
    defineField({
      name: "aboutBlock",
      title: "Homepage About Block",
      type: "object",
      description:
        "Content for the about/personality section on the homepage (the small block with your photo and a short intro).",
      fieldset: "about",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          description: 'e.g., "Hi, I\'m [Name]"',
        }),
        defineField({
          name: "body",
          title: "Body Text",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "photo",
          title: "Photo",
          type: "image",
          options: { hotspot: true },
          description: "Square photo recommended.",
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
          ],
        }),
        defineField({
          name: "linkText",
          title: "Link Text",
          type: "string",
          initialValue: "More About Me",
        }),
      ],
    }),
    defineField({
      name: "aboutPageBody",
      title: "About Page - Full Body Text",
      type: "text",
      rows: 10,
      description:
        "The longer body text for the full About page (separate from the short homepage block above). If empty, a default placeholder is shown.",
      fieldset: "about",
    }),
    defineField({
      name: "aboutPagePhoto",
      title: "About Page - Large Photo",
      type: "image",
      options: { hotspot: true },
      description:
        "A larger photo for the full About page. If empty, the homepage about block photo is used instead.",
      fieldset: "about",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),

    // --- NAVIGATION ---
    defineField({
      name: "showArtNav",
      title: "Show Art in Navigation",
      type: "boolean",
      description: "Show or hide the ART link in the main navigation.",
      initialValue: true,
      fieldset: "navigation",
    }),
    defineField({
      name: "showFashionNav",
      title: "Show Fashion in Navigation",
      type: "boolean",
      description:
        "Show or hide a FASHION link in the main navigation. Even if hidden, the fashion pages still exist at /fashion.",
      initialValue: false,
      fieldset: "navigation",
    }),
    defineField({
      name: "showBlogNav",
      title: "Show Blog in Navigation",
      type: "boolean",
      description: "Show or hide the BLOG link in the main navigation.",
      initialValue: true,
      fieldset: "navigation",
    }),
    defineField({
      name: "showShopNav",
      title: "Show Shop in Navigation",
      type: "boolean",
      description: "Show or hide the SHOP link in the main navigation.",
      initialValue: true,
      fieldset: "navigation",
    }),

    // --- INTEGRATIONS ---
    defineField({
      name: "newsletterFormAction",
      title: "Newsletter Form Action URL",
      type: "url",
      description:
        'The form endpoint from your newsletter provider. For Kit (ConvertKit): your form URL from the embed code. For MailerLite: your subscriber form URL. Leave empty to use a placeholder form.',
      fieldset: "integrations",
    }),
    defineField({
      name: "newsletterFormMethod",
      title: "Newsletter Form Method",
      type: "string",
      description:
        "The HTTP method for the newsletter form. Most providers use POST.",
      options: {
        list: [
          { title: "POST (recommended)", value: "POST" },
          { title: "GET", value: "GET" },
        ],
        layout: "radio",
      },
      initialValue: "POST",
      fieldset: "integrations",
    }),
    defineField({
      name: "newsletterHiddenFields",
      title: "Newsletter Hidden Fields",
      type: "array",
      of: [
        {
          type: "object",
          name: "hiddenField",
          title: "Hidden Field",
          fields: [
            defineField({
              name: "fieldName",
              title: "Field Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "fieldValue",
              title: "Field Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { name: "fieldName", value: "fieldValue" },
            prepare({ name, value }) {
              return { title: `${name} = ${value}` };
            },
          },
        },
      ],
      description:
        'Optional hidden form fields required by some newsletter providers. Your developer will set these up. For example, Kit needs a hidden "tags[]" field.',
      fieldset: "integrations",
    }),

    // --- FOOTER ---
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "string",
      description:
        'Short tagline under the logo in the footer, e.g., "Baking, art, and everything in between."',
      fieldset: "footer",
    }),
  ],
  preview: {
    select: { title: "siteName" },
    prepare({ title }) {
      return { title: title || "Site Settings" };
    },
  },
});
