import { AuthBuddyAPI } from "@/apis/AuthBuddy/AuthBuddyAPI";
import { LeadConnectorAPI } from "@/apis/LeadConnector/LeadConnectorAPI";
import { getServerSession } from "@/lib/auth";
import { NextResponse } from "next/server";

const { AUTH_BUDDY_CLIENT_ID, AUTH_BUDDY_CLIENT_SECRET, BASE_APP_URL } =
  process.env;

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
    return Response.json({ error: true, status: 400, message: "Bad Request" });
  }

  const session = await getServerSession();

  if (!session) {
    return Response.json({
      error: true,
      status: 401,
      message: "Unauthorized Request",
    });
  }

  console.log(session);

  try {
    const {
      locationId,
      companyId,
      access_token,
      userType,
      refresh_token,
      expires_in,
    } = await LeadConnectorAPI.getAuthorizationObject(
      AUTH_BUDDY_CLIENT_ID,
      AUTH_BUDDY_CLIENT_SECRET,
      code,
    );

    if (userType == "Company") {
      let companyRecord = await AuthBuddyAPI.getCompany(companyId);

      if (companyRecord)
        return NextResponse.redirect(`${BASE_APP_URL}/agencies`);

      const companyResponse = await LeadConnectorAPI.getCompany(
        companyId,
        access_token,
      );

      companyRecord = await AuthBuddyAPI.createCompany(
        companyId,
        companyResponse.name,
        session.user.id,
        access_token,
        refresh_token,
        expires_in,
      );

      return NextResponse.redirect(`${BASE_APP_URL}/agencies`);
    }

    // Location Logic
    const locationRecord = await AuthBuddyAPI.getLocation(locationId);

    if (locationRecord)
      return NextResponse.redirect(`${BASE_APP_URL}/agencies`);

    const locationResponse = await LeadConnectorAPI.getLocation(
      locationId,
      access_token,
    );

    const location = await AuthBuddyAPI.createLocation(
      locationResponse.name,
      access_token,
      refresh_token,
    );

    // return Response.json({ ...location });
    return NextResponse.redirect(`${BASE_APP_URL}/agencies`);
  } catch (error) {
    console.log(error);
    return Response.json({ error: true });
  }
}
