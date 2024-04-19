import { RequestPasswordRecoveryForm } from "@/components/auth/password-recovery/request-password-recovery-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function RecoverPassword() {
  return (
    <main className="h-screen grid place-items-center">
      <Card className="w-[500px] p-4">
        <CardHeader>
          <CardTitle>Password recovery</CardTitle>
          <CardDescription>
            You will receive instructions for resetting your password
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RequestPasswordRecoveryForm />
        </CardContent>
      </Card>
    </main>
  );
}
