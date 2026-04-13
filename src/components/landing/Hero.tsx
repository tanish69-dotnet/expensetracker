'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const FloatingCard = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    className={`glass p-4 rounded-2xl shadow-2xl border border-white/10 ${className}`}
  >
    {children}
  </motion.div>
);

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles size={14} />
            <span>Next-Gen Expense Intelligence</span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white">
            Track. Analyze. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 italic">Save.</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            Smart expense intelligence to help you understand and control your spending. Experience the future of personal finance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl flex items-center gap-3 transition-all"
              >
                Get Started
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              className="px-8 py-4 bg-transparent text-white border border-white/10 font-black uppercase tracking-widest rounded-xl transition-all"
            >
              View Demo
            </motion.button>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-700 px-1 justify-center lg:justify-start">
             <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded uppercase">Press ⌘K</span>
             <span>to open the GSD Execution HUD</span>
          </div>

          <div className="flex items-center gap-8 pt-4 justify-center lg:justify-start opacity-40">
            <div className="flex items-center gap-2 font-black italic tracking-tighter">
               <Shield size={16} /> SECURE
            </div>
            <div className="flex items-center gap-2 font-black italic tracking-tighter">
               <Zap size={16} /> INSTANT
            </div>
            <div className="flex items-center gap-2 font-black italic tracking-tighter text-blue-400">
               <TrendingUp size={16} /> CLOUD
            </div>
          </div>
        </motion.div>

        {/* Visual Preview Section */}
        <div className="relative hidden lg:block h-[500px]">
          <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full"></div>
          
          {/* Main Dashboard Preview Card */}
          <FloatingCard className="absolute top-10 left-10 w-80 rotate-[-5deg] backdrop-blur-3xl bg-white/5 border-white/10 z-10" delay={0}>
             <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Total Expenses</p>
                   <span className="text-[10px] text-emerald-400 font-mono">+12.5%</span>
                </div>
                <h3 className="text-4xl font-black text-white tracking-tighter">$850.00</h3>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="w-3/4 h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
             </div>
          </FloatingCard>

          {/* Transaction Card */}
          <FloatingCard className="absolute bottom-20 right-10 w-72 rotate-[5deg] z-20" delay={1}>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/10">🍔</div>
                   <div>
                      <p className="text-sm font-bold text-white/90">Food & Dining</p>
                      <p className="text-[10px] text-gray-600 font-mono">Apr 11, 2026</p>
                   </div>
                </div>
                <p className="font-black text-white tracking-tighter">$600.00</p>
             </div>
          </FloatingCard>

          {/* AI Advisor Preview */}
          <FloatingCard className="absolute top-40 right-0 w-64 rotate-3 z-0 opacity-80" delay={0.5}>
             <div className="flex gap-3">
                <div className="text-blue-400"><Sparkles size={16} /></div>
                <p className="text-[10px] font-bold leading-tight text-white/80">
                   "You could save $120/mo by optimizing Food spend."
                </p>
             </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
}
