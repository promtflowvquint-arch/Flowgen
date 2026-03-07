'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DiagramGenerator from '@/components/DiagramGenerator';
import Header from '@/components/Header';
import { Loader2, ShieldAlert } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

export default function DashboardPage() {
  const router = useRouter();
  const { hasAccess, isLoading: isCheckingSub } = useSubscription();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setIsAuthChecking(false);
    }
  }, [router]);

  // Payment Gate Check
  useEffect(() => {
    if (!isCheckingSub && hasAccess === false) {
      router.push('/pricing');
    }
  }, [hasAccess, isCheckingSub, router]);

  if (isAuthChecking || isCheckingSub) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05010d]">
        <div className="text-center text-purple-200/40">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-lg font-medium">Verifying Access...</p>
        </div>
      </div>
    );
  }

  // If partially loaded but not allowed yet (safety fallback)
  if (hasAccess === false) return null;

  return (
    <div className="min-h-screen bg-[#05010d] flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 w-full overflow-hidden">
        <DiagramGenerator />
      </main>
    </div>
  );
}
