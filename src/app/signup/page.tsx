
'use client';

import { useEffect } from 'react';
import { SignupForm } from '@/components/signup/signup-form';
import { AuthHeader } from '@/components/auth/auth-header';

export default function SignupPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AuthHeader />
      <div className="flex items-start justify-center min-h-screen bg-[#F9F7FE] pt-20">
        <SignupForm />
      </div>
    </>
  );
}
