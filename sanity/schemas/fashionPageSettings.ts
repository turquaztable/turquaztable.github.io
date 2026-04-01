import { defineType, defineField } from "sanity";

/**
 * Fashion Page Settings - Singleton Document
 *
 * Controls the /fashion listing page heading, intro text,
 * and an optional callout section.
 */
export default defineType({
  name: "fashionPageSettings",
  title: "Fashion Page Settings",
  type: "document",
  fieldsets: [
    {
      name: "pageHeader",
      title: "Page Header",
      description:
        "The heading and intro text at the top of the Fashion & Makeup page.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "callout",
      title: "Callout Section",
      description:
        "An optional highlighted section - use for collaboration announcements, style challenges, or any featured message.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // --- Page Header ---
    defineField({
      name: "pageHeading",
      title: "Page Heading",
      type: "string",
      description: 'Default: "Fashion & Makeup"',
      fieldset: "pageHeader",
    }),
    defineField({
      name: "pageIntro",
      title: "Intro Text",
      type: "text",
      rows: 3,
      description:
        "Optional paragraph below the heading. Leave empty to show just the heading.",
      fieldset: "pageHeader",
    }),
    defineField({
      name: "showIntro",
      title: "Show Intro Text",
      type: "boolean",
      description:
        "Toggle the intro text on or off. Default: shown when text exists.",
      initialValue: true,
      fieldset: "pageHeader",
    }),

    // --- Callout Section ---
    defineField({
      name: "showCallout",
      title: "Show Callout Section",
      type: "boolean",
      description:
        "Display the callout section below the gallery. Default: hidden.",
      initialValue: false,
      fieldset: "callout",
    }),
    defineField({
      name: "calloutHeading",
      title: "Callout Heading",
      type: "string",
      fieldset: "callout",
    }),
    defineField({
      name: "calloutBody",
      title: "Callout Body Text",
      type: "text",
      rows: 4,
      fieldset: "callout",
    }),
    defineField({
      name: "calloutImage",
      title: "Callout Image",
      type: "image",
      options: { hotspot: true },
      description: "Optional image for the callout section.",
      fieldset: "callout",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Fashion Page Settings" };
    },
  },
});
