'use client';

import { useState, useEffect, useRef } from 'react';
import {
    ChevronDownIcon,
    ChevronRightIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image'; // Optimized image
import styles from './Navbar.module.css';

interface SubItem {
    label: string;
    href: string;
}

type NavItem = {
    label: string;
    description?: string;
    overviewLink?: string;
    children?: {
        label: string;
        desc?: string;
        subChildren?: { label: string; href: string }[];
        href?: string;
        icon: React.ReactNode;
    }[];
    href?: string;
};

// Icon Components (Simple SVGs)
const Icons = {
    Brain: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></svg>,
    Bot: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>,
    Factory: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M17 18h1" /><path d="M12 18h1" /><path d="M7 18h1" /></svg>,
    Globe: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>,
    Smartphone: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>,
    Building: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M16 14h.01" /></svg>,
    Cloud: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c0-1.7-1.3-3-3-3h-1.1c-.2-3.4-3-6-6.4-6-3.6 0-6.6 2.8-6.6 6.4 0 .2 0 .4.1.5-2.2.3-3.8 2.2-3.8 4.6 0 2.5 2 4.5 4.5 4.5h11.8c2.5 0 4.5-2 4.5-4.5z" /></svg>,
    Zap: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    Beaker: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3h15" /><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" /><path d="M6 14h12" /></svg>,
    Mountain: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z" /></svg>,
    Flag: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" x2="4" y1="22" y2="15" /></svg>,
    Book: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
    Star: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    Users: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
};

const NAV_DATA: NavItem[] = [
    {
        label: 'Intelligence',
        description: 'Pioneering the future of artificial cognition.',
        overviewLink: '/intelligence',
        children: [
            { label: 'AI Models', desc: 'State-of-the-art language processing.', icon: Icons.Brain, href: '/intelligence#models' },
            { label: 'Autonomous Agents', desc: 'Self-governing task execution.', icon: Icons.Bot, href: '/intelligence#agents' },
            { label: 'Industrial Systems', desc: 'AI for manufacturing & logic.', icon: Icons.Factory, href: '/intelligence#systems' },
        ]
    },
    {
        label: 'Platforms',
        description: 'Infrastructure for the next generation of web.',
        overviewLink: '/platforms',
        children: [
            { label: 'Global Network', desc: 'Distributed cloud infrastructure.', icon: Icons.Globe, href: '/platforms#global-network' },
            { label: 'Mobile Ecosystem', desc: 'Next-gen application framework.', icon: Icons.Smartphone, href: '/platforms#mobile-ecosystem' },
            { label: 'Enterprise Core', desc: 'Scalable business foundations.', icon: Icons.Building, href: '/platforms#enterprise-core' },
        ]
    },
    {
        label: 'Products',
        description: 'Tools that empower builders.',
        overviewLink: '/products',
        children: [
            { label: 'Taprook Cloud', desc: 'Serverless deployment engine.', icon: Icons.Cloud, href: '/products/cloud' },
            { label: 'Velocity', desc: 'High-speed data processing.', icon: Icons.Zap, href: '/products/velocity' },
            { label: 'Labs', desc: 'Experimental R&D projects.', icon: Icons.Beaker, href: '/products/labs' },
        ]
    },
    {
        label: 'Ventures',
        description: 'Investing in the impossible.',
        overviewLink: '/ventures',
        children: [
            { label: 'Shadowline', href: '/ventures/shadowline', icon: Icons.Mountain },
            { label: 'Tour of Nilgiris', href: '/ventures/tour-of-nilgiris', icon: Icons.Flag },
        ]
    },
    {
        label: 'About',
        description: 'Our philosophy, brand, and the alliances that drive us forward.',
        overviewLink: '/about',
        children: [
            { label: 'The Webrook Philosophy', href: '/about#philosophy', icon: Icons.Book },
            { label: 'Our Brand', href: '/about#brand', icon: Icons.Star },
            { label: 'Alliances & Partners', href: '/about#partners', icon: Icons.Users },
        ]
    },
];

export default function Navbar() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [mobileMenuOpen]);

    const handleMouseEnter = (label: string) => {
        if (window.innerWidth > 1024) { // Only hover on desktop
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setActiveMenu(label);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth > 1024) {
            timeoutRef.current = setTimeout(() => {
                setActiveMenu(null);
            }, 100);
        }
    };

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <header
            className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
        >
            <div className={`container ${styles.navContainer}`}>
                <div className={styles.logoWrapper}>
                    <Link href="/" className={styles.logo} onClick={() => setMobileMenuOpen(false)}>
                        <Image
                            src="/logo/webrook-full.png"
                            alt="Webrook"
                            width={140}
                            height={40}
                            className={styles.logoImage}
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {NAV_DATA.map((item) => (
                            <li
                                key={item.label}
                                className={styles.navItem}
                                onMouseEnter={() => handleMouseEnter(item.label)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className={styles.navLinkWrapper}>
                                    <button className={`${styles.navLink} ${activeMenu === item.label ? styles.active : ''}`}>
                                        {item.label}
                                        <ChevronDownIcon
                                            className={styles.navArrow}
                                            style={{
                                                transform: activeMenu === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                                                width: '12px',
                                                height: '12px'
                                            }}
                                        />
                                    </button>
                                </div>

                                {activeMenu === item.label && item.children && (
                                    <div className={styles.megaMenu}>
                                        <div className={styles.menuGrid}>
                                            <div className={styles.menuOverview}>
                                                <h3 className={styles.overviewTitle}>
                                                    {item.label === 'Intelligence' ? 'Webrook Intelligence' :
                                                        item.label === 'Platforms' ? 'Webrook Platforms' :
                                                            item.label === 'Products' ? 'Webrook Products' :
                                                                item.label === 'Ventures' ? 'Webrook Ventures' :
                                                                    'About Webrook'}
                                                </h3>
                                                <p className={styles.overviewDesc}>{item.description}</p>
                                                {item.overviewLink && (
                                                    <Link href={item.overviewLink} className={styles.seeOverviewBtn}>
                                                        See overview
                                                    </Link>
                                                )}
                                            </div>

                                            <div className={styles.menuLinksColumn}>
                                                {item.children.map((child) => (
                                                    <div key={child.label} className={styles.linkGroup}>
                                                        {child.subChildren ? (
                                                            <div className={styles.subGroup}>
                                                                <div className={styles.megaLinkItem}>
                                                                    <div className={styles.linkIconWrapper}>{child.icon}</div>
                                                                    <span className={styles.linkText} dangerouslySetInnerHTML={{ __html: child.label }} />
                                                                </div>
                                                                <ul className={styles.subList}>
                                                                    {child.subChildren.map(sub => (
                                                                        <li key={sub.label}>
                                                                            <Link href={sub.href} className={styles.subLinkItem}>
                                                                                {sub.label}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ) : (
                                                            <Link href={child.href || '#'} className={styles.megaLinkItem}>
                                                                <div className={styles.linkIconWrapper}>{child.icon}</div>
                                                                <span className={styles.linkText}>{child.label}</span>
                                                                <ChevronRightIcon className={styles.linkArrow} style={{ width: '16px', height: '16px' }} />
                                                            </Link>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={styles.ctaWrapper}>
                    <Link href="/contact" className={styles.contactLink}>Contact</Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button className={styles.mobileToggle} onClick={toggleMobileMenu} aria-label="Toggle menu">
                    {mobileMenuOpen ? (
                        <XMarkIcon style={{ width: '24px', height: '24px', color: '#1f1f1f' }} />
                    ) : (
                        <Bars3Icon style={{ width: '24px', height: '24px', color: '#1f1f1f' }} />
                    )}

                </button>

                {/* Mobile Menu Overlay */}
                <div className={`${styles.mobileMenuOverlay} ${mobileMenuOpen ? styles.open : ''}`}>
                    <div className={styles.mobileMenuContent}>
                        {NAV_DATA.map((item) => (
                            <div key={item.label} className={styles.mobileGroup}>
                                <button
                                    className={`${styles.mobileGroupHeader} ${activeMobileCategory === item.label ? styles.active : ''}`}
                                    onClick={() => setActiveMobileCategory(activeMobileCategory === item.label ? null : item.label)}
                                >
                                    {item.label}
                                    <ChevronDownIcon
                                        className={styles.mobileGroupArrow}
                                        style={{
                                            transform: activeMobileCategory === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                                            width: '16px',
                                            height: '16px'
                                        }}
                                    />
                                </button>

                                <div
                                    className={`${styles.mobileGroupLinks} ${activeMobileCategory === item.label ? styles.open : ''}`}
                                >
                                    {item.children?.map(child => (
                                        <div key={child.label}>
                                            {child.subChildren ? (
                                                <div>
                                                    <div className={styles.mobileSubHeader}>{child.label}</div>
                                                    {child.subChildren.map(sub => (
                                                        <Link key={sub.label} href={sub.href} className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                                                            {sub.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ) : (
                                                <Link href={child.href || '#'} className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                                                    {child.label}
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}
