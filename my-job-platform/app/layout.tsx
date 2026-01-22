import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthNav } from "@/app/components/auth-nav";
import Aurora from "@/app/components/aurora-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sudo Club",
  description: "Embodied AI and robotics talent platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white bg-neutral-950`}
      >
        <div className="fixed inset-0 z-[-1] bg-neutral-950">
          <Aurora
            colorStops={["#40aa2f", "#463381", "#5227FF"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4 md:px-6 md:py-6">
            <header className="flex items-center justify-between">
              <Link
                href="/"
                className="text-lg font-bold tracking-tight text-white md:text-xl"
              >
                Sudo Club
              </Link>
              <nav className="flex items-center gap-2 text-xs md:gap-4 md:text-sm">
                <Link
                  href="/candidate/onboarding"
                  className="rounded-full px-3 py-1.5 font-medium text-slate-200 transition hover:bg-slate-800 md:px-4 md:py-2"
                >
                  找组织
                </Link>
                <Link
                  href="/employer/post-job"
                  className="rounded-full px-3 py-1.5 font-medium text-slate-200 transition hover:bg-slate-800 md:px-4 md:py-2"
                >
                  发布职位
                </Link>
                <AuthNav />
              </nav>
            </header>
            <main className="mt-12 flex-1">{children}</main>
          </div>
      </body>
    </html>
  );
}
