import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          连接具身智能时代的顶尖人才
        </h1>
        <p className="mt-4 text-sm text-slate-300 sm:text-base md:text-lg">
          基于技术栈颗粒度（Tech Stack Granularity）的精准匹配
        </p>
      </div>

      <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-6 px-4 sm:grid-cols-2">
        <Link
          href="/candidate/onboarding"
          className="group relative flex flex-col items-start justify-between overflow-hidden rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-8 transition-all hover:border-indigo-500 hover:bg-indigo-500/20"
        >
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl transition-all group-hover:bg-indigo-500/30" />

          <div>
            <h2 className="text-2xl font-bold text-white">我是人才</h2>
            <p className="mt-2 text-indigo-200/80">
              创建你的能力画像。让职位根据你的技术栈自动找上门。
            </p>
          </div>

          <div className="mt-8 flex items-center text-sm font-semibold text-indigo-400 group-hover:text-indigo-300">
            创建简历 <span className="ml-2">→</span>
          </div>
        </Link>

        <Link
          href="/employer/post-job"
          className="group relative flex flex-col items-start justify-between overflow-hidden rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-8 transition-all hover:border-cyan-500 hover:bg-cyan-500/20"
        >
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl transition-all group-hover:bg-cyan-500/30" />

          <div>
            <h2 className="text-2xl font-bold text-white">我要招人</h2>
            <p className="mt-2 text-cyan-200/80">
              发布职位，定义最精准的细分技术栈要求。
            </p>
          </div>

          <div className="mt-8 flex items-center text-sm font-semibold text-cyan-400 group-hover:text-cyan-300">
            发布职位 <span className="ml-2">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
