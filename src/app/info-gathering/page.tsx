
'use client';

import { InfoForm } from '@/components/info-gathering/info-form';
import { AuthHeader } from '@/components/auth/auth-header';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { AuthFooter } from '@/components/auth/auth-footer';
import { Separator } from '@/components/ui/separator';

function InfoGatheringContent() {
  const searchParams = useSearchParams();
  const agent = searchParams.get('agent');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F7FE]">
      <AuthHeader />
      <main className="flex-grow flex items-start justify-center pt-8 sm:pt-20">
        <InfoForm agent={agent} />
      </main>
      <Separator />
      <AuthFooter />
    </div>
  );
}

export default function InfoGatheringPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InfoGatheringContent />
    </Suspense>
  )
}
