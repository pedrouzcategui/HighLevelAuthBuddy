"use client";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import {
  ErrorContainer,
  type ErrorContainerProps,
} from "@/components/common/error-container";
import { type Dispatch, type SetStateAction, useState } from "react";
import { EyeIcon, EyeOffIcon, ShieldOffIcon } from "lucide-react";
import { ButtonLoading } from "@/components/common/button-loading";
import { cn } from "@/lib/utils";
import Link from "next/link";

type AuthProviders = "google";
const SUCCESS_LOGIN_REDIRECTION = "/dashboard";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginFormProps = {
  setError: Dispatch<SetStateAction<ErrorContainerProps | null>>;
};

function LoginForm({ setError }: LoginFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingPassword, setIsShowingPassword] = useState(false);

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
  const [error, setError] = useState<ErrorContainerProps | null>(null);

  return (
    <section className="space-y-6">
      {error && <ErrorContainer {...error} />}

      <div className="space-y-10">
        <LoginForm setError={setError} />

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
