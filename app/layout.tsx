import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from '@/components/SessionWrapper'
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AGC Student Hub",
  description: "A platform where students can ask questions, share challenges, and connect with peers to get clear, accurate, and objective answers and More.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#E8EEF2]`}
      >
        <SessionWrapper>
          <AuthProvider>
            {children}
          </AuthProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
