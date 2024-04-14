import { LogoutButton } from "@/components/auth/dashboard/logout-buttons";

export default async function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <LogoutButton />
      </div>
    </div>
  );
}
