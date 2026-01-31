import { BuildingOffice2Icon, CpuChipIcon, GlobeAltIcon, BoltIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import styles from './Capabilities.module.css';

const CAPABILITIES = [
    {
        title: 'Industry AI Systems',
        desc: 'Purpose-built intelligence for specific verticals.',
        image: '/images/industry-ai.png',
    },
    {
        title: 'Custom AI Agents & MCP',
        desc: 'Autonomous workers that execute complex workflows.',
        image: '/images/ai-agents.png',
    },
    {
        title: 'Digital Platforms',
        desc: 'Scalable web & mobile ecosystems.',
        image: '/images/digital-platforms.png',
    },
    {
        title: 'Intelligent Products',
        desc: 'Next-gen tools like Taprook.',
        image: '/images/intelligent-products.png',
    },
];

export default function Capabilities() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.label}>Our Core Capabilities</span>
                    <h2 className={styles.title}>What We Actually Do</h2>
                </div>

                <div className={styles.grid}>
                    {CAPABILITIES.map((item) => (
                        <div key={item.title} className={styles.card}>
                            <div className={styles.cardBackground}>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className={styles.cardImage}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                                <div className={styles.cardOverlay} />
                            </div>

                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.cardDesc}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
