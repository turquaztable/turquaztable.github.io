/**
 * RSS Feed (/rss.xml)
 *
 * Generates an RSS feed of recipes and blog posts.
 * Uses @astrojs/rss for spec-compliant RSS 2.0 output.
 */
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { sanityClient } from "@lib/sanity";
import { imageUrl } from "@lib/image";

export async function GET(context: APIContext) {
  // Fetch site name
  const siteSettings = await sanityClient.fetch(
    `*[_type == "siteSettings"][0] { siteName, siteDescription }`
  );

  const siteName = siteSettings?.siteName || "TurquazTable";
  const siteDescription =
    siteSettings?.siteDescription || "Recipes, art, and everything in between.";

  // Fetch latest recipes and blog posts for the feed
  const [recipes, blogPosts] = await Promise.all([
    sanityClient.fetch(`
      *[_type == "recipe"] | order(publishedAt desc) [0...50] {
        title,
        slug,
        description,
        mainImage,
        publishedAt,
        categories[]->{ title }
      }
    `),
    sanityClient.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) [0...20] {
        title,
        slug,
        description,
        mainImage,
        publishedAt,
        categories[]->{ title }
      }
    `),
  ]);

  // Combine and sort by date
  const items = [
    ...(recipes || []).map((recipe: any) => ({
      title: recipe.title,
      link: `/recipes/${recipe.slug?.current}/`,
      description: recipe.description || "",
      pubDate: recipe.publishedAt ? new Date(recipe.publishedAt) : new Date(),
      categories: (recipe.categories || []).map((c: any) => c.title),
    })),
    ...(blogPosts || []).map((post: any) => ({
      title: post.title,
      link: `/blog/${post.slug?.current}/`,
      description: post.description || "",
      pubDate: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      categories: (post.categories || []).map((c: any) => c.title),
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: siteName,
    description: siteDescription,
    site: context.site || "https://example.com",
    items,
    customData: `<language>en-us</language>`,
  });
}
