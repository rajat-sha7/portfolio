import type { Metadata } from "next";
import { Bruno_Ace } from "next/font/google";
import "./globals.css";

import { ReactLenis } from 'lenis/react';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const brunoAce = Bruno_Ace({
  weight: ['400'], // Fixed to only include '400' as per the type requirement
  subsets: ["latin"],
  variable: "--font-bruno-ace",
});

export const metadata: Metadata = {
  title: "Rajat Sharma | Senior Frontend Developer",
  description: "Senior Frontend Developer (4 yrs) building fast, accessible web apps with React, Next.js, Vue, Nuxt and SvelteKit, headless CMS and AI-powered workflows.",
  icons: {
    icon: '/header_logo.svg',
  },
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
