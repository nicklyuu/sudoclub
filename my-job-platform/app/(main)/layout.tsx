import Link from "next/link";
import { AuthNav } from "@/app/components/auth-nav";
import Aurora from "@/app/components/aurora-background";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-white min-h-screen relative">
      <div className="fixed inset-0 z-[-1] bg-neutral-950">
        <Aurora
          colorStops={["#40aa2f", "#463381", "#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4 md:px-6 md:py-6 relative">
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
    </div>
  );
}
