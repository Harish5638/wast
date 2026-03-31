import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "./login-form";
import { Icons } from "@/components/icons";
import { PlaceHolderImages as placeholderImages } from "@/lib/placeholder-images";

export default function LoginPage() {
    const bgImage = placeholderImages.find(p => p.id === 'login-background');
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
                <Icons.logo className="h-8 w-8 text-primary" />
                <span className="font-bold font-headline text-2xl">
                    Food Waste Management System
                </span>
            </Link>
            <h1 className="text-3xl font-bold font-headline">Join the Movement</h1>
            <p className="text-balance text-muted-foreground">
              Sign up or log in to start making a difference today.
            </p>
          </div>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            By signing up, you agree to our{" "}
            <Link href="#" className="underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {bgImage && (
            <Image
                src={bgImage.imageUrl}
                alt={bgImage.description}
                data-ai-hint={bgImage.imageHint}
                layout="fill"
                objectFit="cover"
                className="opacity-90"
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
         <div className="absolute bottom-10 left-10 text-white">
            <h2 className="font-headline text-4xl font-bold">"The best time to plant a tree was 20 years ago. The second best time is now."</h2>
            <p className="text-lg mt-2">- Chinese Proverb</p>
        </div>
      </div>
    </div>
  );
}
