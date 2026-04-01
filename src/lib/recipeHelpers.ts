/**
 * Recipe helper utilities
 * - Time formatting (display + ISO 8601 for schema.org)
 * - Filter option constants
 * - schema.org/Recipe JSON-LD builder
 */

// ─── TIME FORMATTING ───

/** Format minutes into human-readable label: "45 min", "1 hr 30 min" */
export function formatTime(minutes: number | undefined | null): string {
  if (!minutes || minutes <= 0) return '';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (remaining === 0) return `${hours} hr${hours > 1 ? 's' : ''}`;
  return `${hours} hr ${remaining} min`;
}

/** Format total time from prep + cook */
export function formatTotalTime(prepTime?: number | null, cookTime?: number | null): string {
  const total = (prepTime || 0) + (cookTime || 0);
  return formatTime(total);
}

/** Convert minutes to ISO 8601 duration for schema.org (e.g., "PT1H30M") */
export function toISO8601Duration(minutes: number | undefined | null): string {
  if (!minutes || minutes <= 0) return '';
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  let iso = 'PT';
  if (hours > 0) iso += `${hours}H`;
  if (remaining > 0) iso += `${remaining}M`;
  return iso;
}

/** Capitalize first letter of a string */
export function capitalize(str: string | undefined | null): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ─── FILTER OPTION CONSTANTS ───

export const DIETARY_OPTIONS = [
  { value: 'dairy-free', label: 'Dairy-Free' },
  { value: 'egg-free', label: 'Egg-Free' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'nut-free', label: 'Nut-Free' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'vegetarian', label: 'Vegetarian' },
];

export const OCCASION_OPTIONS = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'christmas', label: 'Christmas' },
  { value: 'easter', label: 'Easter' },
  { value: 'halloween', label: 'Halloween' },
  { value: 'thanksgiving', label: 'Thanksgiving' },
  { value: 'valentines', label: "Valentine's Day" },
  { value: 'mothers-day', label: "Mother's Day" },
  { value: 'dinner-party', label: 'Dinner Party' },
];

export const SEASON_OPTIONS = [
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'fall', label: 'Fall' },
  { value: 'winter', label: 'Winter' },
];

export const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'quickest', label: 'Quickest First' },
  { value: 'a-z', label: 'A to Z' },
];

// ─── SCHEMA.ORG BUILDER ───

interface SchemaRecipe {
  title: string;
  slug: { current: string };
  description?: string;
  mainImage?: any;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: string;
  ingredients?: Array<{ amount?: string; unit?: string; name: string; notes?: string }>;
  instructions?: Array<{ stepText: string; image?: any; tip?: string }>;
  categories?: Array<{ title: string }>;
  dietary?: string[];
  publishedAt?: string;
  videoUrl?: string;
}

/**
 * Build a schema.org/Recipe JSON-LD object.
 * See https://schema.org/Recipe and Google's recipe structured data docs.
 */
export function buildRecipeSchema(
  recipe: SchemaRecipe,
  siteUrl: string,
  imageUrl?: string,
  siteName?: string,
): Record<string, any> {
  const totalMinutes = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    url: `${siteUrl}/recipes/${recipe.slug.current}`,
    datePublished: recipe.publishedAt || undefined,
  };

  if (recipe.description) {
    schema.description = recipe.description;
  }

  if (imageUrl) {
    schema.image = [imageUrl];
  }

  if (recipe.prepTime) {
    schema.prepTime = toISO8601Duration(recipe.prepTime);
  }
  if (recipe.cookTime) {
    schema.cookTime = toISO8601Duration(recipe.cookTime);
  }
  if (totalMinutes > 0) {
    schema.totalTime = toISO8601Duration(totalMinutes);
  }

  if (recipe.servings) {
    schema.recipeYield = `${recipe.servings} servings`;
  }

  if (recipe.categories?.length) {
    schema.recipeCategory = recipe.categories.map((c) => c.title);
  }

  if (recipe.dietary?.length) {
    // Map dietary restrictions to schema.org RestrictedDiet values where possible
    const dietMap: Record<string, string> = {
      'gluten-free': 'https://schema.org/GlutenFreeDiet',
      'vegan': 'https://schema.org/VeganDiet',
      'vegetarian': 'https://schema.org/VegetarianDiet',
      'dairy-free': 'https://schema.org/DairyFreeDiet',
    };
    const suitableForDiet = recipe.dietary
      .map((d) => dietMap[d])
      .filter(Boolean);
    if (suitableForDiet.length) {
      schema.suitableForDiet = suitableForDiet;
    }
  }

  if (recipe.ingredients?.length) {
    schema.recipeIngredient = recipe.ingredients.map((ing) => {
      const parts = [ing.amount, ing.unit, ing.name].filter(Boolean);
      if (ing.notes) parts.push(`(${ing.notes})`);
      return parts.join(' ');
    });
  }

  if (recipe.instructions?.length) {
    schema.recipeInstructions = recipe.instructions.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: step.stepText,
    }));
  }

  if (recipe.videoUrl) {
    schema.video = {
      '@type': 'VideoObject',
      name: recipe.title,
      contentUrl: recipe.videoUrl,
    };
  }

  if (siteName) {
    schema.author = {
      '@type': 'Person',
      name: siteName,
    };
  }

  return schema;
}
