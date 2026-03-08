import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    const gradient = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [
            'linear-gradient(to bottom, #8B5CF6, #3B82F6)',
            'linear-gradient(to bottom, #EC4899, #8B5CF6)',
            'linear-gradient(to bottom, #F59E0B, #EC4899)',
        ]
    );

    return (
        <>
            {/* Track */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '3px',
                    height: '100vh',
                    background: 'rgba(255,255,255,0.04)',
                    zIndex: 200,
                }}
            />
            {/* Active trail */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '3px',
                    height: '100vh',
                    scaleY: scrollYProgress,
                    transformOrigin: 'top',
                    background: gradient,
                    zIndex: 201,
                    boxShadow: '0 0 12px rgba(139, 92, 246, 0.6)',
                }}
            />
            {/* Glow dot at tip */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: '-3px',
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: '#EC4899',
                    boxShadow: '0 0 20px #EC4899, 0 0 40px rgba(236, 72, 153, 0.4)',
                    zIndex: 202,
                    top: useTransform(scrollYProgress, v => `calc(${v * 100}vh - 4px)`),
                }}
            />
        </>
    );
}
