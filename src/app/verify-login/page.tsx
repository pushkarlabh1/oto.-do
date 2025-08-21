
'use client';

import { VerifyLoginOtpForm } from '@/components/auth/verify-login-otp-form';
import { AuthHeader } from '@/components/auth/auth-header';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function VerifyLoginContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source');
  const agent = searchParams.get('agent');

  return (
    <>
      <AuthHeader />
      <div className="flex items-start justify-center min-h-screen bg-[#F9F7FE] pt-20">
        <VerifyLoginOtpForm source={source} agent={agent} />
      </div>
    </>
  );
}

export default function VerifyLoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyLoginContent />
        </Suspense>
    )
}
