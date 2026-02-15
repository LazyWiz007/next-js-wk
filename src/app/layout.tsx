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
  title: "Webrook | AI-First Systems Studio",
  description: "Webrook is an AI-first systems studio building applied AI, MCPs, and autonomous agents.",
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
};

import SmoothScroll from "@/components/SmoothScroll";

// ... existing imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        <SmoothScroll />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
