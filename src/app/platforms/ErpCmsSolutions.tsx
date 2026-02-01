'use client';

import { useState, useEffect } from 'react';
import styles from './erp-cms.module.css';
import Image from 'next/image';

const ERP_FEATURE = {
    title: 'ERP & CMS Solutions',
    subtitle: 'Operational clarity meets intelligent workflows.',
    description: 'As an Odoo Partner, we implement and customise ERP and CMS systems that connect commerce, inventory, finance, and operations into a single source of truth.',
    bullets: [
        'Sales, inventory, accounting, and CRM',
        'Custom workflows and dashboards',
        'Industry-specific ERP customisation',
        'Secure, scalable backend systems'
    ],
    footer: 'Designed for businesses that need control, visibility, and operational efficiency'
};

const NODES = [
    { label: 'Odoo Partner', x: '15%', y: '15%' }, // top-left
    { label: 'Inventory', x: '85%', y: '15%' }, // top-right
    { label: 'Finance', x: '85%', y: '85%' }, // bottom-right
    { label: 'CRM', x: '15%', y: '85%' }  // bottom-left
];

export default function ErpCmsSolutions() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className={styles.sectionWrapper} id="enterprise-core">
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    {/* Optional label if needed, or keeping it empty to align with previous blocks */}
                </div>

                <div className={styles.featureBlock}>
                    {/* Visual Side: Connected Ecosystem (Left aligned for alternation, or keep same side? Keeping Same Side for consistency logic unless alternating is preferred. Let's keep Right Side Visual for consistency with the design system unless specified) 
                        WAIT - user usually likes alternation. But let's stick to the previous pattern first. 
                        Actually, let's just keep it consistent with WhatWeBuild structure.
                    */}
                    <div className={styles.contentSide}>
                        <h2 className={styles.title}>{ERP_FEATURE.title}</h2>
                        <h3 className={styles.subtitle}>{ERP_FEATURE.subtitle}</h3>

                        <p className={styles.description}>
                            {ERP_FEATURE.description}
                        </p>

                        <ul className={styles.bulletList}>
                            {ERP_FEATURE.bullets.map((bullet, i) => (
                                <li key={i} className={styles.bulletItem}>
                                    {bullet}
                                </li>
                            ))}
                        </ul>

                        <div className={styles.footerNote}>
                            {ERP_FEATURE.footer}
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
                                    <defs>
                                        <mask id="erpHubMask">
                                            <rect width="100%" height="100%" fill="white" />
                                            <circle cx="50%" cy="50%" r="50" fill="black" />
                                        </mask>
                                    </defs>

                                    <g mask="url(#erpHubMask)">
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
                                        alt="Webrook"
                                        width={48}
                                        height={48}
                                        className={styles.hubLogo}
                                    />
                                </div>

                                {/* Text Nodes */}
                                {NODES.map((node, i) => (
                                    <div key={i} className={styles.node} style={{ left: node.x, top: node.y }}>
                                        <span className={styles.nodeText}>{node.label}</span>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>

                    {/* Mobile Only Carousel */}
                    <div className={styles.mobileLogoCarousel}>
                        <div className={styles.logoTrack}>
                            {/* Duplicate for infinite scroll */}
                            {[...NODES, ...NODES].map((node, i) => (
                                <div key={`${node.label}-${i}`} className={styles.scrollNode}>
                                    <span>{node.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
