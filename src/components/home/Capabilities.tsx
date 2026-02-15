'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import styles from './Capabilities.module.css';

const CAPABILITIES = [
    {
        title: 'Industry AI Systems',
        desc: 'Purpose-built intelligence for specific verticals.',
        video: '/video/webrook_ai.mp4'
    },
    {
        title: 'Custom AI Agents & MCP',
        desc: 'Autonomous workers that execute complex workflows.',
        video: '/video/webrook_ai_mcp.mp4'
    },
    {
        title: 'Digital Platforms',
        desc: 'Scalable web & mobile ecosystems.',
        video: '/video/appdesign_webrook2.mp4'
    },
    {
        title: 'Intelligent Products',
        desc: 'Next-gen tools like Taprook.',
        video: '/video/product_webrook.mp4'
    },
];



export default function Capabilities() {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const mobileContainerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            video.currentTime = 0;
            video.play().catch(e => console.error("Video play failed:", e));
        }
    };

    const handleMouseLeave = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            video.pause();
            video.currentTime = 0; // Reset to frame 0 for thumbnail
        }
    };

    const scrollMobile = (direction: 'left' | 'right') => {
        if (mobileContainerRef.current) {
            const container = mobileContainerRef.current;
            const scrollAmount = window.innerWidth;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.label}>Our Core Capabilities</span>
                    <h2 className={styles.title}>What We Actually Do</h2>
                </div>
            </div>

            <div className={styles.accordionGrid}>
                {CAPABILITIES.map((item, index) => (
                    <Link href="/intelligence" className={styles.cardLink} key={item.title}>
                        <div
                            className={styles.card}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            <div className={styles.cardBackground}>
                                <video
                                    ref={el => { videoRefs.current[index] = el }}
                                    className={styles.cardVideo}
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata" // Will load the first frame as poster
                                >
                                    <source src={item.video} type="video/mp4" />
                                </video>
                                <div className={styles.cardOverlay} />
                            </div>

                            <div className={styles.cardContent}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.index}>0{index + 1}</span>
                                </div>
                                <div className={styles.textWrapper}>
                                    <h3 className={styles.cardTitle}>{item.title}</h3>
                                    <p className={styles.cardDesc}>{item.desc}</p>
                                    <div className={styles.explore}>
                                        <span className={styles.exploreText}>Explore</span>
                                        <ArrowRightIcon className={styles.arrow} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Mobile Carousel - Visible only on mobile */}
            <div className={styles.mobileCarouselWrapper}>
                <div className={styles.mobileGrid} ref={mobileContainerRef}>
                    {CAPABILITIES.map((item, index) => (
                        <Link href="/intelligence" key={item.title} className={styles.mobileCardLink}>
                            <div className={styles.mobileCard}>
                                <div className={styles.mobileCardBackground}>
                                    <video
                                        className={styles.mobileVideo}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    >
                                        <source src={item.video} type="video/mp4" />
                                    </video>
                                    <div className={styles.mobileOverlay} />
                                </div>
                                <div className={styles.mobileContent}>
                                    <span className={styles.mobileIndex}>0{index + 1}</span>
                                    <h3 className={styles.mobileTitle}>{item.title}</h3>
                                    <p className={styles.mobileDesc}>{item.desc}</p>
                                    <div className={styles.mobileExplore}>
                                        <span>Explore</span>
                                        <ArrowRightIcon className={styles.arrow} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className={styles.mobileControls}>
                    <button onClick={() => scrollMobile('left')} className={styles.controlBtn}>
                        <ChevronLeftIcon className={styles.controlIcon} />
                    </button>
                    <button onClick={() => scrollMobile('right')} className={styles.controlBtn}>
                        <ChevronRightIcon className={styles.controlIcon} />
                    </button>
                </div>
            </div>
        </section >
    );
}
