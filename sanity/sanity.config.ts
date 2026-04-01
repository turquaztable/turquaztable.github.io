import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

// Singleton document IDs - one instance only
const SINGLETONS = new Set([
  "homepageSettings",
  "siteSettings",
  "aboutPageSettings",
  "shopPageSettings",
  "contactPageSettings",
  "artPageSettings",
  "fashionPageSettings",
]);

export default defineConfig({
  name: "turquaz-table",
  title: "TurquazTable",
  projectId: "88s7u2ut",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Dashboard")
          .items([
            // --- Content group ---
            S.listItem()
              .title("Content")
              .child(
                S.list()
                  .title("Content")
                  .items([
                    S.listItem()
                      .title("Recipes")
                      .schemaType("recipe")
                      .child(S.documentTypeList("recipe").title("Recipes")),

                    S.listItem()
                      .title("Art & Painting")
                      .schemaType("artPost")
                      .child(S.documentTypeList("artPost").title("Art & Painting")),

                    S.listItem()
                      .title("Fashion & Makeup")
                      .schemaType("fashionPost")
                      .child(
                        S.documentTypeList("fashionPost").title("Fashion & Makeup")
                      ),

                    S.listItem()
                      .title("Blog Posts")
                      .schemaType("blogPost")
                      .child(S.documentTypeList("blogPost").title("Blog Posts")),

                    S.listItem()
                      .title("Affiliate Products")
                      .schemaType("affiliateProduct")
                      .child(
                        S.documentTypeList("affiliateProduct").title(
                          "Affiliate Products"
                        )
                      ),

                    S.listItem()
                      .title("Categories")
                      .schemaType("category")
                      .child(S.documentTypeList("category").title("Categories")),
                  ])
              ),

            S.divider(),

            // --- Site Management group ---
            S.listItem()
              .title("Site Management")
              .child(
                S.list()
                  .title("Site Management")
                  .items([
                    S.listItem()
                      .title("Homepage Settings")
                      .id("homepageSettings")
                      .child(
                        S.document()
                          .schemaType("homepageSettings")
                          .documentId("homepageSettings")
                          .title("Homepage Settings")
                      ),

                    S.listItem()
                      .title("Site Settings")
                      .id("siteSettings")
                      .child(
                        S.document()
                          .schemaType("siteSettings")
                          .documentId("siteSettings")
                          .title("Site Settings")
                      ),
                  ])
              ),

            S.divider(),

            // --- Page Settings group ---
            S.listItem()
              .title("Page Settings")
              .child(
                S.list()
                  .title("Page Settings")
                  .items([
                    S.listItem()
                      .title("About Page")
                      .id("aboutPageSettings")
                      .child(
                        S.document()
                          .schemaType("aboutPageSettings")
                          .documentId("aboutPageSettings")
                          .title("About Page Settings")
                      ),

                    S.listItem()
                      .title("Shop Page")
                      .id("shopPageSettings")
                      .child(
                        S.document()
                          .schemaType("shopPageSettings")
                          .documentId("shopPageSettings")
                          .title("Shop Page Settings")
                      ),

                    S.listItem()
                      .title("Contact Page")
                      .id("contactPageSettings")
                      .child(
                        S.document()
                          .schemaType("contactPageSettings")
                          .documentId("contactPageSettings")
                          .title("Contact Page Settings")
                      ),

                    S.listItem()
                      .title("Art Page")
                      .id("artPageSettings")
                      .child(
                        S.document()
                          .schemaType("artPageSettings")
                          .documentId("artPageSettings")
                          .title("Art Page Settings")
                      ),

                    S.listItem()
                      .title("Fashion Page")
                      .id("fashionPageSettings")
                      .child(
                        S.document()
                          .schemaType("fashionPageSettings")
                          .documentId("fashionPageSettings")
                          .title("Fashion Page Settings")
                      ),
                  ])
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    // Prevent creating new documents for singleton types
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETONS.has(schemaType)),
  },

  document: {
    // Prevent deleting or duplicating singletons
    actions: (input, context) => {
      if (SINGLETONS.has(context.schemaType)) {
        return input.filter(
          ({ action }) =>
            action && !["unpublish", "delete", "duplicate"].includes(action)
        );
      }
      return input;
    },
  },
});
