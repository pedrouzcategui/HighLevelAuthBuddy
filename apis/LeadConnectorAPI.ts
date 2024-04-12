import axios from "axios";

export const LeadConnectorAPI = axios.create({
  baseURL: "https://services.leadconnectorhq.com",
});
