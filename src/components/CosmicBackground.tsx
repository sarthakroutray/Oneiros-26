import { memo } from 'react';
import './CosmicBackground.css';

// Pre-generate a lightweight star field once at module load.
// We keep the starry look but cut paint cost by reducing layer density.

const LAYER_CONFIGS = [
  { count: 220, sizeMin: 0.6, sizeMax: 1.7, duration: 140, opacity: 0.82, glowChance: 0.10 },
  { count: 120, sizeMin: 1.0, sizeMax: 2.8, duration: 200, opacity: 0.55, glowChance: 0.08 },
  { count: 60, sizeMin: 1.8, sizeMax: 4.0, duration: 280, opacity: 0.34, glowChance: 0.05 },
];

const COLORS = [
  '255,255,255',
  '255,255,255',
  '255,255,255',
  '0,220,255',
  '0,220,255',
  '160,80,255',
  '255,100,200',
  '0,180,255',
];

/**
 * Generates a CSS radial-gradient background-image string containing
 * all stars for a given layer as tiny circles — zero extra DOM nodes.
 */
const generateStarLayer = (cfg: typeof LAYER_CONFIGS[number]) => {
  const gradients: string[] = [];
  const shadows: string[] = [];

  for (let i = 0; i < cfg.count; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = cfg.sizeMin + Math.random() * (cfg.sizeMax - cfg.sizeMin);
    const rgb = COLORS[Math.floor(Math.random() * COLORS.length)];

    // Each star is a tiny radial-gradient dot
    gradients.push(
      `radial-gradient(${size}px circle at ${x.toFixed(2)}% ${y.toFixed(2)}%, rgba(${rgb},${cfg.opacity}) 0%, transparent 100%)`
    );

    // Add some glow via box-shadow (batched into one element)
    if (Math.random() < cfg.glowChance) {
      shadows.push(
        `${x.toFixed(1)}vw ${y.toFixed(1)}vh ${size * 2}px rgba(${rgb},${(cfg.opacity * 0.3).toFixed(2)})`
      );
    }
  }

  return { backgroundImage: gradients.join(','), boxShadow: shadows.join(',') };
};

const PRE_GENERATED_LAYERS = LAYER_CONFIGS.map((cfg, layerIdx) => {
  const { backgroundImage, boxShadow } = generateStarLayer(cfg);

  return (
    <div
      key={`layer-${layerIdx}`}
      style={{
        position: 'absolute',
        inset: '-50%',
        width: '200%',
        height: '200%',
        backgroundImage,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        boxShadow: boxShadow || undefined,
        animation: `cosmic-rotate ${cfg.duration}s linear infinite`,
        willChange: 'transform',
        contain: 'strict',
        transform: 'translateZ(0)',
      }}
    />
  );
});

const CosmicBackground = memo(function CosmicBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {PRE_GENERATED_LAYERS}
    </div>
  );
});

export default CosmicBackground;
