import { defineType, defineField } from "sanity";

/**
 * Fashion & Makeup Post
 *
 * Covers fashion looks, makeup tutorials, and style content.
 * Cosplay content can be created here as a subcategory,
 * or as an art post — whichever fits better for the creator.
 */
export default defineType({
  name: "fashionPost",
  title: "Fashion & Makeup",
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
      name: "postType",
      title: "Post Type",
      type: "string",
      options: {
        list: [
          { title: "Fashion / Outfit", value: "fashion" },
          { title: "Makeup Look", value: "makeup" },
          { title: "Cosplay", value: "cosplay" },
          { title: "Hair", value: "hair" },
          { title: "Style Guide", value: "style-guide" },
        ],
        layout: "radio",
      },
      description: "What kind of post is this?",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "gallery",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
          ],
        },
      ],
      description: "Recommended aspect ratio: 3:4 (portrait) for outfit/look shots.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "behindTheScenes",
      title: "Behind the Scenes / Process Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
          ],
        },
      ],
      description: "Process shots, before/after, or work-in-progress photos.",
    }),
    defineField({
      name: "products",
      title: "Products Used",
      type: "array",
      of: [
        {
          type: "object",
          name: "productUsed",
          title: "Product",
          fields: [
            defineField({
              name: "name",
              title: "Product Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "brand",
              title: "Brand",
              type: "string",
            }),
            defineField({
              name: "affiliateUrl",
              title: "Affiliate / Purchase Link",
              type: "url",
            }),
          ],
          preview: {
            select: { name: "name", brand: "brand" },
            prepare({ name, brand }) {
              return {
                title: name,
                subtitle: brand || "",
              };
            },
          },
        },
      ],
      description: "Products, tools, or materials featured in this post.",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "Tutorial or get-ready-with-me video link.",
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "blockContent",
      description: "Optional long-form writeup, tips, or tutorial steps.",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
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
      postType: "postType",
    },
    prepare({ title, media, postType }) {
      const typeLabels: Record<string, string> = {
        fashion: "Fashion",
        makeup: "Makeup",
        cosplay: "Cosplay",
        hair: "Hair",
        "style-guide": "Style Guide",
      };
      return {
        title,
        subtitle: postType ? typeLabels[postType] || postType : "",
        media,
      };
    },
  },
});
