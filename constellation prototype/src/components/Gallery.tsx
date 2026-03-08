import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface GalleryItem {
    label: string;
    gradient: string;
    span: 'short' | 'medium' | 'tall' | 'xtall';
}

const galleryItems: GalleryItem[] = [
    { label: 'War of Bands', gradient: 'linear-gradient(135deg, #1a0533 0%, #4c1d95 60%, #7c3aed 100%)', span: 'tall' },
    { label: 'DJ Night', gradient: 'linear-gradient(160deg, #0c1445 0%, #1e40af 50%, #3b82f6 100%)', span: 'short' },
    { label: 'Fashion Show', gradient: 'linear-gradient(145deg, #2d0a3e 0%, #7c3aed 40%, #a78bfa 100%)', span: 'medium' },
    { label: 'Dance Battle', gradient: 'linear-gradient(135deg, #1a0533 0%, #be185d 50%, #f472b6 100%)', span: 'xtall' },
    { label: 'Star Night', gradient: 'linear-gradient(150deg, #0f172a 0%, #0369a1 50%, #38bdf8 100%)', span: 'medium' },
    { label: 'Campus Vibes', gradient: 'linear-gradient(135deg, #1e1b4b 0%, #6d28d9 60%, #8b5cf6 100%)', span: 'tall' },
    { label: 'Open Mic', gradient: 'linear-gradient(140deg, #1c1917 0%, #92400e 50%, #f59e0b 100%)', span: 'short' },
    { label: 'Art Exhibition', gradient: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #34d399 100%)', span: 'tall' },
    { label: 'Comedy Night', gradient: 'linear-gradient(155deg, #312e81 0%, #4f46e5 50%, #818cf8 100%)', span: 'medium' },
    { label: 'Cosplay', gradient: 'linear-gradient(135deg, #4a044e 0%, #c026d3 50%, #e879f9 100%)', span: 'short' },
    { label: 'Rap Battle', gradient: 'linear-gradient(145deg, #172554 0%, #1d4ed8 50%, #60a5fa 100%)', span: 'xtall' },
    { label: 'Flash Mob', gradient: 'linear-gradient(135deg, #3b0764 0%, #9333ea 50%, #c084fc 100%)', span: 'medium' },
];

const spanHeights: Record<string, string> = {
    short: '180px',
    medium: '240px',
    tall: '320px',
    xtall: '400px',
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function Gallery() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="section" id="gallery" ref={ref}>
            <motion.div
                className="section-header"
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp}
                transition={{ duration: 0.7 }}
            >
                <p className="section-label">✦ Memories From The Cosmos</p>
                <h2 className="section-title">Gallery</h2>
                <div className="section-divider" />
            </motion.div>

            <div className="pinterest-grid">
                {galleryItems.map((item, i) => (
                    <motion.div
                        className="pin-card"
                        key={item.label}
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
                        whileHover={{ y: -6 }}
                        style={{
                            background: item.gradient,
                            height: spanHeights[item.span],
                        }}
                    >
                        {/* Subtle noise texture */}
                        <div className="pin-texture" />

                        {/* Radial highlight */}
                        <div
                            className="pin-highlight"
                            style={{
                                background: `radial-gradient(circle at ${30 + (i % 5) * 15}% ${20 + (i % 4) * 20}%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
                            }}
                        />

                        {/* Bottom label overlay */}
                        <div className="pin-overlay">
                            <span className="pin-label">{item.label}</span>
                        </div>


                    </motion.div>
                ))}
            </div>
        </section>
    );
}
