import Link from "next/link";
import { Twitter, Facebook, Instagram } from "lucide-react";
import { Icons } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <Link href="/" className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <Icons.logo className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-lg">
                Food Waste Management System
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Connecting communities to reduce food waste and fight hunger.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Food Waste Management System. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
