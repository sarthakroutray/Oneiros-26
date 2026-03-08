import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MAX_STARS = 6;

export default function ShootingStars() {
    const meshRef = useRef<THREE.LineSegments>(null!);
    const timer = useRef(0);

    // Pre-allocate all shooting star data
    const starData = useRef(
        Array.from({ length: MAX_STARS }, () => ({
            active: false,
            startX: 0, startY: 0, startZ: 0,
            endX: 0, endY: 0, endZ: 0,
            progress: 0,
            speed: 1,
        }))
    );

    // Pre-allocate geometry buffer (2 vertices per star = 6 floats per star)
    const positions = useMemo(() => new Float32Array(MAX_STARS * 6), []);
    const bufferGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [positions]);

    const spawnStar = (idx: number) => {
        const s = starData.current[idx];
        s.active = true;
        s.progress = 0;
        s.speed = 0.8 + Math.random() * 1.2;

        s.startX = (Math.random() - 0.5) * 40;
        s.startY = 10 + Math.random() * 20;
        s.startZ = -10 - Math.random() * 20;

        s.endX = s.startX + (Math.random() - 0.5) * 15;
        s.endY = s.startY - 15 - Math.random() * 10;
        s.endZ = s.startZ + Math.random() * 5;
    };

    useFrame((_state, delta) => {
        timer.current += delta;

        // Spawn new star occasionally
        if (timer.current > 2 + Math.random() * 3) {
            timer.current = 0;
            // Find an inactive slot
            const slot = starData.current.findIndex(s => !s.active);
            if (slot !== -1) spawnStar(slot);
        }

        // Update positions buffer directly
        const posAttr = bufferGeometry.attributes.position as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;

        for (let i = 0; i < MAX_STARS; i++) {
            const s = starData.current[i];
            const base = i * 6;

            if (!s.active) {
                // Hide off-screen
                arr[base] = arr[base + 1] = arr[base + 2] = 0;
                arr[base + 3] = arr[base + 4] = arr[base + 5] = 0;
                continue;
            }

            s.progress += delta * s.speed;

            if (s.progress >= 1.2) {
                s.active = false;
                arr[base] = arr[base + 1] = arr[base + 2] = 0;
                arr[base + 3] = arr[base + 4] = arr[base + 5] = 0;
                continue;
            }

            const t = Math.min(s.progress, 1);
            const tTail = Math.max(0, s.progress - 0.15);

            // Tail position
            arr[base] = s.startX + (s.endX - s.startX) * tTail;
            arr[base + 1] = s.startY + (s.endY - s.startY) * tTail;
            arr[base + 2] = s.startZ + (s.endZ - s.startZ) * tTail;

            // Head position
            arr[base + 3] = s.startX + (s.endX - s.startX) * t;
            arr[base + 4] = s.startY + (s.endY - s.startY) * t;
            arr[base + 5] = s.startZ + (s.endZ - s.startZ) * t;
        }

        posAttr.needsUpdate = true;
    });

    return (
        <lineSegments ref={meshRef} geometry={bufferGeometry}>
            <lineBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.5}
                linewidth={1}
            />
        </lineSegments>
    );
}
