import { useEffect, useRef } from 'react';
import CosmicBackground from './CosmicBackground';
import './Artist.css';

export default function Artist() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elements = sectionRef.current?.querySelectorAll('.artist-animate');
        if (!elements) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="artist-page" ref={sectionRef}>
            {/* ── FIXED BACKGROUND — shared across all sections ──────── */}
            <div className="artist-fixed-bg">
                <CosmicBackground />
            </div>
            <img
                src="/favicon-nobg.webp"
                alt=""
                className="artist-fixed-watermark"
                draggable={false}
            />

            {/* ── HERO — LANDING SECTION ───────────────────────────────── */}
            <section className="artist-hero">
                <h1 className="artist-hero-title">ARTISTS</h1>

                <p className="artist-hero-tagline">

                    <span className="tagline-dot">·</span>
                    STARS OF THE NIGHT
                </p>

                <div className="artist-hero-scroll">
                    <div className="artist-hero-scroll-line" />
                    <span className="artist-hero-scroll-text">Scroll</span>
                </div>
            </section>

            {/* ── LOWER SECTIONS ───────────────────────────────────────── */}
            <div className="artist-lower-wrapper">
                {/* ── ARTIST ROSTER SECTION ─────────────────────────────────── */}
                <section className="artist-content">
                    <div className="artist-content-inner">
                        <p className="artist-label artist-animate artist-animate-delay-1">
                            PERFORMANCES
                        </p>

                        <h2 className="artist-heading artist-animate artist-animate-delay-2">
                            Coming Soon
                        </h2>

                        <p className="artist-subheading artist-animate artist-animate-delay-3">
                            The Celestial Lineup
                        </p>

                        <p className="artist-body artist-animate artist-animate-delay-4">
                            Stay tuned as we unveil the stellar lineup for Oneiros 2026.
                            Prepare to be enthralled by musical maestros, electrifying DJs,
                            and visionary performers who will illuminate our Cosmic Canvas.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
