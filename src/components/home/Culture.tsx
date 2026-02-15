import Link from 'next/link';
import Image from 'next/image';
import styles from './Culture.module.css';

export default function Culture() {
    return (
        <section className={styles.section}>
            <div className={styles.background}>
                <Image
                    src="/images/webrook_tfn.jpg"
                    alt="Cyclists in mist representing endurance"
                    fill
                    className={styles.image}
                    quality={90}
                    priority
                />
                <div className={styles.overlay} />
            </div>

            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <span className={styles.label}>Our Soul</span>
                    <h2 className={styles.headline}>Beyond the Code.</h2>
                    <p className={styles.text}>
                        We believe in endurance, suffering, and the breakthrough that comes after the climb.
                        Whether it's building systems or riding leTour, the philosophy remains the same:
                        Keep moving forward.
                    </p>
                </div>
            </div>
        </section>
    );
}
