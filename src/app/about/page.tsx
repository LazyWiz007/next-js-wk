'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './about.module.css';

// Reusable FadeIn Component
const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default function AboutPage() {
    const { scrollYProgress } = useScroll();
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);


    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!gridRef.current) return;
            const x = e.clientX;
            const y = e.clientY;
            gridRef.current.style.setProperty('--x', `${x}px`);
            gridRef.current.style.setProperty('--y', `${y}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className={styles.container}>
            {/* Ambient background movement & Gradient Grid */}
            <motion.div
                ref={gridRef}
                className={styles.abstractGrid}
                style={{ y: backgroundY } as any}
            />

            {/* 1. Hero Section */}
            <section className={styles.heroSection}>
                <FadeIn>
                    <h1 className={styles.heroHeadline}>Building systems that<br />
                        <span className={styles.breathingText}>endure</span> change.</h1>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <p className={styles.bodyText} style={{ textAlign: 'center', margin: '0 auto' }}>
                        Not just products. Foundations.
                    </p>
                </FadeIn>
            </section>

            {/* 2. About Webrook */}
            <section className={styles.standardSection}>
                <FadeIn>
                    <div className={styles.sectionWrapper} style={{ borderBottom: 'none' }}>
                        <p className={styles.bodyText} style={{ fontSize: '1.5rem', maxWidth: '80ch', color: 'var(--foreground)' }}>
                            Webrook didn’t start as a company. It started as a pattern of broken systems.
                            Rushed decisions. Shortcuts that collapsed after six months.
                            <br /><br />
                            We decided to build differently.
                        </p>
                    </div>
                </FadeIn>
            </section>

            {/* 3. Who We Are (Split Layout) */}
            <section className={styles.splitLayout} style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div className={styles.splitContent}>
                    <FadeIn>
                        <h2 className={styles.sectionHeadline}>The Builder’s Mindset</h2>
                        <p className={styles.bodyText}>
                            Webrook was founded by someone who builds — not just products, but systems.
                            Systems require patience. They demand structure. They reward discipline over noise.
                        </p>
                        <p className={styles.bodyText}>
                            Whether it’s technology, operations, or endurance sports, the principle is the same:
                            <span style={{ display: 'block', marginTop: '1rem', fontStyle: 'italic', color: 'var(--foreground)' }}>
                                If it doesn’t hold under pressure, it was never built right.
                            </span>
                        </p>
                    </FadeIn>
                </div>
                <div className={styles.splitVisual}>
                    <motion.div
                        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <img
                            src="/video/about_us.jpeg"
                            alt="The Builder's Mindset"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* 4. How We Think (Stacked) */}
            <section id="philosophy" className={styles.standardSection}>
                <div className={styles.sectionWrapper} style={{ border: 'none' }}>
                    <FadeIn>
                        <h2 className={styles.sectionHeadline}>What We Believe</h2>
                    </FadeIn>
                    <div style={{ marginTop: '4rem' }}>
                        {['Process matters more than hype.', 'Longevity beats virality.', 'Quiet systems outperform loud promises.', 'Good design is not decoration — it’s clarity.', 'Technology should adapt to people, not the other way around.'].map((item, index) => {
                            const colors = ['#EF3636', '#FDB514', '#55BB5D'];
                            const hoverColor = colors[index % colors.length];
                            return (
                                <FadeIn key={index} delay={index * 0.1}>
                                    <div
                                        className={styles.principleItem}
                                        style={{ '--hover-color': hoverColor } as any}
                                    >
                                        <p className={styles.bodyText} style={{ marginBottom: 0 }}>{item}</p>
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5. Why "Webrook" (Visual Metaphor) */}
            <section id="brand" className={styles.standardSection} style={{ backgroundColor: '#f9f9f9' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <FadeIn>
                        <div style={{ margin: '0 auto 2rem auto' }}>
                            <img src="/webrook-logo.png" alt="Webrook Logo" style={{ width: '60px', height: 'auto' }} />
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <h2 className={styles.sectionHeadline}>Why the Rook?</h2>
                        <p className={styles.bodyText}>
                            The rook is not the flashiest piece on the board. But it is central. Defensive. Relentless.
                            It connects. It protects. It changes the outcome — quietly.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* 6. What We Stand For */}
            <section className={styles.standardSection}>
                <FadeIn>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 className={styles.sectionHeadline} style={{ marginBottom: '3rem' }}>Core Principles</h2>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>We don’t chase trends. We study cycles.</li>
                            <li className={styles.bulletItem}>We build for the long game.</li>
                            <li className={styles.bulletItem}>We value clarity over complexity.</li>
                        </ul>
                    </div>
                </FadeIn>
            </section>

            {/* 7. Beyond Client Work (Grid) */}
            <section className={styles.standardSection} style={{ padding: 0, maxWidth: 'none' }}>
                <div className={styles.moduleGrid}>
                    <div className={styles.moduleCard}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Across Industries</h3>
                        <p className={styles.bodyText} style={{ fontSize: '1rem' }}>Adaptable systems that solve universal problems.</p>
                    </div>
                    <div className={styles.moduleCard}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Across Technologies</h3>
                        <p className={styles.bodyText} style={{ fontSize: '1rem' }}>Agnostic to tools. Loyal to outcomes.</p>
                    </div>
                    <div className={styles.moduleCard}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Across Years</h3>
                        <p className={styles.bodyText} style={{ fontSize: '1rem' }}>Built to last, not just to launch.</p>
                    </div>
                </div>
            </section>

            {/* 8. Alliances & Partners */}
            <section id="partners" className={styles.standardSection}>
                <FadeIn>
                    <div className={styles.sectionWrapper} style={{ border: 'none', textAlign: 'center' }}>
                        <h2 className={styles.sectionHeadline}>Alliances & Partners</h2>
                        <div className={styles.partnerMarquee}>
                            <div className={styles.marqueeTrack}>
                                {/* Duplicated for infinite scroll effect */}
                                {[...Array(6)].flatMap(() => [
                                    { name: 'Shadowlines', src: '/logo/partners/shadowlines.png' },
                                    { name: 'TFN', src: '/logo/partners/TFN.png' },
                                    { name: 'Odoo', src: '/logo/partners/odoo.png' }
                                ]).map((logo, index) => (
                                    <div key={index} style={{ padding: '0 2rem' }}>
                                        <img
                                            src={logo.src}
                                            alt={`${logo.name} logo`}
                                            className={styles.partnerLogo}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>

            {/* 9. Looking Forward */}
            <section style={{ padding: '10rem 2rem', textAlign: 'center', backgroundColor: 'var(--background)' }}>
                <FadeIn>
                    <h2 className={styles.heroHeadline} style={{ fontSize: '3rem' }}>Webrook, always forward.</h2>
                </FadeIn>
            </section>
        </div>
    );
}
