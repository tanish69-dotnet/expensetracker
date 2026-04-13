'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface SummaryProps {
  total: number;
}

export default function Summary({ total }: SummaryProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden p-8 rounded-[24px] bg-gradient-to-br from-[#3b82f6] via-[#6366f1] to-[#8b5cf6] shadow-[0_20px_50px_rgba(59,130,246,0.3)] border border-white/20"
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
            <TrendingUp className="text-white" size={24} />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full backdrop-blur-md border border-white/5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">Live Balance</span>
          </div>
        </div>

        <p className="text-white/70 text-sm font-medium mb-1">Total Assets Portfolio</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-white/80">$</span>
          <h1 className="text-6xl font-black text-white tracking-tighter">
            <CountUp 
              end={total} 
              duration={2.5} 
              separator="," 
              decimals={2} 
              useEasing={true}
            />
          </h1>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">Volatility</span>
            <span className="text-white font-mono text-xs">+12.5% vs last week</span>
          </div>
          <div className="p-2 bg-black/10 rounded-lg hover:bg-black/20 transition-colors cursor-pointer">
            <ArrowUpRight className="text-white/60" size={18} />
          </div>
        </div>
      </div>
      
      {/* Premium Glass Decorations */}
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />
    </motion.div>
  );
}
