import { useEffect, useRef } from 'react';
import CosmicBackground from './CosmicBackground';
import './MajorEvents.css';

const MAJOR_EVENTS_LIST = [
    {
        id: 'requiem',
        title: 'REQUIEM',
        prize: '50k',
        desc: 'A high-octane musical showdown where vocalists and instrumentalists battle for harmonic supremacy.',
        layout: 'right', // Text on right side, images skewed /
        images: ['/minor_events/IMG_0186.webp', '/minor_events/IMG_0204.webp', '/minor_events/IMG_6541.webp']
    },
    {
        id: 'destival',
        title: 'DESTIVAL',
        prize: '60k',
        desc: 'A high-energy dance competition celebrating rhythm, choreography, and the art of movement.',
        layout: 'left', // Text on left side, images skewed \
        images: ['/minor_events/DSC03734-Enhanced-NR.webp', '/minor_events/IMG_0074.webp', '/minor_events/IMG_0184-Enhanced-NR.webp']
    },
    {
        id: 'cosmos',
        title: 'COSMOS',
        prize: '40k',
        desc: 'A dazzling fashion showcase where style meets avant-garde creativity.',
        layout: 'right',
        images: ['/minor_events/IMG_0652-Enhanced-NR.webp', '/minor_events/IMG_4068-Enhanced-NR.webp', '/minor_events/IMG_4095-Enhanced-NR.webp']
    },
    {
        id: 'spot-photography',
        title: 'SPOT PHOTOGRAPHY',
        prize: '20k',
        desc: 'A 2-hour challenge to capture three raw, unprocessed shots on a surprise theme.',
        layout: 'left',
        images: ['/minor_events/IMG_6993-Enhanced-NR.webp', '/minor_events/IMG_7284-Enhanced-NR.webp', '/minor_events/016A4770.webp']
    },
    {
        id: 'behas',
        title: 'BEHAS',
        prize: '30k',
        desc: 'A fierce parliamentary debate tournament where logic and rhetoric determine the champions.',
        layout: 'right',
        images: ['/minor_events/016A4786.webp', '/minor_events/016A4822-Enhanced-NR.webp', '/minor_events/IMG_0701-Enhanced-NR.webp']
    },
    {
        id: 'nukkad-natak',
        title: 'NUKKAD NATAK',
        prize: '40k',
        desc: 'A powerful street play competition bringing impactful stories and vibrant energy to the open air.',
        layout: 'left',
        images: ['/minor_events/IMG_6500-Enhanced-NR.webp', '/minor_events/IMG_6569.webp', '/minor_events/Woodstock-33.webp']
    }
];

export default function MajorEvents() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elements = sectionRef.current?.querySelectorAll('.major-events-animate');
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
        <div className="major-events-page" ref={sectionRef}>
            {/* ── FIXED BACKGROUND ──────── */}
            <div className="major-events-fixed-bg">
                <CosmicBackground />
            </div>
            <img
                src="/favicon-nobg.png"
                alt=""
                className="major-events-fixed-watermark"
                draggable={false}
            />

            {/* ── HERO — LANDING SECTION ───────────────────────────────── */}
            <section className="major-events-hero">
                <h1 className="major-events-hero-title">MAJOR EVENTS</h1>

                <p className="major-events-hero-tagline">
                    FRONT AND CENTER
                    <span className="tagline-dot">·</span>
                    THE FLAGSHIP EXPERIENCE
                </p>

                <div className="major-events-hero-scroll">
                    <div className="major-events-hero-scroll-line" />
                    <span className="major-events-hero-scroll-text">Scroll</span>
                </div>
            </section>

            {/* ── LOWER SECTIONS ───────────────────────────────────────── */}
            <div className="major-events-lower-wrapper">

                {/* ── ABOUT SECTION (Merged Flagship Info) ──────────────── */}
                <section className="major-events-content">
                    <div className="major-events-content-inner">
                        <p className="major-events-label major-events-animate major-events-animate-delay-1">
                            THE HEADLINERS
                        </p>

                        <h2 className="major-events-heading major-events-animate major-events-animate-delay-2">
                            Flagship Competitions
                        </h2>

                        <p className="major-events-subheading major-events-animate major-events-animate-delay-3">
                            The pinnacle of talent, performance, and rivalry
                        </p>

                        <p className="major-events-body major-events-animate major-events-animate-delay-4">
                            Our Major Events are the centerpiece of the Oneiros experience. These high-octane 
                            competitions draw participants from across the nation to showcase elite-level skills. 
                            From battle of the bands and intense dance-offs to large-scale fashion shows, the 
                            major events stage is where legends are born.
                        </p>

                        <p className="major-events-body major-events-animate major-events-animate-delay-5" style={{ marginTop: '1.5rem' }}>
                            Witness the convergence of passion and energy under the celestial sky. The production 
                            quality, massive crowds, and sheer talent on display turn these nights into an 
                            unforgettable spectacle. Prepare to be amazed as the best of the best compete for the 
                            grandest prizes and the ultimate glory defining Oneiros 2026.
                        </p>

                        <div className="major-events-dots major-events-animate major-events-animate-delay-5" style={{ transitionDelay: '0.85s' }}>
                            <span className="major-events-dot major-events-dot--pink" />
                            <span className="major-events-dot major-events-dot--cyan" />
                            <span className="major-events-dot major-events-dot--cyan" />
                        </div>
                    </div>
                </section>

                {/* ── ALTERNATING EVENT SHOWCASES ──────────────────────────── */}
                <section className="major-events-showcases">
                    {MAJOR_EVENTS_LIST.map((event) => (
                        <div key={event.id} className={`event-showcase layout-${event.layout} major-events-animate major-events-animate-delay-1`}>
                            <div className="event-text">
                                <h2 className="event-title">{event.title}</h2>
                                <p className="event-prize">Prize Pool: {event.prize}</p>
                                <p className="event-desc">{event.desc}</p>
                            </div>
                            <div className="event-collage">
                                <div className="collage-img-wrapper img-1">
                                    <img src={event.images[0]} alt={event.title} />
                                </div>
                                <div className="collage-img-wrapper img-2">
                                    <img src={event.images[1]} alt={event.title} />
                                </div>
                                <div className="collage-img-wrapper img-3">
                                    <img src={event.images[2]} alt={event.title} />
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* ── VALUES MARQUEE CAROUSEL ──────────────────────────── */}
                <section className="major-events-marquee-section">
                    <div className="major-events-marquee-track">
                        {[0, 1].map((copy) => (
                            <div className="major-events-marquee-slide" key={copy} aria-hidden={copy === 1}>
                                {['Battle of Bands', 'Fashion Show', 'Dance Off', 'Pronite', 'Comedy', 'EDM'].map((word) => (
                                    <span key={word} className="major-events-marquee-word">
                                        <span className="major-events-marquee-dot">✦</span>
                                        {word}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── STATS FOOTER ─────────────────────────────────────── */}
                <section className="major-events-stats major-events-animate">
                    {[
                        { value: '5L+', label: 'Prize Pool' },
                        { value: '4+', label: 'Flagship Events' },
                        { value: 'Prime', label: 'Time Slots' },
                    ].map((stat) => (
                        <div key={stat.label} className="major-events-stat">
                            <span className="major-events-stat-value">{stat.value}</span>
                            <span className="major-events-stat-label">{stat.label}</span>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
