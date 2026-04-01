import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
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
      rows: 2,
    }),
    defineField({
      name: "contentType",
      title: "Content Type",
      type: "string",
      description: "Which section of the site does this category belong to?",
      options: {
        list: [
          { title: "Recipe", value: "recipe" },
          { title: "Art", value: "art" },
          { title: "Fashion & Makeup", value: "fashion" },
          { title: "Blog", value: "blog" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Used for the homepage category grid. Recommended aspect ratio: 4:3.",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      contentType: "contentType",
      media: "image",
    },
    prepare({ title, contentType, media }) {
      return {
        title,
        subtitle: contentType ? `Type: ${contentType}` : "",
        media,
      };
    },
  },
});
