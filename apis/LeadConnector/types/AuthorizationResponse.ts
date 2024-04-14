export interface AuthorizationResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  userType: "Location" | "Company";
  locationId: string;
  companyId: string;
  approvedLocations: string[];
  userId: string;
  planId: string;
}
