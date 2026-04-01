/**
 * JumpToRecipe.tsx
 * Floating "Jump to Recipe" button for recipe detail pages.
 * Shows when the user has scrolled past the hero image area,
 * hides once they reach the ingredients section.
 *
 * React island (client:load) for IntersectionObserver behavior.
 */
import { useState, useEffect } from "react";

export default function JumpToRecipe() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.querySelector(".recipe-detail header");
    const ingredientsEl = document.getElementById("ingredients");

    if (!heroEl || !ingredientsEl) return;

    let heroVisible = true;
    let ingredientsVisible = false;

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        setVisible(!heroVisible && !ingredientsVisible);
      },
      { threshold: 0 }
    );

    const ingredientsObserver = new IntersectionObserver(
      ([entry]) => {
        ingredientsVisible = entry.isIntersecting;
        setVisible(!heroVisible && !ingredientsVisible);
      },
      { threshold: 0 }
    );

    heroObserver.observe(heroEl);
    ingredientsObserver.observe(ingredientsEl);

    return () => {
      heroObserver.disconnect();
      ingredientsObserver.disconnect();
    };
  }, []);

  return (
    <a
      href="#ingredients"
      className={`jump-to-recipe ${!visible ? "jump-to-recipe--hidden" : ""}`}
      aria-label="Jump to recipe ingredients"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
      Jump to Recipe
    </a>
  );
}
