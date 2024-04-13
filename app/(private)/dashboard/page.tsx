import { LogoutButton } from "@/components/auth/dashboard/logout-buttons";
import { getServerSession } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession();

  console.log(session?.user.userId);

  return (
    <div>
      <h1>This is the dashboard</h1>

      <LogoutButton />
    </div>
  );
}
