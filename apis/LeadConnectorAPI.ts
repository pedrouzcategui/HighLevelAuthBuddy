import { Location } from "@prisma/client";
import axios from "axios";
import { LocationClass, LocationResponse } from "./types/LocationResponse";
import { AuthorizationResponse } from "./types/AuthorizationResponse";

const BASE_URL = "https://services.leadconnectorhq.com";
const VERSION_DATE = "2021-07-28";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const LeadConnectorAPI = {
  getLocation: async function (
    locationId: string,
    accessToken: string,
  ): Promise<LocationClass> {
    let {
      data: { location },
    } = await api.get<LocationResponse>(`/locations/${locationId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        Version: VERSION_DATE,
      },
    });

    return location;
  },

  getLocations: function (companyId: string): Location[] {
    api.get("/");
    return [];
  },

  searchLocation: function (search_value: string) {
    api.get("/");
  },

  getAgency: function (companyId: string) {
    api.get("/");
  },

  getAuthorizationObject: async function (
    clientId: string,
    clientSecret: string,
    code: string,
  ): Promise<AuthorizationResponse> {
    let { data: AuthorizationObject } = await api.post<AuthorizationResponse>(
      "/oauth/token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      },
    );
    return AuthorizationObject;
  },
};
