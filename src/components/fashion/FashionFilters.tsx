/**
 * FashionFilters.tsx - Client-side postType filtering for fashion listing.
 * Renders filter tabs and the card grid.
 *
 * Usage:
 *   <FashionFilters client:load posts={posts} />
 */
import { useState, useMemo } from 'react';

interface FashionPost {
  _id: string;
  title: string;
  slug: { current: string };
  postType?: string;
  description?: string;
  imageUrl?: string;
  imageSrcSet?: string;
  bgColor?: string;
  publishedAt?: string;
}

interface Props {
  posts: FashionPost[];
}

const POST_TYPE_LABELS: Record<string, string> = {
  fashion: 'Fashion',
  makeup: 'Makeup',
  cosplay: 'Cosplay',
  hair: 'Hair',
  'style-guide': 'Style Guide',
};

export default function FashionFilters({ posts }: Props) {
  const [activeType, setActiveType] = useState<string>('all');

  // Get available post types from actual data
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    posts.forEach((p) => {
      if (p.postType) types.add(p.postType);
    });
    return Array.from(types).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    if (activeType === 'all') return posts;
    return posts.filter((p) => p.postType === activeType);
  }, [posts, activeType]);

  return (
    <div>
      {/* Filter tabs */}
      {availableTypes.length > 1 && (
        <div
          className="flex flex-wrap gap-2 mb-10 justify-center"
          role="tablist"
          aria-label="Filter by type"
        >
          <button
            onClick={() => setActiveType('all')}
            role="tab"
            aria-selected={activeType === 'all'}
            className="filter-tab"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              padding: '8px 18px',
              border: '1px solid',
              borderColor: activeType === 'all' ? 'var(--green-deep)' : 'var(--border)',
              background: activeType === 'all' ? 'var(--green-deep)' : 'transparent',
              color: activeType === 'all' ? '#fff' : 'var(--text-md)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            All
          </button>
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              role="tab"
              aria-selected={activeType === type}
              className="filter-tab"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                padding: '8px 18px',
                border: '1px solid',
                borderColor: activeType === type ? 'var(--green-deep)' : 'var(--border)',
                background: activeType === type ? 'var(--green-deep)' : 'transparent',
                color: activeType === type ? '#fff' : 'var(--text-md)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {POST_TYPE_LABELS[type] || type}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      <p
        className="text-center mb-8"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          color: 'var(--text-light)',
        }}
      >
        {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
      </p>

      {/* Card grid */}
      {filtered.length > 0 ? (
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          }}
        >
          {filtered.map((post) => (
            <a
              key={post._id}
              href={`/fashion/${post.slug.current}`}
              className="fashion-filter-card group block"
              style={{ transition: 'transform 0.35s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.35s ease' }}
            >
              <div className="overflow-hidden relative">
                <div
                  style={{
                    transition: 'transform 0.5s cubic-bezier(0.2, 0, 0, 1)',
                  }}
                  className="group-hover:scale-[1.03]"
                >
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      srcSet={post.imageSrcSet}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      alt={post.title}
                      loading="lazy"
                      className="w-full object-cover block"
                      style={{ aspectRatio: '3/4' }}
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center"
                      style={{
                        aspectRatio: '3/4',
                        background: `linear-gradient(145deg, ${post.bgColor || '#DDD5C9'}, ${post.bgColor || '#DDD5C9'}CC)`,
                      }}
                    >
                      <span
                        style={{
                          color: 'rgba(0,0,0,0.1)',
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: 2,
                          textTransform: 'uppercase',
                          fontFamily: 'var(--font-sans)',
                        }}
                      >
                        photo
                      </span>
                    </div>
                  )}
                </div>
                {/* Badge */}
                {post.postType && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      padding: '5px 12px',
                      background: 'rgba(255,255,255,0.92)',
                      backdropFilter: 'blur(8px)',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: 'var(--text)',
                      fontFamily: 'var(--font-sans)',
                      zIndex: 2,
                    }}
                  >
                    {POST_TYPE_LABELS[post.postType] || post.postType}
                  </span>
                )}
              </div>
              <div style={{ paddingTop: 14 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 16,
                    fontWeight: 600,
                    color: 'var(--text)',
                    margin: 0,
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {post.title}
                </h3>
                {post.description && (
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 12,
                      color: 'var(--text-light)',
                      marginTop: 6,
                      marginBottom: 0,
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div
          className="text-center py-16"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            color: 'var(--text-light)',
          }}
        >
          No posts found for this category.
        </div>
      )}

      <style>{`
        .fashion-filter-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </div>
  );
}
