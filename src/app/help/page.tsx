
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "Who can donate food?",
        answer: "Anyone! From individuals with extra groceries to restaurants with surplus meals, all are welcome. Just sign up as a 'Donor' to get started.",
    },
    {
        question: "What kind of food can I donate?",
        answer: "You can donate anything from fresh produce and cooked meals to packaged goods. Our AI system will help you categorize the donation as 'Edible' (for humans), 'Usable' (for animals), or 'Compost'.",
    },
    {
        question: "How does the pickup and delivery work?",
        answer: "Once a donation is claimed by an organization, our network of volunteer transporters is notified. A volunteer can then schedule a pickup and deliver the donation directly to the organization.",
    },
    {
        question: "How do I become a volunteer or an organization?",
        answer: "Simply choose your desired role during the sign-up process. As an organization, you'll be able to claim donations. As a volunteer, you'll be able to transport them.",
    },
    {
        question: "Is there a cost to use the platform?",
        answer: "No, Food Waste Management System is completely free to use for all donors, organizations, and volunteers. Our mission is to facilitate food rescue, not to create barriers.",
    }
]

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-card/50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">Help & FAQ</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Find answers to common questions about how the Food Waste Management System works.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
