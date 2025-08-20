
"use client";

import Link from 'next/link';

export function AuthHeader() {
  return (
    <header className="py-4 bg-white sticky top-0 z-40 border-b">
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold text-primary">
          oto.do
        </Link>
      </div>
    </header>
  );
}
