'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Heart, Car } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const integrationCategories = {
  commute: {
    title: 'For daily commute',
    Icon: Car,
    integrations: [
      {
        title: 'Ride booking agent',
        description: 'Automates ride bookings across providers like Uber, OLA etc.',
        tag: 'Active',
      },
    ],
  },
  stock: {
    title: 'For stock investment',
    Icon: BarChart3,
    integrations: [
      {
        title: 'AI stock analyst agent',
        description: 'Smart assistant powered by AI analytics assists you in analysing news and stocks',
        tag: 'Coming soon',
      },
    ],
  },
  dating: {
    title: 'For dating',
    Icon: Heart,
    integrations: [
      {
        title: 'Auto swiping agent',
        description: 'Automatically swipes for you on dating apps based on your preference.',
        tag: 'Coming soon',
      },
    ],
  },
};

type IntegrationCardProps = {
  Icon?: LucideIcon;
  title: string;
  description: string;
  tag?: 'Active' | 'Coming soon';
};

function IntegrationCard({ Icon, title, description, tag }: IntegrationCardProps) {
  return (
    <Card className="w-full h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start mb-4">
          {Icon && (
            <div className="bg-primary/10 p-3 rounded-xl">
              <Icon className="w-14 h-14 text-primary" />
            </div>
          )}
          {tag && (
            <Badge
              variant={tag === 'Active' ? 'default' : 'secondary'}
              className={`${tag === 'Active' ? 'bg-green-300 text-green-800 border-transparent hover:bg-green-400' : ''} h-8 px-4 text-sm ml-auto`}
            >
              {tag}
            </Badge>
          )}
        </div>
        <div className="space-y-2">
          <CardTitle className="text-3xl font-bold">{title}</CardTitle>
          <CardDescription className="text-base font-medium text-muted-foreground !mt-1 text-left">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {tag === 'Active' ? (
            <>
              <Button
  variant="link"
  className="px-4 py-2 h-auto text-primary font-semibold text-black rounded-full border border-[#6F5CFF] hover:bg-[#6F5CFF] hover:text-white"
>
  Details
</Button>
<Button
  variant="link"
  className="px-4 py-2 h-auto text-primary font-semibold text-black rounded-full border border-[#6F5CFF] hover:bg-[#6F5CFF] hover:text-white"
>
  Pricing
</Button>

            </>
          ) : (
            <Button variant="primary" className="shadow-md bg-[#6563F2] hover:bg-[#5a59de] text-white font-bold px-7 py-2 rounded-full text-lg">
              Join waitlist &rarr;
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function Integrations() {
  const { commute, stock, dating } = integrationCategories;

  return (
    <section className="pt-8 pb-16 bg-white sm:pt-12 sm:pb-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-headline">Popular Integrations</h2>

        {/* The main grid for commute and stock, each with its own subheading */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* First column: Daily Commute */}
            <div className="flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-accent" />
                {commute.title}
              </h3>
              <div className="flex-1 flex">
                <IntegrationCard Icon={commute.Icon} {...commute.integrations[0]} />
              </div>
            </div>
            {/* Second column: Stock Investment */}
            <div className="flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gray-300" />
                {stock.title}
              </h3>
              <div className="flex-1 flex">
                <IntegrationCard Icon={stock.Icon} {...stock.integrations[0]} />
              </div>
            </div>
          </div>
        </div>

        {/* Dating integrations */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gray-300" />
            {dating.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {dating.integrations.map((integration, index) => (
              <IntegrationCard key={`dating-${index}`} Icon={dating.Icon} {...integration} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
