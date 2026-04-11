'use client';

import React, { useTransition, useState, useMemo } from 'react';
import { Trash2, ShoppingBag, Calendar, CreditCard, Layers, Filter, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { deleteExpense } from '../app/actions';
import { Expense } from '../lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpenseListProps {
  expenses: Expense[];
}

type SortOption = 'latest' | 'highest' | 'lowest';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Food': return '🍔';
    case 'Travel': return '✈️';
    case 'Bills': return '💡';
    case 'Shopping': return '🛍️';
    case 'Entertainment': return '🎮';
    case 'Transport': return '🚗';
    case 'Health': return '🏥';
    default: return '📦';
  }
};

export default function ExpenseList({ expenses }: ExpenseListProps) {
  const [isPending, startTransition] = useTransition();
  const [sortOption, setSortOption] = useState<SortOption>('latest');

  const sortedExpenses = useMemo(() => {
    const list = [...expenses];
    if (sortOption === 'highest') return list.sort((a, b) => b.amount - a.amount);
    if (sortOption === 'lowest') return list.sort((a, b) => a.amount - b.amount);
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses, sortOption]);

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      await deleteExpense(id);
    });
  };

  if (expenses.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center py-20 glass-dark rounded-[48px] border border-white/5 border-dashed"
      >
        <Layers className="mx-auto text-gray-700 mb-4" size={48} strokeWidth={1} />
        <p className="text-gray-500 font-medium tracking-wide">No crypto-asset flows detected.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 pb-32">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">Transaction History</h3>
        
        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
           <button 
             onClick={() => setSortOption('latest')}
             className={`p-2 rounded-xl transition-all ${sortOption === 'latest' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:text-white'}`}
             title="Latest First"
           >
             <Clock size={14} />
           </button>
           <button 
             onClick={() => setSortOption('highest')}
             className={`p-2 rounded-xl transition-all ${sortOption === 'highest' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:text-white'}`}
             title="Highest Amount"
           >
             <TrendingUp size={14} />
           </button>
           <button 
             onClick={() => setSortOption('lowest')}
             className={`p-2 rounded-xl transition-all ${sortOption === 'lowest' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:text-white'}`}
             title="Lowest Amount"
           >
             <TrendingDown size={14} />
           </button>
        </div>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {sortedExpenses.map((expense) => (
            <motion.div
              layout
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -30, transition: { duration: 0.2 } }}
              whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.03)" }}
              className="group flex items-center justify-between p-6 glass-dark rounded-[32px] border border-white/5 transition-all outline-none"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-xl">
                  {getCategoryIcon(expense.category)}
                </div>
                <div>
                  <h4 className="text-lg font-black text-white/90 group-hover:text-white transition-colors tracking-tight">
                    {expense.category}
                  </h4>
                  <p className="text-[10px] text-gray-600 flex items-center gap-2 mt-1 font-black uppercase tracking-widest font-mono">
                    {new Date(expense.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <span className="text-2xl font-black text-white tracking-tighter">
                    <span className="text-xs text-blue-500 mr-1 font-bold italic">$</span>
                    {expense.amount.toFixed(2)}
                  </span>
                  <p className="text-[10px] text-gray-700 font-mono tracking-tighter uppercase mt-0.5">Asset Flow ID: {expense.id.slice(0, 6)}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, color: "#ef4444" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(expense.id)}
                  disabled={isPending}
                  className="p-3 text-gray-700 hover:bg-red-500/10 rounded-2xl transition-all"
                >
                  <Trash2 size={20} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
