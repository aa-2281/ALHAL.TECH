import React, { useEffect, useRef, useMemo, useReducer, useCallback } from 'react';
import './PixelatedHero.css';

// Color palette from the reference (green/earthy tones)
const colorPalette = [
  'rgba(49, 48, 48, 1)',
  'rgb(30, 30, 30)',
  'rgb(60, 60, 60)',
  'rgba(141, 137, 137, 1)',
  'rgba(159, 153, 153, 1)',
  'rgba(23, 22, 22, 1)',   // Brand cyan
  'rgba(21, 20, 20, 1)',   // Brand red
];

interface PixelatedHeroProps {
  translations: {
    heroBadge: string;
    heroTitlePart1: string;
    heroTitlePart2: string;
    heroSubtitle: string;
    heroCTA: string;
    heroSecondCTA: string;
    heroPhase1Title: string;
    heroPhase1Subtitle: string;
    heroPhase1Desc: string;
    heroPhase2Title: string;
    heroPhase2Subtitle: string;
    heroPhase2Prefix: string;
    heroPhase2Brand: string;
    heroPhase2Desc: string;
  };
}

// Reducer for batched state updates
interface HeroState {
  currentPhase: number;
  showBrand: boolean;
  bgOpacity: number;
}

type HeroAction = {
  type: 'UPDATE_ALL';
  payload: HeroState;
};

const heroReducer = (state: HeroState, action: HeroAction): HeroState => {
  switch (action.type) {
    case 'UPDATE_ALL':
      // Only update if values actually changed
      if (
        state.currentPhase === action.payload.currentPhase &&
        state.showBrand === action.payload.showBrand &&
        state.bgOpacity === action.payload.bgOpacity
      ) {
        return state;
      }
      return action.payload;
    default:
      return state;
  }
};

