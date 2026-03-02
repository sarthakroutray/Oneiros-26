import { Suspense, lazy, useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';

const loadMap = () => import('./components/Map');
const Map = lazy(loadMap);

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

  useEffect(() => {
    if (preloaderDone) return;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;

    const warmupTimer = window.setTimeout(() => {
      void loadMap();
    }, 180);

    return () => window.clearTimeout(warmupTimer);
  }, [preloaderDone]);

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
      {/* Map mounts early so assets load in background while preloader runs. */}
      <Suspense fallback={null}>
        <Map
          showUi={preloaderDone}
          onReady={() => setSceneReady(true)}
        />
      </Suspense>

      {/* Navbar appears after preloader is complete */}
      {preloaderDone && <Navbar />}
    </div>
  );
}
