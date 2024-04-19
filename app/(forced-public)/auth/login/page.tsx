import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginShowcase } from "@/components/auth/login/login-showcase";
import Link from "next/link";

export default async function Login() {
  return (
    <main className="h-screen grid place-items-center">
      <Card className="w-[440px] p-4">
        <CardHeader className="text-center">
          <CardTitle>Welcome to Auth Buddy</CardTitle>
          <CardDescription>
            {"Do not have an account yet? "}
            <Link href="/auth/register" className="text-primary font-semibold">
              Sign up
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginShowcase />
        </CardContent>
      </Card>
    </main>
  );
}
