import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import { ThemeProvider } from "@/hooks/use-theme";
import Loader from "@/components/ui/Loader";
import CursorSystem from "@/components/ui/CursorSystem";
import ScrollProgress from "@/components/ui/ScrollProgress";
import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AnimatedMesh from "@/components/ui/AnimatedMesh";
import { CursorProvider } from "@/hooks/use-cursor";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Kunj Mungalpara",
  description: "A modern, responsive 3D animation portfolio by Kunj Mungalpara.",
  keywords: ["3D animation", "portfolio", "Three.js", "React", "creative", "interactive"],
  authors: [{ name: "Kunj Mungalpara" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <CursorProvider>
            <AnimatedMesh />
            <InteractiveBackground />
            <CursorSystem />
            <ScrollProgress />
            <Loader />
            <Navigation />
            {children}
            <footer className="w-full bg-foreground/5 dark:bg-background/90">
              <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-3 md:gap-0 border-t border-border">
                <div className="text-lg md:text-xl font-bold tracking-wider text-primary text-center md:text-left">Kunj Mungalpara</div>
                <div className="text-xs md:text-sm text-muted-foreground text-center md:text-right">© 2025 Kunj Mungalpara. All rights reserved.</div>
              </div>
            </footer>
            <Analytics />
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
