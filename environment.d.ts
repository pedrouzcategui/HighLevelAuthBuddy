import Next from "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_BUDDY_CLIENT_ID: string;
      AUTH_BUDDY_CLIENT_SECRET: string;
      AUTH_BUDDY_REDIRECT_URI: string;
    }
  }
}
