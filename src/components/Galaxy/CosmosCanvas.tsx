import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import StarField from './StarField';
import Nebula from './Nebula';
import ShootingStars from './ShootingStars';

export default function CosmosCanvas() {
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
      >
        <color attach="background" args={['#050510']} />
        <ambientLight intensity={0.1} />

        <StarField count={isMobile ? 600 : 1800} radius={50} speed={0.015} size={0.06} />
        <StarField count={isMobile ? 250 : 700} radius={30} speed={0.025} size={0.1} />
        <StarField count={isMobile ? 120 : 350} radius={80} speed={0.008} size={0.04} />

        <Nebula count={isMobile ? 1200 : 3000} />
        <ShootingStars />
      </Canvas>
    </div>
  );
}
