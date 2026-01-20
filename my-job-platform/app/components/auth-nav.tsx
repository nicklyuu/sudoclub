"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";

type User = {
  email?: string | null;
};

export function AuthNav() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    
    // Initial fetch
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (_event === 'SIGNED_OUT') {
        setUser(null);
        router.push("/");
        router.refresh();
      } else if (_event === 'SIGNED_IN') {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    // Optimistic UI update
    setUser(null);
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="h-8 w-20 rounded-full bg-slate-800/70" />
    );
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="rounded-full border border-indigo-500 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 transition hover:bg-indigo-500/20 md:px-4 md:py-2 md:text-sm"
      >
        登录
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <span className="hidden max-w-[140px] truncate text-xs text-slate-300 md:block">
        {user.email}
      </span>
      <button
        type="button"
        onClick={handleSignOut}
        className="rounded-full border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 md:px-4 md:py-2"
      >
        退出登录
      </button>
    </div>
  );
}

