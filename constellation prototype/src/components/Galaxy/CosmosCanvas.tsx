import { Canvas } from '@react-three/fiber';
import StarField from './StarField';
import Nebula from './Nebula';
import ShootingStars from './ShootingStars';

export default function CosmosCanvas() {
    return (
        <div className="cosmos-canvas">
            <Canvas
                camera={{ position: [0, 0, 20], fov: 60 }}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                dpr={[1, 1.5]}
            >
                <color attach="background" args={['#050510']} />
                <ambientLight intensity={0.1} />

                {/* Multiple star layers for depth */}
                <StarField count={1800} radius={50} speed={0.015} size={0.06} />
                <StarField count={700} radius={30} speed={0.025} size={0.1} />
                <StarField count={350} radius={80} speed={0.008} size={0.04} />

                {/* Galaxy spiral */}
                <Nebula />

                {/* Shooting stars */}
                <ShootingStars />
            </Canvas>
        </div>
    );
}
