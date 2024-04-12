import axios from "axios";
import { NextResponse } from "next/server";

const ACCESS_TOKEN_ROUTE = "https://services.leadconnectorhq.com/oauth/token";
const { AUTH_BUDDY_CLIENT_ID, AUTH_BUDDY_CLIENT_SECRET, NEXTAUTH_URL } =
  process.env;
const GRANT_TYPE = "authorization_code";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  try {
    const { data } = await axios.post(
      ACCESS_TOKEN_ROUTE,
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
    return NextResponse.redirect(`${NEXTAUTH_URL}/agencies`);
    // return Response.json({ code, status: "ok", data });
  } catch (error) {
    console.log(error);
    return Response.json({ error: true });
  }
}
