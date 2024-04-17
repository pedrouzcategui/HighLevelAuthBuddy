import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginShowcase } from "@/components/auth/login/login-showcase";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Login() {

  const session = await getServerSession();

  if (session) {
    redirect('/dashboard')
  }

  return (
    <main className="h-screen grid place-items-center">
      <Card className="w-[440px] p-4">
        <CardHeader className="text-center">
          <CardTitle>Welcome to Auth Buddy</CardTitle>
          <CardDescription>
            Automate your GHL API Keys management
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginShowcase />
        </CardContent>
      </Card>
    </main>
  );
}
