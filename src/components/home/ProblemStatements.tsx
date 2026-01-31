'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './ProblemStatements.module.css';

const PROBLEMS = [
    {
        id: 1,
        title: "Legacy Systems",
        desc: "Your core infrastructure is aging, slowing down innovation.",
        shape: 'cube'
    },
    {
        id: 2,
        title: "Data Silos",
        desc: "Information is trapped in isolated pockets, invisible to AI.",
        shape: 'sphere'
    },
    {
        id: 3,
        title: "Fragmented UX",
        desc: "Users struggle with disjointed workflows across platforms.",
        shape: 'pyramid'
    }
];

export default function ProblemStatements() {
    const [activeId, setActiveId] = useState<number | null>(null);

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.split}>
                    <div className={styles.contentSide}>
                        <span className={styles.label}>The Challenge</span>
                        <h2 className={styles.heading}>What holds you back.</h2>

                        <div className={styles.problemList}>
                            {PROBLEMS.map((p) => (
                                <div
                                    key={p.id}
                                    className={`${styles.item} ${activeId === p.id ? styles.active : ''}`}
                                    onMouseEnter={() => setActiveId(p.id)}
                                    onMouseLeave={() => setActiveId(null)}
                                >
                                    <h3 className={styles.itemTitle}>{p.title}</h3>
                                    <p className={styles.itemDesc}>{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.visualSide}>
                        {/* Abstract Visual Placeholder - Dynamic based on activeId */}
                        <div className={`${styles.visualShape} ${activeId ? styles[`shape-${activeId}`] : ''}`} />
                    </div>
                </div>
            </div>
        </section>
    );
}
