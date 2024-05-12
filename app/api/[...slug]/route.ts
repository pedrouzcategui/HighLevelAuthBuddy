import { db } from "@/lib/db";
import axios, { type AxiosRequestConfig } from "axios";

const BASE_URL = "https://services.leadconnectorhq.com";
const VERSION_DATE = "2021-07-28";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { version: VERSION_DATE },
});

const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig) =>
    await axiosInstance.get<T>(url, config),
};

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  try {
    const slug = parseSlug(params.slug);
    const [, authToken] =
      request.headers.get("authorization")?.split(" ") ?? [];
    if (!authToken) return Response.json({ error: true }, { status: 403 });

    // const [company, location] = await db.$transaction([
    //   db.company.findFirst({ where: { access_token: authToken } }),
    //   db.location.findFirst({ where: { access_token: authToken } }),
    // ]);
    // const res = company ?? location;

    const queryRes = await db.$queryRaw`
    SELECT access_token, refresh_token
    FROM "Company"
    WHERE access_token = ${authToken}
    
    UNION

    SELECT access_token, refresh_token
    FROM "Location"
    WHERE access_token = ${authToken}
    `;

    // Refresh Token If Needed

    // const res = await api.get(slug, {
    //   headers: {
    //     Authorization: "Bearer" + authToken,
    //   },
    // });

    return Response.json({ queryRes });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  try {
    const slug = parseSlug(params.slug);
    // const body = await request.json();

    // call the GHL api

    return Response.json({ slug });
  } catch (error) {
    return Response.error();
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  try {
    const slug = parseSlug(params.slug);
    // const body = await request.json();

    return Response.json({ slug });
  } catch (error) {
    return Response.error();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  try {
    const slug = parseSlug(params.slug);

    return Response.json({ slug });
  } catch (error) {
    return Response.error();
  }
}

function parseSlug(slug: string[]) {
  return slug.join("/");
}
