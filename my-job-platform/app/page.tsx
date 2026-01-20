import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          连接具身智能时代的顶尖人才
        </h1>
        <p className="mt-4 text-sm text-slate-300 sm:text-base md:text-lg">
          基于技术栈颗粒度（Tech Stack Granularity）的精准匹配。不仅仅是求职招聘。找论文搭子、找创业伙伴、找比赛队友，这里都能实现。
        </p>
      </div>

      <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-6 px-4 sm:grid-cols-2">
        <Link
          href="/candidate/onboarding"
          className="group relative flex flex-col items-start justify-between overflow-hidden rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-8 transition-all hover:border-indigo-500 hover:bg-indigo-500/20"
        >
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl transition-all group-hover:bg-indigo-500/30" />

          <div>
            <h2 className="text-2xl font-bold text-white">我是人才</h2>
            <p className="mt-2 text-indigo-200/80">
              创建你的能力画像。寻找工作、项目合作或学术伙伴。
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
              发布职位或合作需求。寻找员工、合伙人或队友。
            </p>
          </div>

          <div className="mt-8 flex items-center text-sm font-semibold text-cyan-400 group-hover:text-cyan-300">
            发布需求 <span className="ml-2">→</span>
          </div>
        </Link>
      </div>

      <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-4 px-4 sm:grid-cols-3">
        {[
          {
            title: "找论文搭子",
            desc: "CVPR, IROS, ICRA... 寻找志同道合的科研伙伴",
            icon: "📚",
          },
          {
            title: "找创业伙伴",
            desc: "技术互补，愿景一致，共同开启具身智能新篇章",
            icon: "🚀",
          },
          {
            title: "找比赛队友",
            desc: "Kaggle, 机器人挑战赛... 组建最强战队冲击冠军",
            icon: "🏆",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center transition hover:border-slate-700"
          >
            <div className="mb-4 text-4xl">{item.icon}</div>
            <h3 className="text-lg font-bold text-slate-200">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
