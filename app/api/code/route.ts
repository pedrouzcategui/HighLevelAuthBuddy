import { api } from "@/apis/LeadConnectorAPI";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const { AUTH_BUDDY_CLIENT_ID, AUTH_BUDDY_CLIENT_SECRET, NEXTAUTH_URL } =
  process.env;
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

  const session = await getServerSession();

  try {
    const { data, statusText } = await api.post<AuthorizationResponse>(
      "/oauth/token",
      {
        client_id: AUTH_BUDDY_CLIENT_ID,
        client_secret: AUTH_BUDDY_CLIENT_SECRET,
        grant_type: GRANT_TYPE,
        code,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      },
    );

    return Response.json({ data });

    // const {
    //   data: { location: locationData },
    // } = await LeadConnectorAPI.get(`/locations/${data.locationId}`, {
    //   headers: {
    //     Authorization: `Bearer ${data.access_token}`,
    //     Version: "2021-07-28",
    //     Accept: "application/json",
    //   },
    // });

    // const location = await db.location.create({
    //   data: {
    //     name: locationData.name,
    //     access_token: data.access_token,
    //     companyId: data.companyId,
    //     issueDate: new Date(),
    //     refresh_token: data.refresh_token,
    //   },
    // });

    // return NextResponse.redirect(`${NEXTAUTH_URL}/agencies`);
  } catch (error) {
    console.log(error);
    return Response.json({ error: true });
  }
}
