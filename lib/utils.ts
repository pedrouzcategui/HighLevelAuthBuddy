import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const { AUTH_BUDDY_REDIRECT_URI, AUTH_BUDDY_CLIENT_ID } = process.env;

export function buildAuthorizationPageURL(scopes?: string[]): string {
  const BASE_URL = "https://marketplace.gohighlevel.com/oauth/chooselocation";
  let authorizationPageURL = new URL(BASE_URL);
  authorizationPageURL.searchParams.append("response_type", "code");
  authorizationPageURL.searchParams.append(
    "redirect_uri",
    AUTH_BUDDY_REDIRECT_URI,
  );
  authorizationPageURL.searchParams.append("client_id", AUTH_BUDDY_CLIENT_ID);
  authorizationPageURL.searchParams.append(
    "scope",
    "contacts.write%20locations.readonly",
  );

  return authorizationPageURL.toString();
}
