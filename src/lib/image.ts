/**
 * Sanity image URL builder helpers
 * Wraps urlFor from sanity.ts with convenience functions
 * for responsive images, srcsets, and placeholder colors.
 */
import { urlFor } from './sanity';

// Re-export urlFor so components can import everything from one place
export { urlFor };

/**
 * Build a responsive image URL with width constraint
 */
export function imageUrl(source: any, width: number = 800): string {
  if (!source?.asset) return '';
  return urlFor(source).width(width).auto('format').quality(80).url();
}

/**
 * Build srcset string for responsive images
 */
export function imageSrcSet(source: any, widths: number[] = [400, 600, 800, 1200]): string {
  if (!source?.asset) return '';
  return widths
    .map((w) => `${urlFor(source).width(w).auto('format').quality(80).url()} ${w}w`)
    .join(', ');
}

/**
 * Get placeholder color from image palette (if available)
 * Falls back to a warm neutral
 */
export function placeholderColor(image: any): string {
  return image?.asset?.metadata?.palette?.dominant?.background || '#DDD5C9';
}
