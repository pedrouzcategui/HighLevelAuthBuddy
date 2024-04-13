import { Location } from "@prisma/client";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://services.leadconnectorhq.com",
});

/**
 * @companyId is a string
 */

const LeadConnectorAPI = {
  getLocation: function (): Location {
    return {} as Location;
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
};
