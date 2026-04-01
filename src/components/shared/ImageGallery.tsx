/**
 * ImageGallery.tsx - Reusable image gallery with lightbox.
 * React island (client:load) for interactive lightbox behavior.
 *
 * Features:
 * - Responsive grid layout
 * - Click-to-open lightbox with full-screen image
 * - Keyboard navigation (left/right arrows, Escape to close)
 * - Previous/next buttons
 * - Image counter
 *
 * Usage:
 *   <ImageGallery client:load images={images} aspect="1/1" columns={3} />
 */
import { useState, useEffect, useCallback } from 'react';

interface GalleryImage {
  src: string;
  srcSet?: string;
  alt: string;
  bgColor?: string;
}

interface Props {
  images: GalleryImage[];
  /** Aspect ratio for grid thumbnails */
  aspect?: string;
  /** Number of columns on desktop */
  columns?: number;
  /** Enable right-click/drag protection (for art galleries) */
  protected?: boolean;
}

export default function ImageGallery({
  images,
  aspect = '1/1',
  columns = 3,
  protected: isProtected = false,
}: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isOpen = lightboxIndex !== null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, goNext, goPrev]);

  if (!images?.length) return null;

  const gridCols =
    columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : columns === 4
        ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
        : 'grid-cols-2 sm:grid-cols-3';

  return (
    <>
      {/* Grid */}
      <div
        className={`grid ${gridCols} gap-3 ${isProtected ? 'art-image-protect' : ''}`}
        onContextMenu={isProtected ? (e) => e.preventDefault() : undefined}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            className="gallery-thumb group relative overflow-hidden border-0 p-0 cursor-pointer bg-transparent"
            aria-label={`View ${img.alt || `image ${i + 1}`}`}
          >
            <div
              className="overflow-hidden"
              style={{ aspectRatio: aspect }}
            >
              {img.src ? (
                <img
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes={`(max-width: 640px) 50vw, (max-width: 1024px) 33vw, ${Math.round(100 / columns)}vw`}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover block transition-transform duration-500"
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)',
                  }}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(145deg, ${img.bgColor || '#DDD5C9'}, ${img.bgColor || '#DDD5C9'}CC)`,
                  }}
                >
                  <span
                    className="text-[11px] font-semibold tracking-wider uppercase"
                    style={{
                      color: 'rgba(0,0,0,0.1)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    photo
                  </span>
                </div>
              )}
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: 'rgba(0, 0, 0, 0.92)' }}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
              aria-label="Previous image"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={isProtected ? (e) => e.preventDefault() : undefined}
          >
            <img
              src={images[lightboxIndex].src}
              srcSet={images[lightboxIndex].srcSet}
              alt={images[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain block"
              style={isProtected ? { WebkitUserDrag: 'none', userSelect: 'none', pointerEvents: 'none' } as any : undefined}
            />
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
              aria-label="Next image"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-sm"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {lightboxIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}

      <style>{`
        .gallery-thumb:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}
