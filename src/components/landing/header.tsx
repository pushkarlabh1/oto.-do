"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from 'next/link';

export function Header() {
  return (
    <header className="py-4 bg-white sticky top-0 z-40 border-b">
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold text-primary">
          oto.do
        </Link>
        
        <nav className="hidden md:flex items-center gap-3 " >
          <Link href="/login" passHref>
            <Button variant="ghost" className="hover:font-bold">Login</Button>
          </Link>
          <Link href="/signup" passHref>
            <Button className="hover:font-bold" >Sign Up</Button>
          </Link>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 p-6">
                <Link href="/" className="text-2xl font-bold text-primary mb-4">
                  oto.do
                </Link>
                <Link href="/login" passHref>
                  <Button variant="ghost" className="w-full justify-center text-lg">Login</Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button className="w-full text-lg " style={{ backgroundColor: "#6F5CFF" }}>Sign Up</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
