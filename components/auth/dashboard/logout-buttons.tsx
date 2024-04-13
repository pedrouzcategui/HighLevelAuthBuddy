"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <Button
      onClick={async () => await signOut({ callbackUrl: "/auth/login" })}
      variant="destructive"
    >
      Sign out
    </Button>
  );
}
