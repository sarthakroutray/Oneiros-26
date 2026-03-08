import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const constellations: Record<string, { stars: [number, number, number][]; lines: [number, number][] }> = {
    // [x, y, brightness(0-1)]
    origin: {
        stars: [
            [50, 5, 1], [30, 18, 0.7], [70, 18, 0.7], [18, 35, 0.5], [42, 32, 0.9], [58, 32, 0.9], [82, 35, 0.5],
            [25, 52, 0.6], [50, 48, 1], [75, 52, 0.6], [35, 68, 0.8], [50, 65, 0.6], [65, 68, 0.8], [50, 85, 1],
        ],
        lines: [[0, 1], [0, 2], [1, 4], [2, 5], [4, 5], [1, 3], [2, 6], [3, 7], [4, 8], [5, 8], [6, 9], [7, 10], [8, 11], [9, 12], [10, 11], [11, 12], [10, 13], [12, 13]],
    },
    launch: {
        stars: [
            [50, 5, 1], [42, 18, 0.8], [58, 18, 0.8], [35, 30, 0.6], [50, 28, 1], [65, 30, 0.6],
            [28, 45, 0.5], [45, 42, 0.7], [55, 42, 0.7], [72, 45, 0.5], [20, 62, 0.4], [38, 58, 0.8],
            [62, 58, 0.8], [80, 62, 0.4], [30, 78, 0.6], [50, 75, 0.9], [70, 78, 0.6],
        ],
        lines: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [3, 7], [4, 7], [4, 8], [5, 8], [5, 9], [6, 10], [7, 11], [8, 12], [9, 13], [11, 14], [11, 15], [12, 15], [12, 16]],
    },
    journey: {
        stars: [
            [10, 50, 0.7], [18, 30, 0.6], [30, 15, 0.8], [48, 10, 1], [65, 15, 0.8], [78, 28, 0.6],
            [88, 45, 0.7], [85, 62, 0.6], [75, 75, 0.8], [58, 82, 1], [40, 80, 0.8], [25, 72, 0.6],
            [15, 60, 0.5], [50, 45, 0.9], [38, 38, 0.5], [62, 38, 0.5],
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 0], [2, 14], [14, 13], [13, 15], [15, 4], [13, 9]],
    },
    memories: {
        stars: [
            [50, 5, 1], [38, 15, 0.7], [62, 15, 0.7], [28, 28, 0.8], [50, 25, 0.9], [72, 28, 0.8],
            [18, 42, 0.5], [38, 40, 0.7], [50, 38, 1], [62, 40, 0.7], [82, 42, 0.5],
            [25, 58, 0.6], [42, 55, 0.8], [58, 55, 0.8], [75, 58, 0.6], [35, 72, 0.7],
            [50, 70, 0.9], [65, 72, 0.7], [42, 88, 0.5], [58, 88, 0.5],
        ],
        lines: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [3, 7], [4, 8], [5, 9], [5, 10], [7, 8], [8, 9], [6, 11], [7, 12], [9, 13], [10, 14], [12, 15], [12, 16], [13, 16], [13, 17], [15, 18], [16, 18], [16, 19], [17, 19]],
    },
};

interface Props {
    line1: string;
    line2: string;
    constellation: keyof typeof constellations;
}

