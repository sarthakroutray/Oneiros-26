import { useEffect, useRef } from 'react';

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

                {/* ── CURRENT SPONSORS SECTION ─────────────────────────────── */}
                <section className="sponsors-content">
                    <div className="sponsors-content-inner">
                        <p className="sponsors-label sponsors-animate sponsors-animate-delay-1">
                            ONEIROS 2026
                        </p>

                        <h2 className="sponsors-heading sponsors-animate sponsors-animate-delay-2">
                            Our Sponsors
                        </h2>

                        <p className="sponsors-subheading sponsors-animate sponsors-animate-delay-3">
                            The visionaries who make it possible
                        </p>
                    </div>

                    <div className="sponsors-grid sponsors-animate sponsors-animate-delay-4">
                        <div className="sponsor-item">
                            <div className="sponsor-image-wrap">
                                <img src="/sponsors/insurance.webp" alt="Insurance Partner" className="sponsor-logo" loading="lazy" />
                            </div>
                            <div className="sponsor-info">
                                <p className="sponsor-type">Insurance Partner</p>
                            </div>
                        </div>

                        <div className="sponsor-item">
                            <div className="sponsor-image-wrap">
                                <img src="/sponsors/foodandbeveragebp.webp" alt="Food & Beverage Partner" className="sponsor-logo" loading="lazy" />
                            </div>
                            <div className="sponsor-info">
                                <p className="sponsor-type">Food & Beverage Partner</p>
                            </div>
                        </div>

                        <div className="sponsor-item">
                            <div className="sponsor-image-wrap">
                                <img src="/sponsors/hospitality.webp" alt="Hospitality Partner" className="sponsor-logo" loading="lazy" />
                            </div>
                            <div className="sponsor-info">
                                <p className="sponsor-type">Hospitality Partner</p>
                            </div>
                        </div>

                        <div className="sponsor-item">
                            <div className="sponsor-image-wrap">
                                <img src="/sponsors/accomodation.webp" alt="Accommodation Partner" className="sponsor-logo" loading="lazy" />
                            </div>
                            <div className="sponsor-info">
                                <p className="sponsor-type">Accommodation Partner</p>
                            </div>
                        </div>

                        <div className="sponsor-item">
                            <div className="sponsor-image-wrap">
                                <img src="/sponsors/design.webp" alt="Design Partner" className="sponsor-logo" loading="lazy" />
                            </div>
                            <div className="sponsor-info">
                                <p className="sponsor-type">Design Partner</p>
                            </div>
                        </div>

                        <div className="sponsor-item">
                            <div className="sponsor-image-wrap">
                                <img src="/sponsors/fabric.webp" alt="Fabric Partner" className="sponsor-logo" loading="lazy" />
                            </div>
                            <div className="sponsor-info">
                                <p className="sponsor-type">Fabric Partner</p>
                            </div>
                        </div>

                        <div className="sponsor-item">
                            <div className="sponsor-image-wrap">
                                <img src="/sponsors/festival.webp" alt="Festival Partner" className="sponsor-logo" loading="lazy" />
                            </div>
                            <div className="sponsor-info">
                                <p className="sponsor-type">Festival Partner</p>
                            </div>
                        </div>

                        <div className="sponsor-item">
                            <div className="sponsor-image-wrap">
                                <img src="/sponsors/smartphone.webp" alt="Smartphone Partner" className="sponsor-logo" loading="lazy" />
                            </div>
                            <div className="sponsor-info">
                                <p className="sponsor-type">Smartphone Partner</p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
