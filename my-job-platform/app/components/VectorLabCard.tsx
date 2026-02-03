import Link from 'next/link';
import { FlaskConical, ArrowRight } from 'lucide-react';

export default function VectorLabCard() {
  return (
    <Link
      href="/lab/mini-inspector"
      className="group relative flex w-full items-center justify-between overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-5 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)] backdrop-blur-sm"
    >
      <div className="flex items-center gap-5">
        {/* Icon Container */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-slate-700/50 bg-slate-800/50 text-cyan-400 shadow-[0_0_15px_-5px_rgba(34,211,238,0.15)] transition-all duration-300 group-hover:border-cyan-500/40 group-hover:bg-cyan-950/20 group-hover:text-cyan-300 group-hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)]">
          <FlaskConical className="h-7 w-7" />
        </div>

        {/* Text Content */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold tracking-wide text-slate-200 transition-colors group-hover:text-white">
              向量实验室 <span className="text-slate-500 font-normal ml-1">(Vector Lab)</span>
            </h3>
            <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400 shadow-[0_0_10px_-3px_rgba(34,211,238,0.4)]">
              Beta
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500 transition-colors group-hover:text-slate-400">
            Mecanum Kinematics Visualization / 麦轮运动学可视化
          </p>
        </div>
      </div>

      {/* Right Arrow */}
      <div className="transform text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400 pl-4">
        <ArrowRight className="h-6 w-6" />
      </div>
      
      {/* Subtle Grid Background Pattern (Optional for industrial feel) */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
      
      {/* Hover Glow Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </Link>
  );
}
