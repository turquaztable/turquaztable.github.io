import { createClient, type ClientConfig } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// ─── CLIENT CONFIG ───
const config: ClientConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || "2026-03-12",
  // `useCdn: true` for published data (fast, cached)
  // Switch to `false` when implementing preview mode
  useCdn: true,
};

export const sanityClient = createClient(config);

// ─── IMAGE URL BUILDER ───
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── QUERY HELPERS ───

/**
 * Fetch a single document by query.
 */
export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {});
}

// ─── CONTENT QUERIES ───

// Recipes
export const recipeQueries = {
  /** All published recipes, newest first */
  all: `*[_type == "recipe"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    prepTime,
    cookTime,
    servings,
    difficulty,
    categories[]->{ _id, title, slug },
    dietary,
    occasion,
    season,
    tags,
    isFeatured,
    isPopular,
    publishedAt
  }`,

  /** Single recipe by slug — full detail */
  bySlug: `*[_type == "recipe" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    mainImage,
    prepTime,
    cookTime,
    servings,
    difficulty,
    ingredients[] {
      amount,
      unit,
      name,
      notes
    },
    instructions[] {
      stepText,
      image,
      tip
    },
    videoUrl,
    categories[]->{ _id, title, slug },
    dietary,
    occasion,
    season,
    tags,
    tips,
    isFeatured,
    isPopular,
    publishedAt
  }`,

  /** Latest N recipes */
  latest: (count: number) => `*[_type == "recipe"] | order(publishedAt desc) [0...${count}] {
    _id,
    title,
    slug,
    description,
    mainImage,
    prepTime,
    cookTime,
    servings,
    difficulty,
    categories[]->{ _id, title, slug },
    publishedAt
  }`,

  /** Featured recipe (for homepage hero) */
  featured: `*[_type == "recipe" && isFeatured == true] | order(publishedAt desc) [0] {
    _id,
    title,
    slug,
    description,
    mainImage,
    prepTime,
    cookTime,
    servings,
    difficulty,
    categories[]->{ _id, title, slug },
    publishedAt
  }`,

  /** Popular recipes (for homepage Popular Right Now) */
  popular: `*[_type == "recipe" && isPopular == true] | order(publishedAt desc) [0...5] {
    _id,
    title,
    slug,
    description,
    mainImage,
    categories[]->{ _id, title, slug },
    publishedAt
  }`,
};

// Categories
export const categoryQueries = {
  /** All recipe categories with images (for homepage grid) */
  recipeCategories: `*[_type == "category" && contentType == "recipe"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    image
  }`,

  /** All categories */
  all: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    contentType,
    image
  }`,
};

// Art/Painting
export const artQueries = {
  all: `*[_type == "artPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    gallery,
    medium,
    forSale,
    publishedAt
  }`,

  bySlug: `*[_type == "artPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    gallery,
    medium,
    dimensions,
    processVideo,
    forSale,
    price,
    purchaseUrl,
    categories[]->{ _id, title, slug },
    publishedAt
  }`,
};

// Fashion & Makeup
export const fashionQueries = {
  all: `*[_type == "fashionPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    postType,
    description,
    gallery,
    publishedAt
  }`,

  bySlug: `*[_type == "fashionPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    postType,
    description,
    gallery,
    behindTheScenes,
    products,
    videoUrl,
    body,
    categories[]->{ _id, title, slug },
    tags,
    publishedAt
  }`,

  byType: (postType: string) => `*[_type == "fashionPost" && postType == "${postType}"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    postType,
    description,
    gallery,
    publishedAt
  }`,
};

// Blog
export const blogQueries = {
  all: `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    publishedAt
  }`,

  bySlug: `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    mainImage,
    body,
    videoUrl,
    categories[]->{ _id, title, slug },
    publishedAt
  }`,
};

// Affiliate Products
export const shopQueries = {
  all: `*[_type == "affiliateProduct"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    image,
    affiliateUrl,
    category,
    price,
    isFavorite,
    publishedAt
  }`,

  byCategory: (category: string) => `*[_type == "affiliateProduct" && category == "${category}"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    image,
    affiliateUrl,
    price,
    isFavorite,
    publishedAt
  }`,
};

// ─── SINGLETON QUERIES ───

/** Homepage Settings — the creator's curation panel */
export const homepageSettingsQuery = `*[_type == "homepageSettings"][0] {
  featuredRecipe->{ 
    _id, title, slug, description, mainImage,
    prepTime, cookTime, servings, difficulty,
    categories[]->{ _id, title, slug }
  },
  latestSectionMode,
  manualLatestRecipes[]->{ 
    _id, title, slug, description, mainImage,
    prepTime, cookTime, difficulty,
    categories[]->{ _id, title, slug },
    publishedAt
  },
  featuredVideo,
  manualLatestVideos,
  seasonLabel,
  seasonEmoji,
  popularRecipes[]->{ 
    _id, title, slug, description, mainImage,
    categories[]->{ _id, title, slug }
  },
  beyondKitchenArtPost->{ 
    _id, title, slug, description, gallery 
  },
  beyondKitchenShopText,
  socialLinks,
  newsletterCta
}`;

/** Site Settings — global config */
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  siteName,
  siteDescription,
  logo,
  aboutBlock,
  footerTagline,
  defaultOgImage,
  colorBackground,
  colorSurface,
  colorGreenBright,
  colorGreenDeep,
  colorCopper,
  colorText,
  colorTextMd,
  colorTextLight,
  colorCream,
  colorBorder,
  showArtNav,
  showFashionNav,
  showBlogNav,
  showShopNav,
  aboutPageBody,
  aboutPagePhoto,
  newsletterFormAction,
  newsletterFormMethod,
  newsletterHiddenFields,
  darkColorBackground,
  darkColorSurface,
  darkColorGreenBright,
  darkColorGreenDeep,
  darkColorCopper,
  darkColorText,
  darkColorTextMd,
  darkColorTextLight,
  darkColorCream,
  darkColorBorder
}`;
