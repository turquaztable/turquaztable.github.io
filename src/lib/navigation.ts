/**
 * Main navigation link structure.
 * Used by Header.astro and MobileNav.tsx.
 *
 * RECIPES has a dropdown populated from Sanity categories at build time.
 * HOME, RECIPES, and ABOUT are always shown.
 * ART, BLOG, SHOP, and FASHION can be toggled via Site Settings in Sanity.
 */

export interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  /** If set, this link is only shown when the matching toggle is true */
  toggleKey?: string;
}

/**
 * Full list of navigation links.
 * Links with a toggleKey can be filtered out based on siteSettings toggles.
 */
export const allNavLinks: NavLink[] = [
  { label: "HOME", href: "/" },
  { label: "RECIPES", href: "/recipes", hasDropdown: true },
  { label: "ART", href: "/art", toggleKey: "showArtNav" },
  { label: "FASHION", href: "/fashion", toggleKey: "showFashionNav" },
  { label: "BLOG", href: "/blog", toggleKey: "showBlogNav" },
  { label: "ABOUT", href: "/about" },
  { label: "SHOP", href: "/shop", toggleKey: "showShopNav" },
];

/**
 * Filter nav links based on visibility toggles from Sanity siteSettings.
 * Links without a toggleKey are always shown.
 * Links with a toggleKey are shown only if the toggle is true (or undefined/null, which defaults to true).
 */
export function getVisibleNavLinks(
  toggles: Record<string, boolean | undefined | null>
): NavLink[] {
  return allNavLinks.filter((link) => {
    if (!link.toggleKey) return true;
    const val = toggles[link.toggleKey];
    // Default to true if not set (undefined/null)
    return val !== false;
  });
}

/**
 * Legacy export for backward compatibility.
 * Returns all nav links without filtering (same as before Session 6).
 */
export const navLinks = allNavLinks;
