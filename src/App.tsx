/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Sparkles, 
  Layers, 
  Award, 
  CreditCard, 
  MessageSquare, 
  Monitor, 
  ChevronDown, 
  Flame, 
  ArrowRight,
  TrendingUp,
  Heart,
  X,
  Plus
} from 'lucide-react';
import { CardState, Transaction } from './types';
import PayBackCard from './components/PayBackCard';
import DesignLab from './components/DesignLab';
import ServiceCatalog from './components/ServiceCatalog';

const STORAGE_KEY_CARD = 'olly_graphic_card_state';
const STORAGE_KEY_TX = 'olly_graphic_transactions_state';

const DEFAULT_CARD: CardState = {
  holderName: 'OLLY GRAPHIC',
  cardNumber: '**** **** **** 1234',
  balance: 500.00,
  status: 'Active',
};

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-initial',
    type: 'deposit',
    amount: 500.00,
    description: 'Initial Pay Back Promotional Seeding',
    date: 'Jun 24, 2026',
  }
];

export default function App() {
  // Primary state managers
  const [card, setCard] = useState<CardState>(DEFAULT_CARD);
  const [transactions, setTransactions] = useState<Transaction[]>(DEFAULT_TRANSACTIONS);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [activePortfolioFilter, setActivePortfolioFilter] = useState<'all' | 'logos' | 'print' | 'digital'>('all');

  // Load from localStorage
  useEffect(() => {
    const savedCard = localStorage.getItem(STORAGE_KEY_CARD);
    const savedTx = localStorage.getItem(STORAGE_KEY_TX);
    
    if (savedCard) {
      try {
        setCard(JSON.parse(savedCard));
      } catch (e) {
        console.error('Error parsing card state', e);
      }
    }
    
    if (savedTx) {
      try {
        setTransactions(JSON.parse(savedTx));
      } catch (e) {
        console.error('Error parsing transactions state', e);
      }
    }
  }, []);

  // Save to localStorage
  const updateCardState = (updated: Partial<CardState>) => {
    setCard(prev => {
      const next = { ...prev, ...updated };
      localStorage.setItem(STORAGE_KEY_CARD, JSON.stringify(next));
      return next;
    });
  };

  const addTransaction = (type: 'deposit' | 'purchase' | 'cashback', amount: number, desc: string) => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type,
      amount,
      description: desc,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    setTransactions(prev => {
      const next = [newTx, ...prev];
      localStorage.setItem(STORAGE_KEY_TX, JSON.stringify(next));
      return next;
    });
  };

  const handlePurchase = (amount: number, description: string): boolean => {
    if (card.status === 'Frozen') return false;
    if (card.balance < amount) return false;

    // Deduct purchase amount
    const nextBalance = card.balance - amount;
    
    // Calculate 10% payback cashback
    const cashbackAmount = amount * 0.10;
    const finalBalance = nextBalance + cashbackAmount;

    // Apply state changes
    updateCardState({ balance: finalBalance });
    
    // Write transactions (both purchase and cashback reward!)
    addTransaction('purchase', amount, description);
    addTransaction('cashback', cashbackAmount, `10% Pay Back Reward: ${description.replace('Olly', '')}`);
    
    return true;
  };

  const handleReset = () => {
    setCard(DEFAULT_CARD);
    setTransactions(DEFAULT_TRANSACTIONS);
    localStorage.setItem(STORAGE_KEY_CARD, JSON.stringify(DEFAULT_CARD));
    localStorage.setItem(STORAGE_KEY_TX, JSON.stringify(DEFAULT_TRANSACTIONS));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Upper Top Ribbon Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-black py-2 px-4 text-center text-xs font-mono font-bold tracking-wider relative z-20 flex items-center justify-center gap-1.5 shadow-md">
        <Sparkles className="w-3.5 h-3.5 animate-spin" />
        <span>OLLY GRAPHIC PREMIER REWARDS PROGRAM ACTIVE - EARN 10% CASHBACK ON EVERY CREATIVE DESIGN PACKAGE</span>
      </div>

      {/* Luxury Navigation Header */}
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-zinc-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <Flame className="w-5 h-5 text-black animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-display font-black tracking-wider text-white flex items-center gap-1">
                OLLY <span className="metallic-gold-text">GRAPHIC</span>
              </h1>
              <p className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">Aesthetic Solutions</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-bold tracking-widest uppercase">
            <button 
              onClick={() => scrollToSection('portfolio-showcase')}
              className="text-zinc-400 hover:text-amber-400 transition-colors"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('design-lab-sec')}
              className="text-zinc-400 hover:text-amber-400 transition-colors"
            >
              Creative Sandbox
            </button>
            <button 
              onClick={() => scrollToSection('services-catalog')}
              className="text-zinc-400 hover:text-amber-400 transition-colors"
            >
              Our Services
            </button>
            <button 
              onClick={() => scrollToSection('payback-card-center')}
              className="text-zinc-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <CreditCard className="w-4 h-4 text-amber-500" />
              Pay Back Card
            </button>
          </nav>

          {/* Right Header Status Bar */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[9px] font-mono text-zinc-500 uppercase">Card balance</p>
              <p className="text-sm font-mono font-bold text-amber-400">${card.balance.toFixed(2)}</p>
            </div>
            
            <button
              onClick={() => scrollToSection('payback-card-center')}
              className="bg-zinc-900 border border-zinc-800 text-xs font-bold font-mono py-2 px-3.5 rounded-lg text-zinc-300 hover:text-white hover:border-zinc-700 flex items-center gap-1.5 transition-all"
            >
              <span className={`w-2 h-2 rounded-full ${card.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
              Card: {card.status}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden border-b border-zinc-900">
        {/* Ambient background glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-600/5 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Tag badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono font-semibold tracking-wider text-amber-400 uppercase mb-6"
          >
            <Award className="w-3.5 h-3.5" /> High-Performance Design Laboratory
          </motion.div>

          {/* Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white uppercase leading-tight"
          >
            Professional Graphic<br />
            <span className="metallic-gold-text">Design Services</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-zinc-400 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Logos, Flyers, Branding, Printing & Digital Marketing. We craft distinctive visual assets built with high-fidelity creative layouts, pristine spacing, and luxury brand engineering.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <button
              onClick={() => {
                setShowWelcomeModal(true);
                scrollToSection('design-lab-sec');
              }}
              id="btn-get-started"
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold bg-amber-500 hover:bg-amber-400 text-black rounded-xl shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection('services-catalog')}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl flex items-center justify-center gap-1.5 transition-all"
            >
              <Palette className="w-4 h-4 text-amber-500" /> Explore Packages
            </button>

            <button
              onClick={() => scrollToSection('payback-card-sec')}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-amber-400 rounded-xl flex items-center justify-center gap-1.5 transition-all"
            >
              <CreditCard className="w-4 h-4" /> Pay Back Card
            </button>
          </motion.div>

          {/* Floating mouse indicator */}
          <div className="mt-16 flex justify-center">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              onClick={() => scrollToSection('portfolio-showcase')}
              className="cursor-pointer p-1.5 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-white hover:border-zinc-700"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        
        {/* PORTFOLIO GRID SHOWCASE */}
        <section id="portfolio-showcase" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 pb-4 border-b border-zinc-900">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                Curated Design Showcase
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                Olly Studio Portfolios
              </h2>
            </div>
            
            {/* Filter tags */}
            <div className="flex flex-wrap gap-1 bg-zinc-900/60 border border-zinc-850 p-1 rounded-xl">
              {(['all', 'logos', 'print', 'digital'] as const).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActivePortfolioFilter(tag)}
                  className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg transition-all capitalize ${
                    activePortfolioFilter === tag
                      ? 'bg-amber-500 text-black font-semibold shadow-md'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Logo sample card */}
            {(activePortfolioFilter === 'all' || activePortfolioFilter === 'logos') && (
              <motion.div 
                layout
                className="group relative rounded-2xl border border-zinc-850 bg-zinc-900/30 overflow-hidden min-h-[280px] p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all"
              >
                <div className="w-full h-32 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-850 group-hover:bg-zinc-900 transition-all relative">
                  {/* Real visual CSS logo draft */}
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border-2 border-amber-400 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="font-display font-bold text-white text-lg tracking-wider">AURA</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
                    <span>Aura Wellness Studio</span>
                    <span className="text-amber-500">Branding</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">Minimalist Logo Guidelines</h3>
                  <p className="text-xs text-zinc-400 mt-1">High-end clean geometry corporate mark.</p>
                </div>
              </motion.div>
            )}

            {/* Print sample card */}
            {(activePortfolioFilter === 'all' || activePortfolioFilter === 'print') && (
              <motion.div 
                layout
                className="group relative rounded-2xl border border-zinc-850 bg-zinc-900/30 overflow-hidden min-h-[280px] p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all"
              >
                <div className="w-full h-32 rounded-xl bg-zinc-950 flex flex-col items-center justify-center border border-zinc-850 group-hover:bg-zinc-900 transition-all relative p-4 text-center">
                  <div className="text-amber-500 font-mono text-[9px] border border-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-widest">
                    RESONANCE CO.
                  </div>
                  <div className="text-xs font-display font-black text-white uppercase tracking-tight mt-2 leading-none">
                    Corporate Annual Gala
                  </div>
                  <div className="text-[7px] text-zinc-500 font-mono mt-1">
                    DECEMBER 2026 • NEW YORK METRO
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
                    <span>Resonance Event Co.</span>
                    <span className="text-amber-500">Print Flyer</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">Premium Promotional Flyer</h3>
                  <p className="text-xs text-zinc-400 mt-1">Gold-embossed editorial typography treatment.</p>
                </div>
              </motion.div>
            )}

            {/* Digital sample card */}
            {(activePortfolioFilter === 'all' || activePortfolioFilter === 'digital') && (
              <motion.div 
                layout
                className="group relative rounded-2xl border border-zinc-850 bg-zinc-900/30 overflow-hidden min-h-[280px] p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all"
              >
                <div className="w-full h-32 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-850 group-hover:bg-zinc-900 transition-all relative">
                  <div className="w-24 h-16 rounded-lg bg-gradient-to-tr from-zinc-900 via-zinc-950 to-zinc-900 p-2.5 border border-zinc-800 text-left flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                      <div className="w-5 h-1.5 rounded-full bg-zinc-800" />
                    </div>
                    <div className="space-y-1">
                      <div className="w-12 h-1.5 bg-amber-400/80 rounded" />
                      <div className="w-16 h-1 bg-zinc-800 rounded" />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
                    <span>Apex Mobile Inc.</span>
                    <span className="text-amber-500">Digital UI</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">Brand Identity Guidelines</h3>
                  <p className="text-xs text-zinc-400 mt-1">Cohesive layout structures across web & mobile assets.</p>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* INTERACTIVE DESIGN SANDBOX / LOGO LAB */}
        <section id="design-lab-sec" className="scroll-mt-24">
          <DesignLab card={card} onPurchase={handlePurchase} />
        </section>

        {/* SERVICES CATALOG & ESTIMATOR */}
        <section id="services-catalog" className="scroll-mt-24">
          <ServiceCatalog card={card} onPurchase={handlePurchase} />
        </section>

        {/* PAY BACK CARD CENTER */}
        <section id="payback-card-sec" className="scroll-mt-24 border-t border-zinc-900 pt-16">
          <div className="mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
              LOYALTY AND CREDITS
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              Premium Pay Back Hub
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Synchronized real-time ledger accounting. Track balances, deposit mock funds, and freeze/unfreeze card permissions.
            </p>
          </div>

          <PayBackCard 
            card={card}
            onUpdateCard={updateCardState}
            transactions={transactions}
            onAddTransaction={addTransaction}
            onResetCard={handleReset}
          />
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
              <Flame className="w-4 h-4 text-black" />
            </div>
            <div>
              <p className="text-sm font-display font-black text-white">OLLY GRAPHIC</p>
              <p className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">Creative Graphic Solutions</p>
            </div>
          </div>

          <p className="text-xs text-zinc-500 font-mono text-center md:text-right leading-relaxed">
            &copy; 2026 OLLY GRAPHIC. All Rights Reserved.<br />
            <span className="text-[10px] text-zinc-600 flex items-center justify-center md:justify-end gap-1 mt-0.5">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for elite creative marketing.
            </span>
          </p>
        </div>
      </footer>

      {/* Welcome Custom Modal (Replaces the ugly PHP template alert) */}
      <AnimatePresence>
        {showWelcomeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-zinc-900 border-2 border-amber-500/20 rounded-3xl w-full max-w-md p-6 lg:p-8 relative shadow-2xl overflow-hidden"
            >
              {/* Corner decorative borders */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial-gradient opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, #f59e0b 0%, transparent 70%)` }} />
              
              <button
                onClick={() => setShowWelcomeModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all border border-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Sparkles className="w-6 h-6 text-black" />
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-mono tracking-widest text-amber-400 font-bold uppercase">Welcome to Olly Graphic Studio</p>
                  <h3 className="text-2xl font-display font-black text-white uppercase">Brand Design Sandbox</h3>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed px-2">
                  Welcome to the ultimate playground for elite graphics. We've converted the standard PHP template into a live interactive vector design machine!
                </p>

                <div className="p-3.5 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2 text-left">
                  <h4 className="text-[10px] font-mono tracking-wider font-bold text-amber-500 uppercase">Your Sandbox Account Checklist:</h4>
                  <ul className="space-y-1.5 text-[11px] text-zinc-300">
                    <li className="flex items-center gap-1.5">
                      <span className="text-amber-500 font-bold">✓</span>
                      <span>Default Cardholder Name: <strong className="text-white">OLLY GRAPHIC</strong></span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-amber-500 font-bold">✓</span>
                      <span>Card Balance loaded: <strong className="text-white">$500.00</strong></span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-amber-500 font-bold">✓</span>
                      <span>Instant Cashbacks: <strong className="text-amber-400">10% rebate automatically credited</strong></span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setShowWelcomeModal(false)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black transition-all shadow-md shadow-amber-950/20"
                >
                  Enter Visual Workshop
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
