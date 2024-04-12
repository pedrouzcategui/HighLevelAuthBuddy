"use client";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type AuthProviders = "google";
const SUCCESS_LOGIN_REDIRECTION = "/dashboard";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formValues: LoginFormValues) {
    try {
      const { email, password } = formValues;

      const authResponse = await signIn("credentials", {
        email,
        password,

        // Manual redirection because we dont want to arrive into default NextAuth pages
        // (and also dont want to configure them xd)
        redirect: false,
      });

      if (authResponse?.ok) {
        router.replace(SUCCESS_LOGIN_REDIRECTION);
        return;
      }

      // TODO: handle notification as toast or something
      alert("Invalid credentials");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johdoe@mail.com"
                    {...field}
                  />
                </FormControl>
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
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full" type="submit">
          Sign in
        </Button>
      </form>
    </Form>
  );
}

function ProvidersAuthButtons() {
  async function handleSignIn(provider: AuthProviders) {
    try {
      await signIn(provider, { callbackUrl: SUCCESS_LOGIN_REDIRECTION });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="space-y-4">
      <Button
        onClick={async () => await handleSignIn("google")}
        className="w-full bg-google border border-google text-card gap-2 hover:bg-google/85 hover:text-card transition-all duration-200"
      >
        {/* Currently `@icons-pack/react-simple-icons library has type definitions conflicts with latest react types */}
        {/* @ts-expect-error [https://github.com/icons-pack/react-simple-icons/issues/219] */}
        <SiGoogle size={20} />
      </Button>
    </section>
  );
}

export function LoginShowcase() {
  return (
    <section className="space-y-6">
      <div className="space-y-10">
        <LoginForm />

        <div className="relative flex justify-center">
          <Separator />
          <span className="inline-block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-muted-foreground">
            or you can sign in with
          </span>
        </div>
      </div>

      <ProvidersAuthButtons />
    </section>
  );
}
