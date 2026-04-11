'use client';

import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { motion } from 'framer-motion';

const lineData = [
  { name: 'Mon', amount: 120 },
  { name: 'Tue', amount: 300 },
  { name: 'Wed', amount: 200 },
  { name: 'Thu', amount: 450 },
  { name: 'Fri', amount: 380 },
  { name: 'Sat', amount: 600 },
  { name: 'Sun', amount: 850 },
];

const pieData = [
  { name: 'Food', value: 600, color: '#3b82f6' },
  { name: 'Bills', value: 150, color: '#8b5cf6' },
  { name: 'Other', value: 100, color: '#6366f1' },
];

export default function AnalyticsPreview() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-6 space-y-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-black text-white tracking-tight leading-tight">
          Real-Time Visual Intelligence
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto font-medium">
          Our adaptive charts transform raw transactions into strategic foresight.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[400px]">
        {/* Spending Trend Line Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-[32px] border border-white/5 flex flex-col"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Spending Trend</h3>
            <span className="text-xs font-mono text-blue-400">+18.2% vs Last Week</span>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0F', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorAmount)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Breakdown Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-[32px] border border-white/5 flex flex-col lg:flex-row items-center justify-between"
        >
          <div className="space-y-6 w-full lg:w-1/2">
             <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Category Impact</h3>
             <div className="space-y-4">
                {pieData.map((item) => (
                  <div key={item.name} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                       <span className="text-sm text-white font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm text-gray-500 font-mono">${item.value}</span>
                  </div>
                ))}
             </div>
          </div>
          <div className="w-full lg:w-1/2 h-[200px] lg:h-full relative mt-8 lg:mt-0">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                   <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                      animationDuration={1500}
                   >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                   </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                   <p className="text-[10px] uppercase tracking-widest text-gray-600 font-black">Food dominance</p>
                   <p className="text-xl font-black text-white px-2 mt-1">71%</p>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
