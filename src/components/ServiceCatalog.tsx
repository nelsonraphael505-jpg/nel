/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Layers, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Check, 
  DollarSign, 
  ChevronRight, 
  ShoppingBag, 
  Award,
  Lock,
  Sparkles,
  Zap,
  Tag
} from 'lucide-react';
import { ServiceItem, CardState } from '../types';

interface ServiceCatalogProps {
  card: CardState;
  onPurchase: (amount: number, description: string) => boolean;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'logo-design',
    title: 'Logo Design',
    description: 'Unique, high-definition, and modern logo creation for physical and digital properties.',
    price: 150.00,
    features: [
      '3 Distinct Design Concepts',
      'High-Resolution PNG & JPEG formats',
      'Fully Responsive Web Formats',
      'Unlimited Revisions (First 14 days)'
    ]
  },
  {
    id: 'flyer-design',
    title: 'Flyer Design',
    description: 'Business flyers, digital promotional advertisements, and marketing brochures.',
    price: 100.00,
    features: [
      'Double-sided Custom Layouts',
      'Dynamic Typography treatment',
      'Premium Custom Gradients',
      'Optimized PDF for commercial printing'
    ]
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity Package',
    description: 'Complete creative guidelines, custom typography guidelines, and digital stationery kits.',
    price: 350.00,
    features: [
      'Comprehensive Brand Stylebook',
      'Corporate Color Palette definition',
      'Letterhead, Envelope & Social Media Assets',
      'Exclusive Copyright Ownership'
    ]
  }
];

