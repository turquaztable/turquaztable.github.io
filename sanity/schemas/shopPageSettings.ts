import { defineType, defineField } from "sanity";

/**
 * Shop Page Settings - Singleton Document
 *
 * Controls the /shop page layout: FTC disclosure, Top Picks heading,
 * category display order, and the new Local Orders section.
 */
export default defineType({
  name: "shopPageSettings",
  title: "Shop Page Settings",
  type: "document",
  fieldsets: [
    {
      name: "disclosure",
      title: "FTC Disclosure",
      description: "The affiliate disclosure notice at the top of the page.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "topPicks",
      title: "Top Picks Section",
      description: "The highlighted favorites section.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "categories",
      title: "Category Display",
      description: "Control the order categories appear on the shop page.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "localOrders",
      title: "Local Orders",
      description:
        "A section for local bread, pastry, or other items available for pickup. Separate from affiliate links.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // ─── FTC Disclosure ───
    defineField({
      name: "showDisclosure",
      title: "Show FTC Disclosure",
      type: "boolean",
      description: "Display the affiliate disclosure banner. Default: shown.",
      initialValue: true,
      fieldset: "disclosure",
    }),
    defineField({
      name: "disclosureText",
      title: "Disclosure Text",
      type: "text",
      rows: 3,
      description:
        "The FTC disclosure text. Leave empty for the default message.",
      fieldset: "disclosure",
    }),

    // ─── Top Picks ───
    defineField({
      name: "showTopPicks",
      title: "Show Top Picks Section",
      type: "boolean",
      description:
        'Show the "Top Picks" favorites section at the top. Default: shown.',
      initialValue: true,
      fieldset: "topPicks",
    }),
    defineField({
      name: "topPicksHeading",
      title: "Top Picks Heading",
      type: "string",
      description: 'Override the section heading. Default: "Top Picks"',
      fieldset: "topPicks",
    }),

    // ─── Category Display Order ───
    defineField({
      name: "categoryOrder",
      title: "Category Display Order",
      type: "array",
      description:
        "Drag to reorder how product categories appear on the shop page. Only categories listed here will display; add all categories you want shown.",
      fieldset: "categories",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "categoryKey",
              title: "Category",
              type: "string",
              options: {
                list: [
                  { title: "Kitchen Tools", value: "kitchen-tools" },
                  { title: "Ingredients", value: "ingredients" },
                  { title: "Art Supplies", value: "art-supplies" },
                  { title: "Other Favorites", value: "other" },
                ],
              },
            }),
            defineField({
              name: "label",
              title: "Display Label",
              type: "string",
              description:
                "Override the category heading. Leave empty for default.",
            }),
          ],
          preview: {
            select: { categoryKey: "categoryKey", label: "label" },
            prepare({ categoryKey, label }) {
              const defaults: Record<string, string> = {
                "kitchen-tools": "Kitchen Tools",
                ingredients: "Ingredients",
                "art-supplies": "Art Supplies",
                other: "Other Favorites",
              };
              return {
                title: label || defaults[categoryKey] || categoryKey,
              };
            },
          },
        },
      ],
    }),

    // ─── Local Orders ───
    defineField({
      name: "showLocalOrders",
      title: "Enable Local Orders Section",
      type: "boolean",
      description:
        "Show the local orders section on the shop page. Default: hidden.",
      initialValue: false,
      fieldset: "localOrders",
    }),
    defineField({
      name: "localOrdersHeading",
      title: "Section Heading",
      type: "string",
      description: 'Default: "Local Orders"',
      fieldset: "localOrders",
    }),
    defineField({
      name: "localOrdersDescription",
      title: "Description",
      type: "text",
      rows: 4,
      description:
        "Introductory text explaining what you offer locally and how ordering works.",
      fieldset: "localOrders",
    }),
    defineField({
      name: "localOrdersItems",
      title: "Items Available",
      type: "array",
      fieldset: "localOrders",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Item Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
              description: 'e.g., "$12", "$8-15", "Starting at $20"',
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "price" },
          },
        },
      ],
    }),
    defineField({
      name: "localOrdersContact",
      title: "Ordering Instructions",
      type: "text",
      rows: 3,
      description:
        "How customers should place orders (e.g., DM on Instagram, text a number).",
      fieldset: "localOrders",
    }),
    defineField({
      name: "localOrdersAvailability",
      title: "Availability Note",
      type: "string",
      description:
        'e.g., "Available for pickup in Tallahassee, FL" or "Local delivery within 10 miles"',
      fieldset: "localOrders",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Shop Page Settings" };
    },
  },
});
