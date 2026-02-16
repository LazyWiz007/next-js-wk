import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://webrook.in'),
  title: "Webrook | AI-First Systems Studio",
  description: "Webrook is an AI-first systems studio building applied AI, MCPs, and autonomous agents.",
  applicationName: 'Webrook',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/logo/favicon_io/favicon.ico',
    apple: [
      { url: '/logo/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/logo/favicon_io/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://webrook.in',
    siteName: 'Webrook',
    title: 'Webrook | AI-First Systems Studio',
    description: 'Webrook is an AI-first systems studio building applied AI, MCPs, and autonomous agents.',
    images: [
      {
        url: 'https://webrook.in/logo/webrook-logo-whitebg.png',
        width: 1200,
        height: 630,
        alt: 'Webrook AI Systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webrook | AI-First Systems Studio',
    description: 'Webrook is an AI-first systems studio building applied AI, MCPs, and autonomous agents.',
    images: ['https://webrook.in/logo/webrook-logo-whitebg.png'],
  },
  keywords: ['Webrook', 'Webrook.in', 'Webrook AI', 'Webrook India', 'AI', 'Autonomous Agents', 'Industrial AI', 'Systems Studio', 'Generative AI', 'Enterprise AI'],
};

import SmoothScroll from "@/components/SmoothScroll";

// ... existing imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Webrook",
        "url": "https://webrook.in",
        "logo": "https://webrook.in/logo/webrook-full.png",
        "sameAs": [
          "https://www.linkedin.com/company/webrook/",
          "https://www.instagram.com/webrook.in/"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "",
          "contactType": "customer service",
          "email": "hello@webrook.in"
        }
      },
      {
        "@type": "WebSite",
        "name": "Webrook",
        "url": "https://webrook.in",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://webrook.in/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
