import { useState, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import './index.css';
import Preloader from './components/Preloader';
import CosmosCanvas from './components/Galaxy/CosmosCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollProgress from './components/ScrollProgress';

// Lazy-load heavy below-fold components for faster initial paint
const CosmicCursor = lazy(() => import('./components/CosmicCursor'));
const About = lazy(() => import('./components/About'));
const Events = lazy(() => import('./components/Events'));
const Timeline = lazy(() => import('./components/Timeline'));
const Gallery = lazy(() => import('./components/Gallery'));
const Footer = lazy(() => import('./components/Footer'));
const StoryInterlude = lazy(() => import('./components/StoryInterlude'));

// Detect touch devices — no need for the custom cursor on mobile
const isTouchDevice =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <CosmosCanvas />
      {!loading && !isTouchDevice && (
        <Suspense fallback={null}>
          <CosmicCursor />
        </Suspense>
      )}
      {!loading && <ScrollProgress />}
      <div className="page-content">
        <Navbar />
        <Hero />

        <Suspense fallback={null}>
          <StoryInterlude
            constellation="origin"
            line1="Chapter I — The Origin"
            line2="Every great festival begins with a dream that dares to be bigger than the universe itself."
          />

          <About />

          <StoryInterlude
            constellation="launch"
            line1="Chapter II — The Launch"
            line2="Nine stellar events. Three unforgettable days. One cosmic celebration."
          />

          <Events />

          <StoryInterlude
            constellation="journey"
            line1="Chapter III — The Journey"
            line2="From opening ceremony to star night — every moment is a constellation in the making."
          />

          <Timeline />

          <StoryInterlude
            constellation="memories"
            line1="Chapter IV — The Memories"
            line2="Moments frozen in time, glowing like distant stars across the cosmic canvas."
          />

          <Gallery />
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
