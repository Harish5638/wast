
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/lib/placeholder-data";

const testimonials = [
    {
        user: users[1], // Bella's Bake
        quote: "This platform has been a game-changer for our shelter. We now have a steady supply of fresh food that would have otherwise gone to waste. The volunteer network is incredible!",
    },
    {
        user: users[2], // Charlie Day
        quote: "As a volunteer, the process is so simple. I get a notification, pick up the donation, and drop it off. It's fulfilling to know I'm making a direct impact in my community.",
    },
    {
        user: users[0], // Alice Grey
        quote: "I always felt terrible about the food waste from my small cafe. Now, I can list my surplus in minutes, and it gets picked up by people who need it. Food Waste Management System is brilliant!",
    },
    {
        user: users[5], // Nourish Now
        quote: "Finding consistent, quality food sources was a constant struggle. Food Waste Management System has connected us with local businesses, providing nutritious food for our clients.",
    },
    {
        user: users[6], // George's Grill
        quote: "The AI categorization for 'Usable' food is fantastic. Our vegetable peelings and off-cuts now go to a local farm instead of the bin. It's a win-win for us and the environment.",
    },
    {
        user: users[4], // Evan Foster
        quote: "I only have a few hours to spare each week, but this platform lets me make a real difference. Driving a few miles to deliver food feels like a small effort for a huge reward.",
    },
]

export default function TestimonialsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-card/50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">What Our Community Says</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Real stories from the people making a difference.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col justify-between shadow-lg">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
                <CardHeader className="flex-row items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.user.avatarUrl} alt={testimonial.user.name} />
                    <AvatarFallback>{testimonial.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{testimonial.user.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{testimonial.user.role}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
