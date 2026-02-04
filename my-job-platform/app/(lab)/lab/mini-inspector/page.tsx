"use client";

import Link from "next/link";
import { ArrowLeft, FlaskConical, Cpu, Laptop2, Map, BookOpen, Trophy, BrainCircuit } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/app/components/bento-grid";
import { BackgroundBeams } from "@/app/components/ui/background-beams";
import { MouseSpotlight } from "@/app/components/ui/mouse-spotlight";
import { motion, Variants } from "framer-motion";

const VectorLabVisual = () => {
  return (
    <div className="flex h-full w-full flex-row overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      {/* Left: Code Editor */}
      <div className="flex flex-1 flex-col border-r border-slate-800 p-4">
        <div className="mb-2 flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500/50" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
          <div className="h-2 w-2 rounded-full bg-green-500/50" />
        </div>
        <div className="space-y-1 font-mono text-[10px] leading-tight text-slate-400">
          <p><span className="text-pink-500">def</span> <span className="text-blue-400">run_loop</span>():</p>
          <p className="pl-4">error = target - current</p>
          <p className="pl-4">output = <span className="text-yellow-400">pid</span>.update(error)</p>
          <p className="pl-4"><span className="text-cyan-400">robot</span>.move(output)</p>
          <p className="pl-4 animate-pulse">_</p> {/* Blinking Cursor */}
        </div>
      </div>

      {/* Right: Data Viz */}
      <div className="relative flex flex-1 items-end justify-center gap-1 bg-gradient-to-t from-cyan-500/10 to-transparent p-4">
        {/* Animated Bars */}
        {[40, 70, 50, 80, 60].map((h, i) => (
          <motion.div
            key={i}
            className="w-2 rounded-t-sm bg-cyan-500/80 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            initial={{ height: "20%" }}
            animate={{ height: ["20%", `${h}%`, "20%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
        {/* Grid Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>
    </div>
  );
};

export default function MiniInspectorPage() {
  // Stagger animation variants for text
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 overflow-hidden font-sans">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0">
        <BackgroundBeams className="opacity-40" />
      </div>

      <main className="relative z-10 flex min-h-screen w-full flex-col p-8">
        {/* Header / Nav */}
        <header className="mb-12 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to sudo club
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 backdrop-blur-sm">
            <FlaskConical className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Vector Lab <span className="text-slate-600">/</span> Beta
            </span>
          </div>
        </header>

        {/* Hero Section with Mouse Spotlight */}
        <MouseSpotlight className="relative flex flex-col flex-1 items-center justify-center min-h-[80vh] rounded-3xl">
          <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 px-4 md:px-8 relative z-10 py-12 pb-12 md:pb-48">
            
            {/* Left: Hero Image (Levitating Robot) */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-full order-2 lg:order-1 flex justify-center">
              <div className="relative w-full aspect-square max-w-[500px] scale-150 translate-y-32">
                
                {/* Breathing Glow Behind */}
                <motion.div 
                  animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.1, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-cyan-500/30 blur-[80px] rounded-full z-0"
                />

                {/* Levitating Image */}
                <motion.div
                  className="relative z-10 w-full h-full"
                >
                  <img
                    src="/images/lab/robot-hero.jpg"
                    alt="Mecanum Robot"
                    className="w-full h-auto object-contain drop-shadow-2xl [mask-image:radial-gradient(closest-side,black_60%,transparent_100%)]"
                  />
                  {/* Subtle reflection/shadow underneath */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-black/50 blur-xl rounded-[100%]" />
                </motion.div>
              </div>
            </div>

            {/* Right: Text Content */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-left order-1 lg:order-2 z-20"
            >
              <motion.div variants={itemVariants}>
                {/* 1. Vision Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                  <span>✨</span>
                  <span>Vector Lab · 未来 AI 人才培育计划</span>
                </div>

                {/* 2. Product Definition (Super Headline) */}
                <h2 className="mb-2 text-lg font-semibold tracking-wide text-cyan-400 md:text-2xl">
                  新一代桌面级具身智能教具
                </h2>
              </motion.div>

              <motion.h1 variants={itemVariants} className="mb-6 font-sans text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400 sm:text-6xl lg:text-7xl leading-[1.1]">
                把工业机器人，<br />装进书包。
              </motion.h1>

              <motion.p variants={itemVariants} className="mb-10 max-w-xl text-lg text-slate-400 leading-relaxed">
                别让创造力止步于积木拼接。这是一款
                <span className="font-semibold text-cyan-200"> 全栈式</span>
                Full-Stack 的机器人教具。从
                <span className="font-semibold text-cyan-200"> 麦轮全向移动</span>
                到
                <span className="font-semibold text-cyan-200"> 机械臂精准抓取</span>
                ，再到
                <span className="font-semibold text-cyan-200"> 边缘 AI 视觉</span>
                ，我们把真实的自动化技术浓缩在桌面。
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col w-full sm:w-auto sm:flex-row items-center gap-4">
                <Link href="#" className="relative inline-flex h-12 w-full sm:w-auto overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl transition hover:bg-slate-900">
                    开启先行者计划_
                  </span>
                </Link>
                
                <Link 
                  href="#tech-architecture"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('tech-architecture')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group flex w-full sm:w-auto justify-center items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-slate-300 transition hover:text-white"
                >
                  探索技术架构 
                  <span className="transition-transform group-hover:translate-x-1">&gt;</span>
                </Link>
              </motion.div>

              {/* Value Strip Removed */}
            </motion.div>
          </div>
          
          {/* Full-width Value Bar - 4 Columns */}
          <div className="relative mt-16 w-full border-t border-white/10 bg-slate-950 py-8 z-30 md:absolute md:bottom-0 md:mt-0 md:bg-white/5 md:backdrop-blur-sm">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
              
              {/* 1. 具身智能 (New) */}
              <div className="flex flex-col items-center justify-center gap-2 px-4 text-center">
                <div className="mb-2 rounded-full bg-cyan-500/20 p-3 text-cyan-400">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">具身智能启蒙</h3>
                <p className="text-xs text-neutral-400">算法与物理世界的第一次握手</p>
              </div>

              {/* 2. 硬件品质 (Old 1) */}
              <div className="flex flex-col items-center justify-center gap-2 border-white/10 px-4 text-center lg:border-l">
                <div className="mb-2 rounded-full bg-cyan-500/20 p-3 text-cyan-400">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">扎实做工 & 强劲算力</h3>
                <p className="text-xs text-neutral-400">搭载 Orange Pi 8核 AI 芯片，拒绝塑料感</p>
              </div>

              {/* 3. 课程体系 (Old 2) */}
              <div className="flex flex-col items-center justify-center gap-2 border-white/10 px-4 text-center lg:border-l">
                <div className="mb-2 rounded-full bg-cyan-500/20 p-3 text-cyan-400">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">PBL 任务制课程</h3>
                <p className="text-xs text-neutral-400">配套入门到精通的视频课程</p>
              </div>

              {/* 4. 竞赛出口 (Old 3) */}
              <div className="flex flex-col items-center justify-center gap-2 border-white/10 px-4 text-center lg:border-l">
                <div className="mb-2 rounded-full bg-cyan-500/20 p-3 text-cyan-400">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">直通科创竞赛</h3>
                <p className="text-xs text-neutral-400">掌握 Python 真代码，具备参赛实力</p>
              </div>

            </div>
          </div>
          
          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-20" />
        </MouseSpotlight>

        {/* Section 2: Bento Grid (Existing) */}
        <section id="tech-architecture" className="mt-32 relative z-10">
          <div className="mb-16 text-center">
             <div className="inline-block">
               <span className="rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1 text-xs font-semibold text-slate-300 backdrop-blur-sm mb-6 inline-block">
                硬核基因 / HARDCORE DNA
               </span>
               <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                 全栈技术架构
               </h2>
               <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                 从底层算力到上层应用，三位一体的工程闭环。
               </p>
               <div className="flex items-center justify-center gap-2 text-cyan-400 text-sm font-medium animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  [ 点击下方卡片 · 探索核心技术 ]
               </div>
             </div>
          </div>
          <BentoGrid className="max-w-7xl mx-auto">
            {/* Item 1: Vector Lab (Core) */}
            <Link href="/lab/software" className="md:col-span-2 md:row-span-2 group">
              <BentoGridItem
                title="向量实验室 (Vector Lab)"
                description="独创的可视化物理控制台。实时查看 PID 波形，拖拽调整力向量，看懂代码背后的物理规律。不再是黑盒调参，而是直观的物理实验。"
                icon={Laptop2}
                className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-900/20 hover:border-cyan-500/50"
                header={<VectorLabVisual />}
              />
            </Link>

            {/* Item 2: Industrial Powerhouse (Merged) */}
            <Link href="/lab/hardware" className="md:col-span-1 group">
              <BentoGridItem
                title="工业级算力底座"
                description="ESP32-S3 + 麦轮全向运动。小车虽小，五脏俱全。完美融合边缘计算与精准运动控制。"
                icon={Cpu}
                className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-900/20 hover:border-indigo-500/50"
                header={
                  <div className="relative h-32 rounded-xl border border-slate-800 bg-slate-900 overflow-hidden group-hover:border-indigo-500/30 transition-colors">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:0_0,0_0] animate-[shimmer_3s_infinite_linear]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15)_0%,transparent_60%)] group-hover:bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.25)_0%,transparent_70%)] transition-all" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                      <Cpu className="h-12 w-12 text-slate-700/50 group-hover:text-indigo-400 transition-colors duration-500" />
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-indigo-300 font-mono tracking-widest">HARDWARE &gt;</span>
                    </div>
                  </div>
                }
              />
            </Link>

            {/* Item 3: Mission-Based Curriculum (New) */}
            <Link href="/lab/curriculum" className="md:col-span-1 group">
              <BentoGridItem
                title="任务制课程"
                description="从巡线追踪到 AI 视觉，像打游戏一样解锁编程技能。不仅是写代码，更是解决实际问题。"
                icon={Map}
                className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-900/20 hover:border-emerald-500/50"
                header={
                  <div className="relative h-32 rounded-xl border border-slate-800 bg-slate-900 overflow-hidden flex items-center justify-center group-hover:border-emerald-500/30 transition-colors">
                     <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]" />
                     {/* Path Graphic */}
                     <svg className="w-full h-full absolute inset-0 text-cyan-500/20 group-hover:text-emerald-500/40 transition-colors" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 80 Q 30 20 50 50 T 90 20" strokeDasharray="4 4" className="group-hover:stroke-emerald-400 transition-colors" />
                        <circle cx="10" cy="80" r="3" fill="currentColor" className="group-hover:fill-emerald-400 transition-colors" />
                        <circle cx="50" cy="50" r="3" fill="currentColor" className="group-hover:fill-emerald-400 transition-colors" />
                        <circle cx="90" cy="20" r="3" fill="currentColor" className="group-hover:fill-emerald-400 transition-colors" />
                     </svg>
                     <div className="absolute bottom-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-emerald-300 font-mono">START_MISSION &gt;</div>
                  </div>
                }
              />
            </Link>
          </BentoGrid>
        </section>
      </main>
    </div>
  );
}
