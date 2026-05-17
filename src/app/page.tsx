import Image from 'next/image';
import Link from 'next/link';
import {
  Apple,
  Search,
  HandPlatter,
  Truck,
  HeartHandshake,
  ArrowRight,
  Heart,
  PawPrint,
  Recycle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { PlaceHolderImages as placeholderImages } from '@/lib/placeholder-images';

const howItWorks = [
  {
    icon: <Apple className="w-8 h-8 text-primary" />,
    title: 'Add Food',
    description: 'Donors list surplus food with details and photos.',
  },
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: 'Browse',
    description: 'Receivers browse available donations near them.',
  },
  {
    icon: <HandPlatter className="w-8 h-8 text-primary" />,
    title: 'Claim',
    description: 'Receivers claim the food they can use.',
  },
  {
    icon: <Truck className="w-8 h-8 text-primary" />,
    title: 'Pickup',
    description: 'Volunteers pick up and deliver the donations.',
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-primary" />,
    title: 'Make Impact',
    description: 'Everyone contributes to reducing waste and feeding the community.',
  },
];

const impactTiers = [
  {
    icon: <Heart className="w-8 h-8 text-primary" />,
    title: 'Edible',
    description: 'Safe for human consumption. This food goes directly to community centers, shelters, and food banks to feed people.',
  },
  {
    icon: <PawPrint className="w-8 h-8 text-primary" />,
    title: 'Usable',
    description: 'Not suitable for humans but perfect for animals. This tier supports local farms, animal shelters, and wildlife rehabilitators.',
  },
  {
    icon: <Recycle className="w-8 h-8 text-primary" />,
    title: 'Compost',
    description: 'Biodegradable scraps that are turned into nutrient-rich compost for community gardens and local agriculture.',
  },
];

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative py-20 md:py-32 bg-card/50 overflow-hidden">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tight">
                Food Waste Management System
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl">
                Turn Surplus Into Hope. <br />
                Donate food, help the community, feed strays, reduce waste.
              </p>
              <Button asChild size="lg" className="group shadow-lg hover:shadow-primary/20 transition-all">
                <Link href="/login">
                  Donate Food <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="relative h-64 md:h-96 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 delay-300 duration-1000">
               {heroImage && (
                 <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    fill
                    priority
                    className="object-cover"
                 />
                )}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 md:py-28 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground text-lg">
                A simple, streamlined process to connect food donors with those in need.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {howItWorks.map((step, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                  <CardHeader className="items-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                      {step.icon}
                    </div>
                    <CardTitle className="font-headline text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="impact-tiers" className="py-20 md:py-28 bg-card/50 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 fill-mode-both">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Our Impact Tiers</h2>
              <p className="text-muted-foreground text-lg">
                Our AI categorizes every donation to maximize its potential and ensure nothing goes to waste.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {impactTiers.map((tier) => (
                <Card key={tier.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                  <CardHeader className="items-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                      {tier.icon}
                    </div>
                    <CardTitle className="font-headline text-xl">{tier.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tier.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
