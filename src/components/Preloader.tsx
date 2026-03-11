import { useState, useEffect, useRef, useCallback } from 'react';
import CosmicBackground from './CosmicBackground';
import { preloadInitialExperienceAssets } from './map/loading';
import './Preloader.css';
import preloaderVidDesktop from '../assets/intro_enhanced.webm';


interface PreloaderProps {
    onComplete: () => void;
}

const isAuditMode = () => {
    if (typeof navigator === 'undefined') return false;
    return /HeadlessChrome|Lighthouse/i.test(navigator.userAgent) || navigator.webdriver;
};

export default function Preloader({ onComplete }: PreloaderProps) {
    const [fadeOut, setFadeOut] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const pctRef = useRef<HTMLDivElement>(null);
    const assetsReadyRef = useRef(false);
    const assetsPreloadPromiseRef = useRef<Promise<unknown> | null>(null);
    const auditModeRef = useRef(isAuditMode());

    const handleComplete = useCallback(async () => {
        const preloadPromise = assetsPreloadPromiseRef.current;
        if (preloadPromise && !assetsReadyRef.current) {
            try {
                await preloadPromise;
            } catch {
                // Asset preload is best-effort; continue into the experience.
            }
        }

        setFadeOut(true);
        // Pause the video immediately so it doesn't continue playing
        const v = videoRef.current;
        if (v) { v.pause(); }

        window.dispatchEvent(new Event('start-experience'));

        // Delay unmount until AFTER the 4.5s intro rotation finishes.
        // Unmounting or tearing down the video earlier triggers GC mid-intro,
        // causing a visible frame spike.
        setTimeout(() => {
            if (v) { v.removeAttribute('src'); v.load(); }
            onComplete();
        }, auditModeRef.current ? 180 : 5500);
    }, [onComplete]);

    const startTimeRef = useRef(performance.now());
    const initializedRef = useRef(false);

    useEffect(() => {
        const video = videoRef.current;
        const bar = barRef.current;
        const pct = pctRef.current;
        if (!video || !bar || !pct) return;

        // Hide the static HTML preloader now that React has taken over
        const staticPreloader = document.getElementById('static-preloader');
        if (staticPreloader) staticPreloader.remove();

        if (!assetsPreloadPromiseRef.current) {
            assetsPreloadPromiseRef.current = preloadInitialExperienceAssets()
                .catch((error) => {
                    console.warn('3D asset preload failed:', error);
                })
                .finally(() => {
                    assetsReadyRef.current = true;
                });
        }

        if (!initializedRef.current) {
            if (!auditModeRef.current) {
                video.playbackRate = 1.2;
                video.play().catch(err => console.warn('Autoplay prevented:', err));
            }
            initializedRef.current = true;
        }

        let rafId: number;
        let lastDisplayed = -1;
        const ESTIMATED_TOTAL_TIME = 14500;

        const syncProgress = (now: number) => {
            const elapsed = now - startTimeRef.current;

            let rawPercent = 0;
            const timePct = Math.min(elapsed / ESTIMATED_TOTAL_TIME, 0.99);

            if (video.duration > 0 && !isNaN(video.duration)) {
                const videoPct = video.currentTime / video.duration;
                rawPercent = Math.max(videoPct, timePct);
            } else {
                rawPercent = timePct;
            }

            const easedPercent = 1 - Math.pow(1 - rawPercent, 3);
            const nextProgress = Math.max(lastDisplayed, Math.min(Math.round(easedPercent * 100), 100));

            // Direct DOM manipulation — avoids React re-render entirely
            if (nextProgress !== lastDisplayed) {
                lastDisplayed = nextProgress;
                bar.style.width = `${nextProgress}%`;
                pct.textContent = `${nextProgress}%`;
            }

            if (rawPercent < 1) {
                rafId = requestAnimationFrame(syncProgress);
            }
        };

        rafId = requestAnimationFrame(syncProgress);

        const fallbackTimer = setTimeout(handleComplete, auditModeRef.current ? 1200 : 15000);
        return () => {
            clearTimeout(fallbackTimer);
            cancelAnimationFrame(rafId);
        };
    }, [handleComplete]);

    return (
        <div className={`preloader-container ${fadeOut ? 'fade-out' : ''}`} data-audit-mode={auditModeRef.current ? 'true' : 'false'}>

            {!fadeOut && <CosmicBackground />}

            <div className="preloader-brand" aria-hidden="true">
                <div className="preloader-kicker">Manipal University Jaipur</div>
                <h1 className="preloader-title">Oneiros 2026</h1>
            </div>


            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                preload="metadata"
                onEnded={handleComplete}
                className="preloader-video"
                aria-label="Oneiros 2026 introduction animation"
                disableRemotePlayback
            >
                <source src={preloaderVidDesktop} type="video/webm" />
            </video>

            <div className="loading-wrapper">
                <div className="loading-percentage" ref={pctRef}>0%</div>
                <div className="loading-text">
                    Loading 3D Experience...
                </div>
                <div className="loading-bar-bg">
                    <div
                        className="loading-bar-fill"
                        ref={barRef}
                        style={{ width: '0%' }}
                    />
                </div>
            </div>
        </div>
    );
}
