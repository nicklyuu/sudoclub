import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white`}
      >
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6">
          <header className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-indigo-400"
            >
              Sudo Club
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href="/candidate/onboarding"
                className="rounded-full px-4 py-2 font-medium text-slate-200 transition hover:bg-slate-800"
              >
                找工作
              </Link>
              <Link
                href="/employer/post-job"
                className="rounded-full px-4 py-2 font-medium text-slate-200 transition hover:bg-slate-800"
              >
                发布职位
              </Link>
              <button className="rounded-full border border-indigo-500 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/20">
                登录
              </button>
            </nav>
          </header>
          <main className="mt-12 flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
