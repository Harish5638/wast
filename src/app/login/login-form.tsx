"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { HandHeart, Truck, Building } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["donor", "volunteer", "organization"]).optional(),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "donor",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isSignUp && !values.role) {
      form.setError("role", { message: "Please select a role." });
      return;
    }
    
    try {
      if (isSignUp) {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email, password: values.password, role: values.role }),
        });
        if (!res.ok) {
          const data = await res.json();
          form.setError("root", { message: data.message || "Registration failed" });
          return;
        }
      }
      
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.error) {
        form.setError("root", { message: res.error });
        return;
      }

      toast({
        title: "Success!",
        description: isSignUp
          ? `Welcome! Your account has been created.`
          : `Welcome back!`,
      });
      router.push("/dashboard");
      router.refresh();
      
    } catch (error) {
       form.setError("root", { message: "An unexpected error occurred" });
    }
  }

  const roleOptions = [
    { value: "donor", label: "Donor / Contributor", icon: <HandHeart className="h-5 w-5" />, description: "Individuals or restaurants who donate food." },
    { value: "organization", label: "Organization / Receiver", icon: <Building className="h-5 w-5" />, description: "NGOs, shelters, and food banks who receive food." },
    { value: "volunteer", label: "Volunteer / Transporter", icon: <Truck className="h-5 w-5" />, description: "People who help move the food." },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSignUp && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Choose your role:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-2"
                  >
                    {roleOptions.map(option => (
                      <FormItem key={option.value} className="flex-1">
                        <Label
                          htmlFor={option.value}
                          className="flex flex-col p-4 border rounded-md cursor-pointer hover:border-primary data-[state=checked]:border-primary"
                        >
                            <div className="flex items-center space-x-3 mb-2">
                                <RadioGroupItem value={option.value} id={option.value} />
                                <div className="flex items-center gap-2">
                                    {option.icon}
                                    <span className="font-semibold">{option.label}</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground ml-7">{option.description}</p>
                        </Label>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {form.formState.errors.root && (
          <div className="text-sm font-medium text-destructive">
            {form.formState.errors.root.message}
          </div>
        )}
        <Button type="submit" className="w-full">
          {isSignUp ? "Sign Up" : "Login"}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="p-0 h-auto">
          {isSignUp ? "Login" : "Sign up"}
        </Button>
      </div>
    </Form>
  );
}
