import { Button } from "@/components/ui/button";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";

type AuthProviders = "google";

type ProvidersAuthButtonsProps = {
  redirectionUrl: string;
};

export function ProvidersAuthButtons({
  redirectionUrl,
}: ProvidersAuthButtonsProps) {
  async function handleSignIn(provider: AuthProviders) {
    try {
      await signIn(provider, { callbackUrl: redirectionUrl });
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
