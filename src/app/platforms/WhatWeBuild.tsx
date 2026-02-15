'use client';

import { useState, useEffect } from 'react';
import styles from './what-we-build.module.css';
import Image from 'next/image';

const FEATURE = {
    title: 'Headless Commerce Integrations',
    subtitle: 'Composable commerce, without limitations.',
    description: 'We integrate modern frontends with powerful commerce backends like Shopify, BigCommerce, and custom engines, giving brands complete freedom over experience and performance.',
    bullets: [
        'Lightning-fast storefronts',
        'Full design control',
        'Independent scaling of frontend and backend',
        'Seamless integration with ERP, CMS, analytics, and AI systems'
    ],
    footer: 'Ideal for brands that want flexibility today and scale tomorrow.'
};

const LOGOS = [
    { name: 'Shopify', src: '/logo/Shopify.png' },
    { name: 'BigCommerce', src: '/logo/Bc-logo-dark.png' },
    { name: 'Magento', src: '/logo/Magento.png' },
    { name: 'WooCommerce', src: '/logo/woocommerce-logo.png' }
];

export default function WhatWeBuild() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className={styles.sectionWrapper} id="global-network">
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <span className={styles.label}>What We Build</span>
                </div>

                <div className={styles.featureBlock}>
                    {/* Content Side */}
                    <div className={styles.contentSide}>
                        <h2 className={styles.title}>{FEATURE.title}</h2>
                        <h3 className={styles.subtitle}>{FEATURE.subtitle}</h3>

                        <p className={styles.description}>
                            {FEATURE.description}
                        </p>

                        <ul className={styles.bulletList}>
                            {FEATURE.bullets.map((bullet, i) => (
                                <li key={i} className={styles.bulletItem}>
                                    {bullet}
                                </li>
                            ))}
                        </ul>

                        <div className={styles.footerNote}>
                            {FEATURE.footer}
                        </div>
                    </div>

                    {/* Visual Side: Connected Ecosystem */}
                    <div className={styles.visualSide}>
                        {mounted && (
                            <div className={styles.networkContainer}>

                                {/* Concentric Rings (Background) */}
                                <div className={styles.ring} style={{ width: '40%', height: '40%' }} />
                                <div className={styles.ring} style={{ width: '70%', height: '70%' }} />
                                <div className={styles.ring} style={{ width: '100%', height: '100%' }} />

                                {/* Connecting Lines (SVG) with Mask */}
                                <svg className={styles.connectionSvg}>
                                    {/* Background mask to hide center intersection */}
                                    <defs>
                                        <mask id="hubMask">
                                            <rect width="100%" height="100%" fill="white" />
                                            <circle cx="50%" cy="50%" r="50" fill="black" />
                                        </mask>
                                    </defs>

                                    <g mask="url(#hubMask)">
                                        <line x1="50%" y1="50%" x2="15%" y2="15%" className={styles.connectorLine} />
                                        <line x1="50%" y1="50%" x2="85%" y2="15%" className={styles.connectorLine} />
                                        <line x1="50%" y1="50%" x2="85%" y2="85%" className={styles.connectorLine} />
                                        <line x1="50%" y1="50%" x2="15%" y2="85%" className={styles.connectorLine} />
                                    </g>
                                </svg>

                                {/* Central Hub */}
                                <div className={styles.hub}>
                                    <Image
                                        src="/logo/webrook-logo.png"
                                        alt="Webrook Logo"
                                        width={48}
                                        height={48}
                                        className={styles.hubLogo}
                                    />
                                </div>

                                {/* Partner Nodes (Positioned to match lines) */}
                                <div className={styles.node} style={{ top: '15%', left: '15%' }}>
                                    <Image src="/logo/Shopify.png" alt="Shopify" width={40} height={40} className={styles.nodeLogo} />
                                </div>
                                <div className={styles.node} style={{ top: '15%', right: '15%' }}>
                                    <Image src="/logo/Bc-logo-dark.png" alt="BigCommerce" width={40} height={40} className={styles.nodeLogo} />
                                </div>
                                <div className={styles.node} style={{ bottom: '15%', right: '15%' }}>
                                    <Image src="/logo/Magento.png" alt="Magento" width={40} height={40} className={styles.nodeLogo} />
                                </div>
                                <div className={styles.node} style={{ bottom: '15%', left: '15%' }}>
                                    <Image src="/logo/woocommerce-logo.png" alt="WooCommerce" width={40} height={40} className={styles.nodeLogo} />
                                </div>

                            </div>
                        )}
                    </div>

                    {/* Mobile Only Carousel */}
                    <div className={styles.mobileLogoCarousel}>
                        <div className={styles.logoTrack}>
                            {/* Duplicate for infinite scroll */}
                            {[...LOGOS, ...LOGOS].map((p, i) => (
                                <div key={`${p.name}-${i}`} className={styles.mobileNode}>
                                    <Image src={p.src} alt={p.name} width={40} height={40} className={styles.mobileNodeLogo} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
