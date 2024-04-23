import { db } from "@/lib/db";
import { HTTP_CODES } from "@/lib/http";
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

    const user = await db.user.findFirst({
      where: {
        OR: [{ email: { equals: email } }, { phone: { equals: phone } }],
      },
    });

    if (user?.email === email) {
      return Response.json(
        {
          message: "Email already registered",
        },
        {
          status: HTTP_CODES.BAD_REQUEST,
        },
      );
    }

    if (user?.phone === phone) {
      return Response.json(
        {
          message: "Phone number already registered",
        },
        {
          status: HTTP_CODES.BAD_REQUEST,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);

    await db.user.create({
      data: {
        email,
        name,
        phone,
        password: hashedPassword,
      },
    });

    return Response.json({}, { status: HTTP_CODES.CREATED });
  } catch (err) {
    console.error(err);
  }
}
