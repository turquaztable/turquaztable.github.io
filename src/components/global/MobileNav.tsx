import { useState, useEffect } from "react";

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  toggleKey?: string;
}

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}

interface Props {
  siteName: string;
  recipeCategories: Category[];
  currentPath: string;
  navLinks: NavLink[];
}

export default function MobileNav({ siteName, recipeCategories, currentPath, navLinks }: Props) {
  const [open, setOpen] = useState(false);
  const [recipesExpanded, setRecipesExpanded] = useState(false);
  const [dark, setDark] = useState(false);

  // Sync dark mode state on mount
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* Hamburger Button */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="w-10 h-10 flex items-center justify-center relative z-[60]"
      >
        <div className="w-5 h-4 relative flex flex-col justify-between">
          <span
            className="block w-full h-[2px] bg-current transition-all duration-300 origin-center"
            style={{
              transform: open ? "translateY(7px) rotate(45deg)" : "none",
              backgroundColor: "var(--text)",
            }}
          />
          <span
            className="block w-full h-[2px] transition-opacity duration-200"
            style={{
              opacity: open ? 0 : 1,
              backgroundColor: "var(--text)",
            }}
          />
          <span
            className="block w-full h-[2px] bg-current transition-all duration-300 origin-center"
            style={{
              transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
              backgroundColor: "var(--text)",
            }}
          />
        </div>
      </button>

      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-out Panel */}
      <div
        className="fixed top-0 right-0 z-50 h-full w-[300px] max-w-[85vw] overflow-y-auto shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          backgroundColor: "var(--surface)",
        }}
      >
        {/* Panel Header */}
        <div
          className="h-16 flex items-center justify-between px-6 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <span
            className="text-[20px] font-semibold"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--green-deep)",
            }}
          >
            {siteName}
          </span>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-md)",
              padding: 0,
            }}
          >
            {dark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Nav Links */}
        <div className="py-4">
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.href ||
              (link.href !== "/" && currentPath.startsWith(link.href));

            if (link.hasDropdown) {
              return (
                <div key={link.label}>
                  <button
                    type="button"
                    onClick={() => setRecipesExpanded(!recipesExpanded)}
                    className="w-full flex items-center justify-between px-6 py-3 text-left transition-colors duration-150"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      color: isActive ? "var(--green-deep)" : "var(--text-md)",
                      backgroundColor: isActive ? "var(--cream)" : "transparent",
                    }}
                  >
                    <span>{link.label}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{
                        transition: "transform 0.2s ease",
                        transform: recipesExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {/* Expandable categories */}
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: recipesExpanded ? `${(recipeCategories.length + 1) * 44}px` : "0",
                      opacity: recipesExpanded ? 1 : 0,
                    }}
                  >
                    <a
                      href="/recipes"
                      onClick={() => setOpen(false)}
                      className="block px-6 pl-10 py-2.5 transition-colors duration-150"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase" as const,
                        color: "var(--green-deep)",
                      }}
                    >
                      All Recipes
                    </a>
                    {recipeCategories.map((cat) => (
                      <a
                        key={cat._id}
                        href={`/recipes?category=${cat.slug.current}`}
                        onClick={() => setOpen(false)}
                        className="block px-6 pl-10 py-2.5 transition-colors duration-150"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "13px",
                          color: "var(--text-md)",
                        }}
                      >
                        {cat.title}
                      </a>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-6 py-3 transition-colors duration-150"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  color: isActive ? "var(--green-deep)" : "var(--text-md)",
                  backgroundColor: isActive ? "var(--cream)" : "transparent",
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Search bar in mobile panel */}
        <div className="px-6 pb-6">
          <div
            className="border-t pt-6 mb-4"
            style={{ borderColor: "var(--border)" }}
          >
            <a
              href="/recipes"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 border transition-colors duration-200"
              style={{
                borderColor: "var(--border)",
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                color: "var(--text-light)",
                textDecoration: "none",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Search recipes...
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
