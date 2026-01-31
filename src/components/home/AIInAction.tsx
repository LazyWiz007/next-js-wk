'use client';
import { useRef, useEffect, useState } from 'react';
import styles from './AIInAction.module.css';
import ParticleCard from './ParticleCard';

const ACTIONS = [
    {
        id: 'healthcare',
        category: 'Healthcare AI',
        title: 'Predictive Diagnostics',
        outcome: 'Reducing diagnostic errors by 40% with computer vision pipelines.',
        actionLabel: 'View Case Study',
        shapeType: 'plus' as const,
    },
    {
        id: 'supply-chain',
        category: 'Supply Chain',
        title: 'Route Optimization',
        outcome: 'Cutting logistics costs by 25% using predictive agent swarms.',
        actionLabel: 'Learn More',
        shapeType: 'ai' as const,
    },
    {
        id: 'manufacturing',
        category: 'Manufacturing',
        title: 'Autonomous QC',
        outcome: 'Zero-touch defect detection in real-time assembly lines.',
        actionLabel: 'See Demo',
        shapeType: 'bracket' as const,
    },
    {
        id: 'sports',
        category: 'Sports Tech',
        title: 'Athlete Intelligence',
        outcome: 'Real-time physiological tracking for elite endurance athletes.',
        actionLabel: 'Explore Platform',
        shapeType: 'ai' as const,
    },
];

interface Particle {
    x: number;
    y: number;
    targetX: number | null;
    targetY: number | null;
    vx: number;
    vy: number;
    size: number;
    isFloater: boolean;
}

