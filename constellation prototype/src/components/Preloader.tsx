import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<'loading' | 'reveal'>('loading');
    const lastProgress = useRef(0);

    useEffect(() => {
        let frame: number;
        let start = performance.now();
        const duration = 2800;

        const tick = (now: number) => {
            const elapsed = now - start;
            const t = Math.min(elapsed / duration, 1);
            // Eased progress curve
            const eased = t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const rounded = Math.round(eased * 100);

            // Only update state when the integer value changes
            if (rounded !== lastProgress.current) {
                lastProgress.current = rounded;
                setProgress(rounded);
            }

            if (t < 1) {
                frame = requestAnimationFrame(tick);
            } else {
                setPhase('reveal');
                setTimeout(onComplete, 900);
            }
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase !== 'reveal' || progress < 100 ? null : null}
            <motion.div
                key="preloader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    background: '#050510',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                {/* Animated star dots */}
                {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            x: `${(Math.random() - 0.5) * 100}vw`,
                            y: `${(Math.random() - 0.5) * 100}vh`,
                        }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                            duration: 1.5 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 1.5,
                            ease: 'easeInOut',
                        }}
                        style={{
                            position: 'absolute',
                            width: Math.random() * 3 + 1,
                            height: Math.random() * 3 + 1,
                            borderRadius: '50%',
                            background: '#fff',
                        }}
                    />
                ))}

                {/* Orbiting rings */}
                <div style={{ position: 'relative', width: 140, height: 140, marginBottom: 48 }}>
                    {/* Outer ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            border: '1px solid rgba(139, 92, 246, 0.25)',
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: -4,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: '#8B5CF6',
                            boxShadow: '0 0 16px #8B5CF6, 0 0 32px rgba(139, 92, 246, 0.4)',
                        }} />
                    </motion.div>

                    {/* Middle ring */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            inset: 20,
                            borderRadius: '50%',
                            border: '1px solid rgba(236, 72, 153, 0.2)',
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            bottom: -3,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: '#EC4899',
                            boxShadow: '0 0 12px #EC4899, 0 0 24px rgba(236, 72, 153, 0.4)',
                        }} />
                    </motion.div>

                    {/* Inner ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            inset: 40,
                            borderRadius: '50%',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: -3,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: '#3B82F6',
                            boxShadow: '0 0 12px #3B82F6, 0 0 24px rgba(59, 130, 246, 0.4)',
                        }} />
                    </motion.div>

                    {/* Center glow */}
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, #fff 0%, rgba(139, 92, 246, 0.4) 60%, transparent 100%)',
                            boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
                        }}
                    />
                </div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                        fontWeight: 800,
                        letterSpacing: 12,
                        background: 'linear-gradient(135deg, #fff 0%, #8B5CF6 50%, #EC4899 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: 32,
                    }}
                >
                    ONEIROS
                </motion.h1>

                {/* Progress bar */}
                <div style={{
                    width: 'clamp(200px, 30vw, 300px)',
                    height: 2,
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 1,
                    overflow: 'hidden',
                    marginBottom: 16,
                }}>
                    <motion.div
                        style={{
                            height: '100%',
                            borderRadius: 1,
                            background: 'linear-gradient(90deg, #8B5CF6, #EC4899, #3B82F6)',
                            backgroundSize: '200% 100%',
                            width: `${progress}%`,
                        }}
                        animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                </div>

                {/* Progress text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: '0.7rem',
                        letterSpacing: 4,
                        color: 'rgba(240, 240, 255, 0.4)',
                        textTransform: 'uppercase',
                    }}
                >
                    {phase === 'loading' ? `Entering the Cosmos · ${progress}%` : 'Welcome'}
                </motion.p>
            </motion.div>
        </AnimatePresence>
    );
}
