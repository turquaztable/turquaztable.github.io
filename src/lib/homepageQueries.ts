/**
 * Homepage-specific GROQ queries
 * These dereference and shape data from homepageSettings + siteSettings
 * for each homepage section component.
 */
import { sanityClient } from "./sanity";

// ─── CATEGORY GRID ───
export async function getRecipeCategoriesWithImages() {
  return sanityClient.fetch(`
    *[_type == "category" && contentType == "recipe" && defined(image)] | order(title asc) {
      _id,
      title,
      slug,
      image,
      description
    }
  `);
}

// ─── FEATURED RECIPE ───
export async function getFeaturedRecipe() {
  const result = await sanityClient.fetch(`
    *[_id == "homepageSettings"][0] {
      featuredRecipe-> {
        _id,
        title,
        slug,
        description,
        mainImage,
        prepTime,
        cookTime,
        servings,
        difficulty
      }
    }
  `);
  return result?.featuredRecipe || null;
}

// ─── LATEST RECIPES ───
export async function getLatestRecipes() {
  const settings = await sanityClient.fetch(`
    *[_id == "homepageSettings"][0] {
      latestSectionMode,
      manualLatestRecipes[]-> {
        _id,
        title,
        slug,
        description,
        mainImage,
        prepTime,
        cookTime,
        servings,
        difficulty,
        categories[]-> { title, slug },
        publishedAt
      }
    }
  `);

  if (
    settings?.latestSectionMode === "manual" &&
    settings?.manualLatestRecipes?.length
  ) {
    return settings.manualLatestRecipes;
  }

  return sanityClient.fetch(`
    *[_type == "recipe"] | order(publishedAt desc) [0...8] {
      _id,
      title,
      slug,
      description,
      mainImage,
      prepTime,
      cookTime,
      servings,
      difficulty,
      categories[]-> { title, slug },
      publishedAt
    }
  `);
}

// ─── LATEST VIDEOS ───
export async function getLatestVideos() {
  const settings = await sanityClient.fetch(`
    *[_id == "homepageSettings"][0] {
      featuredVideo {
        videoUrl,
        title,
        description,
        platform,
        duration
      },
      manualLatestVideos[] {
        videoUrl,
        title,
        platform,
        duration
      }
    }
  `);

  const videos: any[] = [];
  if (settings?.featuredVideo) {
    videos.push({ ...settings.featuredVideo, isFeatured: true });
  }
  if (settings?.manualLatestVideos?.length) {
    videos.push(...settings.manualLatestVideos);
  }
  return videos;
}

// ─── POPULAR RECIPES ───
export async function getPopularRecipes() {
  const result = await sanityClient.fetch(`
    *[_id == "homepageSettings"][0] {
      popularRecipes[]-> {
        _id,
        title,
        slug,
        description,
        mainImage,
        difficulty,
        prepTime,
        cookTime
      }
    }
  `);
  return result?.popularRecipes || [];
}

// ─── ABOUT BLOCK ───
export async function getAboutBlock() {
  const result = await sanityClient.fetch(`
    *[_id == "siteSettings"][0] {
      siteName,
      aboutBlock {
        heading,
        body,
        photo,
        linkText
      }
    }
  `);
  return {
    siteName: result?.siteName || "TurquazTable",
    aboutBlock: result?.aboutBlock || null,
  };
}

// ─── BEYOND THE KITCHEN ───
export async function getBeyondTheKitchenData() {
  const result = await sanityClient.fetch(`
    *[_id == "homepageSettings"][0] {
      beyondKitchenLabel,
      beyondKitchenHeading,
      beyondKitchenSubheading,
      beyondKitchenArtCtaText,
      beyondKitchenHeadingColor,
      beyondKitchenSubheadingColor,
      beyondKitchenDoorImage,
      beyondKitchenArtCardImage,
      beyondKitchenShopCardImage,
      beyondKitchenArtPost-> {
        _id,
        title,
        slug,
        description,
        gallery[0] { asset }
      },
      beyondKitchenShopText {
        title,
        description,
        ctaText
      }
    }
  `);
  return {
    label: result?.beyondKitchenLabel || null,
    heading: result?.beyondKitchenHeading || null,
    subheading: result?.beyondKitchenSubheading || null,
    artCtaText: result?.beyondKitchenArtCtaText || null,
    headingColor: result?.beyondKitchenHeadingColor || null,
    subheadingColor: result?.beyondKitchenSubheadingColor || null,
    doorImage: result?.beyondKitchenDoorImage || null,
    artCardImage: result?.beyondKitchenArtCardImage || null,
    shopCardImage: result?.beyondKitchenShopCardImage || null,
    artPost: result?.beyondKitchenArtPost || null,
    shopText: result?.beyondKitchenShopText || null,
  };
}

