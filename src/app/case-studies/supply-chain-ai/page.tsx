'use client';

import styles from '../case-study.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function SupplyChainAIPage() {
    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <span className={styles.domain}>Supply Chain · Logistics Intelligence</span>
                    <h1 className={styles.title}>AI in Supply Chain</h1>

                    {/* Hero Images - Side by Side or Stacked based on preference. Using a grid here. */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px', marginTop: '24px' }}>
                        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f1f3f4' }}>
                            <Image
                                src="/images/cabnova.png"
                                alt="Cabnova Interface 1"
                                width={600}
                                height={400}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>
                        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f1f3f4' }}>
                            <Image
                                src="/images/cabnova2.png"
                                alt="Cabnova Interface 2"
                                width={600}
                                height={400}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>
                    </div>

                    <Link href="/contact" className={styles.ctaButton}>
                        Contact us to explore potential applications <span>→</span>
                    </Link>
                </div>
            </section>

            {/* Content Section */}
            <div className={styles.container}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Overview</h2>
                    <p className={styles.text}>
                        Modern logistics systems struggle with inefficiencies caused by static planning and delayed decision-making. Supply Chain AI explores how intelligent systems can improve operational flow in complex logistics environments.
                    </p>

                    <hr className={styles.divider} />

                    <h2 className={styles.sectionTitle}>What We’re Building</h2>
                    <p className={styles.text}>
                        Supply Chain AI is an AI-powered optimization platform designed to assist logistics operations by continuously analyzing movement, constraints, and operational variables to improve routing and planning decisions.
                    </p>

                    <h2 className={styles.sectionTitle}>Why It Matters</h2>
                    <p className={styles.text}>
                        Even small inefficiencies in logistics compound into large operational costs. Intelligent optimization can reduce delays, lower costs, and improve predictability especially in fast-moving or high-volume environments.
                    </p>

                    <hr className={styles.divider} />

                    <h2 className={styles.sectionTitle}>Current Status</h2>
                    <ul className={styles.statusList}>
                        <li className={styles.statusItem}>Core intelligence models under active development</li>
                        <li className={styles.statusItem}>Focused on adaptability rather than fixed-rule optimization</li>
                        <li className={styles.statusItem}>Designed to integrate with existing operational systems</li>
                    </ul>

                    <div style={{ marginTop: '60px' }}>
                        <Link href="/contact" className={styles.ctaButton}>
                            Contact us to explore potential applications <span>→</span>
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
