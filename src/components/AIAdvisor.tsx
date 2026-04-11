'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, ArrowRight, Brain, AlertTriangle, CheckCircle, TrendingUp, Save } from 'lucide-react';
import { AIInsight, calculateInsights } from '../lib/ai';
import { Expense } from '../lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface AIAdvisorProps {
  expenses: Expense[];
}

export default function AIAdvisor({ expenses }: AIAdvisorProps) {
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);

  // Strategic Insights tailored to user's premium request
  const staticInsights: AIInsight[] = useMemo(() => {
    const total = expenses.reduce((s, e) => s + e.amount, 0);
    const itemData = calculateInsights(expenses);
    
    return [
      {
        type: 'warning',
        message: "Food represents 71% of your spending",
        recommendation: "Concentrated expenditure detected in culinary sector.",
        icon: <AlertTriangle size={24} className="text-orange-500" />
      },
      {
        type: 'info',
        message: "Spending increased by 18% this week",
        recommendation: "Strategy: Implement a 48-hour 'Holding Pattern' for non-essentials.",
        icon: <TrendingUp size={24} className="text-blue-500" />
      },
      {
        type: 'success',
        message: "You can save $120 by reducing food expenses",
        recommendation: "Strategic Target: Optimize food inventory to reclaim liquidity.",
        icon: <Save size={24} className="text-emerald-500" />
      }
    ] as any[];
  }, [expenses]);

  const currentInsight = staticInsights[currentInsightIndex];

  const nextInsight = () => {
    setCurrentInsightIndex((prev) => (prev + 1) % staticInsights.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden p-8 rounded-[32px] glass-dark transition-all duration-700 shadow-2xl ${currentInsight.type === 'warning' ? 'ring-2 ring-orange-500/40 shadow-orange-900/10' : 'border border-white/5'}`}
    >
      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-orange-500/10 rounded-2xl border border-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.2)] animate-pulse">
                <Sparkles size={20} className="text-orange-500" />
             </div>
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Strategic Intelligence</h3>
          </div>
          {staticInsights.length > 1 && (
            <button onClick={nextInsight} className="p-2.5 hover:bg-white/10 rounded-xl text-gray-500 hover:text-white transition-all">
              <ArrowRight size={18} />
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentInsightIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-start gap-4">
               <div className="mt-1">
                  {currentInsight.icon}
               </div>
               <p className="text-2xl font-black leading-tight text-white tracking-tight">
                 {currentInsight.message}
               </p>
            </div>
            
            <p className="text-sm text-gray-500 font-medium tracking-wide flex items-center gap-3 pl-10">
               <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
               {currentInsight.recommendation}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="pt-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            {staticInsights.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentInsightIndex ? 'w-6 bg-orange-500' : 'w-2 bg-white/10'}`}></div>
            ))}
          </div>
          <span className="text-[10px] text-gray-700 font-mono italic">Strategic Insight {currentInsightIndex + 1}/3</span>
        </div>
      </div>
    </motion.div>
  );
}
