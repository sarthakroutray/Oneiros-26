import { useEffect, useRef, useState } from 'react';
import CosmicBackground from './CosmicBackground';
import './Team.css';

const TEAM = {
    convenors: [
        { name: 'Agam Bhasin', role: 'Convenor', image: '/team/Agam_Bhasin.webp' },
        { name: 'Jahnvi Chawla', role: 'Convenor', image: '/team/Jahnvi Chawla.webp' }
    ],
    coConvenors: [
        { name: 'Harsh Mangal', role: 'Co-Convenor', image: '/team/Harsh_Mangal.webp' },
        { name: 'Kamlnayan Panda', role: 'Co-Convenor', image: '/team/Kamlnayan_Panda.webp' },
        { name: 'Shambhavi Sharma', role: 'Co-Convenor', image: '/team/Shambhavi_Sharma.webp' },
        { name: 'Sidham Gupta', role: 'Co-Convenor', image: '/team/Sidham_Gupta.webp' },
        { name: 'Dinesh Choudhary', role: 'Co-Convenor', image: '/team/Dinesh_Choudhary.webp' }
    ],
    organisingSecretaries: [
        { name: 'Kali Vithlani', role: 'Organising Secretary', image: '/team/Kali_Vithlani.webp' },
        { name: 'Sukrit Sinha', role: 'Organising Secretary', image: '/team/Sukrit_sinha.webp' },
    ]
};

// Advanced Card Component with Mouse Tracking Glow + Lazy Loading
const TeamCard = ({ member, colorClass }: { member: any, colorClass: string }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [imgSrc, setImgSrc] = useState<string | null>(null); // lazy: null until in view

    // Intersection Observer: load image src only when card enters the viewport
    useEffect(() => {
        if (!member.image) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setImgSrc(member.image);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' } // start loading 200px before it enters view
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, [member.image]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            className={`team-card-elite ${colorClass}`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            style={{
                "--mouse-x": `${mousePos.x}px`,
                "--mouse-y": `${mousePos.y}px`
            } as React.CSSProperties}
        >
            <div className="team-card-border" />
            <div className="team-card-glow" />

            <div className="team-card-inner">
                <div className="team-avatar-container">
                    <div className="team-avatar-ring team-avatar-ring-1"></div>
                    <div className="team-avatar-ring team-avatar-ring-2"></div>
                    <div className="team-avatar-ring team-avatar-ring-3"></div>
                    <div className="team-avatar-wrapper">
                        {imgSrc ? (
                            <img
                                src={imgSrc}
                                alt={member.name}
                                className="team-avatar-img"
                                loading="lazy"
                                decoding="async"
                            />
                        ) : member.image ? (
                            // placeholder shimmer shown while image hasn't entered view yet
                            <div className="team-avatar-placeholder team-avatar-shimmer" />
                        ) : (
                            <div className="team-avatar-placeholder">✦</div>
                        )}
                    </div>
                </div>
                <div className="team-info">
                    <h3 className="team-name">{member.name}</h3>
                    <div className="team-role-badge">
                        <span className="team-role-text">{member.role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Team() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elements = sectionRef.current?.querySelectorAll('.team-animate');
        if (!elements) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const renderTeamSection = (members: any[], title: string, subtitle: string, delayClass: string, colorClass: string) => (
        <section className={`team-content ${colorClass}`}>
            <div className={`team-content-inner team-animate ${delayClass}`}>
                <div className="team-section-header">
                    <p className="team-label">{subtitle}</p>
                    <h2 className="team-heading">{title}</h2>
                    <div className="team-divider" />
                </div>

                <div className="team-grid">
                    {members.map((member, idx) => (
                        <TeamCard key={idx} member={member} colorClass={colorClass} />
                    ))}
                </div>
            </div>
        </section>
    );

    return (
        <div className="team-page" ref={sectionRef}>
            <div className="team-fixed-bg">
                <CosmicBackground />
            </div>

            <section className="team-hero">
                <div className="team-hero-content team-animate visible">
                    <h1 className="team-hero-title">
                        <span className="title-layer-1">Meet The Team</span>
                        <span className="title-layer-2">Meet The Team</span>
                    </h1>
                    <p className="team-hero-tagline">
                        THE VISIONARIES
                        <span className="tagline-dot">·</span>
                        THE CREATORS
                    </p>
                </div>
                <div className="team-hero-scroll">
                    <div className="team-hero-scroll-line" />
                    <span className="team-hero-scroll-text">Scroll</span>
                </div>
            </section>

            <div className="team-lower-wrapper">
                {renderTeamSection(TEAM.convenors, 'Convenors', 'LEADING THE COSMOS', 'team-animate-delay-1', 'color-pink')}
                {renderTeamSection(TEAM.coConvenors, 'Co-Convenors', 'GUIDING THE STELLAR PATH', 'team-animate-delay-2', 'color-cyan')}
                {renderTeamSection(TEAM.organisingSecretaries, 'Organising Secretaries', 'ORCHESTRATING THE GALAXY', 'team-animate-delay-3', 'color-purple')}
            </div>
        </div>
    );
}
