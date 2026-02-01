import styles from './platforms.module.css';
import FlowFieldHero from './FlowFieldHero';
import WhatWeBuild from './WhatWeBuild';

import ErpCmsSolutions from './ErpCmsSolutions';
import WebAndAppDev from './WebAndAppDev';
import PlatformsCTA from './PlatformsCTA';

export const metadata = {
    title: 'Platforms | Webrook',
    description: 'Infrastructure that scales with your ambition.',
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
