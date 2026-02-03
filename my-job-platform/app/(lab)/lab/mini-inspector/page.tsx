"use client";

import Link from "next/link";
import { ArrowLeft, FlaskConical, Cpu, Laptop2, Map } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/app/components/bento-grid";
import { BackgroundBeams } from "@/app/components/ui/background-beams";
import { MouseSpotlight } from "@/app/components/ui/mouse-spotlight";
import { motion, Variants } from "framer-motion";

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
            Back to Home
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 backdrop-blur-sm">
            <FlaskConical className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Vector Lab <span className="text-slate-600">/</span> Beta
            </span>
          </div>
        </header>

        {/* Hero Section with Mouse Spotlight */}
        <MouseSpotlight className="flex flex-1 items-center justify-center min-h-[80vh] rounded-3xl">
          <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 px-4 md:px-8">
            
            {/* Left: Hero Image (Levitating Robot) */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-full order-2 lg:order-1 flex justify-center">
              <div className="relative w-full aspect-square max-w-[500px] scale-125 translate-y-24">
                
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
                <div className="mb-6 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-950/30 px-3 py-1 text-xs font-medium text-cyan-400 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                  <span className="mr-2 h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
                  未来工程 / FUTURE ENGINEERING
                </div>
              </motion.div>

              <motion.h1 variants={itemVariants} className="mb-6 font-sans text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400 sm:text-6xl lg:text-7xl leading-[1.1]">
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

              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
                <Link href="#" className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl transition hover:bg-slate-900">
                    开启先行者计划_
                  </span>
                </Link>
                
                <Link href="#" className="group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-slate-300 transition hover:text-white">
                  探索技术架构 
                  <span className="transition-transform group-hover:translate-x-1">&gt;</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </MouseSpotlight>

        {/* Section 2: Bento Grid (Existing) */}
        <section className="mt-32 relative z-10">
          <div className="mb-12 text-center">
            <span className="rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1 text-xs font-semibold text-slate-300 backdrop-blur-sm">
              硬核基因 / HARDCORE DNA
            </span>
          </div>
          <BentoGrid className="max-w-7xl mx-auto">
            {/* Item 1: Vector Lab (Core) */}
            <BentoGridItem
              title="向量实验室 (Vector Lab)"
              description="独创的可视化物理控制台。实时查看 PID 波形，拖拽调整力向量，看懂代码背后的物理规律。不再是黑盒调参，而是直观的物理实验。"
              icon={Laptop2}
              className="md:col-span-2 md:row-span-2"
              header={
                <div className="relative h-full min-h-[12rem] rounded-xl border border-slate-800 bg-slate-950 overflow-hidden flex flex-col group-hover:border-slate-600 transition-colors">
                  {/* Mock Window Header */}
                  <div className="flex items-center gap-2 border-b border-slate-800 px-3 py-2 bg-slate-900">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                    <div className="ml-2 h-1.5 w-20 rounded-full bg-slate-700/50" />
                  </div>
                  {/* Mock Editor Area */}
                  <div className="flex flex-1 p-4 gap-4">
                     {/* Sidebar */}
                    <div className="hidden w-16 flex-col gap-2 border-r border-slate-800/50 pr-4 sm:flex">
                      <div className="h-8 w-8 rounded bg-slate-800/50" />
                      <div className="h-8 w-8 rounded bg-slate-800/30" />
                      <div className="h-8 w-8 rounded bg-slate-800/30" />
                    </div>
                    {/* Code Area (Blocks) */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2 rounded bg-cyan-900/30 px-3 py-2 border border-cyan-500/30 w-fit">
                        <div className="h-3 w-3 rounded-full bg-cyan-400" />
                        <span className="text-xs text-cyan-200 font-mono">on_start( )</span>
                      </div>
                      <div className="ml-4 flex items-center gap-2 rounded bg-indigo-900/30 px-3 py-2 border border-indigo-500/30 w-fit">
                         <span className="text-xs text-indigo-200 font-mono">robot.move_to(x=10, y=20)</span>
                      </div>
                      <div className="ml-4 flex items-center gap-2 rounded bg-emerald-900/30 px-3 py-2 border border-emerald-500/30 w-fit">
                         <span className="text-xs text-emerald-200 font-mono">led.set_color(RED)</span>
                      </div>
                    </div>
                    {/* Graph Area Overlay */}
                    <div className="absolute right-4 bottom-4 w-32 h-24 rounded border border-slate-800 bg-slate-900/80 p-2 hidden md:block backdrop-blur-sm">
                       <div className="flex items-end justify-between h-full gap-1">
                          <div className="w-2 bg-cyan-500/50 h-[40%]" />
                          <div className="w-2 bg-cyan-500/50 h-[70%]" />
                          <div className="w-2 bg-cyan-500/50 h-[50%]" />
                          <div className="w-2 bg-cyan-500/50 h-[80%]" />
                          <div className="w-2 bg-cyan-500/50 h-[60%]" />
                       </div>
                    </div>
                  </div>
                </div>
              }
            />

            {/* Item 2: Industrial Powerhouse (Merged) */}
            <BentoGridItem
              title="工业级算力底座"
              description="ESP32-S3 + 麦轮全向运动。小车虽小，五脏俱全。完美融合边缘计算与精准运动控制。"
              icon={Cpu}
              className="md:col-span-1"
              href="/lab/hardware"
              header={
                <div className="relative h-32 rounded-xl border border-slate-800 bg-slate-900 overflow-hidden group-hover:border-slate-600 transition-colors">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:0_0,0_0] animate-[shimmer_3s_infinite_linear]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15)_0%,transparent_60%)]" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Cpu className="h-12 w-12 text-slate-700/50" />
                  </div>
                </div>
              }
            />

            {/* Item 3: Mission-Based Curriculum (New) */}
            <BentoGridItem
              title="任务制课程"
              description="从巡线追踪到 AI 视觉，像打游戏一样解锁编程技能。不仅是写代码，更是解决实际问题。"
              icon={Map}
              className="md:col-span-1"
              header={
                <div className="relative h-32 rounded-xl border border-slate-800 bg-slate-900 overflow-hidden flex items-center justify-center group-hover:border-slate-600 transition-colors">
                   <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]" />
                   {/* Path Graphic */}
                   <svg className="w-full h-full absolute inset-0 text-cyan-500/20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 80 Q 30 20 50 50 T 90 20" strokeDasharray="4 4" />
                      <circle cx="10" cy="80" r="3" fill="currentColor" />
                      <circle cx="50" cy="50" r="3" fill="currentColor" />
                      <circle cx="90" cy="20" r="3" fill="currentColor" />
                   </svg>
                </div>
              }
            />
          </BentoGrid>
        </section>
      </main>
    </div>
  );
}
