"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlertIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const SignInView = () => {
  const [pending, setPending] = useState<boolean>(false);
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError("");
    setPending(true); // Set pending at the start

    try {
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      console.log(result);

      // Check if sign-in was successful
      if (result.data && !result.error) {
        // Only redirect on successful sign-in
        router.push("/dashboard"); // or wherever you want to redirect after successful login
      } else {
        // Handle the case where result has an error
        setError(result.error?.message || "Sign in failed");
      }
    } catch (err: any) {
      setError(
        err?.data?.message || err?.message || "Invalid email or password",
      );
    } finally {
      setPending(false); // Always reset pending state
    }
  };

  const onSocial = async (provider: "github" | "google") => {
    setError("");
    setPending(true);

    try {
      // Social login typically triggers a redirect, so we don't need to handle the result here
      // The auth client will handle the redirect to the OAuth provider
      await authClient.signIn.social({
        provider: provider,
        callbackURL: "/",
      });

      // Note: This code may not execute if the browser redirects immediately
      // The actual success handling should be done on the callback page
    } catch (err: any) {
      setError(err?.data?.message || err?.message || "Social sign in failed");
      setPending(false);
    }
    // Don't set pending to false here since the page will redirect
  };

  return (
    <div className="flex flex-col gap-8 h-full justify-center -mt-10 -mb-24">
      <Card className="overflow-hidden p-0 shadow-lg border-border/50">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="px-8 pt-8 pb-6 md:px-10 md:pt-10 md:pb-6 lg:px-12 lg:pt-12 lg:pb-6"
            >
              <div className="flex flex-col gap-8">
                <div className="flex flex-col items-center text-center space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Welcome Back
                  </h1>
                  <p className="text-muted-foreground text-balance text-sm">
                    Login to your account to continue
                  </p>
                </div>
                <div className="grid gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            className="h-11 transition-all focus:ring-2 focus:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            className="h-11 transition-all focus:ring-2 focus:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert
                    variant="destructive"
                    className="flex items-center gap-2 bg-destructive/10 border-destructive/20"
                  >
                    <OctagonAlertIcon className="h-4 w-4 shrink-0" />
                    <span className="text-sm">{error}</span>
                  </Alert>
                )}
                <Button
                  type="submit"
                  className="w-full h-11 text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                  disabled={pending}
                >
                  {pending ? "Signing In..." : "Sign In"}
                </Button>
                <div className="relative flex items-center my-2">
                  <div className="grow border-t border-border/60" />
                  <span className="mx-4 bg-card text-muted-foreground text-xs font-medium relative z-10 px-3 uppercase tracking-wide">
                    Or Continue With
                  </span>
                  <div className="grow border-t border-border/60" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => onSocial("google")}
                  disabled={pending}
                  className="h-11 border-border/60 hover:border-border hover:bg-accent/50 transition-all shadow-sm hover:shadow"
                >
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={18}
                    height={18}
                    className="mr-2 inline-block"
                  />
                  <span className="text-sm font-medium">Google</span>
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => onSocial("github")}
                  disabled={pending}
                  className="h-11 border-border/60 hover:border-border hover:bg-accent/50 transition-all shadow-sm hover:shadow"
                >
                  <Image
                    src="/github.svg"
                    alt="GitHub"
                    width={18}
                    height={18}
                    className="mr-2 inline-block"
                  />
                  <span className="text-sm font-medium">GitHub</span>
                </Button>
              </div>
              <div className="text-center text-sm mt-6 pt-6 border-t border-border/40">
                <span className="text-muted-foreground">
                  Don&apos;t have an account?{" "}
                </span>
                <Link
                  href="/sign-up"
                  className="text-primary underline underline-offset-4 font-medium hover:text-primary/80 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </Form>
          <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-6 items-center justify-center p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Image
                  src="/logo.svg"
                  alt="Perfect Interview AI"
                  width={100}
                  height={100}
                  className="h-[100px] w-[100px] drop-shadow-lg"
                />
              </div>
              <p className="text-2xl font-semibold text-white tracking-tight">
                Perfect Interview AI
              </p>
              <p className="text-white/80 text-sm text-center max-w-xs">
                Your AI-powered interview preparation platform
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs leading-relaxed">
        By clicking Continue you agree to our{" "}
        <a
          // biome-ignore lint: No T&C for now
          href="#"
          className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          // biome-ignore lint: No Privacy Policy for now
          href="#"
          className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};
