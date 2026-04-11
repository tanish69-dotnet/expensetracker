'use client';

import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { Expense } from '@/lib/types';

interface CategoryPieProps {
  expenses: Expense[];
}

const COLORS = ['#3b82f6', '#8b5cf6', '#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export default function CategoryPie({ expenses }: CategoryPieProps) {
  const chartData = useMemo(() => {
    const categoryTotals: Record<string, number> = {};
    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    })).sort((a, b) => b.value - a.value);
  }, [expenses]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-dark p-8 rounded-[32px] border border-white/5 flex flex-col h-[300px]"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Asset Allocation</h3>
        <span className="text-xs font-mono text-indigo-400">Total Diversification</span>
      </div>
      <div className="flex-1 w-full flex items-center justify-between">
        <div className="w-1/2 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip 
                 contentStyle={{ backgroundColor: '#0A0A0F', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                 itemStyle={{ color: '#fff' }}
              />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
                animationDuration={1500}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 pl-6 space-y-3">
          {chartData.slice(0, 4).map((item, index) => (
            <div key={item.name} className="flex justify-between items-center group">
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.name}</span>
               </div>
               <span className="text-[10px] text-white font-mono">${item.value.toFixed(0)}</span>
            </div>
          ))}
          {chartData.length > 4 && (
            <p className="text-[10px] text-gray-700 italic pt-1">+ {chartData.length - 4} other categories</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
