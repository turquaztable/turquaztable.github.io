import { defineType, defineField } from "sanity";

/**
 * About Page Settings - Singleton Document
 *
 * Controls the /about page layout and text.
 * Editable heading, intro text, "Let's Connect" section,
 * and button visibility/text overrides.
 */
export default defineType({
  name: "aboutPageSettings",
  title: "About Page Settings",
  type: "document",
  fieldsets: [
    {
      name: "intro",
      title: "Page Intro",
      description: "Override the default heading on the About page.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "connect",
      title: "Let's Connect Section",
      description: "The call-to-action area below the bio text.",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    // ─── Page Intro ───
    defineField({
      name: "introHeading",
      title: "Intro Heading",
      type: "string",
      description:
        'Override the heading text at the top of the About page. Leave empty to use "Hi, I\'m [Site Name]" from Site Settings.',
      fieldset: "intro",
    }),

    // ─── Let's Connect ───
    defineField({
      name: "connectHeading",
      title: "Section Heading",
      type: "string",
      description: 'Default: "Let\'s Connect"',
      fieldset: "connect",
    }),
    defineField({
      name: "connectBody",
      title: "Section Body Text",
      type: "text",
      rows: 3,
      description:
        "The paragraph below the heading. Leave empty for the default text.",
      fieldset: "connect",
    }),
    defineField({
      name: "showGetInTouchButton",
      title: 'Show "Get in Touch" Button',
      type: "boolean",
      description: "Show the button linking to the Contact page. Default: shown.",
      initialValue: true,
      fieldset: "connect",
    }),
    defineField({
      name: "getInTouchText",
      title: '"Get in Touch" Button Text',
      type: "string",
      description: 'Override the button label. Default: "Get in Touch"',
      fieldset: "connect",
    }),
    defineField({
      name: "getInTouchLink",
      title: '"Get in Touch" Button Link',
      type: "url",
      description: "Override the button URL. Default: /contact",
      validation: (Rule) =>
        Rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
      fieldset: "connect",
    }),
    defineField({
      name: "showSubscribeButton",
      title: 'Show "Subscribe" Button',
      type: "boolean",
      description:
        "Show the button linking to the newsletter section. Default: shown.",
      initialValue: true,
      fieldset: "connect",
    }),
    defineField({
      name: "subscribeText",
      title: '"Subscribe" Button Text',
      type: "string",
      description: 'Override the button label. Default: "Subscribe"',
      fieldset: "connect",
    }),
    defineField({
      name: "subscribeLink",
      title: '"Subscribe" Button Link',
      type: "url",
      description: "Override the button URL. Default: /#newsletter",
      validation: (Rule) =>
        Rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
      fieldset: "connect",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page Settings" };
    },
  },
});
