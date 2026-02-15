'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './intelligence.module.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Feature {
    title: string;
    desc: string;
    gradientClass?: string;
    videoSrc?: string;
}

interface Method {
    title: string;
    desc: string;
}

interface Section {
    id: string;
    title: string;
    desc: string;
    subtitle: string;
    featuresTitle: string;
    features: Feature[];
    howWorksTitle: string;
    howWorks: Method[];
    quote: string;
    color: string;
}

const SECTIONS: Section[] = [
    {
        id: 'models',
        title: 'AI Models',
        desc: 'Purpose-built models, trained for context not demos.',
        subtitle: 'We design and deploy AI models tailored to specific industries. These models go beyond generic prediction they understand context, variability, and real-world noise.',
        featuresTitle: 'What we build',
        features: [
            { title: 'Industry-Specific ', desc: 'Fine-tuned for manufacturing, healthcare, and energy sectors.', videoSrc: '/video/AI models/1.mp4' },
            { title: 'Computer Vision', desc: 'Automated inspection and monitoring pipelines.', gradientClass: 'gradientBlue', videoSrc: '/video/AI models/2.mp4' },
            { title: 'Predictive Engines', desc: 'Forecasting for operations, quality, and risk.', gradientClass: 'gradientYellow', videoSrc: '/video/AI models/3.mp4' },
            { title: 'Custom LLMs', desc: 'Secure language models trained on proprietary data.', gradientClass: 'gradientGreen', videoSrc: '/video/AI models/4.mp4' }
        ],
        howWorksTitle: 'How they work',
        howWorks: [
            { title: 'Production-First Design', desc: 'Architected for reliability and low latency, not just experimentation.' },
            { title: 'Operational Training', desc: 'Models are trained on real-world noisy data, not perfect datasets.' },
            { title: 'Feedback Loops', desc: 'Continuous improvement systems that learn from human-in-the-loop corrections.' },
            { title: 'Explainable AI', desc: 'Decision transparency ensures trust in critical environments.' }
        ],
        quote: 'Intelligence that learns from the real world and improves within it.',
        color: '#ea4335' // Red
    },
    {
        id: 'agents',
        title: 'Autonomous Agents',
        desc: 'From intelligence to action.',
        subtitle: 'Our autonomous agents execute workflows, make decisions, and interact with systems without constant human intervention.',
        featuresTitle: 'What we build',
        features: [
            { title: 'Ops Agents', desc: 'Automated monitoring and support workflows.', gradientClass: 'gradientBlue', videoSrc: '/video/AI models/autonomous/1.mp4' },
            { title: 'Enterprise Decisioning', desc: 'Agents that integrate with ERPs to optimize resources.', gradientClass: 'gradientRed', videoSrc: '/video/AI models/autonomous/2.mp4' },
            { title: 'Assistive Copilots', desc: 'Tools that augment internal teams with instant knowledge.', gradientClass: 'gradientYellow', videoSrc: '/video/AI models/autonomous/3.mp4' },
            { title: 'Multi-Agent Swarms', desc: 'Coordinated systems for complex, parallel tasks.', gradientClass: 'gradientGreen', videoSrc: '/video/AI models/autonomous/4.mp4' }
        ],
        howWorksTitle: 'What makes them different',
        howWorks: [
            { title: 'Goal-Oriented', desc: 'Agents pursue objectives rather than following rigid if-then rules.' },
            { title: 'Context-Aware', desc: 'They maintain state and understand the broader operational picture.' },
            { title: 'Deep Integration', desc: 'Seamlessly connected to existing software stacks and APIs.' },
            { title: 'Human-Aligned', desc: 'Designed to reduce overhead while keeping humans in control of key decisions.' }
        ],
        quote: 'Systems that don’t just think they act.',
        color: '#fbbc04' // Yellow
    },
    {
        id: 'systems',
        title: 'Industrial Systems',
        desc: 'Intelligence embedded into physical infrastructure.',
        subtitle: 'We bridge software, hardware, and data to automate processes inside industrial environments where complexity is highest.',
        featuresTitle: 'Where we deploy',
        features: [
            { title: 'Manufacturing Control', desc: 'Real-time quality and process automation.', gradientClass: 'gradientGreen', videoSrc: '/video/AI models/3.mp4' },
            { title: 'Supply Chain AI', desc: 'Predictive inventory and logistics optimization.', gradientClass: 'gradientBlue', videoSrc: '/video/AI models/autonomous/2.mp4' },
            { title: 'Infrastructure Inspection', desc: 'Drones and sensors for asset monitoring.', gradientClass: 'gradientYellow', videoSrc: '/video/AI models/2.mp4' },
            { title: 'Edge AI Devices', desc: 'Low-power intelligence deployed on-device.', gradientClass: 'gradientRed', videoSrc: '/video/AI models/autonomous/4.mp4' }
        ],
        howWorksTitle: 'What we enable',
        howWorks: [
            { title: 'Real-Time Monitoring', desc: 'Instant anomaly detection and alert systems.' },
            { title: 'Cost Reduction', desc: 'Minimizing waste and manual oversight through automation.' },
            { title: 'Scalability', desc: 'Deploying intelligence across distributed physical assets.' },
            { title: 'Data-Driven Decisions', desc: 'Grounding operational choices in live system reality.' }
        ],
        quote: 'AI that operates where the real work happens.',
        color: '#34a853' // Green
    }
];



