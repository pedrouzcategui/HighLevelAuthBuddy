import { Company, Location } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { LocationResource, LocationResponse } from "./types/LocationResponse";
import { AuthorizationResponse } from "./types/AuthorizationResponse";
import { CompanyResource, CompanyResponse } from "./types/CompanyResponse";

const BASE_URL = "https://services.leadconnectorhq.com";
const VERSION_DATE = "2021-07-28";
type GRANT_TYPE = "authorization_code" | "refresh_token";
type USER_TYPE = "Company" | "Location";

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
    client_id: string,
    client_secret: string,
    code: string,
    grant_type: GRANT_TYPE,
  ): Promise<AuthorizationResponse> {
    let { data: AuthorizationObject } = await api.post<AuthorizationResponse>(
      "/oauth/token",
      {
        client_id,
        client_secret,
        grant_type,
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

  refreshToken: async function (
    client_id: string,
    client_secret: string,
    grant_type: GRANT_TYPE,
    refresh_token: string,
    user_type: USER_TYPE,
    redirect_uri?: string,
  ): Promise<AuthorizationResponse> {
    let { data: AuthorizationObject } = await api.post<AuthorizationResponse>(
      "/oauth/token",
      {
        client_id,
        client_secret,
        grant_type,
        refresh_token,
        user_type,
        redirect_uri,
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
