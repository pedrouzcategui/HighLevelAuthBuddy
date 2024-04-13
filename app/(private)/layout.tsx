import { getCurrentUser } from "@/lib/user";
import { redirect } from "next/navigation";
import React from "react";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <div>{children}</div>;
}
