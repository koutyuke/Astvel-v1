import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "libs/prisma";
import nextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

type RefreshTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

export default nextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "identify email guilds",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      const setSession = session;
      const account = await prisma.account.findFirst({
        where: {
          userId: user.id,
          provider: "discord",
        },
      });
      const date = new Date();
      const now = Math.floor(date.getTime() / 1000);

      if (account === null || account.expires_at === null) {
        return setSession;
      }
      if (account.expires_at > now) {
        setSession.user = user;
        setSession.accessToken = account.access_token ?? "";
        setSession.refreshToken = account.refresh_token ?? "";
        return setSession;
      }

      const newToken = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.DISCORD_CLIENT_ID ?? "",
          client_secret: process.env.DISCORD_CLIENT_SECRET ?? "",
          grant_type: "refresh_token",
          refresh_token: account.refresh_token ?? "",
        }),
      })
        .then<RefreshTokenResponse>(res => res.json())
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error(err);
          return null;
        });

      if (newToken === null) {
        return setSession;
      }
      await prisma.account.update({
        where: {
          id: account.id,
        },
        data: {
          access_token: newToken.access_token,
          refresh_token: newToken.refresh_token,
          expires_at: now + newToken.expires_in,
        },
      });

      setSession.user = user;
      setSession.accessToken = newToken.access_token;
      setSession.refreshToken = newToken.refresh_token;
      return setSession;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
});