const PixelatedHero: React.FC<PixelatedHeroProps> = ({ translations: t }) => {
  // Title content for different scroll phases, now using translations
  const titlePhases = useMemo(() => [
    { title: t.heroPhase1Title, prefix: '', subtitle: t.heroPhase1Subtitle, description: t.heroPhase1Desc },
    { title: t.heroPhase2Title, subtitle: t.heroPhase2Subtitle, prefix: t.heroPhase2Prefix, brand: t.heroPhase2Brand, description: t.heroPhase2Desc },
  ], [t]);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const pixelLayerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);

  // Use reducer for batched state updates
  const [state, dispatch] = useReducer(heroReducer, {
    currentPhase: 0,
    showBrand: false,
    bgOpacity: 1
  });

  const { currentPhase, showBrand, bgOpacity } = state;

  const getRandomColor = useCallback(() => colorPalette[Math.floor(Math.random() * colorPalette.length)], []);

  // Generate pixel grid - column-based structure with responsive sizing
  const pixelGrid = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const COLUMNS = isMobile ? 8 : 14;
    const ROWS = isMobile ? 18 : 11;

    const grid: Array<Array<{ col: number; row: number; color: string; key: string }>> = [];
    for (let col = 0; col < COLUMNS; col++) {
      const column: Array<{ col: number; row: number; color: string; key: string }> = [];
      for (let row = 0; row < ROWS; row++) {
        column.push({
          col,
          row,
          color: getRandomColor(),
          key: `${col}-${row}`
        });
      }
      grid.push(column);
    }
    return grid;
  }, [getRandomColor]);

  useEffect(() => {
    const pixelLayer = pixelLayerRef.current;
    if (!pixelLayer) return;

    const pixels = pixelLayer.querySelectorAll('.pixel');
    let rafId: number;
    let ticking = false;

    const shuffleColors = () => {
      // Only change ~30% of pixels at a time for smoother effect
      pixels.forEach((pixel) => {
        if (Math.random() > 0.7) {
          const el = pixel as HTMLElement;
          const newColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
          el.style.backgroundColor = newColor;
          el.style.boxShadow = `0 0 1px ${newColor}`;
        }
      });
    };

    const handleScroll = () => {
      // Cancel any pending RAF to prevent stacking
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        // Calculate all values
        const newPhase = scrollY >= vh * 0.75 ? 1 : 0;
        const shouldShowBrand = scrollY >= vh * 1.1;
        const scrollProgress = Math.min(1, scrollY / vh);
        const shadowOpacity = Math.pow(1 - scrollProgress, 0.3);

        // Batch all state updates into single dispatch
        dispatch({
          type: 'UPDATE_ALL',
          payload: {
            currentPhase: newPhase,
            showBrand: shouldShowBrand,
            bgOpacity: shadowOpacity
          }
        });

        // Calculate pixel opacity
        const fadeStart = vh * 1.1;
        const fadeEnd = vh * 2;
        let pixelOpacity = 1;
        if (scrollY >= fadeStart) {
          const fadeProgress = Math.min(1, (scrollY - fadeStart) / (fadeEnd - fadeStart));
          pixelOpacity = 1 - fadeProgress;
        }

        // Use CSS variable on container instead of updating each pixel
        pixelLayer.style.setProperty('--pixel-opacity', pixelOpacity.toString());

        // Update text color via CSS variables
        // Transition from off-white (#e8e4df = 232,228,223) to black (0,0,0) as pixels fade
        if (textOverlayRef.current) {
          // Start off-white, end black (inverted for white background)
          const r = Math.round(232 * pixelOpacity);
          const g = Math.round(228 * pixelOpacity);
          const b = Math.round(223 * pixelOpacity);
          textOverlayRef.current.style.color = `rgb(${r}, ${g}, ${b})`;
        }

        // Trigger color change every 75px of scroll (increased threshold)
        if (Math.abs(scrollY - lastScrollYRef.current) > 75) {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
              shuffleColors();
              lastScrollYRef.current = scrollY;
              ticking = false;
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className="pixelated-container" ref={containerRef}>
      <section className="hero-panel" ref={heroRef}>
        {/* Pixel Overlay Layer - Column based like reference */}
        <div className="pixel-layer" ref={pixelLayerRef}>
          {pixelGrid.map((column, colIndex) => (
            <div key={`col-${colIndex}`} className="pixel-column">
              {column.map((pixel) => (
                <div
                  key={pixel.key}
                  className="pixel"
                  data-col={pixel.col}
                  data-row={pixel.row}
                  style={{
                    backgroundColor: pixel.color,
                    // Add slight scale and box-shadow to cover sub-pixel gaps (white lines)
                    boxShadow: `0 0 1px ${pixel.color}`,
                    transform: 'scale(1.02)',
                    zIndex: 1
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Hero Content (revealed after pixels fade) */}
        <div className="hero-content" ref={heroContentRef}>
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">{t.heroBadge}</span>
          </div>
          <h1>
            <span className="title-dark">{t.heroTitlePart1}</span>
            <br />
            <span className="title-gradient">{t.heroTitlePart2}</span>
          </h1>
          <p>{t.heroSubtitle}</p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">
              {t.heroCTA}
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
            <a href="#services" className="btn-secondary">
              {t.heroSecondCTA}
            </a>
          </div>
        </div>

        {/* Text overlay on top of pixels - visible from start */}
        <div className={`pixel-overlay-text phase-${currentPhase}`} ref={textOverlayRef} style={{ color: '#e8e4df' }}>
          <div className="pixelatedTitleBg" style={{ opacity: bgOpacity, transition: 'opacity 0.5s ease' }}></div>
          <div className="pixel-overlay-title">
            {titlePhases[currentPhase].title}<br />
            {titlePhases[currentPhase].subtitle}
            {titlePhases[currentPhase].prefix && <><br />{titlePhases[currentPhase].prefix}</>}
            {titlePhases[currentPhase].brand && (
              <>
                <br />
                <span
                  style={{
                    opacity: showBrand ? 1 : 0,
                    transform: showBrand ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'inline-block',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    padding: '0.6rem 2.5rem',
                    borderRadius: '8px',
                    marginTop: '2rem',
                    fontSize: '0.7em',
                    letterSpacing: '0.2em',
                    fontWeight: '900'
                  }}
                >
                  {titlePhases[currentPhase].brand}
                </span>
              </>
            )}
          </div>
          <p className="pixel-overlay-subtitle">
            {titlePhases[currentPhase].description}
          </p>
        </div>

      </section>
    </div>
  );
};

export default React.memo(PixelatedHero, (prev, next) =>
  prev.translations === next.translations
);
