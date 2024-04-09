"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SiGoogle } from "@icons-pack/react-simple-icons";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // TODO: implement login with next auth
  function onSubmit(values: LoginFormValues) {
    console.log(values);
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
  return (
    <section className="space-y-4">
      <Button className="w-full bg-google border border-google text-card gap-2 hover:bg-google/85 hover:text-card transition-all duration-200">
        {/* Currently `@icons-pack/react-simple-icons library has type definitions conflicts with latest react types */}
        {/* @ts-expect-error [https://github.com/icons-pack/react-simple-icons/issues/219] */}
        <SiGoogle size={20} />
      </Button>
    </section>
  );
}

export default function Login() {
  return (
    <main className="h-screen grid place-items-center">
      <Card className="w-[440px] p-4">
        <CardHeader className="text-center">
          <CardTitle>Welcome to Auth Buddy</CardTitle>
          <CardDescription>
            Automate your GHL API Keys management
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
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
        </CardContent>
      </Card>
    </main>
  );
}
