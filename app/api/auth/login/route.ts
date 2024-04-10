import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  email: string;
  name: string;
  id: string;
};

export async function POST(request: Request) {
  try {
    const { email, password: plainPassword }: LoginPayload =
      await request.json();

    const user = await db.user.findUnique({
      where: { email },
    });

    // User not found
    if (!user) {
      return Response.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 401,
        },
      );
    }

    // User found but not registered with credentials
    // e.g: users registered with Google auth provider
    if (!user.password) {
      return Response.json(
        {
          message: "User is already registered but with other auth provider",
        },
        {
          status: 401,
        },
      );
    }

    const isValidPassword = await bcrypt.compare(plainPassword, user.password);

    // User found but invalid password
    if (!isValidPassword) {
      return Response.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 401,
        },
      );
    }

    const response = {
      id: user.id,
      email: user.email ?? "", // TODO: is there any way to register a user without mail?
      name: user.name ?? "", // TODO: is there any way to register a user without name?
    } satisfies LoginResponse;

    return Response.json(response);
  } catch (err) {
    console.error(err);
  }
}
