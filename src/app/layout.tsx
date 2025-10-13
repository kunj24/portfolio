import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import { ThemeProvider } from "@/hooks/use-theme";
import Loader from "@/components/ui/Loader";
import CursorSystem from "@/components/ui/CursorSystem";
import { CursorProvider } from "@/hooks/use-cursor";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <CursorProvider>
            <CursorSystem />
            <Loader />
            <Navigation />
            {children}
            <footer className="py-4 text-center text-muted-foreground text-sm">
              © 2025 Kunj Mungalpara. All rights reserved.
            </footer>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
