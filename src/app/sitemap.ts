import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://webrook.in'; // Production URL

    // Static routes
    const routes = [
        '',
        '/about',
        '/platforms',
        '/intelligence',
        '/contact',
        '/careers',
        '/case-studies/predictive-diagnostics',
        '/case-studies/supply-chain-ai',
        '/case-studies/autonomous-qc',
        '/case-studies/motorsports-intelligence',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
