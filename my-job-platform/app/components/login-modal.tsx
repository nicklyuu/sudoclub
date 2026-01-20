"use client";

import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => router.push("/")}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white">需要登录</h2>
        <p className="mt-3 text-sm text-slate-300">
          您需要登录账号才能使用此功能。
        </p>
        
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => router.push("/")}
            className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
          >
            返回主页
          </button>
          <button
            onClick={() => router.push("/auth/login")}
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            去登录
          </button>
        </div>
      </div>
    </div>
  );
}
