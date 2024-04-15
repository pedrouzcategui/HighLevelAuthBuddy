import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/register/register-form";
import Link from "next/link";

export default function Register() {
  return (
    <main className="h-screen grid place-items-center">
      <Card className="w-[500px] p-4">
        <CardHeader className="text-center">
          <CardTitle>Register in Auth Buddy</CardTitle>
          <CardDescription>
            {"Already have an account? "}
            <Link href="/auth/login" className="text-primary font-semibold">
              Sign in
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </main>
  );
}
