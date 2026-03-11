import { useCallback } from 'react';
import './TeleportBar.css';

const TELEPORT_TARGETS = [
    { page: 'about', label: 'About', color: '#00ffee' },
    { page: 'dome-portal', label: 'ono-exp', color: '#7c8cff' },
    { page: 'major-events', label: 'Major Events', color: '#ff6ef9' },
    { page: 'minor-events', label: 'Minor Events', color: '#cc44ff' },
    { page: 'artist', label: 'Artist', color: '#ffcc00' },
] as const;

export default function TeleportBar() {
    const handleTeleport = useCallback((page: string) => {
        window.dispatchEvent(
            new CustomEvent('teleport-to-marker', { detail: { page } }),
        );
    }, []);

    return (
        <div className="teleport-bar" role="navigation" aria-label="Quick teleport">
            <span className="teleport-header">✦ Click here to teleport ✦</span>
            <div className="teleport-buttons">
                {TELEPORT_TARGETS.map(({ page, label, color }) => (
                    <button
                        key={page}
                        className="teleport-btn"
                        onClick={() => handleTeleport(page)}
                        aria-label={`Teleport to ${label}`}
                        style={{ '--marker-color': color } as React.CSSProperties}
                    >
                        <span className="teleport-dot" />
                        <span className="teleport-label">{label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

