'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import AIAdvisor from '@/components/AIAdvisor';
import { getExpenses, getBudget, resetData } from '../actions';
import { LayoutDashboard, LogOut, Sparkles, TrendingUp, PieChart as PieIcon, RefreshCw, Filter } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Expense } from '@/lib/types';
import Link from 'next/link';
import Summary from '@/components/Summary';

// Dynamically import charts for hydration safety
const SpendingChart = dynamic(() => import('@/components/dashboard/SpendingChart'), { ssr: false });
const CategoryPie = dynamic(() => import('@/components/dashboard/CategoryPie'), { ssr: false });
const BudgetTracker = dynamic(() => import('@/components/dashboard/BudgetTracker'), { ssr: false });

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState(1000);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'Today' | 'Week' | 'Month'>('Month');

  const refreshData = async () => {
    const [expensesData, budgetData] = await Promise.all([
      getExpenses(),
      getBudget()
    ]);
    setExpenses(expensesData);
    setBudget(budgetData);
  };

  useEffect(() => {
    refreshData().then(() => setIsLoading(false));
  }, []);

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset all financial data?')) {
      await resetData();
      await refreshData();
    }
  };

  const filteredExpenses = React.useMemo(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    return expenses.filter(e => {
      if (filter === 'Today') return e.date === today;
      if (filter === 'Week') return e.date >= sevenDaysAgo;
      return true; // Month (all in the current fetch context)
    });
  }, [expenses, filter]);

  const total = filteredExpenses.reduce((acc: number, curr: Expense) => acc + curr.amount, 0);

  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-blue-500/30">

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-16"
      >
        {/* Header */}
        <motion.header variants={itemVariants} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-blue-600 rounded-2xl shadow-xl shadow-blue-600/20">
                <LayoutDashboard className="text-white" size={24} strokeWidth={2.5} />
             </div>
             <div>
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                   Strategic Dashboard
                   <Sparkles className="text-blue-400" size={16} />
                </h2>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Expanse Intelligence v2.4.1</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={handleReset}
               className="p-2.5 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all"
             >
               <RefreshCw size={16} />
             </motion.button>
             <Link href="/">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white bg-white/5 px-4 py-2 rounded-xl border border-white/5 transition-all"
                >
                  <LogOut size={14} /> Exit
                </motion.button>
             </Link>
          </div>
        </motion.header>

        {/* Time Filter Toggle */}
        <motion.div variants={itemVariants} className="flex items-center justify-center">
           <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
              {(['Today', 'Week', 'Month'] as const).map(option => (
                <button
                  key={option}
                  onClick={() => setFilter(option)}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    filter === option ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
           </div>
        </motion.div>

        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <motion.div variants={itemVariants} className="space-y-8">
              <Summary total={total} />
              <AIAdvisor expenses={filteredExpenses} />
           </motion.div>
           
           <motion.div variants={itemVariants}>
              <BudgetTracker totalSpent={total} budget={budget} />
           </motion.div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <motion.section variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                 <TrendingUp size={14} className="text-blue-500" />
                 <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Spending Trends</h3>
              </div>
              <SpendingChart expenses={filteredExpenses} />
           </motion.section>

           <motion.section variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-2 px-1 text-indigo-500">
                 <PieIcon size={14} />
                 <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Category Impact</h3>
              </div>
              <CategoryPie expenses={filteredExpenses} />
           </motion.section>
        </div>

        {/* History Section */}
        <motion.section variants={itemVariants}>
          <ExpenseList expenses={expenses} />
        </motion.section>

        {/* Add Transaction FAB/Modal */}
        <ExpenseForm onRefresh={refreshData} />
      </motion.div>
    </main>
  );
}
