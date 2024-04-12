"use client";

import { Alert, type AlertProps } from "@/components/common/alert";
import { ButtonLoading } from "@/components/common/button-loading";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  Form,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldOffIcon, EyeOffIcon, EyeIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

const SUCCESS_LOGIN_REDIRECTION = "/dashboard";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginFormProps = {
  redirectionUrl: string;
};

export function LoginForm({ redirectionUrl }: LoginFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [error, setError] = useState<AlertProps | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formValues: LoginFormValues) {
    try {
      setIsLoading(true);
      const { email, password } = formValues;

      const authResponse = await signIn("credentials", {
        email,
        password,

        // Manual redirection because we dont want to arrive into default NextAuth pages
        // (and also dont want to configure them xd)
        redirect: false,
      });

      if (authResponse?.status === 200) {
        router.replace(SUCCESS_LOGIN_REDIRECTION);
        return;
      }

      // TODO: Handle better error messages
      if (authResponse?.status === 401) {
        setError({
          title: "Authentication error",
          description: "Cannot find any account with given credentials.",
          Icon: ShieldOffIcon,
        });
      }
    } catch (err) {
      toast({
        title: "Oops! Something was broken. Try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {error && <Alert {...error} />}

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
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="johdoe@mail.com"
                      className={cn(fieldState.error && "border-destructive")}
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
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    Password
                  </FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isShowingPassword ? "text" : "password"}
                        placeholder={
                          isShowingPassword ? "supersecretpassword" : "******"
                        }
                        className={cn(fieldState.error && "border-destructive")}
                        {...field}
                      />

                      <Button
                        onClick={() => setIsShowingPassword(!isShowingPassword)}
                        asChild
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        variant="ghost"
                        size="icon"
                      >
                        {isShowingPassword ? (
                          <EyeOffIcon className="h-5 w-5 stroke-muted-foreground" />
                        ) : (
                          <EyeIcon className="h-5 w-5 stroke-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage />

                  <FormDescription>
                    <Link
                      href="/auth/password-recovery"
                      className="text-xs font-semibold hover:text-primary"
                    >
                      Forgot password?
                    </Link>
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <ButtonLoading isLoading={isLoading} className="w-full" type="submit">
            Sign in
          </ButtonLoading>
        </form>
      </Form>
    </div>
  );
}
