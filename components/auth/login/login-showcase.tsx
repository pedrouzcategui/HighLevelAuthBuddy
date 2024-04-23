"use client";

import { Separator } from "@/components/ui/separator";
import { LoginForm } from "./login-form";
import { ProvidersAuthButtons } from "./provider-auth-buttons";

const SUCCESS_LOGIN_REDIRECTION = "/dashboard";

export function LoginShowcase() {
  return (
    <section className="space-y-6">
      <div className="space-y-10">
        <LoginForm redirectionUrl={SUCCESS_LOGIN_REDIRECTION} />

        <div className="relative flex justify-center">
          <Separator />
          <span className="inline-block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-muted-foreground">
            or you can sign in with
          </span>
        </div>
      </div>

      <ProvidersAuthButtons redirectionUrl={SUCCESS_LOGIN_REDIRECTION} />
    </section>
  );
}
