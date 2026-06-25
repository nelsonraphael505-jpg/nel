/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  PlusCircle, 
  Lock, 
  Unlock, 
  Edit3, 
  RefreshCw, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Sparkles,
  TrendingUp,
  Coins
} from 'lucide-react';
import { CardState, Transaction } from '../types';

interface PayBackCardProps {
  card: CardState;
  onUpdateCard: (updated: Partial<CardState>) => void;
  transactions: Transaction[];
  onAddTransaction: (type: 'deposit' | 'purchase' | 'cashback', amount: number, desc: string) => void;
  onResetCard: () => void;
}

export default function PayBackCard({
  card,
  onUpdateCard,
  transactions,
  onAddTransaction,
  onResetCard,
}: PayBackCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(card.holderName);
  const [editNumber, setEditNumber] = useState(card.cardNumber);
  const [depositAmount, setDepositAmount] = useState('100');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      showFeedback('Holder name cannot be empty', 'error');
      return;
    }
    // Clean card number format
    let cleanNum = editNumber.trim();
    if (cleanNum.length < 4) {
      showFeedback('Card number too short', 'error');
      return;
    }
    onUpdateCard({
      holderName: editName.toUpperCase(),
      cardNumber: cleanNum,
    });
    setIsEditing(false);
    showFeedback('Card details updated successfully!', 'success');
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      showFeedback('Please enter a valid amount to deposit.', 'error');
      return;
    }
    
    if (card.status === 'Frozen') {
      showFeedback('Cannot deposit funds into a frozen card.', 'error');
      return;
    }

    onUpdateCard({ balance: card.balance + amount });
    onAddTransaction('deposit', amount, 'Self-Funded Top Up');
    setShowDepositModal(false);
    showFeedback(`Successfully deposited $${amount.toFixed(2)}`, 'success');
  };

  const handleToggleStatus = () => {
    const nextStatus = card.status === 'Active' ? 'Frozen' : 'Active';
    onUpdateCard({ status: nextStatus });
    showFeedback(
      nextStatus === 'Frozen' 
        ? 'Card has been FROZEN. All purchases disabled.' 
        : 'Card has been ACTIVATED.',
      nextStatus === 'Frozen' ? 'error' : 'success'
    );
  };

  const showFeedback = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3500);
  };

  // Helper to format credit card numbers nicely
  const formatCardNumber = (num: string) => {
    const cleaned = num.replace(/\s+/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  return (
    <div id="payback-card-center" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-12">
      {/* 3D Gold Metal Card Visual Frame */}
      <div className="lg:col-span-5 flex flex-col items-center">
        <h3 className="text-xl font-display font-semibold text-white mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          Interactive Pay Back Card
        </h3>

        {/* Dynamic Flip Card Container */}
        <div 
          className="relative w-full max-w-[380px] h-[230px] cursor-pointer group perspective-1000"
          onClick={() => setIsFlipped(!isFlipped)}
          title="Click to flip card"
        >
          <motion.div 
            className="w-full h-full duration-700 preserve-3d relative"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* FRONT OF THE CARD */}
            <div className={`absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between text-black backface-hidden shadow-2xl metallic-gold border border-amber-300/30 overflow-hidden ${isFlipped ? 'pointer-events-none' : ''}`}>
              {/* Brushed metal overlay line */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/10 opacity-60 pointer-events-none" />
              
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-amber-950/70 font-semibold uppercase">OLLY GRAPHIC</p>
                  <p className="text-xs font-bold tracking-tight text-amber-900 flex items-center gap-1 mt-0.5">
                    <Coins className="w-3.5 h-3.5" />
                    PREMIUM PAYBACK
                  </p>
                </div>
                
                {/* Contactless + Chip mockup */}
                <div className="flex gap-3 items-center">
                  {/* Contactless wave */}
                  <svg className="w-5 h-5 text-amber-900/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 17.5c1-1.5 1-3.5 0-5M8 20c2.5-3 2.5-7 0-10M11 22c4-4.5 4-11.5 0-16" strokeLinecap="round" />
                  </svg>
                  {/* Hologram Circle */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 via-amber-200 to-amber-600 border border-amber-400/40 shadow-inner" />
                </div>
              </div>

              {/* Gold Chip */}
              <div className="relative z-10 my-1">
                <div className="w-10 h-8 rounded bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border border-amber-600/30 flex flex-col justify-around p-1 shadow-md">
                  <div className="h-[1px] bg-amber-800/20" />
                  <div className="h-[1px] bg-amber-800/20" />
                  <div className="flex justify-between">
                    <div className="w-[1px] h-3 bg-amber-800/20" />
                    <div className="w-[1px] h-3 bg-amber-800/20" />
                  </div>
                </div>
              </div>

              {/* Card Number */}
              <div className="relative z-10">
                <p className="text-lg font-mono tracking-wider text-amber-950 font-bold drop-shadow-sm">
                  {formatCardNumber(card.cardNumber)}
                </p>
              </div>

              {/* Card Holder & Balance & Status */}
              <div className="flex justify-between items-end relative z-10">
                <div className="max-w-[190px]">
                  <p className="text-[9px] font-mono tracking-wider text-amber-950/60 uppercase">CARDHOLDER</p>
                  <p className="text-sm font-semibold tracking-tight text-amber-950 truncate font-display">
                    {card.holderName || "OLLY GRAPHIC"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-mono tracking-wider text-amber-950/60 uppercase">CARD BALANCE</p>
                  <p className="text-base font-bold text-amber-950 font-mono">
                    ${card.balance.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-mono tracking-wider text-amber-950/60 uppercase text-center">STATUS</p>
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    card.status === 'Active' 
                      ? 'bg-emerald-950/20 text-emerald-950 border-emerald-900/30' 
                      : 'bg-red-950/20 text-red-950 border-red-900/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${card.status === 'Active' ? 'bg-emerald-600 animate-pulse' : 'bg-red-600'}`} />
                    {card.status}
                  </span>
                </div>
              </div>
            </div>

            {/* BACK OF THE CARD */}
            <div className={`absolute inset-0 w-full h-full rounded-2xl flex flex-col justify-between text-black backface-hidden shadow-2xl metallic-gold border border-amber-300/30 rotateY-180 overflow-hidden ${!isFlipped ? 'pointer-events-none' : ''}`}>
              {/* Magnetic Strip */}
              <div className="w-full h-10 bg-zinc-900 mt-5 opacity-90" />
              
              {/* Signature panel */}
              <div className="px-6 py-1">
                <div className="flex items-center">
                  <div className="bg-white/80 h-8 w-[220px] rounded-l px-2 flex items-center font-mono text-xs italic text-gray-500 line-through tracking-wider">
                    Authorized Signature - Not Transferable
                  </div>
                  <div className="bg-amber-100 h-8 w-[50px] rounded-r flex items-center justify-center font-mono text-xs font-bold text-black border-l border-amber-300">
                    321
                  </div>
                  <div className="ml-3 text-[9px] font-mono text-amber-950/70 font-bold">CVV</div>
                </div>
              </div>

              {/* Info text & copyright */}
              <div className="px-6 pb-6 text-amber-950/80 font-mono text-[8px] leading-relaxed">
                <p>OLLY GRAPHIC Reward and Pay Back system remains property of Olly Graphic Design Studio. Subject to member terms and conditions. If found, please return to any authorized office.</p>
                <div className="flex justify-between items-center mt-3 border-t border-amber-900/20 pt-1.5">
                  <span>Customer Service: support@ollygraphic.co</span>
                  <span className="font-bold">EST. 2026</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tip text to flip */}
        <p className="text-xs text-zinc-400 mt-3 text-center italic hover:text-zinc-300 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
          💡 Tip: Click on the card to flip and view the reverse details.
        </p>

        {/* Action Controls Panel */}
        <div className="w-full max-w-[380px] grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={handleToggleStatus}
            id="btn-freeze-card"
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md ${
              card.status === 'Active'
                ? 'bg-zinc-800 hover:bg-red-950/30 hover:text-red-400 hover:border-red-800/40 border border-zinc-700 text-zinc-300'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20'
            }`}
          >
            {card.status === 'Active' ? (
              <>
                <Lock className="w-4 h-4" /> Freeze Card
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4" /> Unfreeze Card
              </>
            )}
          </button>

          <button
            onClick={() => setShowDepositModal(true)}
            id="btn-deposit-card"
            disabled={card.status === 'Frozen'}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-950/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <PlusCircle className="w-4 h-4" /> Top Up Balance
          </button>

          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setEditName(card.holderName);
              setEditNumber(card.cardNumber);
            }}
            id="btn-edit-details"
            className="col-span-2 flex items-center justify-center gap-2 px-4 py-2 border border-zinc-700 bg-zinc-900/60 text-zinc-300 rounded-lg text-sm font-semibold hover:bg-zinc-800 hover:text-white transition-all"
          >
            <Edit3 className="w-4 h-4 text-amber-500" />
            {isEditing ? 'Close Editor' : 'Edit Cardholder Info'}
          </button>
        </div>

        {/* Reset system */}
        <button
          onClick={onResetCard}
          className="mt-4 text-xs text-zinc-500 hover:text-zinc-400 underline underline-offset-4 flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Reset Card to Initial PHP State
        </button>

        {/* Card details editor form */}
        <AnimatePresence>
          {isEditing && (
            <motion.form 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSaveDetails}
              className="w-full max-w-[380px] mt-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3"
            >
              <h4 className="text-xs font-mono tracking-wider text-amber-400 font-bold uppercase">Update Pay Back Card</h4>
              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1">Card Holder Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 uppercase"
                  placeholder="e.g. OLLY GRAPHIC"
                  maxLength={25}
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1">Card Number (16 Digits/Obfuscated)</label>
                <input
                  type="text"
                  value={editNumber}
                  onChange={(e) => setEditNumber(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                  placeholder="e.g. **** **** **** 1234"
                  maxLength={19}
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-1 px-3 rounded bg-zinc-800 text-xs font-medium text-zinc-300 hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-1 px-3 rounded bg-amber-500 text-xs font-bold text-black hover:bg-amber-400"
                >
                  Save Details
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Transactions list ledger */}
      <div className="lg:col-span-7 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-display font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Pay Back Account Ledger
          </h3>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
            Total Balance: <strong className="text-amber-400 font-bold">${card.balance.toFixed(2)}</strong>
          </span>
        </div>

        {/* List of transactions */}
        <div className="flex-1 min-h-[300px] max-h-[410px] overflow-y-auto bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 space-y-3 custom-scrollbar">
          {transactions.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 py-12">
              <CreditCard className="w-12 h-12 text-zinc-700 mb-3" />
              <p className="text-sm">No recorded transactions on this card ledger.</p>
            </div>
          ) : (
            transactions.map((t, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={t.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700/60 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    t.type === 'deposit' 
                      ? 'bg-emerald-950/40 text-emerald-400' 
                      : t.type === 'cashback' 
                      ? 'bg-amber-950/40 text-amber-400' 
                      : 'bg-red-950/40 text-red-400'
                  }`}>
                    {t.type === 'deposit' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : t.type === 'cashback' ? (
                      <Sparkles className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white leading-snug">{t.description}</h5>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded uppercase ${
                        t.type === 'deposit' 
                          ? 'bg-emerald-950/60 text-emerald-400' 
                          : t.type === 'cashback' 
                          ? 'bg-amber-950/60 text-amber-400' 
                          : 'bg-red-950/60 text-red-400'
                      }`}>
                        {t.type}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">{t.date}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-sm font-mono font-bold ${
                    t.type === 'purchase' ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {t.type === 'purchase' ? '-' : '+'}${t.amount.toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Rewards promo blurb */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-950/20 to-zinc-900/60 border border-amber-950/30 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Pay Back Perks & Cashbacks</h4>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Order any design service from the Olly Graphic Studio using your card balance to instantly earn <strong className="text-amber-300 font-semibold">10% cashback</strong> credited back to your card account automatically!
            </p>
          </div>
        </div>
      </div>

      {/* Top up / Deposit modal */}
      <AnimatePresence>
        {showDepositModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl relative"
            >
              <h3 className="text-lg font-display font-semibold text-white mb-1 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-500" />
                Fund Pay Back Account
              </h3>
              <p className="text-xs text-zinc-400 mb-4">Simulate a wire deposit or bank transfer to fund this loyalty card.</p>
              
              <form onSubmit={handleDeposit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1">Select or Enter Amount ($)</label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {['50', '100', '250'].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setDepositAmount(amt)}
                        className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                          depositAmount === amt 
                            ? 'bg-amber-500 border-amber-400 text-black' 
                            : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750'
                        }`}
                      >
                        +${amt}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-zinc-400 text-sm">$</span>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      min="1"
                      className="w-full pl-7 pr-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                      placeholder="Custom amount"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowDepositModal(false)}
                    className="flex-1 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-md"
                  >
                    Confirm Deposit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive global alert toast */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl border flex items-center gap-2 shadow-2xl ${
              message.type === 'success' 
                ? 'bg-emerald-950 border-emerald-800 text-emerald-200 shadow-emerald-950/20' 
                : 'bg-red-950 border-red-800 text-red-200 shadow-red-950/20'
            }`}
          >
            <div className={`p-1 rounded-full ${message.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              {message.type === 'success' ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <span className="text-xs font-semibold">{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
