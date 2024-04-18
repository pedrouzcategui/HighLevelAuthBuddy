import { Auth_Buddy_API_Key, Company, Location } from "@prisma/client";
import { db } from "@/lib/db";
import { hash } from "bcrypt";

export const AuthBuddyAPI = {
  generateApiKey: async function (): Promise<string> {
    const saltRounds = 10;
    const token = crypto.randomUUID();
    const hashedToken = await hash(token, saltRounds);
    return hashedToken;
  },
  getApiKeys: async function (
    userId: string,
  ): Promise<Auth_Buddy_API_Key | null> {
    const apikeys = await db.auth_Buddy_API_Key.findFirst({
      where: {
        userId,
      },
    });
    return apikeys;
  },
  //
  createCompany: async function (
    companyId: string,
    name: string,
    userId: string,
    access_token: string,
    refresh_token: string,
    expires_in: number,
  ): Promise<Company> {
    const company = await db.company.create({
      data: {
        companyId,
        name,
        access_token,
        expires_in,
        refresh_token,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return company as Company;
  },
  //
  getCompany: async function (companyId: string): Promise<Company | null> {
    const companyRecord = await db.company.findFirst({
      where: {
        companyId,
      },
    });
    return companyRecord;
  },
  //
  getCompanies: async function (userId: string): Promise<Company[] | null> {
    const companies = await db.company.findMany({
      where: {
        userId,
      },
    });
    return companies;
  },
  //
  getLocation: async function (locationId: string): Promise<Location | null> {
    const locationRecord = await db.location.findFirst({
      where: {
        id: locationId,
      },
    });
    return locationRecord;
  },
  //
  getLocations: async function (companyId: string): Promise<Location[] | null> {
    const locations = await db.location.findMany({
      where: {
        companyId,
      },
    });
    return locations;
  },
  createLocation: async function (
    name: string,
    access_token: string,
    refresh_token: string,
    expires_in: number,
  ): Promise<Location> {
    const location = await db.location.create({
      data: {
        name,
        access_token,
        generationDate: new Date(),
        expires_in,
        refresh_token,
      },
    });
    return location;
  },
};
