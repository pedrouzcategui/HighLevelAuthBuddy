import { AuthBuddyAPI } from "@/apis/AuthBuddy/AuthBuddyAPI";
import CopyButton from "@/components/authbuddy/CopyButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthBuddyApiKeysPage() {
  const session = await getServerSession();
  if (!session) redirect("/auth/login");

  const apiKeyObject = await AuthBuddyAPI.getApiKey(session.user.id);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Auth Buddy API Key</h2>
      </div>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">
          {apiKeyObject?.apiKey.slice(0, 30)}*******
        </h1>
        <CopyButton valueToCopy={apiKeyObject?.apiKey ?? ""} />
      </div>
    </div>
  );
}
