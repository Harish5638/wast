
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, Target } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find(p => p.id === 'login-background');

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-card/50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">About Us</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We are a passionate team dedicated to creating a sustainable future by transforming food waste into a valuable resource.
            </p>
          </div>
        </section>

        <section id="our-story" className="py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Our Story</h2>
                        <p className="text-muted-foreground text-lg">
                            Food Waste Management System was born from a simple observation: perfectly good food was being thrown away while people in our community were going hungry.
                        </p>
                        <p className="text-muted-foreground text-lg">
                            We saw a broken link in the chain and knew we had to build a bridge. Our mission is to create a simple, community-driven solution to redirect surplus food, nourish lives, and build a more sustainable future.
                        </p>
                    </div>
                     <div className="relative h-96 rounded-2xl shadow-lg overflow-hidden">
                        {aboutImage && (
                            <Image
                                src={aboutImage.imageUrl}
                                alt={aboutImage.description}
                                data-ai-hint={aboutImage.imageHint}
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">To bridge the gap between food surplus and food scarcity, creating a circular economy that benefits both people and the planet.</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">A world where no edible food goes to waste, and every community has access to nutritious meals.</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">Our Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We empower individuals, businesses, and organizations to become agents of change in their own neighborhoods.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
