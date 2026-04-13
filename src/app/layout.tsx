import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RalphLoop from "@/components/effects/RalphLoop";
import SmoothScroll from "@/components/ui/SmoothScroll";
import GSDCommandPalette from "@/components/ui/GSDCommandPalette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expanse | Next-Gen AI Financial Intelligence",
  description: "Experience the future of personal finance with Expanse Intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="relative text-white antialiased grain">
        <RalphLoop />
        <GSDCommandPalette />
        {/* Professional Depth Overlay */}
        <div className="fixed inset-0 pointer-events-none -z-40 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08)_0%,transparent_60%)]"></div>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
