'use client';

import styles from '../case-study.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function PredictiveDiagnosticsPage() {
    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <span className={styles.domain}>Public Health · Healthcare AI</span>
                    <h1 className={styles.title}>Predictive Diagnostics</h1>
                    <div className={styles.collaboration}>
                        Collaboration: UNICEF & Partner Hospitals
                    </div>
                    <Link href="/contact" className={styles.ctaButton}>
                        Request a demo to learn more <span>→</span>
                    </Link>
                </div>
            </section>

            {/* Content Section */}
            <div className={styles.container}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Overview</h2>
                    <p className={styles.text}>
                        Access to accurate newborn health data remains a challenge in Tier-2 and Tier-3 regions, especially where home deliveries are common. This project focuses on using artificial intelligence to bridge that gap through non-invasive diagnostics.
                    </p>

                    <hr className={styles.divider} />

                    <h2 className={styles.sectionTitle}>What We’re Building</h2>
                    <p className={styles.text}>
                        We are developing an AI-driven diagnostic system that can estimate critical newborn health indicators — such as weight and key physical parameters — using a single image. The system is designed to work in low-resource environments without requiring specialized medical equipment.
                    </p>

                    <h2 className={styles.sectionTitle}>Why It Matters</h2>
                    <p className={styles.text}>
                        Early detection of health risks in newborns can significantly improve clinical outcomes. By enabling hospitals and healthcare workers to capture essential data quickly, this solution has the potential to strengthen public health infrastructure at scale.
                    </p>

                    <hr className={styles.divider} />

                    <h2 className={styles.sectionTitle}>Current Status</h2>
                    <ul className={styles.statusList}>
                        <li className={styles.statusItem}>Prediction accuracy exceeding 99% in controlled evaluations</li>
                        <li className={styles.statusItem}>Actively improving the system in collaboration with hospitals and UNICEF</li>
                        <li className={styles.statusItem}>Designed for real-world deployment in decentralized healthcare settings</li>
                    </ul>

                    <div style={{ marginTop: '60px' }}>
                        <Link href="/contact" className={styles.ctaButton}>
                            Request a demo to learn more <span>→</span>
                        </Link>
                    </div>

                    {/* Logo Section */}
                    <div className={styles.logoSection}>
                        <Image
                            src="/images/Logo_of_UNICEF.png"
                            alt="UNICEF Logo"
                            width={200}
                            height={80}
                            className={styles.unicefLogo}
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}
