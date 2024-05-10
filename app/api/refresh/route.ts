import { LeadConnectorAPI } from "@/apis/LeadConnector/LeadConnectorAPI";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

const { AUTH_BUDDY_CLIENT_ID, AUTH_BUDDY_CLIENT_SECRET } = process.env;

export async function POST(request: Request) {
  try {
    const RefreshObject = await LeadConnectorAPI.refreshToken(
      AUTH_BUDDY_CLIENT_ID,
      AUTH_BUDDY_CLIENT_SECRET,
      "refresh_token",
      "REFRESH TOKEN GOES HERE",
      "Location",
    );
    return NextResponse.json({ RefreshObject });
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) return NextResponse.json({ error });
  }
}
