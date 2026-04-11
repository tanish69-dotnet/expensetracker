'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-32 max-w-4xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative p-16 rounded-[48px] bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/10 border border-white/10 overflow-hidden"
      >
        {/* Background Glows */}
        <div className="absolute top-[-50%] left-[-20%] w-[140%] h-[140%] bg-blue-500/5 blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 space-y-8">
           <div className="flex justify-center">
              <div className="p-3 bg-white/10 rounded-2xl border border-white/10 animate-bounce">
                 <Sparkles className="text-blue-400" size={32} />
              </div>
           </div>
           
           <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Start managing your money <br /> smarter today.
           </h2>
           
           <p className="text-gray-400 max-w-lg mx-auto font-medium">
              Join thousands of individuals using Expanse Intelligence to reclaim their financial freedom.
           </p>

           <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl flex items-center gap-3 transition-all mx-auto"
              >
                Open Dashboard
                <ArrowRight size={20} />
              </motion.button>
           </Link>

           <div className="pt-8 flex justify-center gap-8 text-[10px] text-gray-700 font-bold uppercase tracking-widest">
              <span>Next.js 15 Ready</span>
              <span>Open Source UI</span>
              <span>Cloud Integrated</span>
           </div>
        </div>
      </motion.div>
    </section>
  );
}