export default function StoryInterlude({ line1, line2, constellation }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.85, 1, 1, 0.85]);
    const textOp = useTransform(scrollYProgress, [0, 0.3, 0.45, 0.8, 1], [0, 0, 1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0.3, 0.45], [30, 0]);
    const draw = useTransform(scrollYProgress, [0.08, 0.55], [0, 1]);
    const glow = useTransform(scrollYProgress, [0.12, 0.4], [0, 1]);

    const c = constellations[constellation];

    return (
        <div ref={ref} style={{ height: 'clamp(50vh, 65vh, 75vh)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <motion.div style={{ opacity, y, scale, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 'clamp(20px, 5vw, 100px)', maxWidth: 1050, padding: '0 16px', width: '100%' }}>

                {/* Constellation */}
                <div style={{ position: 'relative', width: 'clamp(160px,22vw,260px)', height: 'clamp(160px,22vw,260px)', flexShrink: 0 }}>
                    {/* Radial backdrop glow */}
                    <motion.div style={{
                        position: 'absolute', inset: '-30%',
                        background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
                        opacity: glow, borderRadius: '50%',
                    }} />

                    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
                        <defs>
                            <radialGradient id={`sg-${constellation}`}>
                                <stop offset="0%" stopColor="#fff" />
                                <stop offset="40%" stopColor="rgba(139,92,246,0.6)" />
                                <stop offset="100%" stopColor="transparent" />
                            </radialGradient>
                            <filter id={`blur-${constellation}`}>
                                <feGaussianBlur stdDeviation="1.5" />
                            </filter>
                        </defs>

                        {/* Lines */}
                        {c.lines.map(([fi, ti], i) => {
                            const [fx, fy] = c.stars[fi];
                            const [tx, ty] = c.stars[ti];
                            const len = Math.sqrt((tx - fx) ** 2 + (ty - fy) ** 2);
                            return (
                                <motion.line key={`l${i}`}
                                    x1={fx} y1={fy} x2={tx} y2={ty}
                                    stroke="rgba(139,92,246,0.35)" strokeWidth="0.4"
                                    strokeDasharray={len}
                                    style={{ strokeDashoffset: useTransform(draw, [i / c.lines.length, Math.min((i + 1.5) / c.lines.length, 1)], [len, 0]) }}
                                />
                            );
                        })}

                        {/* Glow lines (duplicate, thicker, blurred) */}
                        {c.lines.map(([fi, ti], i) => {
                            const [fx, fy] = c.stars[fi];
                            const [tx, ty] = c.stars[ti];
                            const len = Math.sqrt((tx - fx) ** 2 + (ty - fy) ** 2);
                            return (
                                <motion.line key={`gl${i}`}
                                    x1={fx} y1={fy} x2={tx} y2={ty}
                                    stroke="rgba(139,92,246,0.15)" strokeWidth="2"
                                    filter={`url(#blur-${constellation})`}
                                    strokeDasharray={len}
                                    style={{ strokeDashoffset: useTransform(draw, [i / c.lines.length, Math.min((i + 1.5) / c.lines.length, 1)], [len, 0]) }}
                                />
                            );
                        })}

                        {/* Stars — outer glow */}
                        {c.stars.map(([cx, cy, b], i) => (
                            <motion.circle key={`og${i}`}
                                cx={cx} cy={cy} fill={`url(#sg-${constellation})`}
                                style={{
                                    r: useTransform(glow, [0, 1], [0, 3 + b * 3]),
                                    opacity: useTransform(draw, [Math.max(0, i / c.stars.length - 0.05), i / c.stars.length + 0.05], [0, 0.4 * b]),
                                }}
                            />
                        ))}

                        {/* Stars — core */}
                        {c.stars.map(([cx, cy, b], i) => (
                            <motion.circle key={`s${i}`}
                                cx={cx} cy={cy} fill="#fff"
                                style={{
                                    r: useTransform(glow, [0, 1], [0.4, 0.8 + b * 1.2]),
                                    opacity: useTransform(draw, [Math.max(0, i / c.stars.length - 0.05), i / c.stars.length + 0.05], [0, 0.5 + b * 0.5]),
                                }}
                            />
                        ))}

                        {/* Bright star cross-flares */}
                        {c.stars.filter(s => s[2] >= 0.9).map(([cx, cy], i) => (
                            <g key={`fl${i}`}>
                                <motion.line x1={cx - 5} y1={cy} x2={cx + 5} y2={cy}
                                    stroke="rgba(255,255,255,0.25)" strokeWidth="0.3"
                                    style={{ opacity: useTransform(glow, [0, 0.5, 1], [0, 0, 0.6]) }}
                                />
                                <motion.line x1={cx} y1={cy - 5} x2={cx} y2={cy + 5}
                                    stroke="rgba(255,255,255,0.25)" strokeWidth="0.3"
                                    style={{ opacity: useTransform(glow, [0, 0.5, 1], [0, 0, 0.6]) }}
                                />
                            </g>
                        ))}
                    </svg>
                </div>

                {/* Text side */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                        letterSpacing: '5px',
                        textTransform: 'uppercase',
                        color: 'rgba(139,92,246,0.75)',
                        marginBottom: 16,
                    }}>{line1}</p>

                    <motion.p style={{
                        opacity: textOp, y: textY,
                        fontSize: 'clamp(1.1rem, 2.4vw, 1.7rem)',
                        fontWeight: 500,
                        lineHeight: 1.5,
                        background: 'linear-gradient(135deg, #F0F0FF 0%, #C4B5FD 40%, #A78BFA 70%, #EC4899 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>{line2}</motion.p>
                </div>
            </motion.div>
        </div>
    );
}
