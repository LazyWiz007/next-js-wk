'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './careers.module.css';

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

export default function CareersPage() {
    const { scrollYProgress } = useScroll();
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

    // Interactive Grid Logic
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

            {/* Hero */}
            <section className={styles.heroSection}>
                <FadeIn>
                    <h1 className={styles.heroHeadline}>Join the Architects.</h1>
                    <p className={styles.heroSubtext}>
                        We build systems that endure. If you believe in clarity over noise and structure over hype, you belong here.
                    </p>
                </FadeIn>
            </section>

            {/* Culture / Values Brief */}
            <section className={styles.cultureSection}>
                <FadeIn>
                    <h2 className={styles.sectionTitle}>Why Build Here?</h2>
                </FadeIn>
                <div className={styles.cultureGrid}>
                    <FadeIn delay={0.1}>
                        <div className={styles.cultureCard}>
                            <h3 className={styles.cultureTitle}>Deep Work</h3>
                            <p className={styles.cultureText}>We value uninterrupted focus time. No unnecessary meetings. Just pure problem solving.</p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <div className={styles.cultureCard}>
                            <h3 className={styles.cultureTitle}>Autonomy</h3>
                            <p className={styles.cultureText}>You own your outcomes. We provide the resources, you provide the direction.</p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <div className={styles.cultureCard}>
                            <h3 className={styles.cultureTitle}>Mastery</h3>
                            <p className={styles.cultureText}>We invest in your growth. Conferences, courses, and the freedom to explore new tools.</p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Open Positions */}
            <section className={styles.jobsSection}>
                <FadeIn>
                    <h2 className={styles.sectionTitle}>Open Positions</h2>
                </FadeIn>

                {/* Graphic Designer Role */}
                <FadeIn delay={0.2}>
                    <div className={styles.jobCard}>
                        <div className={styles.jobInfo}>
                            <h3 className={styles.jobTitle}>Graphic Designer (Brand & UI Systems)</h3>
                            <div className={styles.jobMeta}>
                                <span>Remote / Bangalore</span>
                                <span>•</span>
                                <span>Full-Time</span>
                                <span>•</span>
                                <span>Design Team</span>
                            </div>
                            <p className={styles.jobDesc}>
                                We don't just want pretty pictures. We want visual systems that communicate clarity, structure, and endurance.
                                You will shape the visual language of Webrook and our partners, translating complex engineering concepts into elegant visual metaphors.
                            </p>
                            <ul className={styles.requirementsList}>
                                <li className={styles.reqItem}>Mastery of Figma and modern design tools.</li>
                                <li className={styles.reqItem}>Strong grasp of typography, grid systems, and layout principles.</li>
                                <li className={styles.reqItem}>Ability to create "Engineering Aesthetic" visuals (data viz, schematics, clean UI).</li>
                                <li className={styles.reqItem}>Experience with motion design is a plus.</li>
                            </ul>
                        </div>
                        <div className={styles.jobAction}>
                            <a href="mailto:hello@webrook.in?subject=Application: Graphic Designer" className={styles.applyButton}>
                                Apply Now
                            </a>
                        </div>
                    </div>
                </FadeIn>

                {/* Placeholder for future jobs */}
                <FadeIn delay={0.3}>
                    <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: '8px', color: '#888' }}>
                        <p>More engineering roles opening Q3 2026.</p>
                    </div>
                </FadeIn>

            </section>
        </div>
    );
}
