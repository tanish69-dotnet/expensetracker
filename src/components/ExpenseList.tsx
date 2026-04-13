'use client';

import React, { useTransition, useState, useMemo } from 'react';
import { Trash2, Search, Filter, Clock, TrendingUp, TrendingDown, Layers, Calendar, ChevronDown } from 'lucide-react';
import { deleteExpense } from '../app/actions';
import { Expense, Category } from '../lib/types';
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
    default: return '📦';
  }
};

export default function ExpenseList({ expenses }: ExpenseListProps) {
  const [isPending, startTransition] = useTransition();
  const [sortOption, setSortOption] = useState<SortOption>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Other'];

  const filteredAndSortedExpenses = useMemo(() => {
    let result = [...expenses];

    // Filter by Search
    if (searchQuery) {
      result = result.filter(e => 
        e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.amount.toString().includes(searchQuery)
      );
    }

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(e => e.category === selectedCategory);
    }

    // Sort
    if (sortOption === 'highest') result.sort((a, b) => b.amount - a.amount);
    else if (sortOption === 'lowest') result.sort((a, b) => a.amount - b.amount);
    else result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return result;
  }, [expenses, searchQuery, selectedCategory, sortOption]);

  const handleDelete = async (id: string) => {
    if (confirm('Delete transaction record?')) {
      startTransition(async () => {
        await deleteExpense(id);
      });
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center px-1">
        <div className="flex-1 w-full max-w-md relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={16} />
          <input 
            type="text"
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-xs font-mono text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white/5 border border-white/5 rounded-2xl py-3 pl-4 pr-10 text-xs font-black uppercase tracking-widest text-gray-400 focus:outline-none hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={12} />
          </div>

          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
            {[
              { id: 'latest', icon: Clock, label: 'Time' },
              { id: 'highest', icon: TrendingUp, label: 'Value' },
              { id: 'lowest', icon: TrendingDown, label: 'Low' }
            ].map(opt => (
              <button 
                key={opt.id}
                onClick={() => setSortOption(opt.id as SortOption)}
                className={`flex items-center gap-2 p-2 px-3 rounded-xl transition-all ${
                  sortOption === opt.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-600 hover:text-white'
                }`}
              >
                <opt.icon size={14} />
                <span className="text-[10px] font-black uppercase tracking-tighter hidden sm:inline">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List Content */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredAndSortedExpenses.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 glass-dark rounded-[32px] border border-white/5 border-dashed"
            >
              <Layers className="mx-auto text-gray-800 mb-4" size={40} strokeWidth={1} />
              <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">No matching flow entries found</p>
            </motion.div>
          ) : (
            filteredAndSortedExpenses.map((expense) => (
              <motion.div
                layout
                key={expense.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ x: 4 }}
                className="group flex items-center justify-between p-5 glass-dark rounded-[24px] border border-white/5 hover:border-white/10 transition-all hover-glow"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
                    {getCategoryIcon(expense.category)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                      {expense.category}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={10} className="text-gray-700" />
                      <p className="text-[9px] text-gray-600 font-mono font-black uppercase">
                        {new Date(expense.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-xl font-black text-white tracking-tighter group-hover:text-blue-400 transition-colors">
                      <span className="text-[10px] text-blue-500 mr-0.5 font-bold">$</span>
                      {expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <p className="text-[8px] text-gray-700 font-mono tracking-tighter uppercase mt-0.5">HX_{expense.id.slice(-4).toUpperCase()}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, color: "#ef4444" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(expense.id)}
                    disabled={isPending}
                    className="p-3 text-gray-700 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
