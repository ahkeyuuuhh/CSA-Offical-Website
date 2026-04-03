'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PillNav from "@/components/PillNav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { AuthProvider } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <body className="min-h-full flex flex-col bg-white text-gray-900">
      <AuthProvider>
        {!isAdminRoute && (
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
        )}
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        {!isAdminRoute && <Footer />}
      </AuthProvider>
    </body>
  );
}

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
      <LayoutContent>{children}</LayoutContent>
    </html>
  );
}
