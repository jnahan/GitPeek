import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";

const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

const prisma = new PrismaClient();

if (!clientId || !clientSecret) {
  throw Error("Missing clientId or clientSecret");
}

export const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
  callbacks: {
    // auth calls jwt
    // jwt returns token
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      // if user already exists
      // attempt to add their id and session id to token
      if (token?.name && token.email) {
        console.log("checking if user already exists");
        const existingUser = await prisma.user.findFirst({
          where: {
            email: token.email,
            username: token.name,
          },
        });

        if (existingUser) {
          token.userId = existingUser.id;
          token.installationId = existingUser.installationId;
        }
      }

      console.log("jwt callback", { token, user, account });
      return token;
    },
    // jwt calls session and passes token
    // session allows us to use token in app
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.userId as number;
      session.user.installationId = token.installationId as string;
      console.log("session callback", { session, token });
      return session;
    },
  },
};
