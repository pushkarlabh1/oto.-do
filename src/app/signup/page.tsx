
'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SignupForm } from '@/components/signup/signup-form';
import { AuthHeader } from '@/components/auth/auth-header';
import { useAuth } from '@/context/auth-context';
import { Loader2 } from 'lucide-react';


function SignupPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { currentUser, loading } = useAuth();
  const source = searchParams.get('source');
  const agent = searchParams.get('agent');

  useEffect(() => {
    if (!loading && currentUser) {
      router.replace('/dashboard');
    }
  }, [currentUser, loading, router]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <SignupForm source={source} agent={agent} />
      </div>
    </>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupPageContent />
    </Suspense>
  )
}
