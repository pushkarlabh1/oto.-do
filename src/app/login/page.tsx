
'use client';

import { LoginForm } from '@/components/login/login-form';
import { AuthHeader } from '@/components/auth/auth-header';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser) {
      router.replace('/dashboard');
    }
  }, [currentUser, loading, router]);

  if (loading || currentUser) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-[#F9F7FE]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <AuthHeader />
      <div className="flex items-start justify-center min-h-screen bg-[#F9F7FE] pt-20">
        <LoginForm />
      </div>
    </>
  );
}
