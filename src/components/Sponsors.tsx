import { useEffect, useRef } from 'react';
import CosmicBackground from './CosmicBackground';
import './Sponsors.css';

export default function Sponsors() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elements = sectionRef.current?.querySelectorAll('.sponsors-animate');
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
        <div className="sponsors-page" ref={sectionRef}>
            {/* ── FIXED BACKGROUND ──────── */}
            <div className="sponsors-fixed-bg">
                <CosmicBackground />
            </div>
            <img
                src="/favicon-nobg.webp"
                alt=""
                className="sponsors-fixed-watermark"
                draggable={false}
            />

            {/* ── HERO ───────────────────────────────── */}
            <section className="sponsors-hero">
                <h1 className="sponsors-hero-title">SPONSORS</h1>

                <p className="sponsors-hero-tagline">
                    POWERED BY VISION
                    <span className="sponsors-tagline-dot">·</span>
                    FUELLED BY BELIEF
                </p>

                <div className="sponsors-hero-scroll">
                    <div className="sponsors-hero-scroll-line" />
                    <span className="sponsors-hero-scroll-text">Scroll</span>
                </div>
            </section>

            {/* ── LOWER SECTIONS ───────────────────────────────────────── */}
            <div className="sponsors-lower-wrapper">

                {/* ── COMING SOON SECTION ─────────────────────────────── */}
                <section className="sponsors-content">
                    <div className="sponsors-content-inner">
                        <p className="sponsors-label sponsors-animate sponsors-animate-delay-1">
                            ONEIROS 2026
                        </p>

                        <h2 className="sponsors-heading sponsors-animate sponsors-animate-delay-2">
                            Our Sponsors
                        </h2>

                        <p className="sponsors-subheading sponsors-animate sponsors-animate-delay-3">
                            Something great is coming
                        </p>

                        <h2 className="sponsors-coming-soon sponsors-animate sponsors-animate-delay-4">
                            Coming Soon
                        </h2>

                        <p className="sponsors-coming-soon-sub sponsors-animate sponsors-animate-delay-5">
                            Our 2026 sponsors will be revealed here. Stay tuned.
                        </p>

                        <div className="sponsors-dots sponsors-animate sponsors-animate-delay-5">
                            <span className="sponsors-dot sponsors-dot--pink" />
                            <span className="sponsors-dot sponsors-dot--cyan" />
                            <span className="sponsors-dot sponsors-dot--cyan" />
                        </div>
                    </div>
                </section>

                {/* ── PREVIOUS SPONSORS SECTION ──────────────────────── */}
                <section className="sponsors-previous">
                    <div className="sponsors-content-inner">
                        <p className="sponsors-label sponsors-animate sponsors-animate-delay-1">
                            LEGACY
                        </p>

                        <h2 className="sponsors-heading sponsors-animate sponsors-animate-delay-2">
                            Previous Sponsors
                        </h2>

                        <p className="sponsors-subheading sponsors-animate sponsors-animate-delay-3">
                            Those who believed in us before
                        </p>
                    </div>

                    <div className="sponsors-image-wrap sponsors-animate sponsors-animate-delay-4">
                        <img
                            src="/previousSponsors.webp"
                            alt="Previous Sponsors of Oneiros"
                            className="sponsors-prev-image"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="sponsors-image-glow" />
                    </div>
                </section>

            </div>
        </div>
    );
}
