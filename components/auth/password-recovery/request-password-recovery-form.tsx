"use client";

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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const requestPasswordRecoverySchema = z.object({
  email: z.string().email(),
});

type RequestPasswordRecoveryValues = z.infer<
  typeof requestPasswordRecoverySchema
>;

export function RequestPasswordRecoveryForm() {
  const form = useForm<RequestPasswordRecoveryValues>({
    resolver: zodResolver(requestPasswordRecoverySchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(formValues: RequestPasswordRecoveryValues) {
    try {
      const { email } = formValues;

      console.log(email);
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

        <Button className="w-full" type="submit">
          Reset password
        </Button>
      </form>
    </Form>
  );
}
