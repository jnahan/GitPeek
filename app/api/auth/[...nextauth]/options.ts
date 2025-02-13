import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const clientId = process.env.GITHUB_ID;
const clientSecret = process.env.GITHUB_SECRET;

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
      authorization: {
        params: { scope: "repo" },
      },
    }),
  ],
  callbacks: {
    // auth calls jwt
    // jwt returns token
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    // jwt calls session and passes token
    // session allows us to use token in app
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      console.log(session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};