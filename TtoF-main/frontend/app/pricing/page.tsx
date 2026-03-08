'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { useRazorpay } from '@/hooks/useRazorpay';

export default function PricingPage() {
    const { initiatePayment, isProcessing, error: paymentError } = useRazorpay();
    const [selectedPlan, setSelectedPlan] = useState('pro');

    const plans = [
        {
            id: 'free',
            name: 'Starter',
            price: '0',
            description: 'Perfect for exploring basic diagrams',
            features: [
                'Flowcharts & Mindmaps',
                '3 Diagrams per month',
                'Standard Export (PNG)',
                'Community Support'
            ],
            cta: 'Current Plan',
            premium: false
        },
        {
            id: 'pro',
            name: 'Pro Engine',
            price: '499',
            description: 'Unlock the full power of AI generation',
            features: [
                'All 8+ Diagram Types',
                'Unlimited AI Generations',
                'High-Res Export (SVG/PDF)',
                'Save & Load Unlimited Projects',
                'Advanced Custom Themes'
            ],
            cta: 'Upgrade to Pro',
            premium: true
        }
    ];

    const handlePayment = async () => {
        const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') || '' : '';
        await initiatePayment(499, userEmail);
    };

    return (
        <div className="min-h-screen bg-[#05010d] text-white selection:bg-purple-500/30">
            {/* Minimal Logo Branding (No Navbar) */}
            <div className="pt-12 flex justify-center">
                <Link href="/" className="flex items-center space-x-3 group cursor-pointer relative z-20">
                    <img src="/logo_v1.png" alt="Logo" className="w-12 h-12 rounded-lg object-contain transition-transform group-hover:scale-105" />
                    <span className="text-xl font-bold tracking-tighter uppercase">FlowGen</span>
                </Link>
            </div>

            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[100px]" />
            </div>

            <main className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 text-[10px] font-bold uppercase tracking-widest mb-6">
                        <Sparkles className="w-3 h-3" />
                        <span>Choose Your Plan</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4">
                        Accelerate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">workflow.</span>
                    </h1>
                    <p className="text-purple-200/40 text-lg max-w-xl mx-auto">
                        Get unlimited access to the full suite of AI diagram tools and premium export features.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative group p-8 rounded-[2.5rem] border transition-all duration-500 ${plan.premium
                                ? 'bg-white/[0.03] border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.1)]'
                                : 'bg-white/[0.01] border-white/10 hover:border-white/20'
                                }`}
                        >
                            {plan.premium && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
                                    <Zap className="w-3 h-3 fill-current" />
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-sm text-purple-200/40 h-10">{plan.description}</p>
                                <div className="mt-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-black">₹{plan.price}</span>
                                    <span className="text-purple-200/40 text-sm">/lifetime</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-purple-400" />
                                        </div>
                                        <span className="text-sm text-purple-100/70">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {plan.premium ? (
                                <button
                                    onClick={() => {
                                        // REAL LOGIC:
                                        // handlePayment();

                                        // DEV BYPASS:
                                        localStorage.setItem('temp_access', 'pro');
                                        window.location.href = '/dashboard';
                                    }}
                                    disabled={isProcessing}
                                    className="w-full py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-purple-200 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                >
                                    {isProcessing ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            {plan.cta}
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        localStorage.setItem('temp_access', 'starter');
                                        window.location.href = '/dashboard';
                                    }}
                                    className="w-full py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 transition-all font-bold rounded-2xl"
                                >
                                    {plan.cta}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {paymentError && (
                    <div className="mt-8 max-w-md mx-auto p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center justify-center gap-2">
                        <ShieldCheck className="w-5 h-5" />
                        {paymentError}
                    </div>
                )}

                <div className="mt-20 text-center">
                    <p className="text-xs text-purple-200/20 uppercase tracking-[0.3em] font-bold mb-4">Secured by Razorpay</p>
                    <div className="flex justify-center gap-6 opacity-20 grayscale">
                        {/* Simple placeholders for card icons */}
                        <div className="w-10 h-6 bg-white rounded-md" />
                        <div className="w-10 h-6 bg-white rounded-md" />
                        <div className="w-10 h-6 bg-white rounded-md" />
                    </div>
                </div>
            </main>
        </div>
    );
}
