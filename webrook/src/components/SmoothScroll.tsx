'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
    useEffect(() => {
        // "Light & Responsive" easing: standard ease-out, very little drag.
        const lenis = new Lenis({
            duration: 0.8, // Reduced from 1.5 (much faster/lighter)
            // Standard EaseOutQuart or ExpoOut for quick response without the "heavy start"
            easing: (t) => 1 - Math.pow(1 - t, 4),

            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        // Sync with RAF
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return null;
}
