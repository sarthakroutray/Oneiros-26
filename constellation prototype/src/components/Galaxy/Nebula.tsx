import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Nebula() {
    const ref = useRef<THREE.Points>(null!);
    const pointer = useRef(new THREE.Vector3());
    const raycaster = useRef(new THREE.Raycaster());
    const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 20));

    // Pre-allocate reusable objects to avoid per-frame allocations
    const tempVec = useMemo(() => new THREE.Vector3(), []);
    const invMatrix = useMemo(() => new THREE.Matrix4(), []);
    const localPointer = useMemo(() => new THREE.Vector3(), []);
    const ndcVec = useMemo(() => new THREE.Vector2(), []);
    const intersectVec = useMemo(() => new THREE.Vector3(), []);

    const { camera } = useThree();

    const [basePositions, positions, colors] = useMemo(() => {
        const count = 3000;
        const base = new Float32Array(count * 3);
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const color = new THREE.Color();

        for (let i = 0; i < count; i++) {
            const arm = Math.floor(Math.random() * 3);
            const armAngle = (arm / 3) * Math.PI * 2;
            const distance = Math.random() * 15;
            const angle = armAngle + distance * 0.5 + (Math.random() - 0.5) * 0.8;
            const spread = distance * 0.15;

            const x = Math.cos(angle) * distance + (Math.random() - 0.5) * spread;
            const y = (Math.random() - 0.5) * spread * 0.5;
            const z = Math.sin(angle) * distance + (Math.random() - 0.5) * spread;

            base[i * 3] = x;
            base[i * 3 + 1] = y;
            base[i * 3 + 2] = z;
            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            const t = distance / 15;
            if (t < 0.3) color.setHSL(0.85, 0.8, 0.7);
            else if (t < 0.6) color.setHSL(0.75, 0.7, 0.5);
            else color.setHSL(0.65, 0.6, 0.4);

            col[i * 3] = color.r;
            col[i * 3 + 1] = color.g;
            col[i * 3 + 2] = color.b;
        }

        return [base, pos, col];
    }, []);

    // Track mouse in world space — use useEffect for proper cleanup
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            ndcVec.set(
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            );
            raycaster.current.setFromCamera(ndcVec, camera);
            raycaster.current.ray.intersectPlane(plane.current, intersectVec);
            if (intersectVec) pointer.current.copy(intersectVec);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, [camera, ndcVec, intersectVec]);

    const groupRef = useRef<THREE.Group>(null!);

    useFrame((_state, delta) => {
        if (!ref.current) return;

        // Slow base rotation
        ref.current.rotation.y += delta * 0.03;

        // Particle repulsion from cursor
        const geo = ref.current.geometry;
        const posAttr = geo.attributes.position;
        const count = posAttr.count;
        const radius = 6; // influence radius
        const strength = 2.5;

        // Get pointer in local space — reuse pre-allocated matrix/vector
        invMatrix.copy(ref.current.matrixWorld).invert();
        localPointer.copy(pointer.current).applyMatrix4(invMatrix);

        for (let i = 0; i < count; i++) {
            const bx = basePositions[i * 3];
            const by = basePositions[i * 3 + 1];
            const bz = basePositions[i * 3 + 2];

            tempVec.set(bx, by, bz);
            const dist = tempVec.distanceTo(localPointer);

            if (dist < radius) {
                // Push away from cursor
                const factor = (1 - dist / radius) * strength;
                const dx = bx - localPointer.x;
                const dy = by - localPointer.y;
                const dz = bz - localPointer.z;
                const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;

                const targetX = bx + (dx / len) * factor;
                const targetY = by + (dy / len) * factor;
                const targetZ = bz + (dz / len) * factor;

                // Smooth lerp
                const l = 1 - Math.pow(0.05, delta);
                posAttr.setXYZ(i,
                    posAttr.getX(i) + (targetX - posAttr.getX(i)) * l,
                    posAttr.getY(i) + (targetY - posAttr.getY(i)) * l,
                    posAttr.getZ(i) + (targetZ - posAttr.getZ(i)) * l,
                );
            } else {
                // Spring back to base position
                const l = 1 - Math.pow(0.15, delta);
                posAttr.setXYZ(i,
                    posAttr.getX(i) + (bx - posAttr.getX(i)) * l,
                    posAttr.getY(i) + (by - posAttr.getY(i)) * l,
                    posAttr.getZ(i) + (bz - posAttr.getZ(i)) * l,
                );
            }
        }

        posAttr.needsUpdate = true;
    });

    return (
        <group ref={groupRef} position={[0, 0, -20]}>
            <points ref={ref} rotation={[0.8, 0, 0.3]}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[colors, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    vertexColors
                    size={0.12}
                    sizeAttenuation
                    transparent
                    opacity={0.6}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
}
