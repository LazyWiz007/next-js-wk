'use client';

import styles from './web-and-app.module.css';

const DATA = [
    {
        id: 'website',
        label: 'Website Development',
        title: 'Launch-ready,\nperformance-driven digital experiences.',
        description: 'We build high-impact websites for brands, startups, and large-scale events — engineered for speed, clarity, and conversion.',
        bullets: [
            'Modern UI/UX with clean, minimal design',
            'SEO-first architecture',
            'Fast load times and responsive performance',
            'Built to scale with future integrations'
        ],
        footer: 'From product launches to enterprise presence, we treat websites as strategic platforms, not static pages.'
    },
    {
        id: 'application',
        label: 'Application Development',
        title: 'Production-grade applications built for real-world use.',
        description: 'We design and develop web and mobile applications tailored to business-critical workflows.',
        bullets: [
            'Scalable backend architecture',
            'Secure APIs and integrations',
            'AI-enabled features where relevant',
            'Long-term maintainability and performance'
        ],
        footer: 'Every application we build is engineered for reliability, adaptability, and growth.'
    }
];

export default function WebAndAppDev() {
    return (
        <section className={styles.sectionWrapper} id="mobile-ecosystem">
            <div className={styles.container}>
                <div className={styles.splitLayout}>
                    {DATA.map((item) => (
                        <div key={item.id} className={styles.card}>
                            {/* Always Visible Header */}
                            <div className={styles.header}>
                                <span className={styles.label}>{item.label}</span>
                                <h3 className={styles.title}>{item.title}</h3>
                            </div>

                            {/* Hidden Details - Expand on Hover */}
                            <div className={styles.details}>
                                <p className={styles.description}>
                                    {item.description}
                                </p>

                                <ul className={styles.bulletList}>
                                    {item.bullets.map((bullet, i) => (
                                        <li key={i} className={styles.bulletItem}>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>

                                <p className={styles.subtitle} style={{ fontSize: '16px', fontWeight: 600 }}>
                                    {item.footer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
