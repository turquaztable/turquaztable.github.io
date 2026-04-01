/**
 * RecipeFilters.tsx
 * React island (client:load) for the recipe listing page.
 *
 * Handles:
 * - Category, Dietary, Occasion, Season, Difficulty filters (sidebar)
 * - Text search (from URL ?q= param, from SearchBand on homepage)
 * - Sort (newest, oldest, quickest, A-Z)
 * - Client-side pagination (12 per page)
 * - URL query param sync for shareable filtered views
 * - Mobile filter toggle
 */
import { useState, useMemo, useEffect } from 'react';

// ─── TYPES ───

interface RecipeData {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  mainImage?: { src: string; srcSet: string; alt?: string } | null;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: string;
  categories?: Array<{ title: string; slug: { current: string } }>;
  dietary?: string[];
  occasion?: string[];
  season?: string;
  tags?: string[];
  publishedAt?: string;
}

interface CategoryOption {
  title: string;
  slug: { current: string };
}

interface FilterOption {
  value: string;
  label: string;
}

interface Props {
  recipes: RecipeData[];
  categories: CategoryOption[];
  dietaryOptions: FilterOption[];
  occasionOptions: FilterOption[];
  seasonOptions: FilterOption[];
  difficultyOptions: FilterOption[];
  sortOptions: FilterOption[];
  /** Initial filters from URL params (parsed server-side) */
  initialFilters?: {
    q?: string;
    category?: string;
    dietary?: string[];
    occasion?: string[];
    season?: string;
    difficulty?: string;
    sort?: string;
    page?: number;
  };
}

const PER_PAGE = 12;

// ─── HELPERS ───

function formatTime(minutes: number | undefined | null): string {
  if (!minutes || minutes <= 0) return '';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (remaining === 0) return `${hours} hr${hours > 1 ? 's' : ''}`;
  return `${hours} hr ${remaining} min`;
}

function capitalize(str: string | undefined | null): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ─── MAIN COMPONENT ───

