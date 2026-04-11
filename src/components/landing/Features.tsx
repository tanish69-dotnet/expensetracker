'use client';

import React from 'react';
import { BarChart3, Target, Cpu, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Smart Analytics",
    description: "Visualize your spending with intuitive charts and deep pattern recognition.",
    icon: <BarChart3 className="text-blue-500" size={24} />,
    color: "blue"
  },
  {
    title: "Budget Tracking",
    description: "Set limits and stay within your budget with dynamic health indicators.",
    icon: <Target className="text-purple-500" size={24} />,
    color: "purple"
  },
  {
    title: "AI Insights",
    description: "Get smart suggestions based on your spending habits using our Heuristic Engine.",
    icon: <Cpu className="text-indigo-500" size={24} />,
    color: "indigo"
  }
];

export default function Features() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.02)" }}
            className="p-8 rounded-[32px] glass-dark border border-white/5 space-y-6 transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${feature.color}-500/10 border border-${feature.color}-500/20 group-hover:scale-110 transition-transform`}>
              {feature.icon}
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-black text-white leading-tight">
                {feature.title}
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                {feature.description}
              </p>
            </div>
            <div className="pt-2">
               <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-[10px] text-gray-700 font-bold uppercase tracking-widest">
                     <CheckCircle2 size={12} className="text-blue-500" />
                     Enterprise Grade
                  </li>
                  <li className="flex items-center gap-2 text-[10px] text-gray-700 font-bold uppercase tracking-widest">
                     <CheckCircle2 size={12} className="text-blue-500" />
                     Privacy First
                  </li>
               </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