export default function ServiceCatalog({ card, onPurchase }: ServiceCatalogProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isExpress, setIsExpress] = useState(false);
  const [includeSourceFiles, setIncludeSourceFiles] = useState(false);
  const [includeCopyright, setIncludeCopyright] = useState(false);
  
  const [orderState, setOrderState] = useState<{
    status: 'idle' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  const calculateTotal = () => {
    if (!selectedService) return 0;
    let total = selectedService.price;
    if (isExpress) total += 50.00;
    if (includeSourceFiles) total += 30.00;
    if (includeCopyright) total += 45.00;
    return total;
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    if (card.status === 'Frozen') {
      setOrderState({
        status: 'error',
        message: 'Transaction declined. Your Pay Back Card is Frozen. Please reactivate your card.'
      });
      return;
    }

    const total = calculateTotal();
    const description = `Olly Graphic Order: ${selectedService.title} (+ Addons)`;

    const success = onPurchase(total, description);
    if (success) {
      setOrderState({
        status: 'success',
        message: `Order for ${selectedService.title} has been successfully completed! Total $${total.toFixed(2)} deducted from card balance. You earned a 10% cashback!`
      });
      // Clear options
      setTimeout(() => {
        setSelectedService(null);
        setIsExpress(false);
        setIncludeSourceFiles(false);
        setIncludeCopyright(false);
        setOrderState({ status: 'idle', message: '' });
      }, 5000);
    } else {
      setOrderState({
        status: 'error',
        message: `Transaction declined. Insufficient balance ($${card.balance.toFixed(2)}) for total price $${total.toFixed(2)}.`
      });
    }
  };

  return (
    <div id="services-catalog" className="my-16 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/10 inline-flex items-center gap-1">
          <Award className="w-3.5 h-3.5" /> High-End Graphic Studio
        </span>
        <h2 className="text-3xl font-display font-bold text-white mt-3">Our Creative Services</h2>
        <p className="text-sm text-zinc-400 mt-2">
          From pixel-perfect logos to elite branding manuals. Select a package to customize your specifications and request graphics.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SERVICES.map((service, idx) => {
          const isSelected = selectedService?.id === service.id;
          return (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={service.id}
              className={`p-6 rounded-2xl bg-zinc-900 border transition-all relative flex flex-col justify-between ${
                isSelected 
                  ? 'border-amber-500 ring-1 ring-amber-500/30' 
                  : 'border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900/80 shadow-md'
              }`}
            >
              {service.id === 'brand-identity' && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-amber-500 text-black text-[9px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}

              <div>
                {/* Header info */}
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-amber-500">
                    {service.id === 'logo-design' && <Palette className="w-5 h-5" />}
                    {service.id === 'flyer-design' && <Layers className="w-5 h-5" />}
                    {service.id === 'brand-identity' && <FileText className="w-5 h-5" />}
                  </div>
                  <p className="text-2xl font-mono font-bold text-white tracking-tight">
                    ${service.price.toFixed(0)}
                  </p>
                </div>

                <h3 className="text-lg font-display font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">{service.description}</p>

                {/* Features checklist */}
                <ul className="space-y-2.5 mb-6 border-t border-zinc-850 pt-4">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order button triggers config form */}
              <button
                onClick={() => {
                  setSelectedService(service);
                  setOrderState({ status: 'idle', message: '' });
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isSelected 
                    ? 'bg-amber-500 text-black' 
                    : 'bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-850'
                }`}
              >
                {isSelected ? 'Configure Specifications' : 'Select Package'}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Dynamic Checkout Configurator Panel */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 overflow-hidden"
          >
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 relative">
              <h3 className="text-base font-display font-semibold text-white mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-500" />
                Customize Options for {selectedService.title}
              </h3>

              <form onSubmit={handleCheckout} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left side options: Checkboxes */}
                <div className="md:col-span-7 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Express delivery check */}
                    <div 
                      onClick={() => setIsExpress(!isExpress)}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                        isExpress 
                          ? 'border-amber-500/50 bg-amber-500/5' 
                          : 'border-zinc-850 bg-zinc-900/30 hover:border-zinc-800'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={isExpress}
                        onChange={() => {}} // handled by parent div
                        className="mt-1 rounded text-amber-500 focus:ring-amber-500 bg-zinc-950 border-zinc-800"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-400" /> Express Delivery
                        </h4>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Deliver within 24 hours (+$50.00)</p>
                      </div>
                    </div>

                    {/* Source files check */}
                    <div 
                      onClick={() => setIncludeSourceFiles(!includeSourceFiles)}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                        includeSourceFiles 
                          ? 'border-amber-500/50 bg-amber-500/5' 
                          : 'border-zinc-850 bg-zinc-900/30 hover:border-zinc-800'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={includeSourceFiles}
                        onChange={() => {}}
                        className="mt-1 rounded text-amber-500 focus:ring-amber-500 bg-zinc-950 border-zinc-800"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1">
                          Vector Source Files
                        </h4>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Include AI, EPS, SVG source (+$30.00)</p>
                      </div>
                    </div>

                    {/* Copyright check */}
                    <div 
                      onClick={() => setIncludeCopyright(!includeCopyright)}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-all sm:col-span-2 ${
                        includeCopyright 
                          ? 'border-amber-500/50 bg-amber-500/5' 
                          : 'border-zinc-850 bg-zinc-900/30 hover:border-zinc-800'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={includeCopyright}
                        onChange={() => {}}
                        className="mt-1 rounded text-amber-500 focus:ring-amber-500 bg-zinc-950 border-zinc-800"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Commercial Copyright Handover
                        </h4>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Full exclusive legal copyright ownership transfer of vector works (+$45.00)</p>
                      </div>
                    </div>
                  </div>

                  {/* Order comments input */}
                  <div>
                    <label className="block text-[10px] font-mono tracking-wider font-semibold text-zinc-500 mb-1 uppercase">Special Design Instructions / Brand brief</label>
                    <textarea
                      placeholder="Describe your design specifications, text content, color styles, and target audience..."
                      className="w-full h-20 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                  </div>
                </div>

                {/* Right side checkout: Calculations summary */}
                <div className="md:col-span-5 p-5 bg-zinc-900 rounded-xl border border-zinc-850 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-amber-400 uppercase border-b border-zinc-800 pb-2 mb-3 tracking-widest">
                      Price Statement
                    </h4>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-zinc-400">
                        <span>Base Package ({selectedService.title})</span>
                        <span className="font-mono text-white">${selectedService.price.toFixed(2)}</span>
                      </div>
                      {isExpress && (
                        <div className="flex justify-between text-zinc-400">
                          <span>Express Rush 24h</span>
                          <span className="font-mono text-white">+$50.00</span>
                        </div>
                      )}
                      {includeSourceFiles && (
                        <div className="flex justify-between text-zinc-400">
                          <span>Vector Source Files</span>
                          <span className="font-mono text-white">+$30.00</span>
                        </div>
                      )}
                      {includeCopyright && (
                        <div className="flex justify-between text-zinc-400">
                          <span>Copyright Handover</span>
                          <span className="font-mono text-white">+$45.00</span>
                        </div>
                      )}
                      
                      <div className="border-t border-zinc-800 my-2 pt-2 flex justify-between font-bold text-sm text-white">
                        <span>Est. Subtotal</span>
                        <span className="font-mono text-amber-400">${calculateTotal().toFixed(2)}</span>
                      </div>

                      {/* Cash back rebate */}
                      <div className="p-2 rounded bg-amber-950/20 text-[10px] text-amber-300 border border-amber-950/40 flex items-center justify-between font-mono">
                        <span>Estimated Pay Back Rebate (10%)</span>
                        <span>+${(calculateTotal() * 0.1).toFixed(2)} Cash</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-4">
                    {/* Check if user card is active */}
                    {card.status === 'Frozen' ? (
                      <div className="p-2 bg-red-950/40 border border-red-900/40 text-red-300 text-[10px] rounded flex items-center gap-1.5 font-sans">
                        <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Declined: Pay Back Card is frozen in the controller panel.</span>
                      </div>
                    ) : (
                      <div className="text-[10px] text-zinc-400 font-mono flex items-center justify-between bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-850">
                        <span>Pay Back Balance:</span>
                        <span className="font-bold text-white">${card.balance.toFixed(2)}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      id="btn-confirm-checkout"
                      disabled={card.status === 'Frozen'}
                      className="w-full py-2.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-950/10 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ShoppingBag className="w-4 h-4" /> Place Design Order
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setSelectedService(null)}
                      className="w-full py-1 text-center text-[11px] text-zinc-500 hover:text-zinc-400 underline underline-offset-4"
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              </form>

              {/* Status notifications */}
              {orderState.status !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-xl border text-xs flex items-start gap-2.5 ${
                    orderState.status === 'success'
                      ? 'bg-emerald-950/50 border-emerald-900/50 text-emerald-200'
                      : 'bg-red-950/50 border-red-900/50 text-red-200'
                  }`}
                >
                  <span className="mt-0.5 font-bold">
                    {orderState.status === 'success' ? '✓' : '⚠'}
                  </span>
                  <p className="leading-relaxed">{orderState.message}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
