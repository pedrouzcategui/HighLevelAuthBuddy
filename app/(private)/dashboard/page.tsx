import { LogoutButton } from "@/components/auth/dashboard/logout-buttons";

export default async function Dashboard() {
  return (
    <div>
      <h1>This is the dashboard</h1>
      <LogoutButton />
    </div>
  );
}
