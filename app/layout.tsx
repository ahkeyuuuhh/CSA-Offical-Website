import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PillNav from "@/components/PillNav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSA Print & Design | Professional Printing Services",
  description: "Bringing your creative vision to life with professional printing and design services. Quality prints, creative designs, exceptional service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <PillNav
          logo="/light-logo.png"
          logoAlt="CSA Print & Design"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Portfolio', href: '/samples' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' }
          ]}
          baseColor="#0a0a0a"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#0a0a0a"
          initialLoadAnimation={true}
        />
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
