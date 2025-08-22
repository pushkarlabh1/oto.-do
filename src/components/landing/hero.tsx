"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export function Hero() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const handleWaitlistClick = () => {
    if (currentUser) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  };

  return (
    <section
      className="text-center px-4 pt-10 pb-20 sm:pt-14 sm:pb-28"
      style={{ backgroundColor: "#f9f7ff" }}
    >
      <div className="container mx-auto">
        <div className="mx-auto flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="oto.do logo"
            width={160}
            height={160}
            className="h-40 w-40"
            data-ai-hint="logo"
          />
        </div>
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-primary font-headline md:text-[#6F5CFF]">
          oto.do
        </h1>

        <p className="mx-auto mt-4 max-w-4xl text-lg text-muted-foreground sm:text-2xl">
          Automation agents for a simpler life
        </p>
        <div className="mt-8">
          <Button
            size="lg"
            onClick={handleWaitlistClick}
            className="shadow-lg text-lg sm:text-xl md:text-2xl font-semibold text-white px-6 sm:px-8 hover:font-bold hover:bg-[#5a59de]"
            style={{ backgroundColor: "#6F5CFF" }}
          >
            Sign up for the waitlist &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
}
