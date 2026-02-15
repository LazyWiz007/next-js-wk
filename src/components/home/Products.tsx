'use client';
import { useState } from 'react';
import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Products.module.css';

export default function Products() {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.label}>Proprietary Technology</span>
                    <h2 className={styles.title}>Our Products</h2>
                </div>

                <div className={styles.productCard}>
                    <div className={styles.content}>
                        <div className={styles.productLogo}>
                            <SparklesIcon className={styles.logoIcon} style={{ width: '24px', height: '24px' }} />
                            <span className={styles.productName}>Taprook</span>
                        </div>
                        <h3 className={styles.headline}>The operating system for modern endurance.</h3>
                        <p className={styles.description}>
                            A unified platform for athlete management, race logistics, and performance analytics.
                            Built for the world's toughest events.
                        </p>
                        <div className={styles.actions}>
                            <button className={styles.primaryBtn} onClick={() => setShowVideo(true)}>
                                View Product
                            </button>
                            <span className={styles.comingSoon}>More products in development</span>
                        </div>
                    </div>

                    {/* Abstract Product Visual Placeholder - could be a generated UI mock later */}
                    <div className={styles.visual}>
                        <div className={styles.visualInner}>
                            <Image
                                src="/images/taprook/Business_Card_Mockup.png"
                                alt="Taprook Business Card Mockup"
                                width={500}
                                height={300}
                                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {showVideo && (
                <div className={styles.modalOverlay} onClick={() => setShowVideo(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setShowVideo(false)}>
                            <XMarkIcon style={{ width: '24px', height: '24px' }} />
                            Close
                        </button>
                        <div className={styles.iframeWrapper}>
                            <iframe
                                src="https://www.youtube.com/embed/HjMA-7KwsB0?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3"
                                title="Taprook Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
