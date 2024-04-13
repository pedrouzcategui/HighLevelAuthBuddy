import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

// TODO: this function is not the right way to access to user id because session object could be built with needed data using
// next-auth callbacks without perform unneeded extra queries to database

/**
 * Get the current user
 * Only available in Server Components and API rotues (/app)
 */
export async function getCurrentUser() {
  const session = await getServerSession();
  if (!session?.user?.email) return null;

  const userDb = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!userDb) return null;

  return {
    ...session.user,
    id: userDb?.id,
  };
}
