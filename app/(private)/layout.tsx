import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/login");
  }

  return <div>{children}</div>;
}
