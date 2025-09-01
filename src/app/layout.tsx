import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";
import CodeBackground from "@/components/CodeBackground";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Portfolio built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="antialiased relative min-h-screen">
        {/* 🔹 Global Background */}
        <CodeBackground />

        {/* 🔹 Foreground Content */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}

