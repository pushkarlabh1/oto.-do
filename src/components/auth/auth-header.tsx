
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function AuthHeader() {
  return (
    <header className="py-4 bg-white sticky top-0 z-40 border-b">
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-3xl font-bold text-primary">
          oto.do
        </Link>
        <nav className="flex items-center gap-2">
          <Link href="/login" passHref>
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup" passHref>
            <Button>Sign Up</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
