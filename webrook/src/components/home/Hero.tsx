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

        const animate = () => {
            if (!isVisible) return; // Stop if not visible

            ctx.clearRect(0, 0, width, height);
            time += 0.005;

            // Batch drawing by color to minimize state changes and draw calls
            const batches: { [key: string]: Path2D } = {};
            colors.forEach(c => batches[c] = new Path2D());
            batches['#202124'] = new Path2D(); // Ensure base color exists

            // Re-use vars
            let p, z, normalizedZ, remainder, isPartVisible, dx, dy, dist, force, targetX, targetY;
            const contourStep = 0.18;
            const threshold = 0.015;

            for (let i = 0; i < particles.length; i++) {
                p = particles[i];
                z = getWaveHeight(p.baseX, p.baseY, time);

                // Visibility Logic
                normalizedZ = z + 1.0;
                remainder = normalizedZ % contourStep;
                isPartVisible = (remainder < threshold || remainder > contourStep - threshold);

                if (isPartVisible) {
                    // Interaction
                    dx = mouse.x - p.x;
                    dy = mouse.y - p.y;
                    dist = Math.hypot(dx, dy); // Faster than sqrt logic roughly same

                    if (dist < mouse.radius) {
                        force = (mouse.radius - dist) / mouse.radius;
                        targetX = p.baseX - (dx / dist) * force * 50;
                        targetY = p.baseY - (dy / dist) * force * 50;
                        p.x += (targetX - p.x) * 0.1;
                        p.y += (targetY - p.y) * 0.1;
                    } else {
                        // Return to base if drifted
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

                <p className="text-subhead fade-in-up" style={{ animationDelay: '2s', maxWidth: '540px', margin: '24px auto 0' }}>
                    Webrook is an AI-first systems studio. We build infrastructure, intelligence, and long-term capability.
                </p>

                <div className={`${styles.ctaGroup} fade-in-up`} style={{ animationDelay: '1s' }}>
                    <Link href="/platforms" className={`${styles.button} ${styles.primary}`}>
                        Explore Platforms
                    </Link>
                    <Link href="/intelligence" className={`${styles.button} ${styles.secondary}`}>
                        Our Intelligence
                    </Link>
                </div>
            </div>
        </section>
    );
}
