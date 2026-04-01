import { defineType, defineField } from "sanity";

export default defineType({
  name: "recipe",
  title: "Recipe",
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
      description: "150-200 characters. Used for SEO meta description and card previews.",
      validation: (Rule) => Rule.required().min(100).max(250),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      description: "Recommended aspect ratio: 4:3. This is the hero image on the recipe page and card thumbnail.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the image for accessibility and SEO.",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "prepTime",
      title: "Prep Time (minutes)",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "cookTime",
      title: "Cook Time (minutes)",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "servings",
      title: "Servings",
      type: "number",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: {
        list: [
          { title: "Easy", value: "easy" },
          { title: "Medium", value: "medium" },
          { title: "Hard", value: "hard" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [
        {
          type: "object",
          name: "ingredient",
          title: "Ingredient",
          fields: [
            defineField({
              name: "amount",
              title: "Amount",
              type: "string",
              description: 'e.g., "2", "1/2", "1-2"',
            }),
            defineField({
              name: "unit",
              title: "Unit",
              type: "string",
              description: 'e.g., "cups", "tsp", "large"',
            }),
            defineField({
              name: "name",
              title: "Ingredient Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "notes",
              title: "Notes",
              type: "string",
              description: 'e.g., "room temperature", "finely chopped"',
            }),
          ],
          preview: {
            select: { amount: "amount", unit: "unit", name: "name" },
            prepare({ amount, unit, name }) {
              return {
                title: `${amount || ""} ${unit || ""} ${name || ""}`.trim(),
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "instructions",
      title: "Instructions",
      type: "array",
      of: [
        {
          type: "object",
          name: "step",
          title: "Step",
          fields: [
            defineField({
              name: "stepText",
              title: "Step Text",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Step Image (optional)",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                }),
              ],
            }),
            defineField({
              name: "tip",
              title: "Tip (optional)",
              type: "string",
              description: "A helpful note or variation for this step.",
            }),
          ],
          preview: {
            select: { stepText: "stepText" },
            prepare({ stepText }) {
              return {
                title: stepText ? stepText.substring(0, 80) + "..." : "Empty step",
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube, TikTok, or Instagram video URL.",
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
      description: "Freeform tags for additional filtering.",
    }),
    defineField({
      name: "dietary",
      title: "Dietary Info",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Dairy-Free", value: "dairy-free" },
          { title: "Egg-Free", value: "egg-free" },
          { title: "Gluten-Free", value: "gluten-free" },
          { title: "Nut-Free", value: "nut-free" },
          { title: "Vegan", value: "vegan" },
          { title: "Vegetarian", value: "vegetarian" },
        ],
      },
    }),
    defineField({
      name: "occasion",
      title: "Occasion",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Birthday", value: "birthday" },
          { title: "Christmas", value: "christmas" },
          { title: "Easter", value: "easter" },
          { title: "Halloween", value: "halloween" },
          { title: "Thanksgiving", value: "thanksgiving" },
          { title: "Valentine's Day", value: "valentines" },
          { title: "Mother's Day", value: "mothers-day" },
          { title: "Dinner Party", value: "dinner-party" },
        ],
      },
    }),
    defineField({
      name: "season",
      title: "Season",
      type: "string",
      options: {
        list: [
          { title: "Spring", value: "spring" },
          { title: "Summer", value: "summer" },
          { title: "Fall", value: "fall" },
          { title: "Winter", value: "winter" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "tips",
      title: "Tips & Variations",
      type: "blockContent",
      description: "Additional tips, variations, and notes at the bottom of the recipe.",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Recipe",
      type: "boolean",
      description: "Flag this as the featured homepage recipe (only one should be active).",
      initialValue: false,
    }),
    defineField({
      name: "isPopular",
      title: "Popular Recipe",
      type: "boolean",
      description: 'Flag for the "Popular Right Now" homepage section.',
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
  orderings: [
    {
      title: "Published Date, Newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      difficulty: "difficulty",
    },
    prepare({ title, media, difficulty }) {
      return {
        title,
        subtitle: difficulty ? `Difficulty: ${difficulty}` : "",
        media,
      };
    },
  },
});
