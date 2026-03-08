import { useEffect, useRef, memo } from 'react';

export default memo(function CosmicCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const trailsRef = useRef<HTMLDivElement[]>([]);
    const pos = useRef({ x: -100, y: -100 });
    const ringPos = useRef({ x: -100, y: -100 });
    const visible = useRef(false);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (!visible.current) visible.current = true;
        };
        const onLeave = () => { visible.current = false; };
        const onEnter = () => { visible.current = true; };

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);

        let raf: number;
        const trailPositions = Array.from({ length: 8 }, () => ({ x: -100, y: -100 }));

        const loop = () => {
            const { x, y } = pos.current;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${x - 6}px, ${y - 6}px)`;
                dotRef.current.style.opacity = visible.current ? '1' : '0';
            }

            ringPos.current.x += (x - ringPos.current.x) * 0.12;
            ringPos.current.y += (y - ringPos.current.y) * 0.12;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPos.current.x - 24}px, ${ringPos.current.y - 24}px)`;
                ringRef.current.style.opacity = visible.current ? '1' : '0';
            }

            for (let i = trailPositions.length - 1; i > 0; i--) {
                trailPositions[i].x += (trailPositions[i - 1].x - trailPositions[i].x) * 0.28;
                trailPositions[i].y += (trailPositions[i - 1].y - trailPositions[i].y) * 0.28;
            }
            trailPositions[0].x += (x - trailPositions[0].x) * 0.35;
            trailPositions[0].y += (y - trailPositions[0].y) * 0.35;

            trailsRef.current.forEach((el, i) => {
                if (el) {
                    const tp = trailPositions[i];
                    const size = 5 - i * 0.45;
                    el.style.transform = `translate(${tp.x - size / 2}px, ${tp.y - size / 2}px)`;
                    el.style.width = `${size}px`;
                    el.style.height = `${size}px`;
                    el.style.opacity = visible.current ? `${0.7 - i * 0.07}` : '0';
                }
            });

            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
        };
    }, []);

    return (
        <>
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    ref={el => { if (el) trailsRef.current[i] = el; }}
                    style={{
                        position: 'fixed', top: 0, left: 0,
                        borderRadius: '50%',
                        background: i < 4
                            ? 'rgba(139, 92, 246, 0.8)'
                            : 'rgba(236, 72, 153, 0.6)',
                        pointerEvents: 'none',
                        zIndex: 9997,
                    }}
                />
            ))}

            <div
                ref={ringRef}
                style={{
                    position: 'fixed', top: 0, left: 0,
                    width: 48, height: 48,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(139, 92, 246, 0.5)',
                    boxShadow: '0 0 16px rgba(139, 92, 246, 0.25), inset 0 0 12px rgba(139, 92, 246, 0.08)',
                    pointerEvents: 'none',
                    zIndex: 9998,
                }}
            />

            <div
                ref={dotRef}
                style={{
                    position: 'fixed', top: 0, left: 0,
                    width: 12, height: 12,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #fff 20%, rgba(139, 92, 246, 1) 70%, transparent 100%)',
                    boxShadow: '0 0 10px rgba(139, 92, 246, 0.8), 0 0 25px rgba(139, 92, 246, 0.4), 0 0 50px rgba(139, 92, 246, 0.15)',
                    pointerEvents: 'none',
                    zIndex: 9999,
                }}
            />
        </>
    );
});