// ─── SECTION ORDER & VISIBILITY ───

// Default section order (used when no Sanity config exists yet)
const DEFAULT_SECTIONS = [
  { sectionKey: "categoryGrid", enabled: true },
  { sectionKey: "featuredRecipe", enabled: true },
  { sectionKey: "searchBand", enabled: true },
  { sectionKey: "latestToggle", enabled: true },
  { sectionKey: "popularRecipes", enabled: true },
  { sectionKey: "aboutBlock", enabled: false },
  { sectionKey: "beyondTheKitchen", enabled: true },
  { sectionKey: "newsletterSection", enabled: true },
];

export interface SectionConfig {
  sectionKey: string;
  enabled: boolean;
}

export async function getSectionVisibility() {
  const result = await sanityClient.fetch(`
    *[_id == "homepageSettings"][0] {
      showUtilityBar,
      showNewsletterCta,
      homepageSections[] {
        sectionKey,
        enabled
      }
    }
  `);

  // Build ordered sections list
  const sections: SectionConfig[] = result?.homepageSections?.length
    ? result.homepageSections
    : DEFAULT_SECTIONS;

  return {
    showUtilityBar: result?.showUtilityBar !== false,
    showNewsletterCta: result?.showNewsletterCta !== false,
    sections,
  };
}

// ─── SEARCH BAND TEXT ───
export async function getSearchBandText() {
  const result = await sanityClient.fetch(`
    *[_id == "homepageSettings"][0] {
      searchBandHeading,
      searchBandPlaceholder,
      searchBandButtonText
    }
  `);
  return {
    heading: result?.searchBandHeading || "What would you like to make today?",
    placeholder: result?.searchBandPlaceholder || "Search recipes...",
    buttonText: result?.searchBandButtonText || "Browse All Recipes",
  };
}

// ─── NEWSLETTER TEXT ───
export async function getNewsletterText() {
  const result = await sanityClient.fetch(`
    *[_id == "homepageSettings"][0] {
      newsletterHeading,
      newsletterSubheading,
      newsletterButtonText,
      newsletterPlaceholder
    }
  `);
  return {
    heading: result?.newsletterHeading || "Recipes in Your Inbox",
    subheading:
      result?.newsletterSubheading ||
      "New recipes, baking tips, and behind-the-scenes updates. No spam.",
    buttonText: result?.newsletterButtonText || "Subscribe",
    placeholder: result?.newsletterPlaceholder || "your@email.com",
  };
}

// ─── NEWSLETTER CTA ───
export async function getNewsletterCta() {
  const result = await sanityClient.fetch(`
    *[_id == "homepageSettings"][0] {
      newsletterCta
    }
  `);
  return result?.newsletterCta || "Sign up for free weekly recipes!";
}

// ─── NEWSLETTER INTEGRATION SETTINGS ───
export async function getNewsletterSettings() {
  const result = await sanityClient.fetch(`
    *[_id == "siteSettings"][0] {
      newsletterFormAction,
      newsletterFormMethod,
      newsletterHiddenFields[] {
        fieldName,
        fieldValue
      }
    }
  `);
  return {
    formAction: result?.newsletterFormAction || "",
    formMethod: result?.newsletterFormMethod || "POST",
    hiddenFields: result?.newsletterHiddenFields || [],
  };
}

// ─── ALL HOMEPAGE DATA (single fetch for efficiency) ───
export async function getAllHomepageData() {
  const [
    categories,
    featuredRecipe,
    latestRecipes,
    latestVideos,
    popularRecipes,
    aboutData,
    beyondData,
    visibility,
    searchBandText,
    newsletterText,
  ] = await Promise.all([
    getRecipeCategoriesWithImages(),
    getFeaturedRecipe(),
    getLatestRecipes(),
    getLatestVideos(),
    getPopularRecipes(),
    getAboutBlock(),
    getBeyondTheKitchenData(),
    getSectionVisibility(),
    getSearchBandText(),
    getNewsletterText(),
  ]);

  return {
    categories,
    featuredRecipe,
    latestRecipes,
    latestVideos,
    popularRecipes,
    aboutData,
    beyondData,
    visibility,
    searchBandText,
    newsletterText,
  };
}
