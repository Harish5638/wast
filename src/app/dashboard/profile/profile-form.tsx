"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { updateProfile } from "./actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  avatarUrl: z.string().url({ message: "Please enter a valid URL." }).or(z.literal("")),
  description: z.string().max(500, {
    message: "Description must not exceed 500 characters.",
  }),
});

interface ProfileFormProps {
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
    description?: string;
  };
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { data: session, update } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      avatarUrl: user.avatarUrl || "",
      description: user.description || "",
    },
  });

  const avatarUrl = form.watch("avatarUrl");

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setLoading(true);
    const result = await updateProfile(values);
    setLoading(false);

    if (result.success) {
        // Trigger session update for the layout/header
        await update({
            ...session,
            user: {
                ...session?.user,
                name: values.name,
                avatarUrl: values.avatarUrl,
            },
        });

        toast({
            title: "Success",
            description: result.message,
        });
        router.refresh();
    } else {
        toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b">
             <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl || user.avatarUrl} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center md:text-left">
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
        </div>

        <div className="grid gap-6">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="avatarUrl"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Avatar URL</FormLabel>
                <FormControl>
                    <Input placeholder="https://unsplash.com/photos/..." {...field} />
                </FormControl>
                <FormDescription>
                    Provide a valid image URL for your profile picture.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                <FormLabel>About You</FormLabel>
                <FormControl>
                    <Textarea 
                        placeholder="Tell us about yourself or your organization..." 
                        className="min-h-[120px] resize-none"
                        {...field} 
                    />
                </FormControl>
                <FormDescription>
                    Max 500 characters. This will be seen by others in the community.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Save Profile Changes"}
        </Button>
      </form>
    </Form>
  );
}
