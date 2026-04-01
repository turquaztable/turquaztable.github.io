import { defineType } from "sanity";

/**
 * Portable Text block content — used for recipe tips, blog post bodies,
 * and any other rich text fields throughout the site.
 */
export default defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    {
      type: "block",
      title: "Block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule: any) =>
                  Rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
              },
              {
                title: "Open in new tab",
                name: "blank",
                type: "boolean",
                initialValue: true,
              },
            ],
          },
        ],
      },
    },
    {
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
        },
      ],
    },
  ],
});
