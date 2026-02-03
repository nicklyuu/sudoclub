"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Layers, Zap, Eye, Cpu, Cable, Smile, Server } from "lucide-react";
import Link from "next/link";

export default function HardwarePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
        <Link
          href="/lab/mini-inspector"
          className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lab
        </Link>
      </nav>

      {/* Section 1: Hero - The Agile Chassis */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Scale/Blur Animation */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black z-10" />
          {/* Placeholder for Chassis Hero */}
          <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
             <img 
                 src="/images/lab/chassis-hero.jpg" 
                 alt="Agile Chassis" 
                 className="w-full h-full object-cover opacity-80"
             />
          </div>
        </motion.div>

        {/* Hero Text */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6"
          >
            灵动创造平台
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            不只是底盘，更是你创意的画板。麦克纳姆轮的全向自由度，让每一行代码都能在桌面上灵动起舞。
          </motion.p>
        </div>
      </section>

      {/* Section 2: Modular Design (Moved Up) */}
      <section className="py-32 bg-neutral-950 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.05)_0%,transparent_60%)]" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col-reverse md:flex-row items-center gap-16">
             {/* Left: Text */}
             <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2"
             >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-800/50 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6">
                   <Layers className="w-3 h-3" />
                   Modular Design
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  像搭积木一样，<br/>升级大脑。
                </h2>
                <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                  想加个眼睛？还是装个雷达？磁吸式接口设计，让硬件升级像搭积木一样简单。<strong className="text-cyan-400">内置 6 TOPS 算力</strong>，让从遥控玩具到 AI 机器人的进化，触手可及。
                </p>
                
                {/* Performance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {/* Item 1: 6 TOPS AI */}
                   <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                      <div className="mb-3 text-cyan-400">
                         <Cpu className="w-6 h-6" />
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-1">
                        6 <span className="text-cyan-400">TOPS</span>
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        专用 NPU 加速，本地流畅运行 YOLOv8 与 LLM。
                      </p>
                   </div>

                   {/* Item 2: 8-Core Flagship */}
                   <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                      <div className="mb-3 text-cyan-400">
                         <Server className="w-6 h-6" />
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-1">
                        8-<span className="text-cyan-400">Core</span>
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        RK3588 (4×A76 + 4×A55)，桌面级处理性能。
                      </p>
                   </div>

                   {/* Item 3: 4K Vision Engine */}
                   <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                      <div className="mb-3 text-cyan-400">
                         <Eye className="w-6 h-6" />
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-1">
                        4K <span className="text-cyan-400">Vision</span>
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        硬件级编解码，支持超低延迟高清图传。
                      </p>
                   </div>
                </div>
             </motion.div>

             {/* Right: Modular Kit Image */}
             <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2"
             >
                <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/50">
                   <img 
                      src="/images/lab/modular-kit.jpg" 
                      alt="Modular Kit"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                   />
                   {/* Floating Labels (Simulated) */}
                   <div className="absolute top-[42%] left-[32%] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-white">
                      Orange Pi
                   </div>
                   <div className="absolute top-[50%] left-[8%] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-white">
                      Camera Module
                   </div>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Creative Duo (Upgraded) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/30 border border-purple-800/50 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-6">
             <Cpu className="w-3 h-3" />
             Creative Duo
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
             创造力双核，<br /><span className="text-purple-400">硬核与灵魂兼备</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Card 1: GPIO Interface */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative group rounded-3xl border border-neutral-800 bg-neutral-900/50 overflow-hidden"
           >
              <div className="aspect-[4/3] overflow-hidden">
                 <img 
                    src="/images/lab/gpio-closeup.jpg" 
                    alt="GPIO and Dupont Wires"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                 />
              </div>
              <div className="p-8">
                 <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center mb-6 text-purple-400">
                    <Cable className="w-5 h-5" />
                 </div>
                 <h3 className="text-2xl font-bold mb-3 text-white">GPIO 万能扩展</h3>
                 <p className="text-neutral-400 leading-relaxed">
                    不设限的创造力。标准排针接口，让你随心连接传感器、舵机或炫彩灯带。无需焊接，插上杜邦线，创意即刻通电。
                 </p>
              </div>
           </motion.div>

           {/* Card 2: OLED HUD (Highlight) */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="relative group rounded-3xl border border-cyan-900/30 bg-neutral-900/80 overflow-hidden hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] transition-all duration-500"
           >
              {/* Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="aspect-[4/3] bg-black flex items-center justify-center relative overflow-hidden">
                 {/* Pixel Grid Overlay for aesthetic */}
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                 
                 <img 
                    src="/images/lab/oled-face.png" 
                    alt="OLED Expressions"
                    className="w-full h-full object-cover"
                 />
              </div>
              <div className="p-8 relative z-10">
                 <div className="w-10 h-10 rounded-full bg-cyan-950/50 flex items-center justify-center mb-6 text-cyan-400">
                    <Smile className="w-5 h-5" />
                 </div>
                 <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">注入灵魂的表情包</h3>
                 <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                    告别盲猜状态。板载 OLED 屏幕不仅能实时显示 IP 和电量，更能自定义 <strong className="text-cyan-400">像素表情</strong>。开心 (^_^) 还是困惑 (@_@)？让你的代码拥有情绪价值。
                 </p>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Section 4: Movement Demo (Moved Down) */}
      <section className="py-32 bg-neutral-900/30 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          {/* Right: Video/GIF Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-2/3"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl shadow-cyan-900/20">
              <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                 {/* Placeholder for GIF */}
                 <img 
                    src="/images/lab/strafe-demo.gif" 
                    alt="Strafing Demo"
                    className="w-full h-full object-cover"
                 />
                 {/* Play Button Overlay (Visual only) */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                       <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-1/3"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              横向平移，<br/><span className="text-cyan-400">打破常规</span>。
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              普通赛车只能转弯，而它能横着走。在狭窄空间里平移穿梭，体验数学与机械结合的奇妙魔力。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-32 bg-black flex items-center justify-center">
         <p className="text-neutral-700 text-sm">Designed for Exploration</p>
      </div>
    </div>
  );
}
