import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'About Webrook | The Philosophy of AI-First Systems',
    description: 'Webrook connects software, hardware, and data to automate processes inside industrial environments. We build systems that endure change.',
    openGraph: {
        title: 'About Webrook | The Philosophy of AI-First Systems',
        description: 'Webrook connects software, hardware, and data to automate processes inside industrial environments. We build systems that endure change.',
        url: 'https://webrook.in/about',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
