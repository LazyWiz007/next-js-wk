'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './contact.module.css';

// Reusable FadeIn Component (Consistent with About Page)
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

export default function ContactPage() {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted (Demo)");
        alert("Thanks for reaching out! We'll get back to you shortly.");
    };

    return (
        <div className={styles.container}>
            {/* Ambient background movement & Gradient Grid */}
            <motion.div
                ref={gridRef}
                className={styles.abstractGrid}
                style={{ y: backgroundY } as any}
            />

            <div className={styles.splitLayout}>
                {/* Left Column: Info */}
                <div className={styles.infoColumn}>
                    <FadeIn delay={0.1}>
                        <h1 className={styles.heading}>Start a conversation.</h1>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className={styles.subText}>
                            We build systems for the long haul. Whether you're scaling a platform or laying a new foundation, let's discuss how we can build it right.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className={styles.contactDetail}>
                            <span className={styles.label}>Email</span>
                            <a href="mailto:hello@webrook.io" className={styles.value}>hello@webrook.io</a>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <div className={styles.contactDetail}>
                            <span className={styles.label}>Office</span>
                            <p className={styles.value}>
                                Bangalore, India<br />
                                560001
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.5}>
                        <div className={styles.contactDetail}>
                            <span className={styles.label}>Connect</span>
                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                                <a href="#" className={styles.value}>LinkedIn</a>
                                <a href="#" className={styles.value}>Twitter</a>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.6}>
                        <div>
                            <span className={styles.label} style={{ marginBottom: '1rem' }}>Interested in building with us?</span>
                            <a href="/careers" className={styles.submitButton} style={{ display: 'inline-block', width: 'auto', textDecoration: 'none' }}>
                                Join the Team
                            </a>
                        </div>
                    </FadeIn>
                </div>

                {/* Right Column: Form */}
                <div className={styles.formColumn}>
                    <FadeIn delay={0.3}>
                        <div className={styles.formCard}>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name" className={styles.label}>Name</label>
                                    <input type="text" id="name" required className={styles.input} placeholder="Jane Doe" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email" className={styles.label}>Email</label>
                                    <input type="email" id="email" required className={styles.input} placeholder="jane@company.com" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="subject" className={styles.label}>Subject</label>
                                    <select id="subject" className={styles.select}>
                                        <option>General Inquiry</option>
                                        <option>Project Discussion</option>
                                        <option>Partnership</option>
                                        <option>Careers</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="message" className={styles.label}>Message</label>
                                    <textarea id="message" required className={styles.textarea} placeholder="Tell us about your system..."></textarea>
                                </div>
                                <button type="submit" className={styles.submitButton}>Send Message</button>
                            </form>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
