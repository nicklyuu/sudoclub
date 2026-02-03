"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Rocket, Package, Radio, CheckCircle2, Github, Briefcase, Brain, Award } from "lucide-react";
import { TracingBeam } from "@/app/components/ui/tracing-beam";
import { BackgroundBeams } from "@/app/components/ui/background-beams";
import { motion } from "framer-motion";

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 font-sans">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundBeams className="opacity-40" />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <Link
          href="/lab/mini-inspector"
          className="group flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Lab
        </Link>
        <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1">
          <Rocket className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Vector Lab <span className="text-slate-600">/</span> Curriculum
          </span>
        </div>
      </header>

      <main className="relative z-10 pt-24 pb-20">
        
        {/* Section 1: Hero */}
        <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Mission Start
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
              工程师的<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">英雄之旅</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              拒绝枯燥的语法书。<br/>
              我们把 Python、机器视觉和控制算法，<br/>
              藏在了三个拯救世界的任务里。
            </p>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-2 text-slate-500"
          >
            <span className="text-xs font-mono tracking-widest uppercase">Scroll to Begin</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />
          </motion.div>
        </section>

        {/* Section 2: The Timeline */}
        <section className="py-20 px-4">
          <TracingBeam className="px-6">
            <div className="max-w-2xl mx-auto antialiased pt-4 relative">
              
              {/* Level 1 */}
              <div className="mb-24 relative">
                <div className="absolute -left-4 md:-left-10 top-0 w-8 h-8 bg-slate-900 border border-cyan-500/50 rounded-full flex items-center justify-center z-20">
                  <span className="text-cyan-400 font-bold text-xs">01</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1 space-y-4">
                    <div className="inline-block rounded bg-cyan-500/10 px-2 py-1 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      入门 / Beginner
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">代号「火星漫游」</h2>
                    <h3 className="text-lg text-slate-400 font-mono">Mars Rover</h3>
                    <p className="text-slate-400 leading-relaxed">
                      登陆红色星球。你需要组装探测器，编写 Python 脚本控制麦轮底盘，穿越陨石坑（避障）。
                      这是你与物理世界的第一次握手。
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {["Linux 终端", "GPIO 电子学", "逻辑控制"].map((skill) => (
                        <span key={skill} className="text-xs border border-slate-700 bg-slate-800/50 px-2 py-1 rounded text-slate-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur group">
                      <Image
                        src="/images/lab/robot-hero.jpg"
                        alt="Mars Rover Mission"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 2 */}
              <div className="mb-24 relative">
                <div className="absolute -left-4 md:-left-10 top-0 w-8 h-8 bg-slate-900 border border-indigo-500/50 rounded-full flex items-center justify-center z-20">
                  <span className="text-indigo-400 font-bold text-xs">02</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                   <div className="order-1">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur group">
                      <Image
                        src="/images/lab/modular-kit.jpg"
                        alt="Interstellar Logistics"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    </div>
                  </div>
                  <div className="order-2 space-y-4">
                    <div className="inline-block rounded bg-indigo-500/10 px-2 py-1 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      进阶 / Intermediate
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">代号「星际物流」</h2>
                    <h3 className="text-lg text-slate-400 font-mono">Interstellar Logistics</h3>
                    <p className="text-slate-400 leading-relaxed">
                      空间站物资告急。激活摄像头，利用 OpenCV 识别货物坐标，操作机械臂完成精准转运。
                      开始像计算机视觉工程师一样思考。
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {["OpenCV 机器视觉", "机械臂运动学", "PID 算法"].map((skill) => (
                        <span key={skill} className="text-xs border border-slate-700 bg-slate-800/50 px-2 py-1 rounded text-slate-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 3 */}
              <div className="mb-12 relative">
                <div className="absolute -left-4 md:-left-10 top-0 w-8 h-8 bg-slate-900 border border-purple-500/50 rounded-full flex items-center justify-center z-20">
                  <span className="text-purple-400 font-bold text-xs">03</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1 space-y-4">
                    <div className="inline-block rounded bg-purple-500/10 px-2 py-1 text-xs font-bold text-purple-400 uppercase tracking-wider">
                      大师 / Master
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">代号「废墟救援」</h2>
                    <h3 className="text-lg text-slate-400 font-mono">Rescue Mission</h3>
                    <p className="text-slate-400 leading-relaxed">
                      通讯中断。在未知迷宫中，利用 SLAM 激光雷达构建地图，自主规划路径寻找信标。
                      挑战自动驾驶领域的核心难题。
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {["SLAM 建图", "路径规划", "神经网络"].map((skill) => (
                        <span key={skill} className="text-xs border border-slate-700 bg-slate-800/50 px-2 py-1 rounded text-slate-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur group">
                      <Image
                        src="/images/lab/strafe-demo.gif"
                        alt="Rescue Mission"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </TracingBeam>
        </section>

        {/* Section 3: Outcome */}
        <section className="py-24 px-4 bg-slate-900/20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
              你将获得什么？
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="group relative flex flex-col items-center p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all">
                <div className="mb-4 p-4 rounded-full bg-slate-800 text-white group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                  <Github className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">GitHub 个人主页</h3>
                <p className="text-sm text-slate-400">
                  不再是空空如也。提交真实代码，积累 Commits，打造硬核简历。
                </p>
              </div>

              {/* Card 2 */}
              <div className="group relative flex flex-col items-center p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-indigo-500/30 transition-all">
                <div className="mb-4 p-4 rounded-full bg-slate-800 text-white group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">项目作品集</h3>
                <p className="text-sm text-slate-400">
                  无论是升学面试还是求职，拿出能跑的实物项目，胜过千言万语。
                </p>
              </div>

              {/* Card 3 */}
              <div className="group relative flex flex-col items-center p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/30 transition-all">
                <div className="mb-4 p-4 rounded-full bg-slate-800 text-white group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">算法思维</h3>
                <p className="text-sm text-slate-400">
                  学会像计算机科学家一样思考。将复杂问题拆解，用逻辑征服混乱。
                </p>
              </div>

              {/* Card 4 */}
              <div className="group relative flex flex-col items-center p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all">
                <div className="mb-4 p-4 rounded-full bg-slate-800 text-white group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Vector Lab 认证</h3>
                <p className="text-sm text-slate-400">
                  完成所有挑战，获得官方认证证书。证明你在具身智能领域的实力。
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
