'use client';
import { forwardRef } from 'react';
import styles from './ParticleCard.module.css';

interface ParticleCardProps {
    category: string;
    title: string;
    outcome: string;
    actionLabel?: string;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    isActive: boolean;
}

const ParticleCard = forwardRef<HTMLDivElement, ParticleCardProps>(
    ({ category, title, outcome, actionLabel = "Explore", onMouseEnter, onMouseLeave, isActive }, ref) => {
        return (
            <div
                className={styles.card}
                ref={ref}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div className={styles.content}>
                    <span className={styles.category}>{category}</span>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.outcome} style={{ opacity: isActive ? 1 : 0.7 }}>
                        {outcome}
                    </p>
                    <div className={`${styles.action} ${isActive ? styles.actionVisible : ''}`}>
                        {actionLabel}
                    </div>
                </div>
            </div>
        );
    }
);

ParticleCard.displayName = 'ParticleCard';

export default ParticleCard;
