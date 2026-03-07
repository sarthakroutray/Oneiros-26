import { useEffect, useRef, useState } from 'react';
import CosmicBackground from './CosmicBackground';
import DomeGallery from './DomeGallery';
import './MinorEvents.css';

const MINOR_EVENT_IMAGES = [
    '/minor_events/IMG_0186.webp',
    '/minor_events/IMG_0204.webp',
    '/minor_events/IMG_6541.webp',
    '/minor_events/DSC03734-Enhanced-NR.webp',
    '/minor_events/IMG_0074.webp',
    '/minor_events/IMG_0184-Enhanced-NR.webp',
    '/minor_events/IMG_0652-Enhanced-NR.webp',
    '/minor_events/IMG_4068-Enhanced-NR.webp',
    '/minor_events/IMG_4095-Enhanced-NR.webp',
    '/minor_events/IMG_6993-Enhanced-NR.webp',
    '/minor_events/IMG_7284-Enhanced-NR.webp',
    '/minor_events/016A4770.webp',
    '/minor_events/016A4786.webp',
    '/minor_events/016A4822-Enhanced-NR.webp',
    '/minor_events/IMG_0701-Enhanced-NR.webp',
    '/minor_events/IMG_6500-Enhanced-NR.webp',
    '/minor_events/IMG_6569.webp',
    '/minor_events/Woodstock-33.webp'
];

