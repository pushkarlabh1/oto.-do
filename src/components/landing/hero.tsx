import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section
    className="text-center px-4 pt-10 pb-20 sm:pt-14 sm:pb-28" style={{ backgroundColor: "#f9f7ff" }}   >
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
        <h1 className="text-4xl font-bold text-primary font-headline sm:text-8xl md:text-[#6F5CFF]">
          oto.do
        </h1>

        <p className="mx-auto mt-4 max-w-4xl text-lg text-muted-foreground sm:text-2xl">
          Put automations & agents to work for important stuff in your life.
        </p>
        <div className="mt-8">
          <Button size="lg" className="shadow-lg text-lg sm:text-xl md:text-2xl font-semibold text-white px-6 sm:px-8 hover:font-bold hover:bg-[#5a59de]" style={{ backgroundColor: "#6F5CFF" }} >
            Sign up for the waitlist &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
}
