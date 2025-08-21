
'use client';

import { InfoForm } from '@/components/info-gathering/info-form';
import { AuthHeader } from '@/components/auth/auth-header';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function InfoGatheringContent() {
  const searchParams = useSearchParams();
  const agent = searchParams.get('agent');

  return (
    <>
      <AuthHeader />
      <div className="flex items-start justify-center min-h-screen bg-[#F9F7FE] pt-20">
        <InfoForm agent={agent} />
      </div>
    </>
  );
}

export default function InfoGatheringPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InfoGatheringContent />
    </Suspense>
  )
}
