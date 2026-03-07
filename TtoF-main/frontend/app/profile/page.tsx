'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  CreditCard,
  Mail,
  LogOut,
  Settings,
  Calendar,
  Zap,
  Key,
  Bell,
  Activity,
  Command,
  ChevronRight
} from 'lucide-react';
import Header from '../../components/Header';
import { useSubscription } from '@/hooks/useSubscription';

export default function ProfilePage() {
  const router = useRouter();
  const { isPaid, subscriptionData, isLoading } = useSubscription();
  const [userEmail, setUserEmail] = useState('demo@flowgen.com');
  const [activeTab, setActiveTab] = useState('account');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('temp_access');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#05010d] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-600/20 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const navItems = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'usage', label: 'Prompt Usage', icon: Activity },
    { id: 'billing', label: 'Subscription', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-[#05010d] text-slate-300">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="mb-10">
              <h1 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 mb-2">
                <Command size={14} className="text-purple-500" />
                Settings
              </h1>
              <p className="text-[10px] text-slate-600 font-medium">Manage your workspace</p>
            </div>

            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 px-6 py-3 lg:px-4 lg:py-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap lg:whitespace-normal border-2 ${activeTab === item.id
                      ? 'bg-purple-600/10 text-white border-purple-500/50 shadow-xl shadow-black/20'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border-transparent'
                      }`}
                  >
                    <Icon size={16} className={activeTab === item.id ? 'text-purple-500' : ''} />
                    {item.label}
                  </button>
                );
              })}

              <div className="hidden lg:block pt-8 mt-8 border-t border-white/5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500/70 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all"
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Panel */}
          <div className="flex-1 max-w-3xl space-y-10">

            {/* Account Tab */}
            {activeTab === 'account' && (
              <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Personal Identity</h2>
                  <p className="text-sm text-slate-500">How you appear within the FlowGen ecosystem.</p>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-8">
                  <div className="flex items-center gap-6 pb-8 border-b border-white/5">
                    <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center border border-white/10 shadow-inner">
                      <User size={32} className="text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">System User</h3>
                      <p className="text-xs font-bold text-purple-500 uppercase tracking-widest mt-1">
                        {isPaid ? 'Technical Tier: Pro' : 'Technical Tier: Starter'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Authentication Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                        <input
                          disabled
                          value={userEmail}
                          className="w-full pl-12 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-slate-400 text-sm font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Usage Tab */}
            {activeTab === 'usage' && (
              <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Engine Metrics</h2>
                  <p className="text-sm text-slate-500">Real-time tracking of your AI computational resources.</p>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Remaining Credits</p>
                      <h3 className="text-3xl font-black text-white">
                        {isPaid ? '∞' : `${subscriptionData?.promptsRemaining || 0} / 3`}
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-600/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
                      <Zap size={20} className="text-purple-500" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: isPaid ? '100%' : `${((subscriptionData?.promptsRemaining || 0) / 3) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest text-right">
                      Processing Utility: {isPaid ? '100%' : `${Math.round(((subscriptionData?.promptsRemaining || 0) / 3) * 100)}%`} Available
                    </p>
                  </div>

                  {!isPaid && (
                    <div className="pt-6 border-t border-white/5">
                      <button
                        onClick={() => router.push('/pricing')}
                        className="text-xs font-bold text-purple-500 hover:text-purple-400 transition-colors uppercase tracking-widest flex items-center gap-2 group"
                      >
                        Unlock Unlimited Capacity
                        <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Billing Tab (Simplified for SaaS Feel) */}
            {activeTab === 'billing' && (
              <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Subscription Model</h2>
                  <p className="text-sm text-slate-500">Current financial status and plan allocation.</p>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Selected Tier</p>
                      <div className="px-4 py-1.5 bg-purple-600/10 border border-purple-500/30 rounded-full inline-block">
                        <span className="text-purple-400 text-xs font-black uppercase tracking-widest">
                          {isPaid ? 'Pro Engine' : 'Starter Tier'}
                        </span>
                      </div>
                    </div>
                    <Calendar size={24} className="text-slate-800" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Service Status terminates</p>
                    <p className="text-lg font-bold text-white">
                      {isPaid ? (subscriptionData?.expiry || 'Termless (Pro)') : 'Manual Renewal Pending'}
                    </p>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}