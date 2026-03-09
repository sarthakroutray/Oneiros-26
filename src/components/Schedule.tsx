import { useEffect, useRef } from 'react';
import CosmicBackground from './CosmicBackground';
import './Schedule.css';

export default function Schedule() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elements = sectionRef.current?.querySelectorAll('.schedule-animate');
        if (!elements) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.15 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="schedule-page" ref={sectionRef}>
            <div className="schedule-fixed-bg">
                <CosmicBackground />
            </div>
            <img
                src="/favicon-nobg.webp"
                alt=""
                className="schedule-fixed-watermark"
                draggable={false}
            />

            {/* ── HERO ───────────────────────────────── */}
            <section className="schedule-hero">
                <h1 className="schedule-hero-title">SCHEDULE</h1>

                <p className="schedule-hero-tagline">
                    EVERY MOMENT
                    <span className="schedule-tagline-dot">·</span>
                    PLANNED TO PERFECTION
                </p>
            </section>

            {/* ── COMING SOON ────────────────────────── */}
            <section className="schedule-center">
                <p className="schedule-label schedule-animate schedule-animate-delay-1">ONEIROS 2026</p>

                <h2 className="schedule-coming-soon schedule-animate schedule-animate-delay-2">
                    Coming Soon
                </h2>

                <p className="schedule-sub schedule-animate schedule-animate-delay-3">
                    The full event schedule will be revealed shortly.
                </p>

                <div className="schedule-dots schedule-animate schedule-animate-delay-4">
                    <span className="schedule-dot schedule-dot--pink" />
                    <span className="schedule-dot schedule-dot--cyan" />
                    <span className="schedule-dot schedule-dot--cyan" />
                </div>
            </section>
        </div>
    );
}
