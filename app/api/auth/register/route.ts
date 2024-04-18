import { AuthBuddyAPI } from "@/apis/AuthBuddy/AuthBuddyAPI";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export type RegisterUserPayload = {
  email: string;
  name: string;
  password: string;
  phone: string;
};

const HASH_ROUNDS = 13;

export async function POST(request: Request) {
  try {
    const { email, password, name, phone }: RegisterUserPayload =
      await request.json();

    const userAlreadyExists = await db.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      return Response.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 403,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);

    const apiKey = await AuthBuddyAPI.generateApiKey();

    await db.user.create({
      data: {
        email,
        name,
        phone,
        password: hashedPassword,
        Auth_Buddy_API_Keys: {
          create: {
            expires_in: 0,
            apiKey,
          },
        },
      },
    });

    return Response.json({}, { status: 201 });
  } catch (err) {
    console.error(err);
  }
}
