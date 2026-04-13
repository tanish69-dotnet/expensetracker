'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, Brain, AlertTriangle, CheckCircle, TrendingUp, Terminal, ShieldAlert, GitPullRequest, Code2, Cpu } from 'lucide-react';
import { calculateInsights } from '../lib/ai';
import { Expense } from '../lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface AIAdvisorProps {
  expenses: Expense[];
}

export default function AIAdvisor({ expenses }: AIAdvisorProps) {
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);

  const insights = useMemo(() => calculateInsights(expenses), [expenses]);
  const currentInsight = insights[currentInsightIndex];

  const nextInsight = () => {
    setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative overflow-hidden p-8 rounded-[32px] glass-dark border border-white/10 shadow-2xl flex flex-col hover-glow"
    >
      {/* CodeRabbit Header */}
      <div className="relative z-10 flex flex-col space-y-6 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-blue-500/10 rounded-2xl border border-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Brain size={20} className="text-blue-400" />
             </div>
             <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Heuristic Audit HUD</h3>
                <p className="text-[9px] font-mono text-gray-600 mt-1">AGENTIC v2.4.1 — ACTIVE</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-[8px] font-black text-green-400 uppercase tracking-tighter">
              Nominal
            </div>
            {insights.length > 1 && (
              <button onClick={nextInsight} className="p-2 hover:bg-white/5 rounded-lg text-gray-600 hover:text-white transition-all">
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Intelligence Comment Section */}
        <div className="bg-black/30 rounded-2xl border border-white/5 p-6 space-y-4 flex-1">
           <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[10px] font-bold">
                 AG
              </div>
              <span className="text-xs font-bold text-white/80">Expanse Intelligence</span>
              <span className="text-[10px] text-gray-600 font-mono italic">live_audit.log</span>
           </div>

           <AnimatePresence mode="wait">
             <motion.div 
               key={currentInsightIndex}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="space-y-4 pl-6 border-l border-blue-500/20"
             >
                <div className="flex items-center gap-2">
                  {currentInsight?.type === 'warning' ? (
                    <ShieldAlert size={14} className="text-orange-400" />
                  ) : (
                    <Cpu size={14} className="text-blue-400" />
                  )}
                  <span className={`text-[9px] font-black uppercase tracking-widest ${
                    currentInsight?.type === 'warning' ? 'text-orange-400' : 'text-blue-400'
                  }`}>
                    {currentInsight?.type === 'warning' ? 'CRITICAL ALERT' : 'OPTIMIZATION LOG'}
                  </span>
                </div>

                <p className="text-lg font-bold leading-tight text-white tracking-tight">
                  {currentInsight?.message}
                </p>
                
                <div className="flex flex-col gap-2">
                   <div className="bg-white/5 p-3 rounded-lg border border-white/5 font-mono text-[10px] text-gray-400 leading-relaxed italic">
                      <span className="text-blue-500 mr-2">// Action:</span>
                      {currentInsight?.recommendation}
                   </div>
                </div>
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Status Persistence */}
        <div className="pt-4 flex items-center justify-between border-t border-white/5">
          <div className="flex gap-1">
            {insights.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentInsightIndex ? 'w-4 bg-blue-500' : 'w-1 bg-white/10'}`}></div>
            ))}
          </div>
          <div className="flex items-center gap-2">
             <Terminal size={12} className="text-gray-700" />
             <span className="text-[9px] text-gray-700 font-mono tracking-tighter">THREAD_ID: {currentInsightIndex + 1}X_INSIGHT</span>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 blur-3xl pointer-events-none" />
    </motion.div>
  );
}