export default function RecipeFilters({
  recipes,
  categories,
  dietaryOptions,
  occasionOptions,
  seasonOptions,
  difficultyOptions,
  sortOptions,
  initialFilters = {},
}: Props) {
  // ─── State ───
  const [search, setSearch] = useState(initialFilters.q || '');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    initialFilters.category ? new Set([initialFilters.category]) : new Set()
  );
  const [selectedDietary, setSelectedDietary] = useState<Set<string>>(
    new Set(initialFilters.dietary || [])
  );
  const [selectedOccasion, setSelectedOccasion] = useState<Set<string>>(
    new Set(initialFilters.occasion || [])
  );
  const [selectedSeason, setSelectedSeason] = useState(initialFilters.season || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState(initialFilters.difficulty || '');
  const [sort, setSort] = useState(initialFilters.sort || 'newest');
  const [page, setPage] = useState(initialFilters.page || 1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // ─── Toggle helpers ───
  const toggleSet = (setter: React.Dispatch<React.SetStateAction<Set<string>>>, value: string) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
    setPage(1);
  };

  // ─── Filter + Sort ───
  const filtered = useMemo(() => {
    let result = [...recipes];

    // Text search
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((r) =>
        r.title.toLowerCase().includes(q) ||
        (r.description || '').toLowerCase().includes(q) ||
        (r.tags || []).some((t) => t.toLowerCase().includes(q)) ||
        (r.categories || []).some((c) => c.title.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategories.size > 0) {
      result = result.filter((r) =>
        (r.categories || []).some((c) => selectedCategories.has(c.slug.current))
      );
    }

    // Dietary filter (AND - recipe must match ALL selected)
    if (selectedDietary.size > 0) {
      result = result.filter((r) =>
        [...selectedDietary].every((d) => (r.dietary || []).includes(d))
      );
    }

    // Occasion filter (OR - recipe matches ANY selected)
    if (selectedOccasion.size > 0) {
      result = result.filter((r) =>
        (r.occasion || []).some((o) => selectedOccasion.has(o))
      );
    }

    // Season filter
    if (selectedSeason) {
      result = result.filter((r) => r.season === selectedSeason);
    }

    // Difficulty filter
    if (selectedDifficulty) {
      result = result.filter((r) => r.difficulty === selectedDifficulty);
    }

    // Sort
    switch (sort) {
      case 'oldest':
        result.sort((a, b) => (a.publishedAt || '').localeCompare(b.publishedAt || ''));
        break;
      case 'quickest':
        result.sort((a, b) => {
          const timeA = (a.prepTime || 0) + (a.cookTime || 0);
          const timeB = (b.prepTime || 0) + (b.cookTime || 0);
          return timeA - timeB;
        });
        break;
      case 'a-z':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
        break;
    }

    return result;
  }, [recipes, search, selectedCategories, selectedDietary, selectedOccasion, selectedSeason, selectedDifficulty, sort]);

  // ─── Pagination ───
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Reset page when filters change
  useEffect(() => {
    if (page > totalPages && totalPages > 0) setPage(1);
  }, [totalPages]);

  // ─── URL sync ───
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (selectedCategories.size) params.set('category', [...selectedCategories].join(','));
    if (selectedDietary.size) params.set('dietary', [...selectedDietary].join(','));
    if (selectedOccasion.size) params.set('occasion', [...selectedOccasion].join(','));
    if (selectedSeason) params.set('season', selectedSeason);
    if (selectedDifficulty) params.set('difficulty', selectedDifficulty);
    if (sort !== 'newest') params.set('sort', sort);
    if (page > 1) params.set('page', String(page));

    const qs = params.toString();
    const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [search, selectedCategories, selectedDietary, selectedOccasion, selectedSeason, selectedDifficulty, sort, page]);

  // ─── Active filter count (for mobile badge) ───
  const activeFilterCount =
    selectedCategories.size +
    selectedDietary.size +
    selectedOccasion.size +
    (selectedSeason ? 1 : 0) +
    (selectedDifficulty ? 1 : 0);

  // ─── Clear all filters ───
  const clearFilters = () => {
    setSearch('');
    setSelectedCategories(new Set());
    setSelectedDietary(new Set());
    setSelectedOccasion(new Set());
    setSelectedSeason('');
    setSelectedDifficulty('');
    setSort('newest');
    setPage(1);
  };

  return (
    <div className="rf-wrapper">
      {/* Top bar: result count + sort + mobile filter toggle */}
      <div className="rf-topbar">
        <p className="rf-count">
          {filtered.length} recipe{filtered.length !== 1 ? 's' : ''}
          {search && <span> for "{search}"</span>}
        </p>
        <div className="rf-topbar-right">
          {/* Sort dropdown */}
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="rf-sort"
            aria-label="Sort recipes"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {/* Mobile filter toggle */}
          <button
            className="rf-filter-toggle"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            aria-expanded={mobileFiltersOpen}
            aria-controls="recipe-filters-panel"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="20" y2="12" />
              <line x1="12" y1="18" x2="20" y2="18" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="rf-filter-badge">{activeFilterCount}</span>
            )}
          </button>
        </div>
      </div>

      <div className="rf-layout">
        {/* Recipe grid */}
        <div className="rf-grid-area">
          {/* Search bar (visible on listing page) */}
          <div className="rf-search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="2" strokeLinecap="round" className="rf-search-icon">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search recipes..."
              className="rf-search"
              aria-label="Search recipes"
            />
            {search && (
              <button
                onClick={() => { setSearch(''); setPage(1); }}
                className="rf-search-clear"
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          {paginated.length > 0 ? (
            <div className="rf-grid">
              {paginated.map((recipe) => (
                <RecipeCardInline key={recipe._id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="rf-empty">
              <p className="rf-empty-title">No recipes found</p>
              <p className="rf-empty-text">Try adjusting your filters or search terms.</p>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="rf-clear-btn">
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="rf-pagination" aria-label="Recipe pagination">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="rf-page-btn"
                aria-label="Previous page"
              >
                &larr; Prev
              </button>
              <div className="rf-page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                  .map((p, idx, arr) => {
                    const prev = arr[idx - 1];
                    const showEllipsis = prev && p - prev > 1;
                    return (
                      <span key={p}>
                        {showEllipsis && <span className="rf-ellipsis">...</span>}
                        <button
                          onClick={() => setPage(p)}
                          className={`rf-page-num ${p === page ? 'rf-page-num--active' : ''}`}
                          aria-label={`Page ${p}`}
                          aria-current={p === page ? 'page' : undefined}
                        >
                          {p}
                        </button>
                      </span>
                    );
                  })}
              </div>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="rf-page-btn"
                aria-label="Next page"
              >
                Next &rarr;
              </button>
            </nav>
          )}
        </div>

        {/* Sidebar filters */}
        <aside
          id="recipe-filters-panel"
          className={`rf-sidebar ${mobileFiltersOpen ? 'rf-sidebar--open' : ''}`}
        >
          <div className="rf-sidebar-inner">
            {/* Mobile close button */}
            <div className="rf-sidebar-header">
              <span className="rf-sidebar-title">Filters</span>
              <button
                className="rf-sidebar-close"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
              >
                &times;
              </button>
            </div>

            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="rf-clear-link">
                Clear all ({activeFilterCount})
              </button>
            )}

            {/* Category */}
            {categories.length > 0 && (
              <FilterGroup title="Category">
                {categories.map((cat) => (
                  <CheckboxItem
                    key={cat.slug.current}
                    label={cat.title}
                    checked={selectedCategories.has(cat.slug.current)}
                    onChange={() => toggleSet(setSelectedCategories, cat.slug.current)}
                  />
                ))}
              </FilterGroup>
            )}

            {/* Dietary */}
            <FilterGroup title="Dietary">
              {dietaryOptions.map((opt) => (
                <CheckboxItem
                  key={opt.value}
                  label={opt.label}
                  checked={selectedDietary.has(opt.value)}
                  onChange={() => toggleSet(setSelectedDietary, opt.value)}
                />
              ))}
            </FilterGroup>

            {/* Occasion */}
            <FilterGroup title="Occasion">
              {occasionOptions.map((opt) => (
                <CheckboxItem
                  key={opt.value}
                  label={opt.label}
                  checked={selectedOccasion.has(opt.value)}
                  onChange={() => toggleSet(setSelectedOccasion, opt.value)}
                />
              ))}
            </FilterGroup>

            {/* Season */}
            <FilterGroup title="Season">
              {seasonOptions.map((opt) => (
                <RadioItem
                  key={opt.value}
                  name="season"
                  label={opt.label}
                  checked={selectedSeason === opt.value}
                  onChange={() => { setSelectedSeason(selectedSeason === opt.value ? '' : opt.value); setPage(1); }}
                />
              ))}
            </FilterGroup>

            {/* Difficulty */}
            <FilterGroup title="Difficulty">
              {difficultyOptions.map((opt) => (
                <RadioItem
                  key={opt.value}
                  name="difficulty"
                  label={opt.label}
                  checked={selectedDifficulty === opt.value}
                  onChange={() => { setSelectedDifficulty(selectedDifficulty === opt.value ? '' : opt.value); setPage(1); }}
                />
              ))}
            </FilterGroup>

            {/* Mobile apply button */}
            <button
              className="rf-apply-btn"
              onClick={() => setMobileFiltersOpen(false)}
            >
              Show {filtered.length} recipe{filtered.length !== 1 ? 's' : ''}
            </button>
          </div>
        </aside>

        {/* Mobile overlay */}
        {mobileFiltersOpen && (
          <div
            className="rf-overlay"
            onClick={() => setMobileFiltersOpen(false)}
          />
        )}
      </div>

      <style>{`
        .rf-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px 80px;
        }
        .rf-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }
        .rf-count {
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--text-md);
          margin: 0;
        }
        .rf-topbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .rf-sort {
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--text);
          padding: 8px 12px;
          border: 1px solid var(--border);
          background: var(--surface);
          cursor: pointer;
          appearance: auto;
        }
        .rf-filter-toggle {
          display: none;
          align-items: center;
          gap: 6px;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          padding: 8px 14px;
          border: 1px solid var(--border);
          background: var(--surface);
          cursor: pointer;
        }
        .rf-filter-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          background: var(--green-deep);
        }

        .rf-layout {
          display: grid;
          grid-template-columns: 1fr 240px;
          gap: 48px;
        }

        /* Search */
        .rf-search-wrap {
          position: relative;
          margin-bottom: 24px;
        }
        .rf-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }
        .rf-search {
          width: 100%;
          box-sizing: border-box;
          padding: 12px 40px 12px 42px;
          border: 1px solid var(--border);
          background: var(--surface);
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--text);
          outline: none;
          transition: border-color 0.2s ease;
        }
        .rf-search:focus {
          border-color: var(--green-bright);
        }
        .rf-search-clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 18px;
          color: var(--text-light);
          cursor: pointer;
          padding: 4px;
          line-height: 1;
        }

        /* Grid */
        .rf-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .rf-card {
          text-decoration: none;
          color: inherit;
          display: block;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.35s ease;
        }
        .rf-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
        }
        .rf-card-img-wrap { overflow: hidden; }
        .rf-card-img-inner {
          position: relative;
          transition: transform 0.5s cubic-bezier(0.2, 0, 0, 1);
        }
        .rf-card:hover .rf-card-img-inner { transform: scale(1.03); }
        .rf-card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 5px 12px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text);
          font-family: var(--font-sans);
          z-index: 2;
        }
        .rf-card-title {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 600;
          color: var(--text);
          margin: 0;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .rf-card-meta {
          display: flex;
          gap: 16px;
          margin-top: 8px;
          font-size: 12px;
          color: var(--text-light);
          font-family: var(--font-sans);
          font-weight: 500;
        }

        /* Empty state */
        .rf-empty {
          text-align: center;
          padding: 80px 24px;
        }
        .rf-empty-title {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 400;
          color: var(--text);
          margin: 0 0 8px;
        }
        .rf-empty-text {
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--text-light);
          margin: 0 0 20px;
        }
        .rf-clear-btn {
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--green-deep);
          background: none;
          border: 2px solid var(--green-deep);
          padding: 10px 24px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .rf-clear-btn:hover {
          background: var(--green-deep);
          color: #fff;
        }

        /* Pagination */
        .rf-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
        }
        .rf-page-btn {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-md);
          background: none;
          border: 1px solid var(--border);
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .rf-page-btn:hover:not(:disabled) {
          border-color: var(--green-deep);
          color: var(--green-deep);
        }
        .rf-page-btn:disabled {
          opacity: 0.35;
          cursor: default;
        }
        .rf-page-numbers {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .rf-page-num {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          color: var(--text-md);
          background: none;
          border: none;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .rf-page-num:hover { color: var(--green-deep); }
        .rf-page-num--active {
          font-weight: 700;
          color: #fff;
          background: var(--green-deep);
        }
        .rf-ellipsis {
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--text-light);
          padding: 0 4px;
        }

        /* Sidebar */
        .rf-sidebar {
          position: sticky;
          top: 80px;
          align-self: start;
        }
        .rf-sidebar-inner {
          border: 1px solid var(--border);
          padding: 24px;
          background: var(--surface);
        }
        .rf-sidebar-header {
          display: none;
        }
        .rf-sidebar-title {
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text);
        }
        .rf-sidebar-close {
          background: none;
          border: none;
          font-size: 24px;
          color: var(--text-md);
          cursor: pointer;
          padding: 4px;
          line-height: 1;
        }
        .rf-clear-link {
          display: block;
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 600;
          color: var(--copper);
          background: none;
          border: none;
          padding: 0;
          margin-bottom: 20px;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .rf-apply-btn {
          display: none;
        }

        /* Filter group */
        .rf-filter-group {
          margin-bottom: 24px;
        }
        .rf-filter-group:last-of-type {
          margin-bottom: 0;
        }
        .rf-filter-group-title {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-md);
          margin: 0 0 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
        }
        .rf-filter-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 0;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--text-md);
          transition: color 0.15s ease;
        }
        .rf-filter-item:hover { color: var(--text); }
        .rf-checkbox {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          border: 1.5px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .rf-checkbox--checked {
          background: var(--green-deep);
          border-color: var(--green-deep);
        }
        .rf-radio {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          border-radius: 50%;
          border: 1.5px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .rf-radio--checked {
          border-color: var(--green-deep);
        }
        .rf-radio-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green-deep);
        }

        /* Overlay for mobile */
        .rf-overlay {
          display: none;
        }

        /* ─── Responsive ─── */
        @media (max-width: 1024px) {
          .rf-wrapper { padding: 0 24px 60px; }
          .rf-layout {
            grid-template-columns: 1fr;
          }
          .rf-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .rf-filter-toggle { display: flex; }
          .rf-sidebar {
            position: fixed;
            top: 0;
            right: -320px;
            width: 300px;
            height: 100vh;
            z-index: 200;
            background: var(--surface);
            transition: right 0.3s ease;
            overflow-y: auto;
          }
          .rf-sidebar--open {
            right: 0;
          }
          .rf-sidebar-inner {
            border: none;
            padding: 24px;
            min-height: 100%;
          }
          .rf-sidebar-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--border);
          }
          .rf-apply-btn {
            display: block;
            width: 100%;
            margin-top: 24px;
            padding: 14px;
            font-family: var(--font-sans);
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: #fff;
            background: var(--green-deep);
            border: none;
            cursor: pointer;
          }
          .rf-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
            z-index: 199;
          }
        }
        @media (max-width: 768px) {
          .rf-wrapper { padding: 0 20px 48px; }
          .rf-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .rf-topbar {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .rf-topbar-right { width: 100%; justify-content: space-between; }
        }
        @media (max-width: 480px) {
          .rf-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

// ─── SUB-COMPONENTS ───

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rf-filter-group">
      <h3 className="rf-filter-group-title">{title}</h3>
      {children}
    </div>
  );
}

function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="rf-filter-item">
      <span className={`rf-checkbox ${checked ? 'rf-checkbox--checked' : ''}`}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      {label}
    </label>
  );
}

function RadioItem({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="rf-filter-item">
      <span className={`rf-radio ${checked ? 'rf-radio--checked' : ''}`}>
        {checked && <span className="rf-radio-dot" />}
      </span>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      {label}
    </label>
  );
}

// ─── INLINE RECIPE CARD (for the filtered grid) ───

function RecipeCardInline({ recipe }: { recipe: RecipeData }) {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
  const timeLabel = formatTime(totalTime);
  const diffLabel = capitalize(recipe.difficulty);
  const catLabel = recipe.categories?.[0]?.title || '';
  const img = recipe.mainImage;

  return (
    <a href={`/recipes/${recipe.slug.current}`} className="rf-card">
      <div className="rf-card-img-wrap">
        <div className="rf-card-img-inner">
          {img?.src ? (
            <img
              src={img.src}
              srcSet={img.srcSet || undefined}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt={img.alt || recipe.title}
              loading="lazy"
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{
              aspectRatio: '4/3',
              background: 'linear-gradient(145deg, #DDD5C9, #DDD5C9CC)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                color: 'rgba(0,0,0,0.1)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase' as const,
                fontFamily: 'var(--font-sans)',
              }}>photo</span>
            </div>
          )}
          {catLabel && <div className="rf-card-badge">{catLabel}</div>}
        </div>
      </div>
      <div style={{ paddingTop: 14 }}>
        <h3 className="rf-card-title">{recipe.title}</h3>
        {(timeLabel || diffLabel) && (
          <div className="rf-card-meta">
            {timeLabel && <span>{timeLabel}</span>}
            {timeLabel && diffLabel && <span style={{ color: 'var(--border)' }}>|</span>}
            {diffLabel && <span>{diffLabel}</span>}
          </div>
        )}
      </div>
    </a>
  );
}
