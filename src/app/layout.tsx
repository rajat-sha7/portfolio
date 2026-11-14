import type { Metadata, Viewport } from "next";
import { Bruno_Ace, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { ReactLenis } from 'lenis/react';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { site, siteUrl } from "@/lib/site";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ThemeToggle";

// Both fonts are self-hosted by next/font, so no render-blocking request to Google Fonts
const brunoAce = Bruno_Ace({
  weight: ['400'],
  subsets: ["latin"],
  variable: "--font-bruno",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
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
    <html lang="en" suppressHydrationWarning className={`${brunoAce.variable} ${plusJakarta.variable} ${brunoAce.className}`}>
      <head>
        <link rel="icon" href="/header_logo.svg" sizes="any" />
      </head>
      <body>
        {/* Follows the device's light/dark setting until the visitor picks one with the toggle */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -96 } }}>
            <Header />
            {children}
            <Footer />
          </ReactLenis>
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
