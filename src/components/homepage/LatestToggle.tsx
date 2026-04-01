/**
 * LatestToggle.tsx
 * React island (client:load) — Tab toggle between recipe grid and video grid.
 * Crossfade animation (~280ms). Data passed as props at build time.
 *
 * Recipes tab: Asymmetric mosaic grid (1 large + 4 small + 4 bottom row)
 * Videos tab: 1 large featured + 2 stacked + 3 bottom row
 *
 * References homepage-v4.jsx LatestSection, RecipeCard, VideoCard, VideoFeatured
 */
import { useState } from 'react';

// ─── TYPES ───
interface RecipeData {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  mainImage?: any;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: string;
  categories?: Array<{ title: string; slug: { current: string } }>;
}

interface VideoData {
  videoUrl?: string;
  title: string;
  platform?: string;
  duration?: string;
  isFeatured?: boolean;
}

interface Props {
  recipes: RecipeData[];
  videos: VideoData[];
  /** Pre-built image URLs keyed by recipe _id (built at Astro build time) */
  recipeImageUrls?: Record<string, { src: string; srcSet: string }>;
}

// ─── IMAGE HELPER ───
function getImageData(recipe: RecipeData, recipeImageUrls?: Record<string, { src: string; srcSet: string }>) {
  if (recipeImageUrls?.[recipe._id]) return recipeImageUrls[recipe._id];
  return null;
}

// ─── PLACEHOLDER ───
function Placeholder({ aspect, label }: { aspect: string; label?: string }) {
  return (
    <div
      style={{
        aspectRatio: aspect,
        background: 'linear-gradient(145deg, #DDD5C9, #DDD5C9CC)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {label && (
        <span style={{
          color: 'rgba(0,0,0,0.1)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 2,
          textTransform: 'uppercase' as const,
          fontFamily: 'var(--font-sans)',
        }}>
          {label}
        </span>
      )}
    </div>
  );
}

// ─── RECIPE CARD ───
function RecipeCard({
  recipe,
  featured = false,
  imageData,
}: {
  recipe: RecipeData;
  featured?: boolean;
  imageData?: { src: string; srcSet: string } | null;
}) {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
  const timeLabel =
    totalTime >= 60
      ? `${Math.floor(totalTime / 60)} hr${totalTime % 60 ? ` ${totalTime % 60} min` : ''}`
      : totalTime > 0
        ? `${totalTime} min`
        : '';
  const difficultyLabel = recipe.difficulty
    ? recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)
    : '';
  const categoryLabel = recipe.categories?.[0]?.title || '';

  return (
    <a
      href={`/recipes/${recipe.slug.current}`}
      className="lt-card"
    >
      <div className="lt-card-img-wrap">
        <div className="lt-card-img-zoom">
          {imageData ? (
            <img
              src={imageData.src}
              srcSet={imageData.srcSet}
              sizes={featured ? '(max-width: 768px) 100vw, 40vw' : '(max-width: 768px) 50vw, 25vw'}
              alt={recipe.title}
              style={{
                width: '100%',
                aspectRatio: featured ? '16/10' : '4/3',
                objectFit: 'cover',
                display: 'block',
              }}
              loading="lazy"
            />
          ) : (
            <Placeholder aspect={featured ? '16/10' : '4/3'} label="photo" />
          )}
          {categoryLabel && (
            <div className="lt-badge" style={{ position: 'absolute', top: 14, left: 14 }}>
              {categoryLabel}
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: featured ? '18px 0 0' : '14px 0 0' }}>
        <h3
          className="lt-card-title"
          style={{ fontSize: featured ? 22 : 16, fontWeight: featured ? 500 : 600 }}
        >
          {recipe.title}
        </h3>
        {(timeLabel || difficultyLabel) && (
          <div className="lt-card-meta">
            {timeLabel && <span>{timeLabel}</span>}
            {timeLabel && difficultyLabel && (
              <span style={{ color: 'var(--border)' }}>|</span>
            )}
            {difficultyLabel && <span>{difficultyLabel}</span>}
          </div>
        )}
      </div>
    </a>
  );
}

