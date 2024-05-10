import { AuthBuddyAPI } from "@/apis/AuthBuddy/AuthBuddyAPI";
import { LeadConnectorAPI } from "@/apis/LeadConnector/LeadConnectorAPI";
import { getServerSession } from "@/lib/auth";
import { NextResponse } from "next/server";

const { AUTH_BUDDY_CLIENT_ID, AUTH_BUDDY_CLIENT_SECRET, BASE_APP_URL } =
  process.env;

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
      "authorization_code",
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

    const locationRecord = await AuthBuddyAPI.getLocation(locationId);

    if (locationRecord)
      return NextResponse.redirect(`${BASE_APP_URL}/agencies`);

    const locationResponse = await LeadConnectorAPI.getLocation(
      locationId,
      access_token,
    );

    await AuthBuddyAPI.createLocation(
      locationResponse.name,
      access_token,
      refresh_token,
      expires_in,
    );

    return NextResponse.redirect(`${BASE_APP_URL}/locations`);
  } catch (error) {
    return Response.json({ error: true });
  }
}
