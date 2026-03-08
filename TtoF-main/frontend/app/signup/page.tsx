
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, Zap, Layout, Share2, Shield, Sparkles, Download, Layers } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: 'bg-white/10' };
    if (password.length < 6) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 10) return { strength: 2, label: 'Medium', color: 'bg-purple-400' };
    return { strength: 3, label: 'Strong', color: 'bg-emerald-400' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!acceptTerms) {
      setError('Please accept the terms to continue.');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', formData.email);
    router.push('/pricing');
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#05010d] font-sans selection:bg-purple-500/30">

      {/* Left Side - Value Proposition */}
      <div className="hidden lg:flex relative overflow-hidden flex-col justify-between p-16 border-r border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[50%] h-[50%] bg-purple-600/15 rounded-full blur-[100px] animate-pulse" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <img
              src="/logo_v1.png"
              alt="Logo"
              className="w-14 h-14 object-contain"
            />
            <span className="text-2xl font-bold text-white tracking-tight">FlowGen</span>
          </Link>

          <div className="mt-20">
            <h1 className="text-5xl font-extrabold text-white leading-tight tracking-tight max-w-md">
              The workspace for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">modern builders.</span>
            </h1>
          </div>

          <div className="mt-12 space-y-6 max-w-sm">
            {[
              { icon: Sparkles, title: 'Generative AI', desc: 'Stop drawing boxes. Start describing logic.' },
              { icon: Layout, title: 'Auto-Spatial Logic', desc: 'No more misaligned arrows or messy layouts.' },
              { icon: Download, title: 'One-Click Delivery', desc: 'Instant downloads ready for your technical docs.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500/10 transition-colors">
                  <item.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{item.title}</h3>
                  <p className="text-sm text-purple-200/40">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 p-6 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2 text-purple-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Alpha Access</span>
          </div>
          <p className="text-purple-100/70 text-sm leading-relaxed">
            "Our team now spends less time drafting diagrams and more time refining solutions thanks to FlowGen."
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-6 lg:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md space-y-8 py-12">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold text-white tracking-tight">Create Account</h2>
            {/* <p className="mt-2 text-purple-200/50">Start your 14-day pro trial today.</p> */}
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-[2rem] blur-xl"></div>

            <div className="relative bg-white/[0.02] border border-white/10 backdrop-blur-3xl p-8 rounded-[2rem] shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-purple-300/40 mb-2 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/40" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder:text-purple-300/10 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                        placeholder="Elon Musk"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-purple-300/40 mb-2 ml-1">Work Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/40" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder:text-purple-300/10 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                        placeholder="elon@spacex.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-purple-300/40 mb-2 ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/40" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-12 pr-12 py-3 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder:text-purple-300/10 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                        placeholder="••••••••"
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/30 hover:text-purple-300">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {/* Strength Meter Redesign */}
                    {formData.password && (
                      <div className="mt-3 px-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] text-purple-300/40 uppercase tracking-tighter">Security Strength</span>
                          <span className={`text-[10px] font-bold ${passwordStrength.label === 'Strong' ? 'text-emerald-400' : 'text-purple-300/60'}`}>{passwordStrength.label}</span>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3].map((step) => (
                            <div key={step} className={`h-1 flex-1 rounded-full transition-all duration-500 ${passwordStrength.strength >= step ? passwordStrength.color : 'bg-white/5'}`} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-purple-300/40 mb-2 ml-1">Confirm</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/40" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full pl-12 pr-12 py-3 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder:text-purple-300/10 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500/40"
                  />
                  <label htmlFor="terms" className="text-xs text-purple-200/40 leading-relaxed">
                    I agree to the <span className="text-purple-300 hover:text-white cursor-pointer transition-colors">Terms of Service</span> and <span className="text-purple-300 hover:text-white cursor-pointer transition-colors">Privacy Policy</span>.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl font-bold shadow-[0_10px_20px_rgba(168,85,247,0.2)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? 'Creating Account...' : 'Get Started Now'}
                  {!isLoading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] text-center uppercase tracking-widest font-bold">
                  {error}
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-purple-200/30 text-sm">
            Already a member?{' '}
            <Link href="/login" className="text-white hover:text-purple-300 font-semibold transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
