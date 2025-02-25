import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

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
      console.log("jwt callback", { token, user, account });
      return token;
    },
    // jwt calls session and passes token
    // session allows us to use token in app
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      console.log("session callback", { session, token });
      return session;
    },
  },
};
