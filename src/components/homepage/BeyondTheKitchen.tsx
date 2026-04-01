/**
 * BeyondTheKitchen.tsx
 * React island (client:visible) - Interactive door animation.
 * Teal gradient background with floating particles.
 * Two portal cards: Art & Painting + My Favorites (shop).
 *
 * All section text, CTA labels, and text colors are editable via Sanity homepageSettings.
 *
 * Animation sequence:
 * 1. Section becomes 25% visible -> fade in header text, door, and cards
 * 2. Hover over door -> door swings open revealing image behind it
 * 3. Mouse leaves door -> door swings closed
 *
 * Uses deterministic particle positions (not Math.random) for SSR hydration safety.
 */
import { useState, useEffect, useRef } from "react";

// ─── TYPES ───
interface ArtPost {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

interface ShopText {
  title?: string;
  description?: string;
  ctaText?: string;
}

interface Props {
  artPost: ArtPost | null;
  shopText: ShopText | null;
  sectionLabel?: string | null;
  sectionHeading?: string | null;
  sectionSubheading?: string | null;
  artCtaText?: string | null;
  shopCtaText?: string | null;
  artCardImageUrl?: string | null;
  shopCardImageUrl?: string | null;
  doorImageUrl?: string | null;
  headingColor?: string | null;
  subheadingColor?: string | null;
}

// ─── PORTAL CARD ───
function PortalCard({
  label,
  title,
  desc,
  cta,
  href,
  bgGrad,
  imageUrl,
}: {
  label: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  bgGrad: [string, string];
  imageUrl?: string | null;
}) {
  return (
    <a href={href} className="btk-portal-card">
      <div
        className="btk-portal-image"
        style={{
          background: imageUrl ? "none" : `linear-gradient(135deg, ${bgGrad[0]}, ${bgGrad[1]})`,
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <span className="btk-portal-image-label">photo</span>
        )}
      </div>
      <div className="btk-portal-content">
        <p className="btk-portal-label">{label}</p>
        <h3 className="btk-portal-title">{title}</h3>
        <p className="btk-portal-desc">{desc}</p>
        <span className="btk-portal-cta">{cta} -&gt;</span>
      </div>
    </a>
  );
}

// ─── MAIN COMPONENT ───
export default function BeyondTheKitchen({
  artPost,
  shopText,
  sectionLabel,
  sectionHeading,
  sectionSubheading,
  artCtaText,
  shopCtaText,
  artCardImageUrl,
  shopCardImageUrl,
  doorImageUrl,
  headingColor,
  subheadingColor,
}: Props) {
  const [doorOpen, setDoorOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Section text with fallbacks
  const label = sectionLabel || "Beyond the Kitchen";
  const heading =
    sectionHeading || "Step Through & See What Else I Create";
  const subheading =
    sectionSubheading ||
    "The kitchen is my happy place - but it's not my only one. Come explore my other creative passions.";

  // Card content with fallbacks
  const artTitle =
    artPost?.title || "Watercolor Botanicals Series";
  const artDesc =
    artPost?.description ||
    "Exploring the delicate beauty of kitchen herbs through watercolor and oil.";
  const artCta = artCtaText || "Explore My Art";

  const sTitle =
    shopText?.title || "Tools & Ingredients I Swear By";
  const sDesc =
    shopText?.description ||
    "Everything I use in my kitchen, studio, and workshop - curated picks I genuinely love.";
  const sCta = shopCtaText || shopText?.ctaText || "Shop My Favorites";

  // Deterministic particles (no Math.random - safe for SSR hydration)
  const particles = Array.from({ length: 10 }, (_, i) => ({
    size: 4 + ((i * 7) % 6),
    left: 10 + ((i * 17 + 3) % 80),
    top: 20 + ((i * 13 + 7) % 60),
    opacity: 0.1 + ((i * 3) % 15) / 100,
    delay: ((i * 7) % 30) / 10,
    duration: 3 + ((i * 11) % 4),
  }));

  // Text colors - use Sanity values, fallback to defaults
  const hColor = headingColor || "var(--green-bright, #2BA89E)";
  const sColor = subheadingColor || "var(--text-md, #4A4A4A)";

  return (
    <div ref={ref} className="btk-section">
      {/* Floating particles */}
      {visible &&
        particles.map((p, i) => (
          <div
            key={i}
            className="btk-particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}

      <div className="btk-inner">
        {/* Header */}
        <div
          className="btk-header"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <p className="btk-label">{label}</p>
          <h2 className="btk-heading" style={{ color: hColor }}>{heading}</h2>
          <p className="btk-sub" style={{ color: sColor }}>{subheading}</p>
        </div>

        {/* Door - opens on hover */}
        <div className="btk-door-area">
          <div
            className="btk-door-box"
            style={{ opacity: visible ? 1 : 0 }}
            onMouseEnter={() => setDoorOpen(true)}
            onMouseLeave={() => setDoorOpen(false)}
            onClick={() => { window.location.href = "/about"; }}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") window.location.href = "/about"; }}
          >
            <div className="btk-door-frame" />

            {/* Image or glow revealed behind the door */}
            <div className="btk-door-reveal">
              {doorImageUrl ? (
                <>
                  <img
                    src={doorImageUrl}
                    alt="Step through the doorway"
                    className="btk-door-image"
                  />
                  <div className="btk-door-vignette" />
                </>
              ) : (
                <div className="btk-glow" />
              )}
            </div>

            {/* The door panel that swings open on hover */}
            <div
              className={`btk-door ${doorOpen ? "btk-door--open" : ""}`}
            >
              {/* Arched window panes */}
              <div className="btk-pane btk-pane-arch-l" />
              <div className="btk-pane btk-pane-arch-r" />
              <div className="btk-pane-arch-c" />
              <div className="btk-pane-divider-v" />
              <div className="btk-pane btk-pane-top-l" />
              <div className="btk-pane btk-pane-top-r" />
              <div className="btk-pane-divider-h1" />
              <div className="btk-pane btk-pane-mid-l" />
              <div className="btk-pane btk-pane-mid-r" />
              <div className="btk-pane-divider-h2" />
              <div className="btk-pane btk-pane-bot-l" />
              <div className="btk-pane btk-pane-bot-r" />
              <div className="btk-knob" />
            </div>
            <div className="btk-floor" />
          </div>
        </div>

        {/* Portal cards - always visible once scrolled into view */}
        <div
          className="btk-cards"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <PortalCard
            label="Art & Painting"
            title={artTitle}
            desc={artDesc}
            cta={artCta}
            href="/art"
            bgGrad={["#5B7BA0", "#7B9BC0"]}
            imageUrl={artCardImageUrl}
          />
          <PortalCard
            label="My Favorites"
            title={sTitle}
            desc={sDesc}
            cta={sCta}
            href="/shop"
            bgGrad={["#6B8B5A", "#8BAA7A"]}
            imageUrl={shopCardImageUrl}
          />
        </div>
      </div>

      <style>{`
        .btk-section {
          background: linear-gradient(180deg, var(--cream, #F5F0E8) 0%, #E0EBE9 12%, #1B5E58 45%, #0D2A27 100%);
          padding: 100px 0 120px;
          position: relative;
          overflow: hidden;
        }
        .btk-particle {
          position: absolute;
          border-radius: 50%;
          background: var(--green-bright, #2BA89E);
          animation: btkFloat ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes btkFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        .btk-inner {
          max-width: 880px;
          margin: 0 auto;
          padding: 0 24px;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .btk-header { transition: all 0.8s ease; }
        .btk-label {
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--copper, #C47A2E);
          margin-bottom: 12px;
        }
        .btk-heading {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 400;
          margin: 0 0 14px;
          line-height: 1.2;
        }
        .btk-sub {
          font-family: var(--font-sans);
          font-size: 15px;
          max-width: 480px;
          margin: 0 auto 56px;
          line-height: 1.65;
        }

        /* Door */
        .btk-door-area {
          display: flex;
          justify-content: center;
          margin-bottom: 56px;
          perspective: 1200px;
        }
        .btk-door-box {
          width: 240px;
          position: relative;
          transition: opacity 0.6s ease 0.3s;
          cursor: pointer;
        }
        .btk-door-frame {
          position: absolute;
          inset: -8px;
          border: 3px solid rgba(220, 210, 195, 0.35);
          border-radius: 120px 120px 0 0;
          pointer-events: none;
          z-index: 3;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.15), inset 0 0 20px rgba(0, 0, 0, 0.05);
        }

        /* The reveal container sits behind the door */
        .btk-door-reveal {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 320px;
          border-radius: 120px 120px 0 0;
          overflow: hidden;
          z-index: 1;
          background: linear-gradient(180deg, rgba(27, 94, 88, 0.3), rgba(13, 42, 39, 0.5));
          -webkit-mask-image: radial-gradient(ellipse 85% 80% at 50% 45%, black 50%, transparent 100%);
          mask-image: radial-gradient(ellipse 85% 80% at 50% 45%, black 50%, transparent 100%);
        }
        .btk-door-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          opacity: 0.85;
          filter: saturate(0.9);
        }
        .btk-door-vignette {
          position: absolute;
          inset: 0;
          border-radius: 120px 120px 0 0;
          background:
            radial-gradient(ellipse at center 40%, transparent 35%, rgba(0, 0, 0, 0.4) 100%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.15) 100%);
          pointer-events: none;
        }

        /* The door panel */
        .btk-door {
          width: 100%;
          height: 320px;
          border-radius: 120px 120px 0 0;
          position: relative;
          overflow: hidden;
          transform-origin: left center;
          transform: perspective(800px) rotateY(0deg);
          transition: transform 1.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 1s ease;
          z-index: 2;
          background: linear-gradient(180deg, #6B5540, #4A3828, #3D2A1E);
          box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.25);
        }
        .btk-door--open {
          transform: perspective(800px) rotateY(-85deg);
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
        }

        /* Door pane structure - French door style with arch */
        .btk-pane {
          position: absolute;
          border: 1.5px solid rgba(180, 160, 130, 0.3);
        }
        .btk-pane-divider-v {
          position: absolute;
          top: 76px; bottom: 18px;
          left: 50%;
          width: 1.5px;
          background: rgba(180, 160, 130, 0.3);
        }
        .btk-pane-divider-h1 {
          position: absolute;
          top: 140px; left: 18px; right: 18px;
          height: 1.5px;
          background: rgba(180, 160, 130, 0.3);
        }
        .btk-pane-divider-h2 {
          position: absolute;
          top: 220px; left: 18px; right: 18px;
          height: 1.5px;
          background: rgba(180, 160, 130, 0.3);
        }

        /* Arch area (top section with fan shape) */
        .btk-pane-arch-l {
          top: 16px; left: 18px;
          width: calc(50% - 19px); height: 60px;
          border-radius: 60px 0 0 0;
          border-right: none;
        }
        .btk-pane-arch-r {
          top: 16px; right: 18px;
          width: calc(50% - 19px); height: 60px;
          border-radius: 0 60px 0 0;
          border-left: none;
        }
        .btk-pane-arch-c {
          position: absolute;
          top: 36px; left: 50%;
          transform: translateX(-50%);
          width: 2px; height: 40px;
          background: rgba(180, 160, 130, 0.3);
        }

        /* Upper panes */
        .btk-pane-top-l {
          top: 76px; left: 18px;
          width: calc(50% - 19px); height: 64px;
          border-right: none;
        }
        .btk-pane-top-r {
          top: 76px; right: 18px;
          width: calc(50% - 19px); height: 64px;
          border-left: none;
        }

        /* Middle panes */
        .btk-pane-mid-l {
          top: 140px; left: 18px;
          width: calc(50% - 19px); height: 80px;
          border-right: none;
          border-top: none;
        }
        .btk-pane-mid-r {
          top: 140px; right: 18px;
          width: calc(50% - 19px); height: 80px;
          border-left: none;
          border-top: none;
        }

        /* Bottom panes */
        .btk-pane-bot-l {
          top: 220px; left: 18px;
          width: calc(50% - 19px); height: 82px;
          border-right: none;
          border-top: none;
        }
        .btk-pane-bot-r {
          top: 220px; right: 18px;
          width: calc(50% - 19px); height: 82px;
          border-left: none;
          border-top: none;
        }

        .btk-knob {
          position: absolute;
          right: 24px;
          top: 52%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #BFA472;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
          z-index: 1;
        }

        .btk-glow {
          position: absolute;
          inset: 0;
          border-radius: 120px 120px 0 0;
          background: radial-gradient(ellipse at center, rgba(43, 168, 158, 0.15), transparent 70%);
          animation: btkPulse 3s ease-in-out infinite;
        }
        @keyframes btkPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .btk-floor {
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(220, 210, 195, 0.2), transparent);
        }

        /* Cards */
        .btk-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          max-width: 680px;
          margin: 0 auto;
          transition: all 0.8s ease 0.3s;
        }
        .btk-portal-card {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: block;
          color: inherit;
        }
        .btk-portal-card:hover {
          border-color: rgba(43, 168, 158, 0.4);
          transform: translateY(-4px);
        }
        .btk-portal-image {
          aspect-ratio: 3 / 2;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }
        .btk-portal-image-label {
          color: rgba(255, 255, 255, 0.1);
          font-size: 11px;
          font-family: var(--font-sans);
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .btk-portal-content { padding: 20px 22px 24px; }
        .btk-portal-label {
          font-family: var(--font-sans);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--green-bright, #2BA89E);
          margin: 0 0 8px;
        }
        .btk-portal-title {
          font-family: var(--font-serif);
          font-size: 19px;
          font-weight: 400;
          color: #F0EBE2;
          margin: 0 0 8px;
          line-height: 1.3;
        }
        .btk-portal-desc {
          font-family: var(--font-sans);
          font-size: 13px;
          color: #A8B8A4;
          margin: 0 0 18px;
          line-height: 1.5;
        }
        .btk-portal-cta {
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--green-bright, #2BA89E);
        }

        @media (max-width: 768px) {
          .btk-section { padding: 64px 0 80px; }
          .btk-heading { font-size: 28px; }
          .btk-cards { grid-template-columns: 1fr; max-width: 400px; }
          .btk-door-box { width: 200px; }
          .btk-door { height: 260px; }
          .btk-door-reveal { height: 260px; }
        }
      `}</style>
    </div>
  );
}
