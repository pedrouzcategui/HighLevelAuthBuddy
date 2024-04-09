import { type NextAuthOptions } from "next-auth";
import { type User } from "@prisma/client";
import { type Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";

export const authConfig = {
  // Warning: wtf `PrismaAdapter` is non compatible with expected adapter in `NextAuthOptions`
  // But official docs from NextAuth uses `PrismaAdapter` from `@auth/prisma-adapter` and sets `@next-auth/adapter` as deprecated

  // References:
  // v4 Docs: https://authjs.dev/reference/adapter/prisma?_gl=1*1sje5j7*_gcl_au*NzIyNzc1MDk2LjE3MDk3ODMxNDY.
  // v3 Docs: https://next-auth.js.org/v3/adapters/prisma

  // Also in this github issue they uses type assertion as workaround for typing error
  // https://github.com/nextauthjs/next-auth/issues/8136
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      authorize: async (credentials) => {
        // TODO: add password column to User entity
        // TODO: implement credentials verification flow
        const { email, password } = credentials ?? {};
        const TEST_EMAIL = "johndoe@test.com";
        const TEST_PASSWORD = "1234";

        if (email !== TEST_EMAIL || password !== TEST_PASSWORD) {
          return null;
        }

        const user: User | undefined = {
          id: "1",
          name: "John",
          email: TEST_EMAIL,
          emailVerified: null,
          image: null,
        };

        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthOptions;