export default function IntelligencePage() {
    // State to track active list item for "How It Works" section
    const [activeIndices, setActiveIndices] = useState<{ [key: string]: number }>({
        models: 0,
        agents: 0,
        systems: 0
    });

    const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
    const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const handleMouseEnter = (sectionId: string, index: number) => {
        // Disable hover effect on mobile to prevent conflicts with scroll observer
        if (window.innerWidth > 1024) {
            setActiveIndices(prev => ({ ...prev, [sectionId]: index }));
        }
    };

    // Scroll Spy for Mobile "How It Works"
    useEffect(() => {
        if (window.innerWidth > 1024) return; // Only for mobile/tablet

        const observers: IntersectionObserver[] = [];

        SECTIONS.forEach(section => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        if (!isNaN(index)) {
                            setActiveIndices(prev => ({ ...prev, [section.id]: index }));
                        }
                    }
                });
            }, {
                root: null,
                rootMargin: '-40% 0px -40% 0px', // Active when item is in middle 20% of screen
                threshold: 0.5
            });

            // Target all list items for this section
            const items = document.querySelectorAll(`.js-scroll-item-${section.id}`);
            items.forEach(item => observer.observe(item));
            observers.push(observer);
        });

        return () => {
            observers.forEach(obs => obs.disconnect());
        };
    }, []);

    const handleMouseEnterCard = (sectionId: string, idx: number) => {
        const key = `${sectionId}-${idx}`;
        if (videoRefs.current[key as any]) {
            (videoRefs.current[key as any] as any)?.play().catch(() => { });
        }
    };

    const handleMouseLeaveCard = (sectionId: string, idx: number) => {
        const key = `${sectionId}-${idx}`;
        if (videoRefs.current[key as any]) {
            (videoRefs.current[key as any] as any)?.pause();
            if (videoRefs.current[key as any]) (videoRefs.current[key as any] as any).currentTime = 0;
        }
    };

    return (
        <main className={styles.main}>
            {/* HERO */}
            <section className={styles.hero}>
                <div className="container">
                    <span className={styles.heroLabel}>Webrook AI </span>
                    <h1 className={styles.heroTitle}>
                        Building <br /> Artificial Intelligence <br />
                        <span className={styles.brandGradient}>for real-world systems.</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        At Webrook, Artificial Intelligence isn’t a feature it’s infrastructure.
                    </p>
                    <p className={styles.heroDesc}>
                        {/* We design AI systems that integrate deeply into industries... */}
                        We design AI systems that integrate deeply into industries, workflows, and decision-making environments.
                    </p>
                </div>
            </section>

            <div className={styles.divider} />

            {/* SECTIONS LOOP */}
            {SECTIONS.map((section) => (
                <div
                    key={section.id}
                    className={`${styles.sectionWrapper} ${section.id === 'agents' ? styles.darkSection : ''}`}
                    id={section.id}
                >
                    <div className="container">

                        {/* 1. Header */}
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>{section.title}</h2>
                            <p className={styles.sectionDesc}>{section.subtitle}</p>
                        </div>

                        {/* 2. What We Build (Accordion Cards) */}
                        <div className={styles.subSection}>
                            <div className={styles.subSectionTitle}>{section.featuresTitle}</div>

                            {/* Desktop Accordion */}
                            <div className={styles.accordionGrid}>
                                {section.features.map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className={styles.card}
                                        onMouseEnter={() => handleMouseEnterCard(section.id, idx)}
                                        onMouseLeave={() => handleMouseLeaveCard(section.id, idx)}
                                    >
                                        {feature.videoSrc && (
                                            <div className={styles.cardVideoWrapper}>
                                                <video
                                                    ref={(el) => (videoRefs.current[`${section.id}-${idx}` as any] = el) as any}
                                                    src={feature.videoSrc}
                                                    muted
                                                    playsInline
                                                    loop
                                                    className={styles.cardVideo}
                                                />
                                                <div className={styles.videoOverlay} />
                                            </div>
                                        )}
                                        <div className={`${styles.cardGradient} ${styles[feature.gradientClass || 'gradientBlue']}`} style={{ opacity: feature.videoSrc ? 0.3 : 1 }} />
                                        <span className={styles.cardIndexVisible}>0{idx + 1}</span>
                                        <div className={styles.cardContent}>
                                            <h3 className={styles.cardTitle}>{feature.title}</h3>
                                            <p className={styles.cardDesc}>{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Mobile Carousel */}
                            <div className={styles.mobileCarouselWrapper}>
                                <button
                                    className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
                                    onClick={() => {
                                        const container = carouselRefs.current[section.id];
                                        if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                                    }}
                                    aria-label="Scroll Left"
                                >
                                    <ChevronLeftIcon className={styles.carouselIcon} />
                                </button>

                                <div
                                    className={styles.mobileCarousel}
                                    ref={(el) => (carouselRefs.current[section.id] = el) as any}
                                >
                                    {section.features.map((feature, idx) => (
                                        <div key={idx} className={styles.mobileCard}>
                                            <div className={styles.mobileCardTitle}>{feature.title}</div>
                                            <div className={styles.mobileCardDesc}>{feature.desc}</div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
                                    onClick={() => {
                                        const container = carouselRefs.current[section.id];
                                        if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                                    }}
                                    aria-label="Scroll Right"
                                >
                                    <ChevronRightIcon className={styles.carouselIcon} />
                                </button>
                            </div>
                        </div>

                        {/* 3. How They Work (Split Interactive List) */}
                        <div className={styles.subSection}>
                            <div className={styles.subSectionTitle}>{section.howWorksTitle}</div>

                            <div className={styles.splitSection}>
                                <div className={styles.splitContent}>
                                    <div className={styles.listGroup}>
                                        {section.howWorks.map((method, idx) => (
                                            <div
                                                key={idx}
                                                className={`${styles.listItem} ${activeIndices[section.id] === idx ? styles.listItemActive : ''} js-scroll-item-${section.id}`}
                                                data-index={idx}
                                                onMouseEnter={() => handleMouseEnter(section.id, idx)}
                                                style={{ borderLeftColor: activeIndices[section.id] === idx ? section.color : '' }}
                                            >
                                                <h3 className={styles.listItemTitle}>{method.title}</h3>
                                                <p className={styles.listItemDesc}>{method.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.visualSide}>
                                    <div className={styles.featureMethods}>
                                        {/* Abstract Shape that changes based on active index */}
                                        {(() => {
                                            const activeIdx = activeIndices[section.id];
                                            const color = section.color;

                                            if (section.id === 'models') {
                                                // Models: Neural/Organic - Pulsing Concentric Circles
                                                return (
                                                    <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        {[0, 1, 2].map(i => (
                                                            <div
                                                                key={i}
                                                                style={{
                                                                    position: 'absolute',
                                                                    border: `2px solid ${color}`,
                                                                    borderRadius: '50%',
                                                                    width: `${100 + (i * 40)}px`,
                                                                    height: `${100 + (i * 40)}px`,
                                                                    opacity: activeIdx === i ? 0.8 : 0.2,
                                                                    transform: `scale(${activeIdx === i ? 1.1 : 1})`,
                                                                    transition: 'all 0.5s ease'
                                                                }}
                                                            />
                                                        ))}
                                                        <div
                                                            style={{
                                                                width: '60px',
                                                                height: '60px',
                                                                background: color,
                                                                borderRadius: '50%',
                                                                boxShadow: `0 0 30px ${color}`,
                                                                transition: 'all 0.5s ease',
                                                                transform: `scale(${1 + (activeIdx * 0.2)})`
                                                            }}
                                                        />
                                                    </div>
                                                );
                                            } else if (section.id === 'agents') {
                                                // Agents: Network/Nodes - Connected Nodes
                                                return (
                                                    <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                                                        {/* Central Hub */}
                                                        <div
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%', left: '50%',
                                                                transform: 'translate(-50%, -50%)',
                                                                width: '40px', height: '40px',
                                                                background: color,
                                                                borderRadius: '4px',
                                                                zIndex: 2,
                                                                transition: 'all 0.5s ease'
                                                            }}
                                                        />
                                                        {/* Orbiting Nodes */}
                                                        {[0, 1, 2, 3].map(i => {
                                                            const angle = (i * 90) + (activeIdx * 90);
                                                            const rad = angle * (Math.PI / 180);
                                                            const radius = 80;
                                                            const x = Math.cos(rad) * radius;
                                                            const y = Math.sin(rad) * radius;
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: '50%', left: '50%',
                                                                        width: '20px', height: '20px',
                                                                        borderRadius: '50%',
                                                                        border: `2px solid ${color}`,
                                                                        background: i === activeIdx ? color : 'transparent',
                                                                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                                                        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                                                        opacity: i === activeIdx ? 1 : 0.5
                                                                    }}
                                                                />
                                                            );
                                                        })}
                                                        {/* Connecting Lines */}
                                                        <svg style={{ position: 'absolute', inset: -50, width: 300, height: 300, pointerEvents: 'none', transform: `rotate(${activeIdx * 90}deg)`, transition: 'transform 0.5s ease' }}>
                                                            <line x1="150" y1="150" x2="150" y2="70" stroke={color} strokeWidth="2" strokeOpacity="0.2" />
                                                            <line x1="150" y1="150" x2="230" y2="150" stroke={color} strokeWidth="2" strokeOpacity="0.2" />
                                                            <line x1="150" y1="150" x2="150" y2="230" stroke={color} strokeWidth="2" strokeOpacity="0.2" />
                                                            <line x1="150" y1="150" x2="70" y2="150" stroke={color} strokeWidth="2" strokeOpacity="0.2" />
                                                        </svg>
                                                    </div>
                                                );
                                            } else {
                                                // Systems: Industrial/Layered - Stacked Plates
                                                return (
                                                    <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                                        {[0, 1, 2, 3].map(i => (
                                                            <div
                                                                key={i}
                                                                style={{
                                                                    width: '120px',
                                                                    height: '24px',
                                                                    background: activeIdx === i ? color : 'transparent',
                                                                    border: `2px solid ${color}`,
                                                                    borderRadius: '4px',
                                                                    transform: `translateX(${activeIdx === i ? '20px' : '-20px'}) skewX(-20deg)`,
                                                                    opacity: activeIdx === i ? 1 : 0.3,
                                                                    transition: 'all 0.4s ease'
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                );
                                            }
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quote */}
                        <div className={styles.quoteWrapper}>
                            <p className={styles.quoteText} style={{ color: section.color }}>
                                "{section.quote}"
                            </p>
                        </div>

                    </div>
                </div>
            ))}

            {/* CONCLUSION */}
            <section className={styles.conclusion}>
                <div className="container">
                    <h2 className={styles.conclusionTitle}>How It Comes Together</h2>
                    <p className={styles.conclusionText}>
                        AI Models provide intelligence. Autonomous Agents translate it into action. Industrial Systems embed it into reality.
                    </p>
                </div>
            </section>
        </main>
    );
}
