'use client';

import styles from '../case-study.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function MotorsportsIntelligencePage() {
    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <span className={styles.domain}>Sports Tech · Performance Analytics</span>
                    <h1 className={styles.title}>Motorsports Intelligence</h1>

                    {/* Hero Images Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px', marginTop: '24px' }}>
                        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f1f3f4' }}>
                            <Image
                                src="/images/motorsportsAI.jpg"
                                alt="Motorsports AI Analysis"
                                width={600}
                                height={400}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>
                        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f1f3f4' }}>
                            <Image
                                src="/images/webrook AI.webp"
                                alt="Webrook AI Interface"
                                width={600}
                                height={400}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>
                    </div>

                    <Link href="/contact" className={styles.ctaButton}>
                        Talk to us about pilots and collaborations <span>→</span>
                    </Link>
                </div>
            </section>

            {/* Content Section */}
            <div className={styles.container}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Overview</h2>
                    <p className={styles.text}>
                        Motorsports generates vast amounts of raw data, but translating that data into actionable feedback remains a bottleneck. This project focuses on turning raw telemetry into meaningful performance insights.
                    </p>

                    <hr className={styles.divider} />

                    <h2 className={styles.sectionTitle}>What We’re Building</h2>
                    <p className={styles.text}>
                        A performance intelligence system that analyzes test-ride data to provide structured feedback for drivers and race teams. The goal is to augment — and in some cases reduce dependency on — traditional engineering interpretation.
                    </p>

                    <h2 className={styles.sectionTitle}>Why It Matters</h2>
                    <p className={styles.text}>
                        Faster feedback loops allow drivers to improve performance more efficiently, while teams gain clearer insight into performance variables without relying solely on manual analysis.
                    </p>

                    <hr className={styles.divider} />

                    <h2 className={styles.sectionTitle}>Current Status</h2>
                    <ul className={styles.statusList}>
                        <li className={styles.statusItem}>Actively tested with race managers and drivers</li>
                        <li className={styles.statusItem}>Focused on driver feedback and performance patterns</li>
                        <li className={styles.statusItem}>Under development with future expansion planned</li>
                    </ul>

                    <div style={{ marginTop: '60px' }}>
                        <Link href="/contact" className={styles.ctaButton}>
                            Talk to us about pilots and collaborations <span>→</span>
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
