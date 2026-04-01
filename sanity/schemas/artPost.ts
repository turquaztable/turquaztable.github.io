import { defineType, defineField } from "sanity";

export default defineType({
  name: "artPost",
  title: "Art / Painting",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
      ],
      description: "Recommended aspect ratio: 1:1 (square).",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
      description: 'e.g., "Oil on canvas", "Watercolor on paper"',
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      description: 'e.g., "24x36 inches"',
    }),
    defineField({
      name: "processVideo",
      title: "Process Video URL",
      type: "url",
      description: "Timelapse or process video link.",
    }),
    defineField({
      name: "forSale",
      title: "Available for Sale",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      description: "Display price if available for sale.",
      hidden: ({ parent }) => !parent?.forSale,
    }),
    defineField({
      name: "purchaseUrl",
      title: "Purchase URL",
      type: "url",
      description: "Link to Etsy, shop, or contact form.",
      hidden: ({ parent }) => !parent?.forSale,
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "gallery.0",
      medium: "medium",
    },
    prepare({ title, media, medium }) {
      return {
        title,
        subtitle: medium || "",
        media,
      };
    },
  },
});
