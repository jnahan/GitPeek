// Configures NextAuth options

import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";

// Initalize env variables for GitHub OAuth
const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw Error("Missing clientId or clientSecret");
}

const prisma = new PrismaClient();

// Configure NextAuth options
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
    /**
     * Handles JWT creation
     * Adds user id and installation id to token for existing users
     *
     * @param {object} param - Token, user, account data
     * @returns {object} Updated JWT token with user and session data
     */
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      // If it is an existing user, add their id and session id to token
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
    /**
     * Handles session data
     * Triggered after the jswt callback and manages session object
     *
     * @param {object} param - Session, token data
     * @returns {object} Updated session with accesstoken and user info
     */
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.userId as number;
      session.user.installationId = token.installationId as string;
      console.log("session callback", { session, token });
      return session;
    },
  },
};
