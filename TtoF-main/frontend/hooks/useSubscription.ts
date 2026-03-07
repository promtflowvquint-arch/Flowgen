'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

export const useSubscription = () => {
    const [isPaid, setIsPaid] = useState<boolean | null>(null);
    const [hasAccess, setHasAccess] = useState<boolean | null>(null);
    const [subscriptionData, setSubscriptionData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkStatus = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/payments/status');
            setIsPaid(response.data.isPaid);
            setHasAccess(response.data.isPaid); // Normally access = paid in strict mode
            setSubscriptionData(response.data);
        } catch (err) {
            console.error('Failed to check subscription status');
            // Graceful fallback for demo purposes
            setIsPaid(false);
            setHasAccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const tempAccess = localStorage.getItem('temp_access'); // 'starter' or 'pro'

        if (tempAccess) {
            setIsPaid(tempAccess === 'pro');
            setHasAccess(true); // Always true for any bypass
            setIsLoading(false);
            // Mock data for bypass
            setSubscriptionData({
                isPaid: tempAccess === 'pro',
                plan: tempAccess === 'pro' ? 'Pro Engine' : 'Starter',
                expiry: tempAccess === 'pro' ? '2026-04-07' : 'N/A',
                promptsRemaining: tempAccess === 'pro' ? 'Unlimited' : 3
            });
        } else if (isLoggedIn) {
            checkStatus();
        } else {
            setIsPaid(false);
            setHasAccess(false);
            setIsLoading(false);
        }
    }, []);

    return { isPaid, hasAccess, subscriptionData, isLoading, checkStatus };
};
