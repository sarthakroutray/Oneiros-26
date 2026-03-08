import { useState, useCallback, useEffect, useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import './NavigationHub.css';

interface NavElement {
  id: string;
  label: string;
  description: string;
  color: string;
  icon: string;
  image: string;
}



const NAV_ELEMENTS: NavElement[] = [
  { id: 'about', label: 'About', description: 'Where Dreams Meet the Cosmos', color: '#06B6D4', icon: '✦', image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80' },
  { id: 'major-events', label: 'Events', description: 'Festival Experiences', color: '#EC4899', icon: '◆', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80' },
  { id: 'minor-events', label: 'Activities', description: 'Creative Showcases', color: '#8B5CF6', icon: '✺', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80' },
  { id: 'gallery', label: 'Gallery', description: 'Visual Moments', color: '#7C3AED', icon: '◈', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80' },
  { id: 'artist', label: 'Artists', description: 'Star Performers', color: '#F59E0B', icon: '♪', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80' },
  { id: 'schedule', label: 'Schedule', description: 'Festival Timeline', color: '#3B82F6', icon: '◉', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80' },
  { id: 'sponsors', label: 'Sponsors', description: 'Our Partners', color: '#10B981', icon: '⟡', image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80' },
  { id: 'team', label: 'Team', description: 'The Dreamweavers', color: '#14B8A6', icon: '⊹', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80' },
  { id: 'contact', label: 'Contact', description: 'Reach Out', color: '#F43F5E', icon: '✧', image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80' },
];

interface NavigationHubProps {
  onNavigate: (page: string) => void;
  activePage: string | null;
}

export default function NavigationHub({ onNavigate, activePage }: NavigationHubProps) {
  // Start with the 'gallery' (Dome) card by default
  const [currentIndex, setCurrentIndex] = useState(() => {
    const galleryIdx = NAV_ELEMENTS.findIndex(e => e.id === 'gallery');
    return galleryIdx !== -1 ? galleryIdx : 0;
  });
  const [isOpening, setIsOpening] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const prevActivePageRef = useRef<string | null>(null);
  const wheelCooldownRef = useRef<number | null>(null);
  const isOpeningRef = useRef(false);

  // Keep ref in sync with state for use in callbacks that need latest value
  isOpeningRef.current = isOpening;

  // When returning from a page, play emerge animation
  useEffect(() => {
    const wasOnPage = prevActivePageRef.current !== null;
    const nowOnHub = activePage === null;

    if (wasOnPage && nowOnHub) {
      const idx = NAV_ELEMENTS.findIndex((e) => e.id === prevActivePageRef.current);
      if (idx !== -1) setCurrentIndex(idx);
      setIsReturning(true);
      const timer = setTimeout(() => setIsReturning(false), 600);
      prevActivePageRef.current = activePage;
      return () => clearTimeout(timer);
    }

    prevActivePageRef.current = activePage;
  }, [activePage]);

  // Sync index when navigated via Navbar (while hub is hidden)
  useEffect(() => {
    if (activePage) {
      const idx = NAV_ELEMENTS.findIndex((e) => e.id === activePage);
      if (idx !== -1) setCurrentIndex(idx);
    }
  }, [activePage]);

  const goTo = useCallback(
    (direction: 'next' | 'prev') => {
      if (isOpeningRef.current) return;
      setCurrentIndex((prev) => {
        if (direction === 'next') return (prev + 1) % NAV_ELEMENTS.length;
        return (prev - 1 + NAV_ELEMENTS.length) % NAV_ELEMENTS.length;
      });
    },
    []
  );

  const openPage = useCallback(() => {
    if (isOpeningRef.current) return;
    setIsOpening(true);
    isOpeningRef.current = true;
    setTimeout(() => {
      onNavigate(NAV_ELEMENTS[currentIndex].id);
      setIsOpening(false);
      isOpeningRef.current = false;
    }, 550);
  }, [currentIndex, onNavigate]);

  // ── Touch / mouse gesture ────────────────────────────────────────────
  const bind = useDrag(
    ({ movement: [mx, my], velocity: [vx], last }) => {
      if (activePage || !last) return;

      const absX = Math.abs(mx);
      const absY = Math.abs(my);
      const THRESHOLD = 40;

      // Upward swipe takes priority when clearly vertical
      if (absY > absX * 1.2 && my < -THRESHOLD) {
        openPage();
      } else if (absX > absY && (absX > THRESHOLD || vx > 0.3)) {
        if (mx > 0) goTo('prev');
        else goTo('next');
      }
    },
    { filterTaps: true, threshold: 10 }
  );

  // ── Keyboard ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (activePage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goTo('prev');
          break;
        case 'ArrowRight':
          e.preventDefault();
          goTo('next');
          break;
        case 'ArrowUp':
        case 'Enter':
          e.preventDefault();
          openPage();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePage, goTo, openPage]);

  // ── Mouse wheel / trackpad ───────────────────────────────────────────
  useEffect(() => {
    if (activePage) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelCooldownRef.current) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      if (Math.abs(delta) > 20) {
        if (delta > 0) goTo('next');
        else goTo('prev');
        wheelCooldownRef.current = window.setTimeout(() => {
          wheelCooldownRef.current = null;
        }, 350);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelCooldownRef.current) clearTimeout(wheelCooldownRef.current);
    };
  }, [activePage, goTo]);

  // ── Helpers ──────────────────────────────────────────────────────────
  const isHidden = !!activePage;

  const getOffset = (index: number) => {
    let offset = index - currentIndex;
    const half = NAV_ELEMENTS.length / 2;
    if (offset > half) offset -= NAV_ELEMENTS.length;
    if (offset < -half) offset += NAV_ELEMENTS.length;
    return offset;
  };

  // ── Render ───────────────────────────────────────────────────────────
  return (
    <div
      className={`nav-hub ${isHidden ? 'nav-hub--hidden' : ''} ${isOpening ? 'nav-hub--opening' : ''} ${isReturning ? 'nav-hub--returning' : ''}`}
      {...bind()}
      style={{ touchAction: 'none' }}
    >
      {/* ── Ambient Nebula ────────────────────────────────────────────── */}
      <div className="nav-hub__nebula" />

      {/* ── Carousel ──────────────────────────────────────────────────── */}
      <div className="nav-hub__carousel">
        {NAV_ELEMENTS.map((element, index) => {
          const offset = getOffset(index);
          const absOffset = Math.abs(offset);
          const isCenter = offset === 0;
          const visible = absOffset <= 3;

          return (
            <div
              key={element.id}
              className={`nav-hub__card ${isCenter ? 'nav-hub__card--active' : ''} ${isOpening && isCenter ? 'nav-hub__card--opening' : ''}`}
              style={
                {
                  '--offset': offset,
                  '--abs-offset': absOffset,
                  '--card-scale': Math.max(0.55, 1 - absOffset * 0.18),
                  '--card-opacity': Math.max(0, 1 - absOffset * 0.35),
                  '--element-color': element.color,
                  zIndex: 10 - absOffset,
                  visibility: visible ? 'visible' : 'hidden',
                } as React.CSSProperties
              }
              onClick={() => {
                if (isOpening) return;
                if (isCenter) openPage();
                else setCurrentIndex(index);
              }}
            >
              <div className="nav-hub__card-border" />
              <div className="nav-hub__card-image-wrapper">
                <img src={element.image} alt={element.label} className="nav-hub__card-image" loading="lazy" draggable={false} />
                <div className="nav-hub__card-overlay" />
              </div>
              <div className="nav-hub__card-glow" />
              <div className="nav-hub__card-content">
                <span className="nav-hub__card-icon">{element.icon}</span>
                <h2 className="nav-hub__card-label">{element.label}</h2>
                <p className="nav-hub__card-desc">{element.description}</p>
                {isCenter && !isOpening && (
                  <div className="nav-hub__card-hint">
                    <span className="nav-hub__hint-arrow">↑</span>
                    <span className="nav-hub__hint-text">Swipe up to explore</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Dot indicators ────────────────────────────────────────────── */}
      <div className="nav-hub__dots">
        {NAV_ELEMENTS.map((el, i) => (
          <button
            key={el.id}
            className={`nav-hub__dot ${i === currentIndex ? 'nav-hub__dot--active' : ''}`}
            style={{ '--dot-color': el.color } as React.CSSProperties}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to ${el.label}`}
          />
        ))}
      </div>

      {/* ── Desktop arrows ────────────────────────────────────────────── */}
      <button
        className="nav-hub__arrow nav-hub__arrow--left"
        onClick={() => goTo('prev')}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        className="nav-hub__arrow nav-hub__arrow--right"
        onClick={() => goTo('next')}
        aria-label="Next"
      >
        ›
      </button>

      {/* ── Bottom hint (mobile) ──────────────────────────────────────── */}
      <p className="nav-hub__gesture-hint">← swipe to navigate →</p>
    </div>
  );
}
