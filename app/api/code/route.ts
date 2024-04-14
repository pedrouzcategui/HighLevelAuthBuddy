import { LeadConnectorAPI, api } from "@/apis/LeadConnectorAPI";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const { AUTH_BUDDY_CLIENT_ID, AUTH_BUDDY_CLIENT_SECRET } = process.env;
const GRANT_TYPE = "authorization_code";

interface AuthorizationResponse {
  access_token: string;
  refresh_token: string;
  userType: "Company" | "Location";
  companyId: string;
  locationId: string;
  userId: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  if (!code) {
    return Response.json({ error: true, status: 400 });
  }

  const session = await getServerSession();

  if (!session) {
    return Response.json({ error: true, status: 401 });
  }

  try {
    const { locationId, access_token } =
      await LeadConnectorAPI.getAuthorizationObject(
        AUTH_BUDDY_CLIENT_ID,
        AUTH_BUDDY_CLIENT_SECRET,
        code,
      );

    const Location = await LeadConnectorAPI.getLocation(
      locationId,
      access_token,
    );

    // const location = await db.location.create({
    //   data: {
    //     name: locationData.name,
    //     access_token: data.access_token,
    //     companyId: data.companyId,
    //     issueDate: new Date(),
    //     refresh_token: data.refresh_token,
    //   },
    // });

    return Response.json({ ...Location });
    // return NextResponse.redirect(`${NEXTAUTH_URL}/agencies`);
  } catch (error) {
    console.log(error);
    return Response.json({ error: true });
  }
}
