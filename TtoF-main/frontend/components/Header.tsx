'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, User, ChevronDown, Menu, X, Layout, FolderOpen, Zap, Sparkles } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

export default function Header() {
  const router = useRouter();
  const { isPaid } = useSubscription();
  const [showMenu, setShowMenu] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('temp_access');
    localStorage.removeItem('token'); // Clear the JWT token
    router.push('/');
    router.refresh(); // Ensure all hooks re-run
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#05010d]/80 backdrop-blur-xl">
      <div className="w-full px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">

          {/* LEFT SECTION: Logo Only */}
          <div className="flex items-center min-w-0">
            <Link href="/dashboard" className="flex items-center space-x-2 md:space-x-3 cursor-pointer group truncate">
              <img
                src="/logo_v1.png"
                alt="Logo"
                className="w-10 h-10 md:w-[60px] md:h-[60px] rounded-lg object-contain transition-transform group-hover:scale-105 shrink-0"
              />
              <span className="text-base md:text-xl font-bold tracking-tighter text-white uppercase truncate">
                FlowGen
              </span>
            </Link>
          </div>

          {/* RIGHT SECTION: Desktop Nav / Mobile Menu Button */}
          <nav className="flex items-center">
            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-1 mr-6">
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-bold text-purple-200/40 hover:text-white transition-all uppercase tracking-widest"
              >
                Dashboard
              </Link>
              <Link
                href="/Projects"
                className="px-4 py-2 text-sm font-bold text-purple-200/40 hover:text-white transition-all uppercase tracking-widest"
              >
                Collection
              </Link>
            </div>

            {/* Premium CTA (Only for non-paid) */}
            {!isPaid && (
              <Link
                href="/pricing"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-purple-700 transition-all mr-6 shadow-lg shadow-purple-900/10"
              >
                Get Access
              </Link>
            )}

            {/* Desktop Profile Dropdown */}
            <div className="relative hidden md:block border-l border-white/10 pl-6 ml-2">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-3 p-1 transition-all group"
              >
                <div className="w-9 h-9 bg-white/[0.05] border border-white/10 text-white rounded-full flex items-center justify-center text-xs font-black transition-all group-hover:border-purple-500/50 group-hover:bg-purple-500/10">
                  {userEmail ? userEmail[0].toUpperCase() : 'U'}
                </div>
                <div className="relative flex flex-col justify-center h-9">
                  <p className="text-[11px] font-black text-purple-400 uppercase tracking-widest leading-none">Member</p>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2">
                    <ChevronDown className={`w-3.5 h-3.5 text-purple-400/50 transition-transform duration-300 ${showMenu ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-[#0c051a] rounded-2xl shadow-2xl border border-white/10 py-2 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-5 py-4 border-b border-white/5">
                    <p className="text-[10px] font-bold text-purple-300/40 uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-xs font-bold text-white truncate">{userEmail || 'demo@flowgen.com'}</p>
                    {isPaid && (
                      <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[9px] font-bold text-purple-400 uppercase tracking-widest">
                        Pro Member
                      </span>
                    )}
                  </div>
                  <div className="p-1.5">
                    <Link href="/profile" className="w-full px-4 py-3 text-sm font-bold text-purple-200/60 hover:text-white hover:bg-white/5 rounded-xl flex items-center space-x-3 transition-all">
                      <User className="w-4 h-4" />
                      <span>Workspace Profile</span>
                    </Link>
                  </div>
                  <div className="p-1.5 border-t border-white/5">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-sm font-bold text-red-400/60 hover:text-red-400 hover:bg-red-400/5 rounded-xl flex items-center space-x-3 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* MOBILE ONLY Toggle */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="p-3 ml-2 text-white md:hidden hover:bg-white/5 rounded-xl transition-all border border-white/10"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileNavOpen && (
        <div className="md:hidden bg-[#05010d] border-t border-white/5 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col p-6 space-y-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileNavOpen(false)}
              className="flex items-center gap-4 px-5 py-4 text-sm font-bold text-purple-200/60 hover:bg-white/5 hover:text-white rounded-2xl transition-all uppercase tracking-widest"
            >
              <Layout className="w-5 h-5 opacity-40" />
              Dashboard
            </Link>
            <Link
              href="/Projects"
              onClick={() => setMobileNavOpen(false)}
              className="flex items-center gap-4 px-5 py-4 text-sm font-bold text-purple-200/60 hover:bg-white/5 hover:text-white rounded-2xl transition-all uppercase tracking-widest"
            >
              <FolderOpen className="w-5 h-5 opacity-40" />
              Collection
            </Link>

            <div className="my-4 border-t border-white/10" />

            <div className="px-2 mb-4">
              {!isPaid && (
                <Link
                  href="/pricing"
                  onClick={() => setMobileNavOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-xs font-bold uppercase tracking-widest mb-6"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  Get Access Now
                </Link>
              )}
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center font-black text-lg">
                  {userEmail ? userEmail[0].toUpperCase() : 'U'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-black text-white truncate">{userEmail || 'Member'}</p>
                  <Link href="/profile" onClick={() => setMobileNavOpen(false)} className="text-[10px] font-bold text-purple-400 uppercase tracking-widest hover:underline">View Profile</Link>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-5 py-4 text-sm font-bold text-red-500/60 hover:bg-red-500/5 rounded-2xl transition-all uppercase tracking-widest"
            >
              <LogOut className="w-5 h-5 opacity-40" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}