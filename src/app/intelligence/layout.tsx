import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Webrook Intelligence | Purpose-Built AI Models & Agents',
    description: 'We design and deploy AI models tailored to specific industries. From computer vision to autonomous agents, our systems go beyond prediction to action.',
    openGraph: {
        title: 'Webrook Intelligence | Purpose-Built AI Models & Agents',
        description: 'We design and deploy AI models tailored to specific industries. From computer vision to autonomous agents, our systems go beyond prediction to action.',
        url: 'https://webrook.in/intelligence',
    },
};

export default function IntelligenceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
