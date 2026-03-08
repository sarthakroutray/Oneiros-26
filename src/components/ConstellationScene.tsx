import CosmosCanvas from './Galaxy/CosmosCanvas';

interface ConstellationSceneProps {
  dimmed?: boolean;
}

export default function ConstellationScene({ dimmed = false }: ConstellationSceneProps) {
  return (
    <div
      style={{
        opacity: dimmed ? 0.35 : 1,
        transition: 'opacity 0.8s ease',
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <CosmosCanvas />
    </div>
  );
}
