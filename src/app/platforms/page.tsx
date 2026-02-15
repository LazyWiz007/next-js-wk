import styles from './platforms.module.css';
import FlowFieldHero from './FlowFieldHero';
import WhatWeBuild from './WhatWeBuild';

import ErpCmsSolutions from './ErpCmsSolutions';
import WebAndAppDev from './WebAndAppDev';
import PlatformsCTA from './PlatformsCTA';

export const metadata = {
    title: 'Webrook Platforms | Enterprise Core & Global Network',
    description: 'Infrastructure that scales with your ambition. Discover our headless commerce integrations, ERP solutions, and global network capabilities.',
    openGraph: {
        title: 'Webrook Platforms | Enterprise Core & Global Network',
        description: 'Infrastructure that scales with your ambition. Discover our headless commerce integrations, ERP solutions, and global network capabilities.',
        url: 'https://webrook.in/platforms',
    },
};

export default function PlatformsPage() {
    return (
        <main className={styles.main}>
            <FlowFieldHero />
            <WhatWeBuild />
            <ErpCmsSolutions />
            <WebAndAppDev />
            <PlatformsCTA />
        </main>
    );
}
