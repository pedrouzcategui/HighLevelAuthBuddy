"use client";
// TODO: obviously use client should not be here because this is a page xd
// Just for the moment dont worry

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div>
      <h1>This is the dashboard</h1>

      <Button
        onClick={async () => await signOut({ callbackUrl: "/auth/login" })}
        variant="destructive"
      >
        Sign out
      </Button>
    </div>
  );
}
