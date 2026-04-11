'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Summary from '@/components/Summary';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import AIAdvisor from '@/components/AIAdvisor';
import { getExpenses, getBudget } from '../actions';
import { LayoutDashboard, LogOut, Sparkles, TrendingUp, PieChart as PieIcon, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Expense } from '@/lib/types';
import Link from 'next/link';

// Dynamically import charts for hydration safety
const SpendingChart = dynamic(() => import('@/components/dashboard/SpendingChart'), { ssr: false });
const CategoryPie = dynamic(() => import('@/components/dashboard/CategoryPie'), { ssr: false });
const BudgetTracker = dynamic(() => import('@/components/dashboard/BudgetTracker'), { ssr: false });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
};

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState(1000);
  const [isLoading, setIsLoading] = useState(true);

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

  const total = expenses.reduce((acc: number, curr: Expense) => acc + curr.amount, 0);

  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-blue-500/30 overflow-x-hidden">

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-10"
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
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Expanse Intelligence v1.3.2</p>
             </div>
          </div>
          <Link href="/">
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white bg-white/5 px-4 py-2 rounded-xl border border-white/5 transition-all"
             >
               <LogOut size={14} /> Exit to Terminal
             </motion.button>
          </Link>
        </motion.header>

        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <motion.div variants={itemVariants} className="space-y-8">
              <Summary total={total} />
              <AIAdvisor expenses={expenses} />
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
              <SpendingChart expenses={expenses} />
           </motion.section>

           <motion.section variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-2 px-1 text-indigo-500">
                 <PieIcon size={14} />
                 <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Category Impact</h3>
              </div>
              <CategoryPie expenses={expenses} />
           </motion.section>
        </div>

        {/* History Section */}
        <motion.section variants={itemVariants}>
          <ExpenseList expenses={expenses} />
        </motion.section>

        {/* Add Transaction FAB/Modal */}
        <ExpenseForm onRefresh={refreshData} />

        {/* Footer */}
        <motion.footer variants={itemVariants} className="pt-20 pb-10 text-center">
          <p className="text-[10px] text-gray-800 font-bold uppercase tracking-[0.5em]">Secure Ledger Mode Active</p>
        </motion.footer>
      </motion.div>
    </main>
  );
}