// ─── VIDEO CARD ───
function VideoCard({ video, large = false }: { video: VideoData; large?: boolean }) {
  const playSize = large ? 64 : 48;
  const svgSize = large ? 22 : 16;

  return (
    <a
      href={video.videoUrl || '#'}
      className="lt-card"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="lt-card-img-wrap">
        <div className="lt-card-img-zoom" style={{ position: 'relative' }}>
          <Placeholder aspect="16/9" label="video thumbnail" />
          {/* Play overlay */}
          <div className="lt-video-overlay">
            <div className="lt-play-btn" style={{ width: playSize, height: playSize }}>
              <svg width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="var(--green-deep)">
                <polygon points="8,5 20,12 8,19" />
              </svg>
            </div>
          </div>
          {/* Duration */}
          {video.duration && (
            <div className="lt-duration">{video.duration}</div>
          )}
          {/* Platform */}
          {video.platform && (
            <div className="lt-platform">{video.platform}</div>
          )}
        </div>
      </div>
      <div style={{ padding: large ? '18px 0 0' : '14px 0 0' }}>
        <h3
          className="lt-card-title"
          style={{ fontSize: large ? 22 : 16, fontWeight: large ? 500 : 600 }}
        >
          {video.title}
        </h3>
        <div className="lt-card-meta">
          {video.platform && <span>{video.platform}</span>}
          {video.platform && video.duration && (
            <span style={{ color: 'var(--border)' }}>|</span>
          )}
          {video.duration && <span>{video.duration}</span>}
        </div>
      </div>
    </a>
  );
}

