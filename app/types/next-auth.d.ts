// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    expires: string;
    installationId: string;
    user: {
      address: string;
      id: number;
      installationId: string;
    } & DefaultSession["user"];
  }
}
