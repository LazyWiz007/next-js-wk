'use client';

import styles from '../case-study.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function AutonomousQCPage() {
    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <span className={styles.domain}>Energy · Industrial AI</span>
                    <h1 className={styles.title}>Autonomous QC</h1>
                </div>
            </section>

            {/* Content Section */}
            <div className={styles.container}>
                <section className={styles.section}>
                    {/* Overview & Image Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'start', marginBottom: '60px' }}>
                        <div>
                            <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>Overview</h2>
                            <p className={styles.text} style={{ marginBottom: 0 }}>
                                Manual inspection of large-scale energy assets is time-consuming, expensive, and prone to inconsistency. This project explores how autonomous intelligence can transform quality control in renewable energy infrastructure.
                            </p>
                        </div>
                        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f1f3f4' }}>
                            <Image
                                src="/images/droneqc.jpg"
                                alt="Drone Inspection of Solar Farm"
                                width={600}
                                height={400}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>
                    </div>

                    <hr className={styles.divider} />

                    {/* Exporting Regions */}
                    <div style={{ marginBottom: '60px' }}>
                        <span style={{ fontFamily: 'var(--font-plus-jakarta)', fontWeight: 600, color: '#5f6368', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '24px' }}>
                            Exporting To
                        </span>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '24px' }}>
                            {/* Australia */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#f8f9fa', borderRadius: '12px' }}>
                                <div style={{ width: '32px', height: '32px', position: 'relative', flexShrink: 0 }}>
                                    <Image src="/images/flag_australia.png" alt="Australian Flag" fill style={{ objectFit: 'contain' }} />
                                </div>
                                <span style={{ fontFamily: 'var(--font-plus-jakarta)', fontWeight: 500, color: '#202124' }}>Australia</span>
                            </div>

                            {/* New Zealand */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#f8f9fa', borderRadius: '12px' }}>
                                <div style={{ width: '32px', height: '32px', position: 'relative', flexShrink: 0 }}>
                                    <Image src="/images/flag_new_zealand.png" alt="New Zealand Flag" fill style={{ objectFit: 'contain' }} />
                                </div>
                                <span style={{ fontFamily: 'var(--font-plus-jakarta)', fontWeight: 500, color: '#202124' }}>New Zealand</span>
                            </div>

                            {/* South Africa */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#f8f9fa', borderRadius: '12px' }}>
                                <div style={{ width: '32px', height: '32px', position: 'relative', flexShrink: 0 }}>
                                    <Image src="/images/flag_south_africa.png" alt="South African Flag" fill style={{ objectFit: 'contain' }} />
                                </div>
                                <span style={{ fontFamily: 'var(--font-plus-jakarta)', fontWeight: 500, color: '#202124' }}>South Africa</span>
                            </div>
                        </div>
                    </div>

                    <h2 className={styles.sectionTitle}>What We’re Building</h2>
                    <p className={styles.text}>
                        An AI-enabled inspection system that analyzes aerial imagery to identify and assess solar panel damage. The system is designed to operate with minimal human intervention while delivering consistent, actionable insights.
                    </p>

                    <h2 className={styles.sectionTitle}>Why It Matters</h2>
                    <p className={styles.text}>
                        Automated inspection reduces downtime, improves safety, and enables faster maintenance decisions critical factors in scaling renewable energy operations efficiently.
                    </p>

                    <hr className={styles.divider} />

                    <h2 className={styles.sectionTitle}>Current Status</h2>
                    <ul className={styles.statusList}>
                        <li className={styles.statusItem}>Functional MVP demonstrated using drone imagery</li>
                        <li className={styles.statusItem}>Focused on improving robustness across varying image conditions</li>
                        <li className={styles.statusItem}>Under iterative refinement for real-world deployment</li>
                    </ul>

                    <div style={{ marginTop: '60px' }}>
                        <Link href="/contact" className={styles.ctaButton}>
                            Request access to a demo <span>→</span>
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
