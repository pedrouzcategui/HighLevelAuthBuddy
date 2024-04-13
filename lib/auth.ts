import {
  type NextAuthOptions,
  getServerSession as getNextAuthServerSession,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/db";
import { API_ROUTES, api } from "./api";
import {
  type LoginPayload,
  type LoginResponse,
} from "@/app/api/auth/login/route";

export const authConfig = {
  // Warning: wtf `PrismaAdapter` is not compatible with expected adapter in `NextAuthOptions`
  // But official docs from NextAuth uses `PrismaAdapter` from `@auth/prisma-adapter` and indicates `@next-auth/adapter` as deprecated

  // References:
  // v4 Docs: https://authjs.dev/reference/adapter/prisma?_gl=1*1sje5j7*_gcl_au*NzIyNzc1MDk2LjE3MDk3ODMxNDY.
  // v3 Docs: https://next-auth.js.org/v3/adapters/prisma

  // Also in this github issue they use type assertion as workaround for type error
  // https://github.com/nextauthjs/next-auth/issues/8136
  adapter: PrismaAdapter(db) as Adapter,

  // JWT strategy is a must for allowing Credentials authentication
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      authorize: async (credentials) => {
        // Credentials should be null if we call `signIn('credentials')` without payload xd
        if (!credentials) {
          return null;
        }

        const payload = {
          email: credentials.email,
          password: credentials.password,
        } satisfies LoginPayload;

        const loginResponse = await api.post<LoginResponse>(
          API_ROUTES.auth.login,
          payload,
        );

        // TODO: I dont like use http status for evaluate conditions
        // Maybe return an `ok` field in all responses?
        if (loginResponse.status !== 200) {
          return null;
        }

        return loginResponse.data;
      },
    }),

    GoogleProvider({
      // TODO: find some way to make `.env` variables typed?
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    redirect: async ({ url }) => url,
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
      }

      return token;
    },
    session: async ({ token, session }) => {
      if (session?.user) {
        session.user.userId = token.userId;
      }

      return session;
    },
  },
} satisfies NextAuthOptions;

/**
 * Wrapper for `getServerSession` function exposed by `next-auth` to allow session accessing
 * based on the extra configs set up in `authConfig`.
 *
 * This function should be used for accessing to session data in server contexts (e.g api route handlers or RSC).
 */
export async function getServerSession() {
  return await getNextAuthServerSession(authConfig);
}
