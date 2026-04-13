'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Command, Search, Plus, Trash2, Zap, Settings, X, ChevronRight } from 'lucide-react';

interface CommandAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  category: string;
  perform: () => void;
}

export default function GSDCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions: CommandAction[] = [
    { 
      id: 'add', 
      label: 'Add New Transaction', 
      icon: <Plus size={16} />, 
      shortcut: 'N', 
      category: 'Actions',
      perform: () => {
        // Trigger the Add form - for now we'll just log
        console.log('Opening Add Form...');
        setIsOpen(false);
      }
    },
    { 
      id: 'audit', 
      label: 'Run System Audit', 
      icon: <Zap size={16} />, 
      shortcut: 'A', 
      category: 'Intelligence',
      perform: () => {
        window.scrollTo({ top: 300, behavior: 'smooth' });
        setIsOpen(false);
      }
    },
    { 
      id: 'clear', 
      label: 'Purge Ledger Data', 
      icon: <Trash2 size={16} />, 
      shortcut: 'P', 
      category: 'System',
      perform: () => {
        if (confirm('Are you sure you want to purge all transaction data?')) {
          localStorage.clear();
          window.location.reload();
        }
      }
    },
    { 
      id: 'gsd', 
      label: 'Toggle GSD Mode', 
      icon: <Terminal size={16} />, 
      shortcut: 'G', 
      category: 'Intelligence',
      perform: () => {
        document.body.classList.toggle('gsd-mode');
        setIsOpen(false);
      }
    }
  ];

  const filteredActions = actions.filter(a => 
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggle]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-[#0A0A0F] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
          <Command size={18} className="text-gray-500" />
          <input
            autoFocus
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-white outline-none font-mono text-sm"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <div className="flex items-center gap-1.5">
             <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-gray-500">ESC</span>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4">
          {filteredActions.length > 0 ? (
            <div className="space-y-1">
              {filteredActions.map((action, i) => (
                <button
                  key={action.id}
                  onClick={action.perform}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    i === selectedIndex ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {action.icon}
                    <span className="text-sm font-bold font-mono tracking-tighter">{action.label}</span>
                  </div>
                  {action.shortcut && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      i === selectedIndex ? 'bg-blue-500 text-white' : 'bg-white/5 border border-white/10'
                    }`}>
                      {action.shortcut}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
               <X className="mx-auto text-gray-800 mb-2" size={24} />
               <p className="text-xs font-mono text-gray-600">No agentic actions found for "{query}"</p>
            </div>
          )}
        </div>

        {/* Footer HUD */}
        <div className="px-6 py-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Agent Active</span>
              </div>
              <div className="h-3 w-px bg-white/10"></div>
              <span className="text-[9px] font-mono text-gray-700 uppercase tracking-widest">Ver 1.4.2-GSD</span>
           </div>
           
           <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500">
              <ChevronRight size={10} /> SELECT
           </div>
        </div>
      </motion.div>
    </div>
  );
}
