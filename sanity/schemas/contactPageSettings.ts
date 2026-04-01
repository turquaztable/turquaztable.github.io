import { defineType, defineField } from "sanity";

/**
 * Contact Page Settings - Singleton Document
 *
 * Controls the /contact page heading, intro, section visibility,
 * and editable text for each contact topic.
 */
export default defineType({
  name: "contactPageSettings",
  title: "Contact Page Settings",
  type: "document",
  fieldsets: [
    {
      name: "pageHeader",
      title: "Page Header",
      description: "The heading and intro text at the top of the contact page.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "general",
      title: "General Inquiries",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "press",
      title: "Press & Collaborations",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "artCommissions",
      title: "Art Commissions",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "customSections",
      title: "Additional Sections",
      description: "Add custom contact sections beyond the three defaults.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // ─── Page Header ───
    defineField({
      name: "pageHeading",
      title: "Page Heading",
      type: "string",
      description: 'Default: "Let\'s Connect"',
      fieldset: "pageHeader",
    }),
    defineField({
      name: "pageIntro",
      title: "Page Intro Text",
      type: "text",
      rows: 3,
      description:
        "The paragraph below the heading. Leave empty for the default text.",
      fieldset: "pageHeader",
    }),

    // ─── General Inquiries ───
    defineField({
      name: "showGeneral",
      title: "Show General Inquiries Section",
      type: "boolean",
      initialValue: true,
      fieldset: "general",
    }),
    defineField({
      name: "generalHeading",
      title: "Section Heading",
      type: "string",
      description: 'Default: "General Inquiries"',
      fieldset: "general",
    }),
    defineField({
      name: "generalDescription",
      title: "Section Description",
      type: "text",
      rows: 3,
      description: "The description text for this section.",
      fieldset: "general",
    }),

    // ─── Press & Collaborations ───
    defineField({
      name: "showPress",
      title: "Show Press & Collaborations Section",
      type: "boolean",
      initialValue: true,
      fieldset: "press",
    }),
    defineField({
      name: "pressHeading",
      title: "Section Heading",
      type: "string",
      description: 'Default: "Press & Collaborations"',
      fieldset: "press",
    }),
    defineField({
      name: "pressDescription",
      title: "Section Description",
      type: "text",
      rows: 3,
      fieldset: "press",
    }),

    // ─── Art Commissions ───
    defineField({
      name: "showArtCommissions",
      title: "Show Art Commissions Section",
      type: "boolean",
      initialValue: true,
      fieldset: "artCommissions",
    }),
    defineField({
      name: "artCommissionsHeading",
      title: "Section Heading",
      type: "string",
      description: 'Default: "Art Commissions"',
      fieldset: "artCommissions",
    }),
    defineField({
      name: "artCommissionsDescription",
      title: "Section Description",
      type: "text",
      rows: 3,
      fieldset: "artCommissions",
    }),

    // ─── Custom Additional Sections ───
    defineField({
      name: "customSections",
      title: "Custom Sections",
      type: "array",
      description:
        "Add extra contact topic sections. These appear after the built-in sections.",
      fieldset: "customSections",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "heading",
              title: "Section Heading",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Section Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: { title: "heading" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page Settings" };
    },
  },
});
