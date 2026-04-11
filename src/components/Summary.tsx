'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowUpRight, DollarSign } from 'lucide-react';

interface SummaryProps {
  total: number;
}

function CountUp({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => 
    latest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  );

  useEffect(() => {
    const animation = animate(count, value, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1], // Custom premium easeOutExpo
    });
    return () => animation.stop();
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function Summary({ total }: SummaryProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
        scale: 1.01 
      }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden p-10 rounded-[32px] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 shadow-2xl border border-white/20"
    >
      <div className="relative z-10 flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-blue-100/80 text-xs font-bold uppercase tracking-[0.25em] mb-1">Total Analytics</p>
          <div className="flex items-center gap-2">
             <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter flex items-center">
               <span className="text-4xl text-blue-200 mt-1 mr-1 font-bold">$</span>
               <CountUp value={total} />
             </h1>
          </div>
          <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mt-4">Heuristic Engine Active</p>
        </div>
        
        <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all cursor-pointer group">
          <ArrowUpRight className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={28} strokeWidth={2.5} />
        </div>
      </div>
      
      {/* Premium Decorative Elements */}
      <div className="absolute top-[-40%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-72 h-72 bg-blue-400/20 rounded-full blur-[80px] pointer-events-none"></div>
    </motion.div>
  );
}
