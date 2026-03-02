import { useState, useEffect, useCallback } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Map from './components/Map';
import About from './components/About';
import Events from './components/Events';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import Schedule from './components/Schedule';

/**
 * Rendering order (z-index stack):
 *
 *   z-index 999  →  Preloader (video, fullscreen, unmounts after completion)
 *   z-index  50  →  Navbar (fixed, liquid glass, always above canvas)
 *   z-index  40  →  HUD / joystick / state badge (in index.html)
 *   z-index   2  →  Three.js canvas (Map.tsx, fixed, full viewport)
 */
export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [activePage, setActivePage] = useState<string | null>(null);

  const handleSceneReady = useCallback(() => {
    setSceneReady(true);
  }, []);

  const pageComponents: Record<string, React.ReactNode> = {
    about: <About />,
    events: <Events />,
    gallery: <Gallery />,
    schedule: <Schedule />,
    sponsors: <Sponsors />,
    contact: <Contact />,
  };

  // Hide 3D HUD / Joystick when navigating over-top pages to prevent interaction bleeding
  useEffect(() => {
    const joy = document.getElementById('joystick-zone');
    const hud = document.getElementById('hud');
    const stateEl = document.getElementById('state');
    const hints = document.getElementById('mobile-hints');

    const opacity = activePage ? '0' : '1';
    const pointerEvents = activePage ? 'none' : 'auto';

    [joy, hud, stateEl, hints].forEach(el => {
      if (el) {
        el.style.opacity = opacity;
        el.style.pointerEvents = pointerEvents;
        el.style.transition = 'opacity 0.2s ease';
      }
    });
  }, [activePage]);

  return (
    // Root: fixed, full viewport, black background
    <div style={{ position: 'fixed', inset: 0, background: '#000' }}>

      {/* ── PRELOADER (video + progress bar) ─────────────────────────────── */}
      {/* Stays mounted until onComplete fires, then fades out and unmounts */}
      {!preloaderDone && (
        <Preloader
          canComplete={sceneReady}
          onComplete={() => setPreloaderDone(true)}
        />
      )}

      {/* ── MAIN EXPERIENCE ───────────────────────────────────────────────── */}
      {/* 
        Three.js 3D world — fills the full viewport at z-index 2 
        Loads immediately in the background behind the z-index 999
        Preloader so WebGL shaders compile concurrently!
      */}
      <Map
        onNavigate={(page) => setActivePage(page || null)}
        onReady={handleSceneReady}
      />

      {/* Page overlay — shown when a nav link is clicked */}
      {activePage && pageComponents[activePage] && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 30,
          background: 'rgba(0,0,0,0.92)',
          overflowY: 'auto',
        }}>
          <button
            onClick={() => setActivePage(null)}
            style={{
              position: 'fixed',
              top: 20,
              right: 24,
              zIndex: 60,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: 22,
              width: 40,
              height: 40,
              borderRadius: '50%',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close"
          >
            ✕
          </button>
          {pageComponents[activePage]}
        </div>
      )}

      {/* Navbar — fixed at top, z-index 50 (above canvas and HUD).
          We also load this immediately to fetch its imagery.
      */}
      <Navbar onNavigate={(page) => setActivePage(page || null)} />
    </div>
  );
}
