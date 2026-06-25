/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Crown, 
  Flame, 
  Gem, 
  Star, 
  Feather, 
  Rocket, 
  Palette, 
  Download, 
  Layers, 
  Award, 
  Share2, 
  ShoppingBag,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { DesignConfig, CardState } from '../types';

interface DesignLabProps {
  card: CardState;
  onPurchase: (amount: number, description: string) => boolean;
}

const THEME_PRESETS = {
  gold: {
    primary: '#d4af37',
    primaryLight: '#fce881',
    bg: 'from-zinc-950 via-zinc-900 to-zinc-950',
    accent: '#aa7c11',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
    glow: 'shadow-amber-500/10',
    colorName: 'Imperial Gold'
  },
  royal: {
    primary: '#2563eb',
    primaryLight: '#60a5fa',
    bg: 'from-slate-950 via-slate-900 to-slate-950',
    accent: '#1d4ed8',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
    glow: 'shadow-blue-500/10',
    colorName: 'Royal Cobalt'
  },
  emerald: {
    primary: '#10b981',
    primaryLight: '#34d399',
    bg: 'from-stone-950 via-stone-900 to-stone-950',
    accent: '#047857',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
    glow: 'shadow-emerald-500/10',
    colorName: 'Emerald Forest'
  },
  crimson: {
    primary: '#dc2626',
    primaryLight: '#f87171',
    bg: 'from-zinc-950 via-neutral-900 to-zinc-950',
    accent: '#b91c1c',
    text: 'text-red-400',
    border: 'border-red-500/20',
    glow: 'shadow-red-500/10',
    colorName: 'Crimson Velvet'
  },
  dark: {
    primary: '#a855f7',
    primaryLight: '#c084fc',
    bg: 'from-zinc-950 via-neutral-900 to-zinc-950',
    accent: '#7e22ce',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
    glow: 'shadow-purple-500/10',
    colorName: 'Deep Cyber'
  }
};

const SYMBOLS: { [key: string]: React.ElementType } = {
  crown: Crown,
  sparkles: Sparkles,
  flame: Flame,
  gem: Gem,
  star: Star,
  feather: Feather,
  rocket: Rocket,
};

