'use client';

import React from 'react';
import Hero from '@/components/landing/Hero';
import AnalyticsPreview from '@/components/landing/AnalyticsPreview';
import Features from '@/components/landing/Features';
import CTASection from '@/components/landing/CTASection';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-blue-500/30 overflow-x-hidden">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <Hero />

          {/* Analytics Preview Section */}
          <AnalyticsPreview />

          {/* Features Section */}
          <Features />

          {/* CTA Section */}
          <CTASection />

          {/* Minimal Footer */}
          <footer className="py-20 border-t border-white/5 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <span className="text-xl font-black tracking-tighter">Expanse</span>
            </div>
            <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.5em]">
              © 2026 EXPANSE INTELLIGENCE. ALL RIGHTS RESERVED.
            </p>
          </footer>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