export default function MinorEvents() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const domeRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
    const [domeVisible, setDomeVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Lazy-mount the DomeGallery only when its section scrolls into view
    useEffect(() => {
        if (!domeRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setDomeVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px' } // start loading 300px before section appears
        );
        observer.observe(domeRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const elements = sectionRef.current?.querySelectorAll('.minor-events-animate');
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
        <div className="minor-events-page" ref={sectionRef}>
            {/* ── FIXED BACKGROUND — shared across all sections ──────── */}
            <div className="minor-events-fixed-bg">
                <CosmicBackground />
            </div>
            <img
                src="/favicon-nobg.png"
                alt=""
                className="minor-events-fixed-watermark"
                draggable={false}
            />

            {/* ── HERO — LANDING SECTION ───────────────────────────────── */}
            <section className="minor-events-hero">
                <h1 className="minor-events-hero-title">MINOR EVENTS</h1>

                <p className="minor-events-hero-tagline">
                    BEYOND THE MAIN STAGE
                    <span className="tagline-dot">·</span>
                    IGNITE THE SPARK
                </p>

                <div className="minor-events-hero-scroll">
                    <div className="minor-events-hero-scroll-line" />
                    <span className="minor-events-hero-scroll-text">Scroll</span>
                </div>
            </section>

            {/* ── LOWER SECTIONS ───────────────────────────────────────── */}
            <div className="minor-events-lower-wrapper">

                {/* ── ABOUT SECTION ─────────────────────────────────── */}
                <section className="minor-events-content">
                    <div className="minor-events-content-inner">
                        <p className="minor-events-label minor-events-animate minor-events-animate-delay-1">
                            EXPLORE MORE
                        </p>

                        <h2 className="minor-events-heading minor-events-animate minor-events-animate-delay-2">
                            The Side Constellations
                        </h2>

                        <p className="minor-events-subheading minor-events-animate minor-events-animate-delay-3">
                            Workshops, Competitions, and Activities
                        </p>

                        <p className="minor-events-body minor-events-animate minor-events-animate-delay-4">
                            Beyond the main stage lies a galaxy of smaller, yet equally brilliant events.
                            From intense technical workshops and gaming tournaments to expressive art competitions and
                            intellectual debates, the minor events of Oneiros provide a space for every talent to shine.
                        </p>

                        <div className="minor-events-dots minor-events-animate minor-events-animate-delay-5">
                            <span className="minor-events-dot minor-events-dot--pink" />
                            <span className="minor-events-dot minor-events-dot--cyan" />
                            <span className="minor-events-dot minor-events-dot--cyan" />
                        </div>
                    </div>
                </section>

                {/* ── WORKSHOP/ACTIVITIES SECTION ─────────────── */}
                <section className="minor-events-content minor-events-theme">
                    <div className="minor-events-content-inner">
                        <p className="minor-events-label minor-events-animate minor-events-animate-delay-1">
                            DIVE DEEPER
                        </p>

                        <h2 className="minor-events-heading minor-events-animate minor-events-animate-delay-2">
                            Creative Spaces
                        </h2>

                        <p className="minor-events-subheading minor-events-animate minor-events-animate-delay-3">
                            Engage · Learn · Compete
                        </p>

                        <p className="minor-events-body minor-events-animate minor-events-animate-delay-4">
                            Whether you want to learn a new skill in our curated workshops, compete with
                            peers in problem-solving hackathons, or simply take a break with casual
                            mini-games around the campus, there's a corner of the celestial canvas waiting for you.
                        </p>

                        <p className="minor-events-body minor-events-animate minor-events-animate-delay-5" style={{ marginTop: '1.5rem' }}>
                            Join clubs and societies as they host various immersive activities designed to challenge,
                            entertain, and spark creativity throughout the festival days.
                        </p>

                        <div className="minor-events-dots minor-events-animate minor-events-animate-delay-5" style={{ transitionDelay: '0.85s' }}>
                            <span className="minor-events-dot minor-events-dot--cyan" />
                            <span className="minor-events-dot minor-events-dot--pink" />
                            <span className="minor-events-dot minor-events-dot--cyan" />
                        </div>
                    </div>
                </section>

                {/* ── SHOWCASE GALLERY SECTION ──────────────────────────── */}
                <section className="minor-events-dome-section minor-events-animate" ref={domeRef}>
                    {domeVisible && (
                        <DomeGallery
                            images={MINOR_EVENT_IMAGES}
                            fit={isMobile ? 0.7 : 0.9}
                            minRadius={isMobile ? 60 : 60}
                            maxVerticalRotationDeg={0}
                            segments={isMobile ? 18 : 28}
                            dragDampening={5}
                            grayscale={false}
                            imageBorderRadius={isMobile ? "16px" : "50px"}
                        />
                    )}
                    <div className="minor-events-dome-overlay-text">
                        <p className="minor-events-dome-label minor-events-animate minor-events-animate-delay-1">THE ARCHIVE</p>
                        <h2 className="minor-events-dome-heading minor-events-animate minor-events-animate-delay-2">Constellations of Memory</h2>
                        <p className="minor-events-dome-subheading minor-events-animate minor-events-animate-delay-3">Drag to explore the cosmos</p>
                    </div>
                </section>

                {/* ── VALUES MARQUEE CAROUSEL ──────────────────────────── */}
                <section className="minor-events-marquee-section">
                    <div className="minor-events-marquee-track">
                        {[0, 1].map((copy) => (
                            <div className="minor-events-marquee-slide" key={copy} aria-hidden={copy === 1}>
                                {['Workshops', 'Hackathons', 'Esports', 'Trivia', 'Debates', 'Art'].map((word) => (
                                    <span key={word} className="minor-events-marquee-word">
                                        <span className="minor-events-marquee-dot">✦</span>
                                        {word}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── MORE INFO SECTION ───────────────────── */}
                <section className="minor-events-content minor-events-festival">
                    <div className="minor-events-content-inner">
                        <p className="minor-events-label minor-events-animate minor-events-animate-delay-1">
                            GET INVOLVED
                        </p>

                        <h2 className="minor-events-heading minor-events-heading--large minor-events-animate minor-events-animate-delay-2">
                            Join In
                        </h2>

                        <div className="minor-events-divider minor-events-animate minor-events-animate-delay-2" />

                        <p className="minor-events-subheading minor-events-animate minor-events-animate-delay-3">
                            Register now and be part of the experience
                        </p>

                        <p className="minor-events-body minor-events-animate minor-events-animate-delay-4">
                            Schedules for minor events will be updated dynamically. Make sure to keep
                            an eye on the festival itinerary and register for your favorite activities before slots fill up!
                        </p>

                        <div className="minor-events-dots minor-events-animate minor-events-animate-delay-5" style={{ transitionDelay: '0.85s' }}>
                            <span className="minor-events-dot minor-events-dot--cyan" />
                            <span className="minor-events-dot minor-events-dot--pink" />
                            <span className="minor-events-dot minor-events-dot--cyan" />
                        </div>
                    </div>
                </section>

                {/* ── STATS FOOTER ─────────────────────────────────────── */}
                <section className="minor-events-stats minor-events-animate">
                    {[
                        { value: '50+', label: 'Competitions' },
                        { value: '20+', label: 'Workshops' },
                        { value: 'Daily', label: 'Activities' },
                    ].map((stat) => (
                        <div key={stat.label} className="minor-events-stat">
                            <span className="minor-events-stat-value">{stat.value}</span>
                            <span className="minor-events-stat-label">{stat.label}</span>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
