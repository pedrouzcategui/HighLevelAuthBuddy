import { Company, Location } from "@prisma/client";
import { db } from "@/lib/db";

export const AuthBuddyAPI = {
  //
  createCompany: async function (
    companyId: string,
    name: string,
    userId: string,
  ): Promise<Company> {
    const company = await db.company.create({
      data: {
        companyId,
        name,
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
  ): Promise<Location> {
    const location = await db.location.create({
      data: {
        name,
        access_token,
        // companyId,
        issueDate: new Date(),
        refresh_token,
      },
    });
    return location;
  },
};
