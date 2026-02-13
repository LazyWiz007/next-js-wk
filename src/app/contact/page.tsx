'use client';

import { useRef, useEffect, useActionState } from 'react';
import { sendEmail } from '../actions';
import { Turnstile } from '@marsidev/react-turnstile';
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

    // Form State for Server Action
    // We import the server action dynamically to avoid build issues if it's not present yet
    // but here we assume it's available as we are adding it.
    // However, since we are in a client component, we need to be careful.
    // Let's use standard form submission with server action
    // But we need to import `useActionState` from react (available in React 19 / Next.js 15+)
    // Or use basic form submission if useActionState is not yet fully stable in this version/setup.
    // Given Next.js 15+, useActionState is `useFormState` (renamed in React 19 to `useActionState` but `react-dom` handles it).
    // Actually, `useFormState` is from `react-dom`.

    const [state, formAction, isPending] = useActionState(sendEmail, {
        message: '',
        success: false,
    });

    // Reset form on success
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (state.success && formRef.current) {
            formRef.current.reset();
        }
    }, [state.success]);

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
                            <a href="mailto:hello@webrook.in" className={styles.value}>hello@webrook.in</a>
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
                            <form ref={formRef} action={formAction}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name" className={styles.label}>Name</label>
                                    <input type="text" id="name" name="name" required className={styles.input} placeholder="Jane Doe" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email" className={styles.label}>Email</label>
                                    <input type="email" id="email" name="email" required className={styles.input} placeholder="jane@company.com" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="subject" className={styles.label}>Subject</label>
                                    <div className="relative">
                                        <select id="subject" name="subject" className={styles.select}>
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Project Discussion">Project Discussion</option>
                                            <option value="Partnership">Partnership</option>
                                            <option value="Careers">Careers</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="message" className={styles.label}>Message</label>
                                    <textarea id="message" name="message" required className={styles.textarea} placeholder="Tell us about your system..."></textarea>
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} />
                                </div>

                                <button type="submit" disabled={isPending} className={styles.submitButton}>
                                    {isPending ? 'Sending...' : 'Send Message'}
                                </button>

                                {state.message && (
                                    <p style={{
                                        marginTop: '1rem',
                                        color: state.success ? '#4ade80' : '#f87171',
                                        fontSize: '0.9rem'
                                    }}>
                                        {state.message}
                                    </p>
                                )}
                            </form>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
