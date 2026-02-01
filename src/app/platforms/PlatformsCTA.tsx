'use client';

import styles from './platforms-cta.module.css';
import Link from 'next/link';

export default function PlatformsCTA() {
    return (
        <section className={styles.sectionWrapper}>
            <div className={styles.glow} />
            <div className={styles.container}>
                <span className={styles.label}>Built for What’s Next</span>

                <h2 className={styles.headline}>
                    Always Forward.
                </h2>

                <h3 className={styles.subhead}>
                    The digital systems you choose today define how far you can scale tomorrow.
                </h3>

                <p className={styles.bodyText}>
                    At Webrook, we build platforms that don’t just support your business —
                    they move it forward.
                </p>

                {/* Optional Tagline or visual separator could go here, but Headline serves this purpose well */}

                <Link href="/contact" className={styles.actionButton}>
                    Start Building
                </Link>
            </div>
        </section>
    );
}
