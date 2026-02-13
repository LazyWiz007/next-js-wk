import Link from 'next/link';
import styles from './CTA.module.css';

export default function CTA() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.content}>
                    <h2 className={styles.headline}>
                        If you’re building something that matters <br />
                        <span className={styles.highlight}>let’s talk.</span>
                    </h2>
                    <div className={styles.actions}>
                        <Link href="/contact" className={styles.primaryBtn}>
                            Start a Conversation
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
