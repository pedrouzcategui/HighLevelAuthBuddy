"use client";

import { type RegisterUserPayload } from "@/app/api/auth/register/route";
import { ButtonLoading } from "@/components/common/button-loading";
import { InputPassword } from "@/components/common/forms/password-field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterUser } from "@/hooks/auth/register";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";

/**
 * List of rules for strong password validation.
 */
const PASSWORD_RULES = [
  {
    message: "Should contain at least 8 characters",
    validator: function hasMinLength(password: string) {
      const MIN_PASSWORD_LENGTH = 8;
      return password.length >= MIN_PASSWORD_LENGTH;
    },
  },
  {
    message: "Should contain at least one digit",
    validator: function hasDigit(password: string) {
      return /[0-9]/.test(password);
    },
  },
  {
    message: "Should contain at least one uppercase character",
    validator: function hasUppercase(p: string) {
      return /[A-Z]/.test(p);
    },
  },
  {
    message: "Should contain at least one lowercase character",
    validator: function hasLowercase(p: string) {
      return /[a-z]/.test(p);
    },
  },
  {
    message: "Should contain at least one special character",
    validator: function hasSpecialCharacter(p: string) {
      return /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~]/.test(p);
    },
  },
];

type PasswordRuleProps = {
  isValid: boolean;
  message: string;
};

function PasswordRule({ isValid, message }: PasswordRuleProps) {
  return (
    <li
      className={cn(
        "text-sm flex items-center gap-2",
        isValid ? "text-success" : "text-destructive",
      )}
    >
      {isValid ? (
        <CircleCheckIcon className="h-5 w-5 stroke-success" />
      ) : (
        <CircleXIcon className="h-5 w-5 stroke-destructive" />
      )}
      {message}
    </li>
  );
}

type PasswordValidationRulesProps = {
  password: string;
};

function PasswordValidationRules({ password }: PasswordValidationRulesProps) {
  return (
    <ul className="flex flex-col gap-2 justify-center bg-muted p-4 rounded-md">
      {PASSWORD_RULES.map(({ message, validator }) => (
        <PasswordRule
          key={message}
          isValid={validator(password)}
          message={message}
        />
      ))}
    </ul>
  );
}

const registerSchema = z
  .object({
    name: z.string().min(3, "Full name is too short"),

    // TODO: phone number validation
    phone: z.string().min(1),
    email: z.string().email(),

    password: z.string().refine(function validatePasswordRules(password) {
      return PASSWORD_RULES.every((r) => r.validator(password));
    }),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const { mutateAsync, isPending } = useRegisterUser();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });

  async function onSubmit(formValues: RegisterFormValues) {
    try {
      const payload = {
        email: formValues.email,
        name: formValues.name,
        password: formValues.password,
        phone: formValues.phone,
      } satisfies RegisterUserPayload;

      await mutateAsync(payload);

      router.replace("/auth/login");
    } catch (err) {
      // TODO: handle with toast
      alert(
        "user already registered? Something went wrong in user registration",
      );
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <div className="space-y-4">
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      className={cn(fieldState.error && "border-destructive")}
                      type="text"
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="123123" type="tel" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className={cn(fieldState.error && "border-destructive")}
                    type="email"
                    placeholder="johndoe@test.com"
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
                <FormLabel>Password</FormLabel>

                <div className="flex flex-col gap-4">
                  <FormControl>
                    <InputPassword error={fieldState.error} {...field} />
                  </FormControl>

                  <PasswordValidationRules password={form.watch("password")} />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <InputPassword error={fieldState.error} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ButtonLoading className="w-full" type="submit" isLoading={isPending}>
          Create account
        </ButtonLoading>
      </form>
    </Form>
  );
}
