import React, { useEffect, useRef, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PixelatedHero.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showBrand, setShowBrand] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(1);

  const getRandomColor = () => colorPalette[Math.floor(Math.random() * colorPalette.length)];

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
  }, []);

  useEffect(() => {
    const pixelLayer = pixelLayerRef.current;
    if (!pixelLayer) return;

    const pixels = pixelLayer.querySelectorAll('.pixel');
    let lastScrollY = window.scrollY;
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
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Phase 0: First screen with pixels (0 to 75vh)
      // Phase 1: Second screen with "AI Automation Solutions" (75vh+)
      // Brand Reveal: "ALHAL TECH" appears at 110vh
      const newPhase = currentScrollY >= viewportHeight * 0.75 ? 1 : 0;
      setCurrentPhase(newPhase);

      const shouldShowBrand = currentScrollY >= viewportHeight * 1.1;
      setShowBrand(shouldShowBrand);

      // Pixels fade out when brand appears (starts at 1.1vh, completes by 2vh)
      const fadeStart = viewportHeight * 1.1;
      const fadeEnd = viewportHeight * 2;
      let pixelOpacity = 1;
      if (currentScrollY >= fadeStart) {
        const fadeProgress = Math.min(1, (currentScrollY - fadeStart) / (fadeEnd - fadeStart));
        pixelOpacity = 1 - fadeProgress;
      }

      // Apply opacity to all pixels
      pixels.forEach((pixel) => {
        const el = pixel as HTMLElement;
        el.style.opacity = pixelOpacity.toString();
      });

      // Update text color based on pixel opacity (fade from white/off-white to black)
      if (textOverlayRef.current) {
        // Interpolate between #e8e4df (232, 228, 223) and black (0, 0, 0)
        const r = Math.round(232 * pixelOpacity);
        const g = Math.round(228 * pixelOpacity);
        const b = Math.round(223 * pixelOpacity);
        textOverlayRef.current.style.color = `rgb(${r}, ${g}, ${b})`;
      }

      // Fade out the background shadow with the pixels
      const scrollProgress = Math.min(1, currentScrollY / viewportHeight);
      const shadowOpacity = Math.pow(1 - scrollProgress, 0.3);
      setBgOpacity(shadowOpacity);

      // Trigger color change every 75px of scroll for slower updates
      if (Math.abs(currentScrollY - lastScrollY) > 50) {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            shuffleColors();
            lastScrollY = currentScrollY;
            ticking = false;
          });
          ticking = true;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          <h1 className="pixel-overlay-title">
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
          </h1>
          <p className="pixel-overlay-subtitle">
            {titlePhases[currentPhase].description}
          </p>
        </div>

      </section>
    </div>
  );
};

export default PixelatedHero;
