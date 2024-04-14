import { Company, Location } from "@prisma/client";
import axios from "axios";
import { LocationResource, LocationResponse } from "./types/LocationResponse";
import { AuthorizationResponse } from "./types/AuthorizationResponse";
import { CompanyResource, CompanyResponse } from "./types/CompanyResponse";

const BASE_URL = "https://services.leadconnectorhq.com";
const VERSION_DATE = "2021-07-28";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const LeadConnectorAPI = {
  getLocation: async function (
    locationId: string,
    accessToken: string,
  ): Promise<LocationResource> {
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

  getCompany: async function (
    companyId: string,
    accessToken: string,
  ): Promise<CompanyResource> {
    const {
      data: { company },
    } = await api.get<CompanyResponse>(`/companies/${companyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Version: VERSION_DATE,
        Accept: "application/json",
      },
    });

    return company;
  },

  createCompany: async function (): Promise<Company> {
    return {} as Company;
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
