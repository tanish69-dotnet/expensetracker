'use client';

import React, { useState, useTransition } from 'react';
import { PlusCircle, Loader2, DollarSign, Tag, Calendar, X } from 'lucide-react';
import { addExpense } from '../app/actions';
import { Category } from '../lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExpenseForm({ onRefresh }: { onRefresh?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    startTransition(async () => {
      await addExpense({
        amount: Number(amount),
        category,
        date,
      });
      setAmount('');
      setIsOpen(false);
      onRefresh?.();
    });
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 z-50 p-6 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center group"
      >
        <PlusCircle size={32} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 whitespace-nowrap font-black uppercase tracking-widest text-xs">Add Transaction</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl p-10 rounded-[48px] glass shadow-2xl space-y-8"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white"><X size={24} /></button>
              
              <div className="space-y-2">
                 <h2 className="text-3xl font-black text-white tracking-tight">Post Transaction</h2>
                 <p className="text-gray-500 font-medium">Add liquidity drift or recurring expenditure.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  {/* Amount */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Amount</label>
                    <div className="relative group">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-500"><DollarSign size={20} /></div>
                      <input
                        type="number"
                        step="0.01"
                        required
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-14 pr-6 py-6 bg-white/5 border border-white/10 rounded-3xl text-2xl font-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {/* Category */}
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Category</label>
                      <div className="relative">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-500"><Tag size={18} /></div>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as Category)}
                          className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-3xl text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold"
                        >
                          {['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Travel', 'Health', 'Other'].map((cat) => (
                            <option key={cat} value={cat} className="bg-[#0A0A0F] text-white">{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Date</label>
                      <div className="relative">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-violet-500"><Calendar size={18} /></div>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-3xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all font-bold [color-scheme:dark]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isPending}
                  className="w-full py-6 bg-blue-600 text-white font-black uppercase tracking-[0.2em] rounded-3xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isPending ? <Loader2 className="animate-spin" size={24} /> : <>Commit Record <PlusCircle size={20} /></>}
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
