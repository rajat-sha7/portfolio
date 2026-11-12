import type { Metadata, Viewport } from "next";
import { Bruno_Ace } from "next/font/google";
import "./globals.css";

import { ReactLenis } from 'lenis/react';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { site, siteUrl } from "@/lib/site";

const brunoAce = Bruno_Ace({
  weight: ['400'], // Fixed to only include '400' as per the type requirement
  subsets: ["latin"],
  variable: "--font-bruno-ace",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} – Portfolio`,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    site.name,
    "Fullstack AI Developer",
    "Fullstack Developer India",
    "React Developer",
    "Next.js Developer",
    "SvelteKit Developer",
    "Vue Developer",
    "Headless CMS Developer",
    "Sanity Developer",
    "TypeScript",
    "Freelance Web Developer",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${site.name} – Portfolio`,
    title: site.title,
    description: site.description,
    locale: "en_US",
    firstName: "Rajat",
    lastName: "Sharma",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  category: "technology",
  icons: {
    icon: '/header_logo.svg',
  },
};

export const viewport: Viewport = {
  themeColor: "#00070E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={brunoAce.className}>
      <head>
        <link rel="icon" href="/header_logo.svg" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace:wght@400&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -96 } }}>
          <Header />
          {children}
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}
