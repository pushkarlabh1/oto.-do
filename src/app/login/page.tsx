
'use client';

import { LoginForm } from '@/components/login/login-form';
import { AuthHeader } from '@/components/auth/auth-header';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { AuthFooter } from '@/components/auth/auth-footer';
import { Separator } from '@/components/ui/separator';

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
    <div className="flex flex-col min-h-screen bg-[#F9F7FE]">
      <AuthHeader />
      <main className="flex-grow flex items-start justify-center pt-20">
        <LoginForm />
      </main>
      <Separator />
      <AuthFooter />
    </div>
  );
}
