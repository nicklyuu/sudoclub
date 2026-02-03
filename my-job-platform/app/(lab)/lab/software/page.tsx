"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import {
  Terminal,
  Activity,
  Cpu,
  ArrowRight,
  Zap,
  Layers,
  Code2,
  Maximize2,
  GitBranch,
  Play,
  RefreshCw,
} from "lucide-react";

// --- Components ---

// 1. Hero Section: Code Cockpit
const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-slate-950 flex items-center justify-center border-b border-slate-800">
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-4 py-1.5 text-xs font-medium text-cyan-400 backdrop-blur-md"
        >
          <Terminal size={12} />
          <span className="font-mono">SYSTEM.INIT(VECTOR_LAB)</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
            CODE
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-mono">
            COCKPIT
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-10 max-w-2xl text-lg text-slate-400 md:text-xl"
        >
          这不是简单的 IDE，而是你的物理世界控制台。
          <br />
          <span className="text-cyan-400/80">代码即指令，数据即反馈。</span>
          在这里，你可以看见算法的形状。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button className="group relative flex items-center gap-2 overflow-hidden rounded-md bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
            <Code2 size={18} />
            <span>启动控制台</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button className="flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900/50 px-6 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800">
            <Play size={16} className="text-purple-400" />
            <span>运行演示</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// 2. Feature: PID Waveform Visualization