export default function DesignLab({ card, onPurchase }: DesignLabProps) {
  const [config, setConfig] = useState<DesignConfig>({
    brandName: 'OLLY GRAPHIC',
    slogan: 'CREATIVE GRAPHIC SOLUTIONS',
    iconName: 'crown',
    colorTheme: 'gold',
    layout: 'centered',
  });

  const [activeTab, setActiveTab] = useState<'logo' | 'business-card' | 'flyer'>('logo');
  const [designSaved, setDesignSaved] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const selectedTheme = THEME_PRESETS[config.colorTheme];
  const SelectedIcon = SYMBOLS[config.iconName] || Crown;

  const handleUpdateConfig = (updates: Partial<DesignConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
    setDesignSaved(false);
    setOrderSuccess(false);
    setOrderError(null);
  };

  const handleExport = () => {
    setDesignSaved(true);
    setTimeout(() => setDesignSaved(false), 3000);
  };

  const handlePlaceOrder = () => {
    if (card.status === 'Frozen') {
      setOrderError('Your Pay Back Card is frozen. Unfreeze it in the Card Center below.');
      return;
    }

    const price = 150.0; // Simulated flat price for custom package ordering
    const description = `Olly Studio Premium Order: ${config.brandName.toUpperCase()} Brand Identity Kit`;
    
    const success = onPurchase(price, description);
    if (success) {
      setOrderSuccess(true);
      setOrderError(null);
    } else {
      setOrderError('Insufficient card balance. Please fund your Pay Back card in the panel below.');
    }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 lg:p-8 my-8 shadow-2xl relative overflow-hidden">
      {/* Decorative background grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.05),transparent_40%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.03),transparent_50%)] pointer-events-none" />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-zinc-900">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Interactive Sandbox
          </span>
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-white mt-1">
            Creative Branding Studio
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Configure your brand identity guidelines instantly and preview our graphic engineering.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800 self-stretch sm:self-auto">
          {(['logo', 'business-card', 'flyer'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOrderSuccess(false);
                setOrderError(null);
              }}
              className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all capitalize ${
                activeTab === tab
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-850 space-y-4">
            <h3 className="text-sm font-mono font-bold text-amber-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-zinc-800 pb-2">
              <Palette className="w-4 h-4 text-amber-500" /> Configurator Controls
            </h3>

            {/* Brand name */}
            <div>
              <label className="block text-[11px] font-mono tracking-wider font-semibold text-zinc-400 mb-1.5 uppercase">
                Company / Brand Name
              </label>
              <input
                type="text"
                value={config.brandName}
                onChange={(e) => handleUpdateConfig({ brandName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-display uppercase tracking-wider"
                placeholder="Enter Brand Name"
                maxLength={20}
              />
            </div>

            {/* Brand slogan */}
            <div>
              <label className="block text-[11px] font-mono tracking-wider font-semibold text-zinc-400 mb-1.5 uppercase">
                Brand Slogan / Tagline
              </label>
              <input
                type="text"
                value={config.slogan}
                onChange={(e) => handleUpdateConfig({ slogan: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans uppercase tracking-widest"
                placeholder="Enter Brand Slogan"
                maxLength={45}
              />
            </div>

            {/* Layout Style */}
            <div>
              <label className="block text-[11px] font-mono tracking-wider font-semibold text-zinc-400 mb-1.5 uppercase">
                Crest / Layout Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'centered', label: 'Centered' },
                  { id: 'clean', label: 'Minimal' },
                  { id: 'shield', label: 'Shield' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleUpdateConfig({ layout: item.id as any })}
                    className={`py-1.5 px-2 text-[10px] font-bold rounded border transition-all ${
                      config.layout === item.id
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/50 shadow-inner'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Select branding Icon */}
            <div>
              <label className="block text-[11px] font-mono tracking-wider font-semibold text-zinc-400 mb-1.5 uppercase">
                Primary Brand Mark Symbol
              </label>
              <div className="grid grid-cols-7 gap-1">
                {Object.keys(SYMBOLS).map((sym) => {
                  const SymIcon = SYMBOLS[sym];
                  return (
                    <button
                      key={sym}
                      title={`Select ${sym} symbol`}
                      onClick={() => handleUpdateConfig({ iconName: sym })}
                      className={`p-2 rounded flex items-center justify-center border transition-all ${
                        config.iconName === sym
                          ? 'bg-amber-500 text-black border-amber-500'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <SymIcon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors presets selection */}
            <div>
              <label className="block text-[11px] font-mono tracking-wider font-semibold text-zinc-400 mb-1.5 uppercase">
                Aesthetic Color Palette
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {Object.keys(THEME_PRESETS).map((tKey) => {
                  const theme = THEME_PRESETS[tKey as keyof typeof THEME_PRESETS];
                  return (
                    <button
                      key={tKey}
                      title={theme.colorName}
                      onClick={() => handleUpdateConfig({ colorTheme: tKey as any })}
                      className={`h-7 rounded flex items-center justify-center border transition-all text-[9px] font-bold capitalize ${
                        config.colorTheme === tKey
                          ? 'border-white text-white scale-105 shadow-md'
                          : 'border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                      style={{ backgroundColor: theme.primary + '20', color: theme.primary }}
                    >
                      <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: theme.primary }} />
                      {tKey}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Promo Ordering Panel */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-zinc-900/40 to-zinc-900 border border-amber-500/10 space-y-3.5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">Deploy Your Design</p>
                <h4 className="text-sm font-bold text-white mt-0.5">Order Custom Identity Package</h4>
              </div>
              <span className="text-xs font-mono font-bold text-white bg-amber-500 text-black px-2 py-0.5 rounded">
                $150.00
              </span>
            </div>
            
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Order this dynamic logo, brand manual, business card, and vector assets configured by you. Paying with your Pay Back card rewards you with <strong className="text-amber-400">10% cashback ($15.00)</strong>!
            </p>

            <div className="pt-2">
              <button
                onClick={handlePlaceOrder}
                id="btn-order-brand"
                className="w-full py-2.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-950/20"
              >
                <ShoppingBag className="w-3.5 h-3.5" /> Confirm & Pay with Pay Back Card
              </button>
            </div>

            {/* Error notifications */}
            {orderError && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 rounded bg-red-950/40 border border-red-900/40 flex items-start gap-1.5 text-red-300 text-[10px]"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{orderError}</span>
              </motion.div>
            )}

            {/* Success notifications */}
            {orderSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 rounded bg-emerald-950/40 border border-emerald-900/40 flex items-start gap-1.5 text-emerald-300 text-[10px]"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-200">Brand Identity Ordered!</p>
                  <p className="text-zinc-400 mt-0.5">Successfully deducted $150.00. You earned 10% cashback ($15.00) added back to your card!</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Live Canvas Viewport (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between items-center h-full">
          {/* Dynamic Mockup Stage */}
          <div className="w-full flex-1 flex items-center justify-center p-6 sm:p-10 rounded-2xl bg-zinc-950 border border-zinc-900 relative min-h-[340px] overflow-hidden">
            
            {/* Absolute background effects based on color */}
            <div 
              className="absolute inset-0 bg-radial-gradient opacity-10 transition-all duration-500" 
              style={{ backgroundImage: `radial-gradient(circle, ${selectedTheme.primary} 0%, transparent 65%)` }}
            />

            {/* Design Type Renderer: LOGO MOCKUP */}
            {activeTab === 'logo' && (
              <motion.div 
                key={`${config.colorTheme}-${config.layout}-${config.iconName}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center relative z-10 w-full text-center"
              >
                {config.layout === 'centered' && (
                  <div className="space-y-4">
                    <div className="inline-flex p-5 rounded-full bg-zinc-900/90 border border-zinc-800 shadow-xl" style={{ boxShadow: `0 10px 30px ${selectedTheme.primary}10` }}>
                      <SelectedIcon className="w-12 h-12" style={{ color: selectedTheme.primary }} />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-3xl font-display font-bold tracking-widest text-white">
                        {config.brandName || "OLLY GRAPHIC"}
                      </h3>
                      <div className="flex items-center justify-center gap-2">
                        <span className="h-[1px] w-4" style={{ backgroundColor: selectedTheme.primary }} />
                        <p className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-medium">
                          {config.slogan || "CREATIVE GRAPHIC SOLUTIONS"}
                        </p>
                        <span className="h-[1px] w-4" style={{ backgroundColor: selectedTheme.primary }} />
                      </div>
                    </div>
                  </div>
                )}

                {config.layout === 'clean' && (
                  <div className="flex items-center gap-5 bg-zinc-900/40 border border-zinc-900 p-6 rounded-xl">
                    <SelectedIcon className="w-16 h-16 flex-shrink-0" style={{ color: selectedTheme.primary }} />
                    <div className="text-left border-l border-zinc-800 pl-5">
                      <h3 className="text-2xl font-display font-semibold tracking-wider text-white">
                        {config.brandName || "OLLY GRAPHIC"}
                      </h3>
                      <p className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase mt-0.5">
                        {config.slogan || "CREATIVE GRAPHIC SOLUTIONS"}
                      </p>
                    </div>
                  </div>
                )}

                {config.layout === 'shield' && (
                  <div className="relative p-8 rounded-3xl bg-zinc-900/90 border-2 border-zinc-850 flex flex-col items-center max-w-sm" style={{ borderColor: selectedTheme.primary + '30' }}>
                    {/* Golden corners design */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l" style={{ borderColor: selectedTheme.primary }} />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t border-r" style={{ borderColor: selectedTheme.primary }} />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l" style={{ borderColor: selectedTheme.primary }} />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r" style={{ borderColor: selectedTheme.primary }} />

                    <SelectedIcon className="w-10 h-10 mb-4 animate-bounce" style={{ color: selectedTheme.primary }} />
                    
                    <h3 className="text-xl font-display font-bold tracking-widest text-white border-b pb-2 mb-2 w-full text-center" style={{ borderColor: selectedTheme.primary + '20' }}>
                      {config.brandName || "OLLY GRAPHIC"}
                    </h3>
                    
                    <p className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase text-center max-w-[200px]">
                      {config.slogan || "CREATIVE GRAPHIC SOLUTIONS"}
                    </p>
                    
                    <div className="flex gap-1.5 mt-4">
                      <Award className="w-4 h-4" style={{ color: selectedTheme.primary }} />
                      <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase">Premium Quality Mark</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Design Type Renderer: BUSINESS CARD MOCKUP */}
            {activeTab === 'business-card' && (
              <motion.div 
                key={`${config.colorTheme}-${config.iconName}`}
                initial={{ opacity: 0, rotate: -5 }}
                animate={{ opacity: 1, rotate: 0 }}
                className="w-[340px] h-[190px] rounded-xl p-5 bg-zinc-900 border border-zinc-800 text-white flex flex-col justify-between shadow-2xl relative"
                style={{ boxShadow: `0 15px 40px ${selectedTheme.primary}08` }}
              >
                {/* Background patterns */}
                <div className="absolute right-0 bottom-0 opacity-10">
                  <SelectedIcon className="w-32 h-32 transform translate-x-6 translate-y-6" style={{ color: selectedTheme.primary }} />
                </div>

                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <SelectedIcon className="w-5 h-5" style={{ color: selectedTheme.primary }} />
                    <span className="text-xs font-display font-semibold tracking-wider text-white uppercase">
                      {config.brandName || "OLLY GRAPHIC"}
                    </span>
                  </div>
                  <span className="text-[7px] font-mono tracking-widest text-zinc-500 uppercase border border-zinc-800 px-1.5 py-0.5 rounded">
                    Corporate
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-sm font-display font-bold tracking-wide text-white">Alexander Vance</h4>
                  <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: selectedTheme.primary }} />
                    Chief Design Executive
                  </p>
                </div>

                <div className="flex justify-between items-end border-t border-zinc-800/80 pt-2.5 text-[8px] font-mono text-zinc-500">
                  <div className="space-y-0.5">
                    <p>Phone: +1 (555) 019-2834</p>
                    <p>Web: www.{config.brandName.toLowerCase().replace(/\s+/g, '') || "ollygraphic"}.com</p>
                  </div>
                  <p className="text-right">Corporate HQ<br />New York City, NY</p>
                </div>
              </motion.div>
            )}

            {/* Design Type Renderer: PROMO FLYER */}
            {activeTab === 'flyer' && (
              <motion.div 
                key={`${config.colorTheme}-${config.iconName}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-[280px] h-[360px] rounded-2xl p-5 bg-zinc-900 border border-zinc-850 flex flex-col justify-between text-white relative overflow-hidden shadow-2xl"
              >
                {/* Dynamic diagonal accent slash */}
                <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full opacity-10 blur-xl" style={{ backgroundColor: selectedTheme.primary }} />
                
                <div className="relative z-10 flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <SelectedIcon className="w-4 h-4" style={{ color: selectedTheme.primary }} />
                    <span className="text-[9px] font-display font-bold tracking-wider uppercase text-white">
                      {config.brandName || "OLLY GRAPHIC"}
                    </span>
                  </div>
                  <p className="text-[7px] font-mono tracking-wider text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded-full">
                    SUMMER PROMO
                  </p>
                </div>

                <div className="relative z-10 my-auto text-center space-y-3">
                  <span className="text-[8px] font-mono font-semibold uppercase tracking-widest text-zinc-400 border border-zinc-850 px-2.5 py-1 rounded" style={{ color: selectedTheme.primary }}>
                    EXCLUSIVE BRAND REVOLUTION
                  </span>
                  
                  <h3 className="text-xl font-display font-bold tracking-tight text-white leading-tight uppercase">
                    Unleash Your Ultimate Potential
                  </h3>
                  
                  <p className="text-[9px] text-zinc-400 leading-relaxed px-2 font-mono">
                    Professional brand identity packages engineered for high-growth corporate entities and disruptive startups.
                  </p>
                </div>

                <div className="relative z-10 border-t border-zinc-850 pt-3 flex justify-between items-center">
                  <div>
                    <p className="text-[7px] font-mono text-zinc-500 uppercase">Premium Service Plan</p>
                    <p className="text-xs font-mono font-bold text-white">Starting at $100</p>
                  </div>
                  
                  <button className="px-3 py-1.5 rounded text-[8px] font-bold text-black" style={{ backgroundColor: selectedTheme.primary }}>
                    Claim Perks Now
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Action Footer controls */}
          <div className="w-full flex justify-between items-center mt-4">
            <p className="text-[11px] text-zinc-500 italic">
              Live Mockup rendering inside OLLY GRAPHIC Vector Engine.
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
              >
                {designSaved ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Saved!
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" /> Export Vector
                  </>
                )}
              </button>
              
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(config, null, 2));
                  alert("Branding Config Copied to Clipboard!");
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
              >
                <Share2 className="w-3.5 h-3.5" /> Copy Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
