
'use client';
import { EnterNameForm } from '@/components/auth/enter-name-form';
import { AuthHeader } from '@/components/auth/auth-header';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { AuthFooter } from '@/components/auth/auth-footer';
import { Separator } from '@/components/ui/separator';

function EnterNameContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source');
  const agent = searchParams.get('agent');

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F7FE]">
      <AuthHeader />
      <main className="flex-grow flex items-start justify-center pt-20">
        <EnterNameForm source={source} agent={agent} />
      </main>
      <Separator />
      <AuthFooter />
    </div>
  );
}


export default function EnterNamePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnterNameContent />
    </Suspense>
  )
}
