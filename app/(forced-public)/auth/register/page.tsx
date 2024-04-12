import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/register/register-form";
import Link from "next/link";

export default function Register() {
  return (
    <main className="h-screen grid place-items-center">
      <Card className="w-[440px] p-4">
        <CardHeader className="text-center">
          <CardTitle>Register in Auth Buddy</CardTitle>

          {/* TODO: add hook text for registering */}
          <CardDescription>Some hook text?</CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />
        </CardContent>

        <CardFooter>
          <span className="block w-full text-center text-muted-foreground text-sm">
            {"Already have an account? "}
            <Link className="text-primary font-semibold" href="/auth/login">
              Sign in here
            </Link>
          </span>
        </CardFooter>
      </Card>
    </main>
  );
}
