import { defineType, defineField } from "sanity";

export default defineType({
  name: "affiliateProduct",
  title: "Affiliate Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Name",
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
      title: "Why I Recommend It",
      type: "text",
      rows: 3,
      description: "Personal recommendation text — why you love this product.",
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "affiliateUrl",
      title: "Affiliate Link",
      type: "url",
      description: "Amazon Associates or other affiliate link.",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "category",
      title: "Product Category",
      type: "string",
      options: {
        list: [
          { title: "Kitchen Tools", value: "kitchen-tools" },
          { title: "Ingredients", value: "ingredients" },
          { title: "Art Supplies", value: "art-supplies" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "price",
      title: "Price (display)",
      type: "string",
      description: 'Price or price range for display, e.g., "$29.99" or "$15-25".',
    }),
    defineField({
      name: "isFavorite",
      title: "Top Pick",
      type: "boolean",
      description: "Highlight as a personal favorite / must-have.",
      initialValue: false,
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
      media: "image",
      category: "category",
      isFavorite: "isFavorite",
    },
    prepare({ title, media, category, isFavorite }) {
      return {
        title: `${isFavorite ? "⭐ " : ""}${title}`,
        subtitle: category || "",
        media,
      };
    },
  },
});
