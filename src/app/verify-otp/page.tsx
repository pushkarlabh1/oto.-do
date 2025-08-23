
'use client';

import { VerifyOtpForm } from '@/components/auth/verify-otp-form';
import { AuthHeader } from '@/components/auth/auth-header';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AlertCircle } from 'lucide-react';
import { AuthFooter } from '@/components/auth/auth-footer';
import { Separator } from '@/components/ui/separator';

function VerifyOtpContent() {
  const searchParams = useSearchParams();
  const isNewUser = searchParams.get('new_user') === 'true';
  const source = searchParams.get('source');
  const agent = searchParams.get('agent');
  
  useEffect(() => {
    if (isNewUser) {
      toast.custom(
        (t) => (
          <div
            className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out toast-one-line
              ${t.visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
          >
            <div className="flex items-center p-4">
              <AlertCircle className="h-6 w-6" style={{ color: '#FBBF24' }} />
              <p className="ml-3 font-semibold" style={{ color: '#6469ed' }}>
                It seems your account isn’t set up yet. Please enter the OTP to complete the signup process.
              </p>
            </div>
          </div>
        ),
        {
          // Override container style to remove default padding
          // so the custom toast can sit at the very top.
          containerStyle: {
            top: 20,
            left: 20,
            right: 20,
            padding: 0
          }
        }
      );
    }
    // Dismiss all toasts on component unmount to prevent them from lingering
    return () => {
      toast.dismiss();
    }
  }, [isNewUser]);
  
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F7FE]">
      <AuthHeader />
      <main className="flex-grow flex flex-col items-center pt-20 gap-8 w-full">
        <VerifyOtpForm source={source} agent={agent} />
      </main>
      <Separator />
      <AuthFooter />
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  )
}
