import { useEffect, useRef } from 'react';
import CosmicBackground from './CosmicBackground';
import './About.css';

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elements = sectionRef.current?.querySelectorAll('.about-animate');
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
        <div className="about-page" ref={sectionRef}>
            {/* ── FIXED BACKGROUND — shared across all sections ──────── */}
            <div className="about-fixed-bg">
                <CosmicBackground />
            </div>
            <img
                src="/favicon-nobg.webp"
                alt=""
                className="about-fixed-watermark"
                draggable={false}
            />

            {/* ── HERO — LANDING SECTION ───────────────────────────────── */}
            <section className="about-hero">
                <h1 className="about-hero-title">ONEIROS 2026</h1>

                <p className="about-hero-tagline">
                    PAINT THE SKY
                    <span className="tagline-dot">·</span>
                    BE THE LIGHT
                </p>

                <div className="about-hero-scroll">
                    <div className="about-hero-scroll-line" />
                    <span className="about-hero-scroll-text">Scroll</span>
                </div>
            </section>

            {/* ── LOWER SECTIONS ───────────────────────────────────────── */}
            <div className="about-lower-wrapper">

                {/* ── ABOUT US SECTION ─────────────────────────────────── */}
                <section className="about-content">
                    <div className="about-content-inner">
                        <p className="about-label about-animate about-animate-delay-1">
                            WHO WE ARE
                        </p>

                        <h2 className="about-heading about-animate about-animate-delay-2">
                            About Us
                        </h2>

                        <p className="about-subheading about-animate about-animate-delay-3">
                            Manipal University Jaipur
                        </p>

                        <p className="about-body about-animate about-animate-delay-4">
                            Manipal University Jaipur (MUJ) stands as one of India's premier
                            technical universities, renowned for academic excellence, innovative
                            research, and a vibrant campus culture. Established in 2011, MUJ has
                            rapidly evolved into a hub for students pursuing world-class education
                            across engineering, management, design, and sciences.
                        </p>

                        <div className="about-dots about-animate about-animate-delay-5">
                            <span className="about-dot about-dot--pink" />
                            <span className="about-dot about-dot--cyan" />
                            <span className="about-dot about-dot--cyan" />
                        </div>
                    </div>
                </section>

                {/* ── THE CELESTIAL CANVAS — THEME SECTION ─────────────── */}
                <section className="about-content about-theme">
                    <div className="about-content-inner">
                        <p className="about-label about-animate about-animate-delay-1">
                            THE THEME
                        </p>

                        <h2 className="about-heading about-animate about-animate-delay-2">
                            The Celestial Canvas
                        </h2>

                        <p className="about-subheading about-animate about-animate-delay-3">
                            Paint the Sky · Be the Light
                        </p>

                        <p className="about-body about-animate about-animate-delay-4">
                            Oneiros '26 reimagines the campus as an immersive artistic universe,
                            a Cosmic Canvas where every student contributes to the narrative.
                            Focusing on the boundless nature of the cosmos, we replace rigid
                            structures with fluid creativity and expression. As night falls, the
                            environment shifts from a quiet void into a vibrant spectrum of
                            interstellar light and sound.
                        </p>

                        <p className="about-body about-animate about-animate-delay-5" style={{ marginTop: '1.5rem' }}>
                            This year's theme extends beyond visuals — it is a shared experience.
                            It transforms the festival from a spectacle to be watched into a moment
                            to be lived. It reflects the essence of Oneiros: evolving, uniting, and
                            illuminating the night through our collective presence.
                        </p>

                        <div className="about-dots about-animate about-animate-delay-5" style={{ transitionDelay: '0.85s' }}>
                            <span className="about-dot about-dot--cyan" />
                            <span className="about-dot about-dot--pink" />
                            <span className="about-dot about-dot--cyan" />
                        </div>
                    </div>
                </section>

                {/* ── VALUES MARQUEE CAROUSEL ──────────────────────────── */}
                <section className="about-marquee-section">
                    <div className="about-marquee-track">
                        {[0, 1].map((copy) => (
                            <div className="about-marquee-slide" key={copy} aria-hidden={copy === 1}>
                                {['Harmony', 'Expression', 'Energy', 'Infinity', 'Unity', 'Creation'].map((word) => (
                                    <span key={word} className="about-marquee-word">
                                        <span className="about-marquee-dot">✦</span>
                                        {word}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── THE FESTIVAL — ONEIROS SECTION ───────────────────── */}
                <section className="about-content about-festival">
                    <div className="about-content-inner">
                        <p className="about-label about-animate about-animate-delay-1">
                            THE FESTIVAL
                        </p>

                        <h2 className="about-heading about-heading--large about-animate about-animate-delay-2">
                            Oneiros
                        </h2>

                        <div className="about-divider about-animate about-animate-delay-2" />

                        <p className="about-subheading about-animate about-animate-delay-3">
                            Annual Cultural Fest · Manipal University Jaipur
                        </p>

                        <p className="about-body about-animate about-animate-delay-4">
                            Each year, Oneiros transforms the MUJ campus into a vibrant hub of
                            artistic expression, musical performances, technical competitions,
                            and cultural exchanges. With world-class artists, engaging workshops,
                            and thrilling events, Oneiros has become a landmark festival in
                            North India.
                        </p>

                        <p className="about-body about-animate about-animate-delay-5" style={{ marginTop: '1.5rem' }}>
                            The 2026 edition — <em className="about-highlight">The Celestial Canvas: Paint the Sky</em> — promises
                            to be our most euphoric year yet, blending high-energy festivities
                            with the soulful beauty of a painted universe.
                        </p>

                        <div className="about-dots about-animate about-animate-delay-5" style={{ transitionDelay: '0.85s' }}>
                            <span className="about-dot about-dot--cyan" />
                            <span className="about-dot about-dot--pink" />
                            <span className="about-dot about-dot--cyan" />
                        </div>
                    </div>
                </section>

                {/* ── STATS FOOTER ─────────────────────────────────────── */}
                <section className="about-stats about-animate">
                    {[
                        { value: '10,000+', label: 'Participants' },
                        { value: '20,000+', label: 'Footfall' },
                        { value: '15+', label: 'Clubs' },
                        { value: '80+', label: 'Events' },
                        { value: '5+', label: 'Artists' },
                        { value: '3 Days', label: 'Cultural Nights' },
                    ].map((stat) => (
                        <div key={stat.label} className="about-stat">
                            <span className="about-stat-value">{stat.value}</span>
                            <span className="about-stat-label">{stat.label}</span>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
