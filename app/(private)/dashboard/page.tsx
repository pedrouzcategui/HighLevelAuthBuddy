// TODO: obviously use client should not be here because this is a page xd
// Just for the moment dont worry

import { LogoutButton } from "@/components/auth/dashboard/logout-buttons";
import { getCurrentUser } from "@/lib/user";

export default async function Dashboard() {
  const user = await getCurrentUser();

  console.log(user);

  return (
    <div>
      <h1>This is the dashboard</h1>

      <LogoutButton />
    </div>
  );
}
