"use client";

import { type RegisterUserPayload } from "@/app/api/auth/register/route";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterUser } from "@/hooks/auth/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),

  // TODO: phone number validation
  phone: z.string().min(1),

  // TODO: password strength validation should be here? I think so
  // For the moment; consider 8 length password a "FULL STRENGTH PASSWORD NEVER BE HACKED"
  password: z.string().min(8),

  // TODO: custom validator for checking if its value is same as `password` field
  confirmPassword: z.string().min(8),
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="+58 000-000-000"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@test.com"
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* TODO: create loading button state */}
        <Button className="w-full" type="submit" disabled={isPending}>
          Create account
        </Button>
      </form>
    </Form>
  );
}
