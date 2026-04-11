'use client';

import React, { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, AlertCircle, CheckCircle, Edit3, X, DollarSign, Loader2 } from 'lucide-react';
import { updateBudget } from '@/app/actions';

interface BudgetTrackerProps {
  totalSpent: number;
  budget: number;
}

export default function BudgetTracker({ totalSpent, budget }: BudgetTrackerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBudget, setNewBudget] = useState(budget.toString());
  const [isPending, startTransition] = useTransition();

  const percentUsed = Math.min((totalSpent / budget) * 100, 100);
  
  const getStatusColor = () => {
    if (percentUsed > 90) return { text: 'text-red-500', bg: 'bg-red-500', glow: 'shadow-red-500/50', icon: <AlertCircle size={16} /> };
    if (percentUsed > 70) return { text: 'text-amber-500', bg: 'bg-amber-500', glow: 'shadow-amber-500/50', icon: <AlertCircle size={16} /> };
    return { text: 'text-emerald-500', bg: 'bg-emerald-500', glow: 'shadow-emerald-500/50', icon: <CheckCircle size={16} /> };
  };

  const status = getStatusColor();

  const handleUpdateBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBudget || isNaN(Number(newBudget))) return;

    startTransition(async () => {
      await updateBudget(Number(newBudget));
      setIsModalOpen(false);
    });
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-dark p-8 rounded-[32px] border border-white/5 space-y-6 group relative overflow-hidden"
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 text-blue-400">
              <Target size={20} />
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Budget Outlook</h3>
               <p className="text-[10px] text-gray-700 font-mono tracking-tighter uppercase mt-0.5">Active Target: ${budget.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest ${status.text}`}>
               {status.icon}
               {percentUsed > 90 ? 'Critical' : percentUsed > 70 ? 'Warning' : 'Healthy'}
            </div>
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsModalOpen(true)}
              className="p-2 text-gray-600 hover:text-white rounded-lg transition-colors border border-white/5"
            >
              <Edit3 size={14} />
            </motion.button>
          </div>
        </div>

        <div className="space-y-3">
           <div className="flex justify-between items-end">
              <h4 className="text-3xl font-black text-white tracking-tighter">
                {percentUsed.toFixed(0)}<span className="text-lg text-gray-600 font-bold ml-0.5">%</span>
                <span className="text-xs text-gray-700 ml-2 font-medium tracking-normal lowercase italic">of monthly liquidity used</span>
              </h4>
              <p className="text-xs font-mono text-gray-500">${totalSpent.toFixed(0)} / ${budget}</p>
           </div>

           <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentUsed}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`h-full ${status.bg} shadow-[0_0_15px] ${status.glow} shine-effect`}
              ></motion.div>
           </div>
           
           <div className="flex justify-between pt-1">
              <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">Efficiency threshold</span>
              <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">Risk zone</span>
           </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm p-8 rounded-[40px] glass shadow-2xl space-y-6 border border-white/10"
            >
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-6 right-6 text-gray-500 hover:text-white"
              >
                <X size={20} />
              </button>
              
              <div className="space-y-2">
                 <h2 className="text-xl font-black text-white tracking-tight italic flex items-center gap-2">
                    <Target className="text-blue-500" size={20} />
                    Set Monthly Target
                 </h2>
                 <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest leading-relaxed">
                    Adjust your tactical liquidity limit for the current operational cycle.
                 </p>
              </div>

              <form onSubmit={handleUpdateBudget} className="space-y-6">
                <div className="space-y-3">
                  <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-500"><DollarSign size={18} /></div>
                    <input
                      type="number"
                      step="1"
                      required
                      placeholder="Enter amount"
                      value={newBudget}
                      onChange={(e) => setNewBudget(e.target.value)}
                      autoFocus
                      className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-mono"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.9)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 bg-blue-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-50 text-xs"
                >
                  {isPending ? <Loader2 className="animate-spin" size={18} /> : <>Update Target <CheckCircle size={16} /></>}
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
