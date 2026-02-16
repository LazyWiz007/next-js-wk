import Link from 'next/link';
import styles from './Footer.module.css';

const FOOTER_LINKS = [

    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Sitemap', href: '/sitemap.xml' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.left}>
                    <span className={styles.copyright}>&copy; {currentYear} Webrook Technologies and Consulting</span>
                </div>

                <div className={styles.right}>
                    <ul className={styles.footerList}>
                        {FOOTER_LINKS.map((item) => (
                            <li key={item.label}>
                                <Link href={item.href} className={styles.footerLink}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
