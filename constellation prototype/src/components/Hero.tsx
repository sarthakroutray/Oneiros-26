import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.3 + i * 0.15, duration: 0.8, ease: 'easeOut' as const },
    }),
};

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
    );
    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        setIsMobile(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [breakpoint]);
    return isMobile;
}

export default function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    // Parallax: title scales up and fades as you scroll past hero
    const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const subtitleY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
    const ctaY = useTransform(scrollYProgress, [0, 0.5], [0, 120]);
    const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <section className="hero" id="home" ref={ref}>
            <motion.div
                style={{
                    y: isMobile ? 0 : bgY,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                {isMobile ? (
                    /* Static (no animation) on mobile */
                    <h1 className="hero-title">ONEIROS</h1>
                ) : (
                    <motion.h1
                        className="hero-title"
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        style={{
                            scale: titleScale,
                            opacity: titleOpacity,
                        }}
                    >
                        ONEIROS
                    </motion.h1>
                )}

                {isMobile ? (
                    <p className="hero-subtitle">Annual Cultural Festival</p>
                ) : (
                    <motion.p
                        className="hero-subtitle"
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        style={{ y: subtitleY, opacity: titleOpacity }}
                    >
                        Annual Cultural Festival
                    </motion.p>
                )}

                {isMobile ? (
                    <p className="hero-tagline">
                        Manipal University Jaipur · Where Dreams Meet the Cosmos
                    </p>
                ) : (
                    <motion.p
                        className="hero-tagline"
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        style={{ y: subtitleY, opacity: titleOpacity }}
                    >
                        Manipal University Jaipur · Where Dreams Meet the Cosmos
                    </motion.p>
                )}

                {isMobile ? (
                    <a href="#events" className="hero-cta">
                        <span>Explore Events</span>
                    </a>
                ) : (
                    <motion.a
                        href="#events"
                        className="hero-cta"
                        custom={3}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        style={{ y: ctaY, opacity: titleOpacity }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span>Explore Events</span>
                    </motion.a>
                )}
            </motion.div>

            {!isMobile && (
                <motion.div
                    className="hero-scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    style={{ opacity: titleOpacity }}
                >
                    <span>Scroll</span>
                    <div className="scroll-line" />
                </motion.div>
            )}
        </section>
    );
}

