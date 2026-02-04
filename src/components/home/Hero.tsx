'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';
import cursorStyles from './HeroCursor.module.css';

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    color: string;
    size: number;
    density: number;
}

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Typing Animation State
    const [text, setText] = useState('Intellig');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [selectionIndex, setSelectionIndex] = useState(0);

    const words = ["Intellig", "Excell", "Resili", "Influ", "Pres"];
    const suffix = "ence";

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % words.length;
            const fullText = words[i];

            if (isDeleting) {
                // Selection Deletion Logic
                if (selectionIndex > 0) {
                    setSelectionIndex(prev => prev - 1);
                    setTypingSpeed(30); // Fast selection speed
                } else {
                    // Fully selected, clear and move to next word
                    setIsDeleting(false);
                    setLoopNum(loopNum + 1);
                    setText('');
                    setSelectionIndex(0);
                    setTypingSpeed(150);
                }
            } else {
                // Typing Logic
                setText(fullText.substring(0, text.length + 1));
                setSelectionIndex(fullText.substring(0, text.length + 1).length); // Cursor at end while typing

                setTypingSpeed(150);

                if (text === fullText) {
                    // Pause at end
                    setSelectionIndex(fullText.length); // Ensure selection is at end
                    setTimeout(() => setIsDeleting(true), 2000); // 2s pause
                    return; // Return to avoid double timer set
                }
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed, selectionIndex, words]); // Added dependencies

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let isVisible = true; // Visibility flag

        // Settings
        let width = window.innerWidth;
        let height = window.innerHeight;
        let time = 0;

        // Mouse state
        const mouse = { x: -1000, y: -1000, radius: 150 };
        const colors = ['#202124', '#EA4335', '#FBBC04', '#34A853'];

        // Noise/Wave function
        const getWaveHeight = (x: number, y: number, t: number) => {
            return (
                Math.sin(x * 0.002 + t * 0.5) *
                Math.cos(y * 0.002 + t * 0.3) * 0.5 +
                Math.sin(x * 0.005 - t) * 0.2
            );
        };

        const init = () => {
            // Cap DPR at 2 for performance on high-res screens
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            particles = [];

            // Increase gap based on screen size to reduce particle count on mobile
            const isMobile = width < 768;
            const gap = isMobile ? 18 : 14;

            const rows = Math.ceil(height / gap);
            const cols = Math.ceil(width / gap);

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = c * gap;
                    const y = r * gap;
                    // Skip some particles for randomness/perf
                    if (Math.random() > 0.95) continue;

                    const color = Math.random() > 0.85
                        ? colors[Math.floor(Math.random() * colors.length)]
                        : '#202124';

                    particles.push({
                        x: x, y: y, baseX: x, baseY: y,
                        color: color,
                        size: Math.random() * 2 + 1,
                        density: (Math.random() * 20) + 1,
                    });
                }
            }
            setIsLoaded(true);
        };

        // Signed Distance Function for a Box
        const sdBox = (pX: number, pY: number, bX: number, bY: number) => {
            const dX = Math.abs(pX) - bX;
            const dY = Math.abs(pY) - bY;
            return Math.hypot(Math.max(dX, 0), Math.max(dY, 0)) + Math.min(Math.max(dX, dY), 0);
        };

        // SDF for Rook Shape
        const sdRook = (px: number, py: number, scale: number) => {
            // Normalize coordinates relative to scale (make 1.0 = full height approx)
            // Adjust y so (0,0) is center
            const x = px;
            const y = py + (0.1 * scale); // Shift center slightly

            // Dimensions relative to scale
            const wBase = 0.3 * scale;
            const hBase = 0.15 * scale;
            const yBase = 0.35 * scale;

            const wNeck = 0.18 * scale;
            const hNeck = 0.25 * scale;
            const yNeck = -0.05 * scale;

            const wHead = 0.3 * scale;
            const hHead = 0.1 * scale;
            const yHead = -0.4 * scale;

            // Crenellations (3 blocks)
            const wCren = 0.08 * scale;
            const hCren = 0.08 * scale;
            const yCren = -0.55 * scale;
            const xCrenOffset = 0.22 * scale; // Left/Right spacing

            // Calculate SDFs for each part
            const dBase = sdBox(x, y - yBase, wBase, hBase);
            const dNeck = sdBox(x, y - yNeck, wNeck, hNeck);
            const dHead = sdBox(x, y - yHead, wHead, hHead);

            // Middle Crenellation
            const dCrenMid = sdBox(x, y - yCren, wCren * 0.8, hCren);
            // Left Crenellation
            const dCrenLeft = sdBox(x - xCrenOffset, y - yCren, wCren, hCren);
            // Right Crenellation
            const dCrenRight = sdBox(x + xCrenOffset, y - yCren, wCren, hCren);

            // Union (smooth min is better for organics, but hard min is fine for sharp rook)
            const dBody = Math.min(dBase, dNeck, dHead);
            const dTop = Math.min(dCrenMid, dCrenLeft, dCrenRight);

            return Math.min(dBody, dTop);
        };

        const animate = () => {
            if (!isVisible) return; // Stop if not visible

            ctx.clearRect(0, 0, width, height);
            time += 0.005;

            // Batch drawing by color
            const batches: { [key: string]: Path2D } = {};
            colors.forEach(c => batches[c] = new Path2D());
            batches['#202124'] = new Path2D();

            let p, z, normalizedZ, remainder, isPartVisible;
            let dx, dy, dist, force, angle;
            const contourStep = 0.18;
            const threshold = 0.015;

            // Rook interaction params
            const rookScale = 120; // Size of the rook
            const interactionRadius = rookScale * 1.5; // Influence area

            for (let i = 0; i < particles.length; i++) {
                p = particles[i];
                z = getWaveHeight(p.baseX, p.baseY, time);

                // Visibility Logic
                normalizedZ = z + 1.0;
                remainder = normalizedZ % contourStep;
                isPartVisible = (remainder < threshold || remainder > contourStep - threshold);

                if (isPartVisible) {
                    // Interaction: SDF Rook
                    // Transform particle to mouse-local space
                    dx = p.x - mouse.x;
                    dy = p.y - mouse.y;

                    // Add subtle rotation to the rook based on movement? (Optional, skipping for stability)

                    // Get distance to the Rook shape
                    dist = sdRook(dx, dy, rookScale);

                    // If inside or near the rook shape (-dist means inside for SDF usually, but here our function returns +dist outside, -dist inside if overlapping boxes? 
                    // Actually sdBox returns negative if inside.

                    if (dist < 20) { // Interaction Threshold just outside the shape
                        // Force calculation
                        // Inside the shape (negative dist) -> Strong repulsion or attraction?
                        // Let's try Repulsion to make the shape "Clear" (Negative Space Rook)
                        // Or Attraction to make the shape "Solid" (Positive Space Rook)

                        // User said "background to move in rookshape". 
                        // A "Rook Shaped Wave" might be best. 

                        // Let's do: Particles push AWAY from the rook border slightly?
                        // Or simply: If inside rook, move `p` towards rook border?

                        // Simpler Physics: Radial-ish push but modulated by SDF?

                        // Let's try: Repel from the shape center, bounded by the shape.

                        // NEW APPROACH:
                        // If dist < 0 (Inside Rook), push OUT strongly.
                        // If dist > 0 but < threshold, push OUT weakly.

                        const pushStrength = dist < 0 ? 50 : (20 - dist);
                        // Direction? Normal to surface is approximated by dx/dy relative to nearest logic, 
                        // but simpler is just radial from local center for now, or use gradient of SDF (too expensive).

                        // Use simple radial for direction, modulated by shape proximity
                        angle = Math.atan2(dy, dx);
                        const moveX = Math.cos(angle) * pushStrength * 0.5;
                        const moveY = Math.sin(angle) * pushStrength * 0.5;

                        p.x += moveX * 0.1;
                        p.y += moveY * 0.1;
                    } else {
                        // Return to base
                        if (Math.abs(p.x - p.baseX) > 0.1 || Math.abs(p.y - p.baseY) > 0.1) {
                            p.x += (p.baseX - p.x) * 0.1;
                            p.y += (p.baseY - p.y) * 0.1;
                        } else {
                            p.x = p.baseX;
                            p.y = p.baseY;
                        }
                    }

                    // Add to batch
                    const path = batches[p.color] || batches['#202124'];
                    path.moveTo(p.x + p.size / 2, p.y);
                    path.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
                }
            }

            // Draw batches
            for (const color in batches) {
                ctx.fillStyle = color;
                ctx.fill(batches[color]);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        // Resize
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            init();
        };

        // Intersection Observer
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible) {
                // Restart loop if it stopped
                cancelAnimationFrame(animationFrameId);
                animate();
            } else {
                cancelAnimationFrame(animationFrameId);
            }
        }, { threshold: 0 });

        // Attach observer
        const heroSection = canvas.parentElement;
        if (heroSection) observer.observe(heroSection);

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('resize', handleResize);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (heroSection) observer.unobserve(heroSection);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className={styles.heroSection}>
            <canvas
                ref={canvasRef}
                className={styles.canvas}
                style={{ opacity: isLoaded ? 0.8 : 0, transition: 'opacity 1s ease' }}
            />

            <div className={styles.content}>
                <h1 className="headline-hero fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                        {isDeleting ? (
                            <>
                                <span>{text.substring(0, selectionIndex)}</span>
                                <span className={cursorStyles.cursor}></span>
                                <span className={cursorStyles.selectedText}>{text.substring(selectionIndex)}</span>
                            </>
                        ) : (
                            <>
                                {text}
                                <span className={cursorStyles.cursor}></span>
                            </>
                        )}
                        {suffix}
                    </span> for the <br />
                    next era.
                </h1>

                <p className="text-subhead fade-in-up" style={{ animationDelay: '2s', maxWidth: '440px', margin: '24px auto 0' }}>
                    Webrook is an AI-first systems studio. We build infrastructure, intelligence, and long-term capability.
                </p>

                <div className={`${styles.ctaGroup} fade-in-up`} style={{ animationDelay: '1s' }}>
                    <Link href="/platforms" className={`${styles.button} ${styles.primary}`}>
                        Explore Platforms
                    </Link>
                    <Link href="/intelligence" className={`${styles.button} ${styles.secondary}`}>
                        Our Intelligence
                    </Link>
                    <Link href="/careers" className={`${styles.button} ${styles.secondary}`} style={{ border: 'none', background: 'transparent', color: '#666', textDecoration: 'underline' }}>
                        Join the Team
                    </Link>
                </div>
            </div>
        </section>
    );
}
