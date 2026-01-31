'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './Impact.module.css';

const STATS = [
    { label: 'Industries Transformed', value: 12, suffix: '+' },
    { label: 'Systems Deployed', value: 45, suffix: '' },
    { label: 'Global Clients', value: 8, suffix: '' },
    { label: 'Years Building', value: 6, suffix: '+' },
];

function CountUp({ end, duration = 2000 }: { end: number, duration?: number }) {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function (easeOutExpo)
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setCount(Math.floor(easeOut * end));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return <span ref={countRef}>{count}</span>;
}

export default function Impact() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.intro}>
                        <h2 className={styles.title}>Impact & Trust</h2>
                        <p className={styles.subtitle}>
                            We build systems that run the essential operations of modern enterprises.
                            Reliability is our currency.
                        </p>
                    </div>

                    <div className={styles.statsGrid}>
                        {STATS.map((stat, i) => (
                            <div key={i} className={styles.statItem}>
                                <div className={styles.statValue}>
                                    <CountUp end={stat.value} />{stat.suffix}
                                </div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