// Smooth animation logic: Generate a damped sine wave path
const PIDWaveformSection = () => {
  const [points, setPoints] = useState("");
  const [targetLine, setTargetLine] = useState("");

  // Animation loop
  useEffect(() => {
    let frame = 0;
    let animationFrameId: number;

    const animate = () => {
      frame += 1;
      const width = 1000;
      const height = 300;
      const targetY = height / 2;
      
      // Generate waveform points
      // We simulate a scrolling window or a settling curve
      // Let's do a "settling" curve that resets every few seconds to show the PID process
      
      const cycleLength = 300; // frames per cycle
      const t = frame % cycleLength;
      
      let pathData = `M 0 ${targetY}`;
      
      // Simulate damped harmonic oscillator: y(x) = A * e^(-kx) * cos(wx)
      // We map 'x' to screen width
      
      const pts = [];
      for (let x = 0; x <= width; x += 5) {
        // Dynamic animation parameters
        // Phase shift simulates movement if needed, but for "settling" we want static x, changing amplitude/time?
        // Let's make it look like a real-time oscilloscope trace moving left to right?
        // OR, show the *entire* convergence curve animating from "bad" to "good"?
        
        // Let's go with: A live trace of a PID controller adjusting to a setpoint change.
        // But for visual appeal, a damped wave is classic.
        
        // Time variable for the wave 'traveling'
        const timeOffset = frame * 2; 
        
        // Damping factor based on x position to simulate settling over time (space)
        // Or damping based on time to simulate settling of the whole system?
        
        // Let's do a "Cyberpunk Oscilloscope" look:
        // A main wave that stabilizes.
        
        // Visual: A wave starting high amplitude at left, settling to 0 at right.
        // And the whole wave gently undulates.
        
        const normalizedX = x / width;
        const decay = Math.exp(-normalizedX * 5); // Decay across the screen
        const frequency = 0.05;
        const phase = frame * 0.05; // Moving wave
        
        // Add some "noise" or "glitch" occasionally
        const noise = (Math.random() - 0.5) * (Math.random() > 0.95 ? 10 : 0);
        
        const amplitude = 100 * decay;
        const y = targetY + amplitude * Math.sin(x * frequency - phase) + noise;
        
        pts.push(`${x},${y}`);
      }
      
      setPoints(`M ${pts.join(" L ")}`);
      setTargetLine(`M 0 ${targetY} L ${width} ${targetY}`);
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="relative w-full border-b border-slate-800 bg-slate-950 py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="mb-4 inline-flex items-center gap-2 rounded text-xs font-bold uppercase tracking-wider text-cyan-500">
              <Activity size={14} />
              <span>Visual PID Tuning</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              看见算法的
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400"> 心跳</span>
            </h2>
            <p className="mb-6 text-slate-400">
              告别枯燥的参数调试。在向量实验室，PID 不再是抽象的公式，而是实时跳动的波形。
              <br className="hidden md:block" />
              通过直观的曲线反馈，你可以清晰地看到每一次参数调整对系统的影响。
              <span className="mt-2 block text-sm text-slate-500 border-l-2 border-slate-700 pl-4">
                P (比例) 控制力度，I (积分) 消除误差，D (微分) 抑制震荡。
              </span>
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-cyan-500/10 text-cyan-400">
                  <RefreshCw size={14} />
                </div>
                <span>实时波形渲染，毫秒级响应</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-purple-500/10 text-purple-400">
                  <Maximize2 size={14} />
                </div>
                <span>可视化参数拖拽调节</span>
              </li>
            </ul>
          </div>

          {/* Visual: Oscilloscope */}
          <div className="order-1 lg:order-2">
            <div className="relative rounded-xl border border-slate-800 bg-slate-900/50 p-1 shadow-2xl backdrop-blur-sm">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  PID_MONITOR_V1.0
                </div>
                <div className="flex gap-2">
                  <div className="h-2 w-8 rounded-full bg-slate-800" />
                  <div className="h-2 w-2 rounded-full bg-slate-800" />
                </div>
              </div>
              
              {/* Graph Area */}
              <div className="relative h-64 w-full overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950">
                {/* Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                  {/* Target Line */}
                  <path d={targetLine} stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                  
                  {/* The Waveform */}
                  <motion.path
                    d={points}
                    stroke="url(#gradientWave)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                  />
                  
                  {/* Definitions */}
                  <defs>
                    <linearGradient id="gradientWave" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
                      <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </svg>

                {/* Overlay UI Elements */}
                <div className="absolute bottom-4 right-4 font-mono text-xs text-cyan-500/80">
                  <div>ERROR: 0.024</div>
                  <div>INTEG: 1.450</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 3. Feature: Vector Sandbox
const VectorSandboxSection = () => {
  return (
    <section className="bg-slate-950 py-24 border-b border-slate-800">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded text-xs font-bold uppercase tracking-wider text-purple-500">
            <GitBranch size={14} />
            <span>Vector Synthesis</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            矢量合成
            <span className="text-purple-400"> 沙盘</span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            物理世界中的每一个动作，都是力的合成。
            在沙盘中自由拖拽向量，直观感受合力的产生与分解。
          </p>
        </div>

        {/* Mock Sandbox UI */}
        <div className="mx-auto max-w-4xl rounded-xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur relative overflow-hidden group hover:border-purple-500/30 transition-colors duration-500">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(168,85,247,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />
          
          <div className="relative z-10 grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-lg border border-slate-700/50 bg-slate-900/80 p-6 text-left transition-transform hover:-translate-y-1">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-900/30 text-cyan-400">
                <ArrowRight className="rotate-45" size={20} />
              </div>
              <h3 className="mb-2 font-bold text-slate-200">力与速度</h3>
              <p className="text-sm text-slate-400">
                分解机器人运动的速度矢量，掌握全向轮运动学核心。
              </p>
            </div>
             {/* Card 2 */}
             <div className="rounded-lg border border-slate-700/50 bg-slate-900/80 p-6 text-left transition-transform hover:-translate-y-1">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-900/30 text-purple-400">
                <Layers size={20} />
              </div>
              <h3 className="mb-2 font-bold text-slate-200">姿态解算</h3>
              <p className="text-sm text-slate-400">
                通过四元数与欧拉角的可视化转换，理解三维空间姿态。
              </p>
            </div>
             {/* Card 3 */}
             <div className="rounded-lg border border-slate-700/50 bg-slate-900/80 p-6 text-left transition-transform hover:-translate-y-1">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900/30 text-emerald-400">
                <Zap size={20} />
              </div>
              <h3 className="mb-2 font-bold text-slate-200">场与势能</h3>
              <p className="text-sm text-slate-400">
                模拟电磁场与引力场，观察粒子在复杂力场中的运动轨迹。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 4. CTA Section
const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-32 text-center">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
      
      <div className="container relative z-10 mx-auto px-4">
        <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
          准备好进入
          <span className="text-cyan-400"> 向量世界</span> 
          了吗？
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg text-slate-400">
          这里没有枯燥的理论，只有可触摸的代码和可看见的物理。
          启动你的引擎，开始探索。
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/lab/software"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-8 py-4 text-base font-bold text-slate-950 transition-all hover:bg-cyan-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
          >
            <Terminal size={20} />
            立即接入实验室
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function SoftwareLabPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
      <HeroSection />
      <PIDWaveformSection />
      <VectorSandboxSection />
      <CTASection />
    </main>
  );
}
