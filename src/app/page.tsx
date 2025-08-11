import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Integrations } from '@/components/landing/integrations';
import { CustomIntegration } from '@/components/landing/custom-integration';
import { Footer } from '@/components/landing/footer';
import { Chatbot } from '@/components/chatbot/chatbot';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Integrations />
        <CustomIntegration />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
