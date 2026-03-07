'use client';

import { useState } from 'react';
import api from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface RazorpayOptions {
    amount: number;
    currency: string;
    key: string;
    order_id: string;
    name: string;
    description: string;
    handler: (response: any) => void;
    prefill: {
        name?: string;
        email?: string;
        contact?: string;
    };
    theme: {
        color: string;
    };
}

export const useRazorpay = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const initiatePayment = async (amount: number, userEmail?: string) => {
        setIsProcessing(true);
        setError(null);

        try {
            // 1. Create Order on Backend
            const orderResponse = await api.post('/payments/create-order', {
                amount,
            });

            const { id: order_id, amount: orderAmount, currency, key } = orderResponse.data;

            // 2. Configure Razorpay Options
            const options: RazorpayOptions = {
                key: key || 'rzp_test_placeholder', // Should come from backend or env
                amount: orderAmount,
                currency: currency || 'INR',
                name: 'FlowGen Pro',
                description: 'AI Diagram Generator Subscription',
                order_id: order_id,
                handler: async (response: any) => {
                    try {
                        // 3. Verify Payment on Backend
                        await api.post('/payments/verify', {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        // Success! Reload or redirect
                        window.location.href = '/dashboard?payment=success';
                    } catch (err) {
                        setError('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    email: userEmail || '',
                },
                theme: {
                    color: '#9333ea', // Purple-600
                },
            };

            // 3. Open Razorpay Modal
            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                setError(response.error.description);
            });
            rzp.open();
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to initiate payment.');
        } finally {
            setIsProcessing(false);
        }
    };

    return { initiatePayment, isProcessing, error };
};
