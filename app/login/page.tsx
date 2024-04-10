import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginShowcase } from "@/components/login/login-showcase";

export default function Login() {
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
