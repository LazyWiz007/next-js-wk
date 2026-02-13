'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';
import cursorStyles from './HeroCursor.module.css';

export default function Hero() {

    // Typing Animation State
    const [text, setText] = useState('Intellig');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [selectionIndex, setSelectionIndex] = useState(0);

    const words = ["Intellig", "Excell", "Resili", "Influ", "Pres"];
    const suffix = "ence";

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % words.length;
            const fullText = words[i];

            if (isDeleting) {
                // Selection Deletion Logic
                if (selectionIndex > 0) {
                    setSelectionIndex(prev => prev - 1);
                    setTypingSpeed(30); // Fast selection speed
                } else {
                    // Fully selected, clear and move to next word
                    setIsDeleting(false);
                    setLoopNum(loopNum + 1);
                    setText('');
                    setSelectionIndex(0);
                    setTypingSpeed(150);
                }
            } else {
                // Typing Logic
                setText(fullText.substring(0, text.length + 1));
                setSelectionIndex(fullText.substring(0, text.length + 1).length); // Cursor at end while typing

                setTypingSpeed(150);

                if (text === fullText) {
                    // Pause at end
                    setSelectionIndex(fullText.length); // Ensure selection is at end
                    setTimeout(() => setIsDeleting(true), 2000); // 2s pause
                    return; // Return to avoid double timer set
                }
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed, selectionIndex, words]); // Added dependencies

    return (
        <section className={styles.heroSection}>
            <video
                className={styles.videoBackground}
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/video/webrook_bg.mp4" type="video/mp4" />
            </video>
            <div className={styles.gradientOverlay}></div>

            <div className={styles.content}>
                <div className={styles.textWrapper}>
                    <h1 className="headline-hero fade-in-up" style={{ animationDelay: '0.2s', color: 'white' }}>
                        <span style={{ position: 'relative', display: 'inline-block' }}>
                            <span className={cursorStyles.cursor}></span>
                            {isDeleting ? (
                                <>
                                    <span>{text.substring(0, selectionIndex)}</span>
                                    <span className={cursorStyles.selectedText}>{text.substring(selectionIndex)}</span>
                                </>
                            ) : (
                                <>
                                    {text}
                                </>
                            )}
                            {suffix}
                        </span> for the next era.
                    </h1>

                    <p className="text-subhead fade-in-up" style={{ animationDelay: '2s', color: 'rgba(255, 255, 255, 0.9)' }}>
                        Webrook is an AI-first systems studio. We build infrastructure, intelligence, and long-term capability.
                    </p>
                </div>

                <div className={`${styles.ctaGroup} fade-in-up`} style={{ animationDelay: '1s' }}>
                    <Link href="/platforms" className={`${styles.button} ${styles.primary}`}>
                        AI Platforms
                    </Link>
                    <Link href="/careers" className={`${styles.button} ${styles.secondary}`} style={{ border: 'none', background: 'transparent', color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'underline' }}>
                        Join the Team
                    </Link>
                </div>
            </div>
        </section>
    );
}
