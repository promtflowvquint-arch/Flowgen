
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Zap, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === 'demo@flowgen.com' && password === 'demo123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email); // For pricing prefill
      router.push('/dashboard');
    } else {
      setError('Invalid credentials! Try the demo login below.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#05010d] font-sans selection:bg-purple-500/30">

      {/* Left Side: The "Atmosphere" */}
      <div className="hidden lg:flex relative overflow-hidden flex-col justify-between p-16">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-14 h-14 object-contain"
            />
            <span className="text-2xl font-bold text-white tracking-tight">FlowGen</span>
          </Link>

          <div className="mt-24 max-w-lg">
            <h1 className="text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Design at the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">speed of thought.</span>
            </h1>
            <p className="mt-6 text-xl text-purple-200/60 leading-relaxed">
              Experience the next generation of AI-driven architecture. Elegant, automated, and built for scale.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#05010d] bg-purple-900/50" />
            ))}
          </div>
          <p className="text-sm text-purple-200/80 font-medium">
            More than <span className="text-white font-bold">100+</span> satisfied users.
          </p>
        </div>
      </div>

      {/* Right Side: The Glass Form */}
      <div className="flex items-center justify-center p-6 relative">
        {/* Mobile background decorative elements */}
        <div className="lg:hidden absolute inset-0 bg-[#05010d] z-[-1]" />

        <div className="w-full max-w-md space-y-8 relative">
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-4xl font-bold text-white tracking-tight">Sign in</h2>
            <p className="text-purple-200/50">Enter your credentials to access your workspace.</p>
          </div>

          <div className="relative group">
            {/* Outer Glow for the Card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-3xl blur-xl opacity-50 transition duration-1000 group-hover:opacity-100"></div>

            <div className="relative bg-white/[0.03] border border-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-purple-300/60 mb-2 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-2xl text-white placeholder:text-purple-300/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:bg-white/[0.08] transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-purple-300/60 mb-2 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3.5 bg-white/[0.05] border border-white/10 rounded-2xl text-white placeholder:text-purple-300/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:bg-white/[0.08] transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/50 hover:text-purple-300 transition"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer text-purple-200/60 hover:text-purple-200 transition">
                    <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500/40" />
                    <span>Keep me logged in</span>
                  </label>
                  <Link href="#" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">Forgot?</Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Sign into Workspace'}
                  {!isLoading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  {error}
                </div>
              )}

              {/* Demo Hint with Glass styling */}
              <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                <p className="text-[10px] uppercase tracking-[0.2em] text-purple-400/60 mb-2">Quick Access</p>
                <code className="text-xs text-purple-200/80">demo@flowgen.com / demo123</code>
              </div>
            </div>
          </div>

          <p className="text-center text-purple-200/40 text-sm">
            New to the platform?{' '}
            <Link href="/signup" className="text-white hover:text-purple-300 font-semibold transition-colors">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}