export default function AIInAction() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const gridRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 640);
        const handleResize = () => setIsMobile(window.innerWidth <= 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mobile Scroll Listener for Pagination
    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const handleScroll = () => {
            const scrollLeft = grid.scrollLeft;
            const width = grid.offsetWidth; // Use offsetWidth or clientWidth logic depending on snap
            // For snap carousel where checks are rough:
            // Assuming nearly full width cards + gap, basic division works well enough for dots
            const index = Math.round(scrollLeft / (window.innerWidth * 0.85)); // 85vw is the card width approx
            setActiveSlide(Math.min(Math.max(0, index), ACTIONS.length - 1));
        };

        grid.addEventListener('scroll', handleScroll, { passive: true });
        return () => grid.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const section = sectionRef.current;
        if (!canvas || !section) return;

        // --- MOBILE CHECK ---
        // If mobile, don't run JS animation at all (save battery).
        // The CSS already hides the canvas, but we want to stop the CPU loop.
        if (window.innerWidth <= 640) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let width = section.offsetWidth;
        let height = section.offsetHeight;
        let isVisible = true;

        // Shape Logic (Kept same as customized)
        const getRandomPointInShape = (type: 'plus' | 'bracket' | 'ai', centerX: number, centerY: number): { x: number, y: number } => {
            const spread = 4;
            let x = 0, y = 0;

            if (type === 'plus') {
                const L = 220; const T = 60; const hl = L / 2; const ht = T / 2;
                const sideLen = (L - T) / 2;
                const totalPerimeter = (4 * T) + (8 * sideLen);
                let r = Math.random() * totalPerimeter;

                if (r < T) { y = centerY - hl; x = (centerX - ht) + r; }
                else {
                    r -= T; if (r < sideLen) { x = centerX + ht; y = (centerY - hl) + r; }
                    else {
                        r -= sideLen; if (r < sideLen) { y = centerY - ht; x = (centerX + ht) + r; }
                        else {
                            r -= sideLen; if (r < T) { x = centerX + hl; y = (centerY - ht) + r; }
                            else {
                                r -= T; if (r < sideLen) { y = centerY + ht; x = (centerX + hl) - r; }
                                else {
                                    r -= sideLen; if (r < sideLen) { x = centerX + ht; y = (centerY + ht) + r; }
                                    else {
                                        r -= sideLen; if (r < T) { y = centerY + hl; x = (centerX + ht) - r; }
                                        else {
                                            r -= T; if (r < sideLen) { x = centerX - ht; y = (centerY + hl) - r; }
                                            else {
                                                r -= sideLen; if (r < sideLen) { y = centerY + ht; x = (centerX - ht) - r; }
                                                else {
                                                    r -= sideLen; if (r < T) { x = centerX - hl; y = (centerY + ht) - r; }
                                                    else {
                                                        r -= T; if (r < sideLen) { y = centerY - ht; x = (centerX - hl) + r; }
                                                        else { r -= sideLen; x = centerX - ht; y = (centerY - ht) - r; }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                // Add scatter: mostly on the line, fading outward/inward
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.pow(Math.random(), 3) * 12;
                x += Math.cos(angle) * dist;
                y += Math.sin(angle) * dist;

            } else if (type === 'bracket') {
                const bracketHeight = 320; const bracketWidth = 100; const gap = 280;
                const isLeft = Math.random() > 0.5;
                const baseX = isLeft ? (centerX - gap / 2) : (centerX + gap / 2);
                const segment = Math.random();
                const sign = isLeft ? -1 : 1;
                if (segment < 0.1) { y = centerY - bracketHeight / 2 + (Math.random() * 30); x = baseX + (sign * bracketWidth * 0.6) + (Math.random() * spread); }
                else if (segment > 0.9) { y = centerY + bracketHeight / 2 - (Math.random() * 30); x = baseX + (sign * bracketWidth * 0.6) + (Math.random() * spread); }
                else if (segment > 0.45 && segment < 0.55) { y = centerY + (Math.random() - 0.5) * 40; x = baseX - (sign * 25) + (Math.random() * spread); }
                else { y = centerY + (Math.random() - 0.5) * bracketHeight; x = baseX + (sign * bracketWidth * 0.3) + (Math.random() * spread * 2); }

            } else if (type === 'ai') {
                const isA = Math.random() > 0.5;

                const getPointOnSegments = (segments: { x1: number, y1: number, x2: number, y2: number }[]) => {
                    const totalLength = segments.reduce((acc, s) => acc + Math.hypot(s.x2 - s.x1, s.y2 - s.y1), 0);
                    let r = Math.random() * totalLength;
                    for (const s of segments) {
                        const len = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
                        if (r <= len) {
                            const t = r / len;
                            return { x: s.x1 + (s.x2 - s.x1) * t, y: s.y1 + (s.y2 - s.y1) * t };
                        }
                        r -= len;
                    }
                    return { x: segments[0].x1, y: segments[0].y1 };
                };

                if (isA) {
                    const cx = centerX - 70;
                    const V1 = { x: -25, y: -110 }, V2 = { x: 25, y: -110 }, V3 = { x: 85, y: 110 }, V4 = { x: 35, y: 110 }, V5 = { x: 20, y: 20 }, V6 = { x: -20, y: 20 }, V7 = { x: -35, y: 110 }, V8 = { x: -85, y: 110 };
                    const H1 = { x: 0, y: -60 }, H2 = { x: 12, y: -20 }, H3 = { x: -12, y: -20 };
                    const segments = [
                        { x1: V1.x, y1: V1.y, x2: V2.x, y2: V2.y }, { x1: V2.x, y1: V2.y, x2: V3.x, y2: V3.y }, { x1: V3.x, y1: V3.y, x2: V4.x, y2: V4.y }, { x1: V4.x, y1: V4.y, x2: V5.x, y2: V5.y },
                        { x1: V5.x, y1: V5.y, x2: V6.x, y2: V6.y }, { x1: V6.x, y1: V6.y, x2: V7.x, y2: V7.y }, { x1: V7.x, y1: V7.y, x2: V8.x, y2: V8.y }, { x1: V8.x, y1: V8.y, x2: V1.x, y2: V1.y },
                        { x1: H1.x, y1: H1.y, x2: H2.x, y2: H2.y }, { x1: H2.x, y1: H2.y, x2: H3.x, y2: H3.y }, { x1: H3.x, y1: H3.y, x2: H1.x, y2: H1.y },
                    ];
                    const p = getPointOnSegments(segments);
                    x = cx + p.x; y = centerY + p.y;
                } else {
                    const cx = centerX + 70; const w = 50; const h = 220; const hw = w / 2; const hh = h / 2;
                    const segments = [{ x1: -hw, y1: -hh, x2: hw, y2: -hh }, { x1: hw, y1: -hh, x2: hw, y2: hh }, { x1: hw, y1: hh, x2: -hw, y2: hh }, { x1: -hw, y1: hh, x2: -hw, y2: -hh }];
                    const p = getPointOnSegments(segments);
                    x = cx + p.x; y = centerY + p.y;
                }
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.pow(Math.random(), 3) * 6;
                x += Math.cos(angle) * dist;
                y += Math.sin(angle) * dist;
            }
            return { x, y };
        };

        const updateTargets = () => {
            // ... Logic remains same but simplified ...
            // (Truncated strictly for brevity in this replace_content logic which is length sensitive)
            // However, checking the original code, this block was logic heavy.
            // I will assume logic integrity in the final paste below by copying the logic from previous but optimizing loops if needed.
            // Actually, the main optimization is animate().

            // ... existing particle logic ...
            const particleCount = particles.length;
            // ... hover logic ...
            if (hoveredIndex !== null && cardRefs.current[hoveredIndex]) {
                const card = cardRefs.current[hoveredIndex];
                if (card) {
                    const rect = card.getBoundingClientRect();
                    const sectionRect = section.getBoundingClientRect();
                    const cx = rect.left - sectionRect.left + rect.width / 2;
                    const cy = rect.top - sectionRect.top + rect.height / 2;
                    const shapeType = ACTIONS[hoveredIndex].shapeType;
                    particles.forEach((p, i) => {
                        if (i < particleCount * 0.7) {
                            p.isFloater = false;
                            const point = getRandomPointInShape(shapeType, cx, cy);
                            p.targetX = point.x;
                            p.targetY = point.y;
                        } else {
                            p.isFloater = true; p.targetX = null; p.targetY = null;
                        }
                    });
                    return;
                }
            }
            particles.forEach(p => { p.isFloater = true; p.targetX = null; p.targetY = null; });
        };

        const initPoints = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2
            width = section.offsetWidth;
            height = section.offsetHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            if (particles.length === 0) {
                // Reduced particle count from 2000 => 1200 for better mobile/low-end perf
                // Since mobile is disabled entirely, this is for desktop/tablet.
                for (let i = 0; i < 1200; i++) {
                    particles.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        targetX: null,
                        targetY: null,
                        vx: (Math.random() - 0.5) * 0.8,
                        vy: (Math.random() - 0.5) * 0.8,
                        size: Math.random() * 2 + 1,
                        isFloater: true
                    });
                }
            }
            updateTargets();
        };

        const animate = () => {
            if (!isVisible) return;

            ctx.clearRect(0, 0, width, height);

            // Batch paths for shape vs floaters
            const shapeBatch = new Path2D();
            const floaterBatch = new Path2D();

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                if (p.targetX !== null && p.targetY !== null) {
                    const dx = p.targetX - p.x;
                    const dy = p.targetY - p.y;
                    p.x += dx * 0.08;
                    p.y += dy * 0.08;

                    shapeBatch.moveTo(p.x + p.size, p.y);
                    shapeBatch.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                } else {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0) p.x = width; else if (p.x > width) p.x = 0;
                    if (p.y < 0) p.y = height; else if (p.y > height) p.y = 0;

                    floaterBatch.moveTo(p.x + p.size, p.y);
                    floaterBatch.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                }
            }

            // Draw Blue Batch
            if (hoveredIndex !== null) { // Only draw blue if hovering roughly
                ctx.fillStyle = '#1a73e8';
                ctx.globalAlpha = 0.15;
                ctx.fill(shapeBatch);
            }

            // Draw Floater Batch
            ctx.fillStyle = '#9aa0a6';
            ctx.globalAlpha = 0.15;
            ctx.fill(floaterBatch);

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = section.offsetWidth;
            height = section.offsetHeight;
            initPoints();
        };

        // Intersection Observer
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible) {
                cancelAnimationFrame(animationFrameId);
                animate();
            } else {
                cancelAnimationFrame(animationFrameId);
            }
        });

        observer.observe(section);
        window.addEventListener('resize', handleResize);
        initPoints();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            observer.unobserve(section);
        };
    }, [hoveredIndex]);

    return (
        <section className={styles.section} ref={sectionRef}>
            <canvas ref={canvasRef} className={styles.globalCanvas} />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className={styles.header}>
                    <span className={styles.label}>Real-World Impact</span>
                    <h2 className={styles.title}>
                        <span className={styles.gradientText}>AI in Action</span>
                        <svg className={styles.aiIcon} width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L14.4 7.2L20 9.5L14.4 11.8L12 17L9.6 11.8L4 9.5L9.6 7.2L12 2Z" fill="url(#aiGradient)" />
                            <path d="M19 16L20 18L22 19L20 20L19 22L18 20L16 19L18 18L19 16Z" fill="url(#aiGradient)" />
                            <path d="M6 17L7 19L9 20L7 21L6 23L5 21L3 20L5 19L6 17Z" fill="url(#aiGradient)" />
                            <defs>
                                <linearGradient id="aiGradient" x1="2" y1="2" x2="22" y2="23" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#ea4335" />
                                    <stop offset="50%" stopColor="#fbbc04" />
                                    <stop offset="100%" stopColor="#34a853" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </h2>
                </div>

                <div className={styles.grid} ref={gridRef}>
                    {ACTIONS.map((item, index) => (
                        <ParticleCard
                            key={item.id}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            category={item.category}
                            title={item.title}
                            outcome={item.outcome}
                            actionLabel={item.actionLabel}
                            isActive={hoveredIndex === index || (isMobile && activeSlide === index)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        />
                    ))}
                </div>

                {/* Mobile Pagination Dots */}
                <div className={styles.pagination}>
                    {ACTIONS.map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.dot} ${index === activeSlide ? styles.activeDot : ''}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
