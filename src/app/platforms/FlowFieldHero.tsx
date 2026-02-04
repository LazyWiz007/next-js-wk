'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './platforms.module.css';

interface Point {
    x: number;
    y: number;
}

interface Particle {
    pathIndex: number;
    progress: number; // 0 to 1
    type: 'circle' | 'square' | 'triangle';
    size: number;
    speed: number;
    offset: number; // Random offset to start position
    hasTriggeredBreathing: boolean;
}

export default function FlowFieldHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const button = buttonRef.current; // Get button element
        if (!canvas || !container || !button) return; // Need all 3

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Configuration
        const PATH_COUNT_PER_SIDE = 4; // Much fewer paths, distinct
        const PARTICLE_COUNT = 12; // Sparse particles
        const BASE_SPEED = 0.0008;

        // State
        let width = 0;
        let height = 0;
        let paths: { p0: Point, p1: Point, p2: Point, p3: Point, dash: number[] }[] = [];
        let particles: Particle[] = [];
        let mouse = { x: -9999, y: -9999 };
        let animationFrameId: number;
        let time = 0;

        // Resize Handler
        const handleResize = () => {
            if (!container) return;
            width = container.clientWidth;
            height = container.clientHeight;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            initPaths();
            // Re-init particles to ensure they spawn correctly on new paths if resize happens
            if (particles.length === 0) initParticles();
        };

        // Initialize Paths
        const initPaths = () => {
            if (!button || !container) return;
            paths = [];

            // Calculate precise button position relative to container
            const containerRect = container.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();

            // Coordinates relative to the canvas/container
            const btnLeft = buttonRect.left - containerRect.left;
            const btnRight = buttonRect.right - containerRect.left;
            const btnCenterY = (buttonRect.top - containerRect.top) + (buttonRect.height / 2);

            // Vertical Spacing configs
            const spreadSmall = height * 0.15;
            const spreadLarge = height * 0.35;

            // Define offsets from center Y for the 5 paths
            // [OuterTop, InnerTop, Center, InnerBottom, OuterBottom]
            const yOffsets = [
                -spreadLarge,
                -spreadSmall,
                0,
                spreadSmall,
                spreadLarge
            ];

            // Styles: [Solid, Dotted, Solid, Dotted, Solid]
            const dashStyles = [
                [],       // Outer Top - Solid
                [2, 8],   // Inner Top - Dotted
                [],       // Center - Solid
                [2, 8],   // Inner Bottom - Dotted
                []        // Outer Bottom - Solid
            ];

            // Generate LEFT Paths
            yOffsets.forEach((offset, i) => {
                const yStart = btnCenterY + offset;
                const p0 = { x: 0, y: yStart }; // Start at screen edge 0
                const p3 = { x: btnLeft, y: btnCenterY }; // Converge to single point at button edge

                // Control points for Symmetrical Flow
                // P1: Pulls horizontally from start
                // P2: Pulls horizontally towards target (squeeze effect)
                // Use symmetric percentages of the distance
                const dist = btnLeft; // Distance from 0 to button left

                // Curve factor: Outer paths curve more
                const curveFactor = Math.abs(offset) / height;

                // Logic:
                // Center path (offset 0) is a straight line.
                // Others are Bezier curves.

                const p1 = { x: dist * 0.4, y: yStart };
                const p2 = { x: dist * 0.6, y: btnCenterY };

                paths.push({
                    p0, p1, p2, p3,
                    dash: dashStyles[i]
                });
            });

            // Generate RIGHT Paths (Mirrored)
            yOffsets.forEach((offset, i) => {
                const yStart = btnCenterY + offset;
                const p0 = { x: width, y: yStart }; // Right screen edge
                const p3 = { x: btnRight, y: btnCenterY };

                const dist = width - btnRight;

                const p1 = { x: width - (dist * 0.4), y: yStart };
                const p2 = { x: width - (dist * 0.6), y: btnCenterY };

                paths.push({
                    p0, p1, p2, p3,
                    dash: dashStyles[i]
                });
            });
        };

        // Initialize Particles
        const initParticles = () => {
            particles = [];
            const types: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
            const totalPaths = paths.length;
            if (totalPaths === 0) return;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    pathIndex: i % totalPaths,
                    progress: Math.random(),
                    type: types[i % types.length],
                    size: 16,
                    speed: BASE_SPEED * (0.9 + Math.random() * 0.2),
                    offset: 0,
                    hasTriggeredBreathing: false
                });
            }
        };

        // Cubic Bezier Math
        const getBezierPoint = (t: number, p0: Point, p1: Point, p2: Point, p3: Point) => {
            const oneMinusT = 1 - t;
            const x = Math.pow(oneMinusT, 3) * p0.x +
                3 * Math.pow(oneMinusT, 2) * t * p1.x +
                3 * oneMinusT * Math.pow(t, 2) * p2.x +
                Math.pow(t, 3) * p3.x;
            const y = Math.pow(oneMinusT, 3) * p0.y +
                3 * Math.pow(oneMinusT, 2) * t * p1.y +
                3 * oneMinusT * Math.pow(t, 2) * p2.y +
                Math.pow(t, 3) * p3.y;
            return { x, y };
        };

        // Draw Shape
        const drawShape = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, type: string) => {
            ctx.save();
            ctx.translate(x, y);

            ctx.strokeStyle = '#3c4043'; // Darker Grey
            ctx.lineWidth = 1.5;
            ctx.fillStyle = '#ffffff';

            ctx.beginPath();
            if (type === 'circle') {
                ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
            } else if (type === 'square') {
                ctx.rect(-size / 2, -size / 2, size, size);
            } else if (type === 'triangle') {
                ctx.moveTo(0, -size / 2 - 2);
                ctx.lineTo(size / 2 + 2, size / 2);
                ctx.lineTo(-size / 2 - 2, size / 2);
                ctx.closePath();
            }
            ctx.fill();
            ctx.stroke();

            // Center Dot
            ctx.beginPath();
            ctx.fillStyle = '#3c4043';
            ctx.arc(0, 0, 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        };

        // Animation Loop
        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            time += 0.01;

            const WEBROOK_COLORS = ['#ea4335', '#fbbc04', '#34a853', '#1a73e8'];

            // 1. Draw ALL Paths first (so particles sit on top)
            paths.forEach((path, idx) => {
                const distP1X = (mouse.x - width / 2) * 0.05 * (idx % 2 === 0 ? 1 : -1);
                const distP1Y = (mouse.y - height / 2) * 0.03;

                const drawP1 = { x: path.p1.x + distP1X, y: path.p1.y + distP1Y };
                const drawP2 = { x: path.p2.x - distP1X, y: path.p2.y - distP1Y };

                ctx.strokeStyle = '#e0e0e0'; // Light grey path
                ctx.lineWidth = 1;
                ctx.setLineDash(path.dash); // Dotted or Solid

                ctx.beginPath();
                ctx.moveTo(path.p0.x, path.p0.y);
                ctx.bezierCurveTo(drawP1.x, drawP1.y, drawP2.x, drawP2.y, path.p3.x, path.p3.y);
                ctx.stroke();
                ctx.setLineDash([]); // Reset
            });

            // 2. Draw Particles
            particles.forEach((p, idx) => {
                const path = paths[p.pathIndex];
                if (!path) return; // Safety

                // Easing: Accelerate slightly as we go
                const gravityAccel = 1 + (p.progress * p.progress * 2);
                p.progress += p.speed * gravityAccel;

                // Handle Breathing Animation when particle hits end (button)
                if (p.progress > 0.98 && !p.hasTriggeredBreathing) {
                    p.hasTriggeredBreathing = true;
                    if (buttonRef.current) {
                        const color = WEBROOK_COLORS[idx % WEBROOK_COLORS.length];
                        buttonRef.current.style.boxShadow = `0 0 25px ${color}`;
                        buttonRef.current.style.borderColor = color;

                        // Reset style after short delay
                        setTimeout(() => {
                            if (buttonRef.current) {
                                buttonRef.current.style.boxShadow = '';
                                buttonRef.current.style.borderColor = 'transparent';
                            }
                        }, 400);
                    }
                }

                if (p.progress >= 1) {
                    p.progress = 0;
                    p.hasTriggeredBreathing = false;
                }

                // Fade in/out at extremes
                const opacity = p.progress < 0.05 ? p.progress * 20 :
                    p.progress > 0.95 ? (1 - p.progress) * 20 : 1;

                // Calculate position (re-calc bezier to match path drawing exactly)
                const distP1X = (mouse.x - width / 2) * 0.05 * (p.pathIndex % 2 === 0 ? 1 : -1);
                const distP1Y = (mouse.y - height / 2) * 0.03;
                const drawP1 = { x: path.p1.x + distP1X, y: path.p1.y + distP1Y };
                const drawP2 = { x: path.p2.x - distP1X, y: path.p2.y - distP1Y };

                const pos = getBezierPoint(p.progress, path.p0, drawP1, drawP2, path.p3);

                ctx.globalAlpha = opacity;
                drawShape(ctx, pos.x, pos.y, p.size, p.type); // No angle rotation for now
                ctx.globalAlpha = 1;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Listeners
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        // Use ResizeObserver for robust layout handling (fixes initial load shifts)
        const resizeObserver = new ResizeObserver(() => {
            handleResize();
        });

        if (container) resizeObserver.observe(container);
        if (button) resizeObserver.observe(button); // Also watch button for size/pos changes

        window.addEventListener('mousemove', handleMouseMove);

        // Initial setup
        handleResize();
        initParticles();
        animate();

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []); // Empty dependency array as state is no longer used for animation logic

    return (
        <div className={styles.heroWrapper} ref={containerRef}>
            <canvas ref={canvasRef} className={styles.canvas} />

            <div className={styles.contentOverlay}>
                <h1 className={styles.headline}>
                    Webrook Platforms
                </h1>

                <h2 className={styles.subHeadline}>
                    Digital infrastructure engineered for scale, speed, and intelligence.
                </h2>

                <p className={styles.description}>
                    We design platform-grade systems that power commerce, operations, and growth built to evolve as your business evolves.
                    From headless commerce to ERP, from launch-ready websites to production-grade applications.
                </p>

                <button
                    ref={buttonRef}
                    className={styles.ctaButton}
                >
                    Kick Start Now
                </button>
            </div>
        </div>
    );
}