// ─── MAIN COMPONENT ───
export default function LatestToggle({ recipes, videos, recipeImageUrls }: Props) {
  const [activeTab, setActiveTab] = useState<'recipes' | 'videos'>('recipes');
  const [transitioning, setTransitioning] = useState(false);
  const [displayTab, setDisplayTab] = useState<'recipes' | 'videos'>('recipes');

  const switchTab = (tab: 'recipes' | 'videos') => {
    if (tab === activeTab) return;
    setTransitioning(true);
    setTimeout(() => {
      setDisplayTab(tab);
      setActiveTab(tab);
      setTimeout(() => setTransitioning(false), 30);
    }, 280);
  };

  const hasVideos = videos.length > 0;

  return (
    <section className="lt-section">
      {/* Header with toggle */}
      <div className="lt-header">
        <div className="lt-tabs">
          <button
            className={`lt-tab ${activeTab === 'recipes' ? 'lt-tab--active' : ''}`}
            onClick={() => switchTab('recipes')}
          >
            The Latest
          </button>
          {hasVideos && (
            <button
              className={`lt-tab ${activeTab === 'videos' ? 'lt-tab--active' : ''}`}
              onClick={() => switchTab('videos')}
            >
              Watch the Latest
            </button>
          )}
        </div>
        <a href={activeTab === 'recipes' ? '/recipes' : '#'} className="lt-view-all">
          {activeTab === 'recipes' ? 'All Recipes →' : 'All Videos →'}
        </a>
      </div>

      <div className="lt-divider" />

      {/* Loading indicator during tab transition */}
      {transitioning && (
        <div className="lt-loading">
          <div className="lt-loading-bar" />
        </div>
      )}

      {/* Content with crossfade */}
      <div
        className="lt-content"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(12px)' : 'translateY(0)',
        }}
      >
        {displayTab === 'recipes' ? (
          <div>
            {/* Asymmetric top: 1 large spanning 2 rows + 4 smaller */}
            <div className="lt-mosaic">
              {recipes[0] && (
                <div className="lt-mosaic-feat">
                  <RecipeCard
                    recipe={recipes[0]}
                    featured
                    imageData={getImageData(recipes[0], recipeImageUrls)}
                  />
                </div>
              )}
              {recipes.slice(1, 5).map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  imageData={getImageData(recipe, recipeImageUrls)}
                />
              ))}
            </div>
            {/* Bottom row */}
            {recipes.length > 5 && (
              <div className="lt-bottom-4">
                {recipes.slice(4, 8).map((recipe) => (
                  <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    imageData={getImageData(recipe, recipeImageUrls)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Top: featured + 2 stacked */}
            <div className="lt-vid-top">
              {videos[0] && (
                <div className="lt-vid-feat">
                  <VideoCard video={videos[0]} large />
                </div>
              )}
              {videos.length > 1 && (
                <div className="lt-vid-stack">
                  {videos.slice(1, 3).map((v, i) => (
                    <VideoCard key={i} video={v} />
                  ))}
                </div>
              )}
            </div>
            {/* Bottom row */}
            {videos.length > 3 && (
              <div className="lt-bottom-3">
                {videos.slice(3, 6).map((v, i) => (
                  <VideoCard key={i} video={v} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .lt-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 72px 40px 48px;
        }
        .lt-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 36px;
        }
        .lt-tabs { display: flex; align-items: baseline; }
        .lt-tab {
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 400;
          color: var(--text-md);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0 0 16px;
          margin-right: 40px;
          border-bottom: 2px solid transparent;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .lt-tab--active {
          color: var(--green-deep);
          border-bottom-color: var(--green-bright);
        }
        .lt-tab:hover:not(.lt-tab--active) { color: var(--text); }
        .lt-view-all {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--copper);
          text-decoration: none;
        }
        .lt-view-all:hover { color: var(--copper-light); }
        .lt-divider {
          border-top: 1px solid var(--border);
          padding-top: 36px;
        }
        .lt-content {
          transition: opacity 0.28s ease, transform 0.28s ease;
          min-height: 400px;
        }

        /* Recipe mosaic */
        .lt-mosaic {
          display: grid;
          grid-template-columns: 1.25fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 24px;
        }
        .lt-mosaic-feat { grid-row: 1 / 3; }
        .lt-bottom-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 24px;
        }

        /* Video layout */
        .lt-vid-top {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }
        .lt-vid-stack {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .lt-bottom-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* Card styles */
        .lt-card {
          text-decoration: none;
          color: inherit;
          display: block;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.35s ease;
        }
        .lt-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
        }
        .lt-card-img-wrap { overflow: hidden; }
        .lt-card-img-zoom {
          transition: transform 0.5s cubic-bezier(0.2, 0, 0, 1);
          position: relative;
        }
        .lt-card:hover .lt-card-img-zoom { transform: scale(1.03); }
        .lt-badge {
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
        .lt-card-title {
          font-family: var(--font-serif);
          color: var(--text);
          margin: 0;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .lt-card-meta {
          display: flex;
          gap: 16px;
          margin-top: 8px;
          font-size: 12px;
          color: var(--text-light);
          font-family: var(--font-sans);
          font-weight: 500;
        }

        /* Video overlays */
        .lt-video-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.22);
          transition: background 0.3s ease;
          z-index: 2;
        }
        .lt-card:hover .lt-video-overlay { background: rgba(0, 0, 0, 0.12); }
        .lt-play-btn {
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
        }
        .lt-card:hover .lt-play-btn { transform: scale(1.08); }
        .lt-duration {
          position: absolute;
          bottom: 10px;
          right: 10px;
          padding: 3px 8px;
          background: rgba(0, 0, 0, 0.7);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          font-family: var(--font-sans);
          letter-spacing: 0.5px;
          z-index: 3;
        }
        .lt-platform {
          position: absolute;
          top: 10px;
          left: 10px;
          padding: 4px 10px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--text);
          font-family: var(--font-sans);
          z-index: 3;
        }

        /* Loading indicator */
        .lt-loading {
          height: 2px;
          width: 100%;
          background: var(--border);
          overflow: hidden;
          margin-top: -2px;
        }
        .lt-loading-bar {
          height: 100%;
          width: 30%;
          background: var(--green-deep);
          animation: lt-slide 0.6s ease-in-out infinite;
        }
        @keyframes lt-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .lt-mosaic {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }
          .lt-mosaic-feat {
            grid-row: auto;
            grid-column: 1 / -1;
          }
          .lt-bottom-4 { grid-template-columns: repeat(2, 1fr); }
          .lt-vid-top { grid-template-columns: 1fr; }
          .lt-vid-stack { flex-direction: row; }
          .lt-bottom-3 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .lt-section { padding: 48px 20px 36px; }
          .lt-header { flex-direction: column; gap: 16px; }
          .lt-tab { font-size: 24px; margin-right: 24px; }
        }
        @media (max-width: 640px) {
          .lt-mosaic { grid-template-columns: 1fr; }
          .lt-bottom-4 { grid-template-columns: 1fr; }
          .lt-vid-stack { flex-direction: column; }
          .lt-bottom-3 { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
