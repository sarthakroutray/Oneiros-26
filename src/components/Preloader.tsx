import { useState, useEffect, useRef, useCallback } from 'react';
import './Preloader.css';
import preloaderVidDesktop from '../assets/intro_enhanced.webm';


interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const [fadeOut, setFadeOut] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const pctRef = useRef<HTMLDivElement>(null);

    const handleComplete = useCallback(() => {
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
        }, 5500);
    }, [onComplete]);

    const startTimeRef = useRef(performance.now());
    const initializedRef = useRef(false);

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    useEffect(() => {
        const video = videoRef.current;
        const bar = barRef.current;
        const pct = pctRef.current;
        if (!video || !bar || !pct) return;

        // Hide the static HTML preloader now that React has taken over
        const staticPreloader = document.getElementById('static-preloader');
        if (staticPreloader) staticPreloader.remove();

        if (!initializedRef.current) {
            // Safari is stricter with autoplay. Set required flags at runtime too.
            video.muted = true;
            video.defaultMuted = true;
            video.playsInline = true;
            video.setAttribute('muted', '');
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', 'true');
            video.preload = 'auto';

            const desiredPlaybackRate = isSafari ? 1 : 1.2;
            const tryPlay = () => {
                video.playbackRate = desiredPlaybackRate;
                video.play().catch(err => console.warn('Autoplay prevented:', err));
            };

            // Ensure Safari has enough metadata before play attempt.
            if (video.readyState >= 1) {
                tryPlay();
            } else {
                video.addEventListener('loadedmetadata', tryPlay, { once: true });
                video.load();
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

        const fallbackTimer = setTimeout(handleComplete, 15000);
        return () => {
            clearTimeout(fallbackTimer);
            cancelAnimationFrame(rafId);
        };
    }, [handleComplete]);

    return (
        <div className={`preloader-container ${fadeOut ? 'fade-out' : ''}`}>


            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                preload="auto"
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
