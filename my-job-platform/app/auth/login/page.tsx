"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";
import { TermsModal } from "@/app/components/terms-modal";

type Mode = "signin" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      if (mode === "signin") {
        const { error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });
        if (signInError) {
          setError(signInError.message);
          setLoading(false);
          return;
        }
      } else {
        if (!agreedToTerms) {
          setError("请先阅读并同意使用条款");
          setLoading(false);
          return;
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) {
          setError(signUpError.message);
          setLoading(false);
          return;
        }
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("登录服务暂时不可用，请稍后再试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">
          {mode === "signin" ? "登录 Sudo Club" : "注册 Sudo Club"}
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          使用邮箱密码登录，体验基于技术栈颗粒度的匹配。
        </p>
      </div>

      <div className="flex gap-2 rounded-full bg-slate-900 p-1 text-sm">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`flex-1 rounded-full px-3 py-2 font-medium transition ${
            mode === "signin"
              ? "bg-slate-700 text-slate-50"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          已有账号
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full px-3 py-2 font-medium transition ${
            mode === "signup"
              ? "bg-slate-700 text-slate-50"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          立即注册
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200">
            邮箱
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200">
            密码
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
            placeholder="至少 6 位"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {error}
          </div>
        )}

        {mode === "signup" && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/40"
            />
            <label htmlFor="terms" className="text-sm text-slate-300">
              我已阅读并同意{" "}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-indigo-400 hover:text-indigo-300 hover:underline"
              >
                使用条款
              </button>
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-full border border-indigo-500 bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading
            ? mode === "signin"
              ? "登录中..."
              : "注册中..."
            : mode === "signin"
              ? "登录"
              : "注册并登录"}
        </button>
      </form>

      <p className="text-xs leading-relaxed text-slate-400">
        登录即表示你同意平台使用 Supabase 存储你的账号信息。后续可以在导航栏右上角随时退出登录。
      </p>

      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </div>
  );
}
