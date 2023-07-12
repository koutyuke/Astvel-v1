import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "libs/prisma";
import nextAuth from "next-auth";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";

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
      profile(profile: DiscordProfile, token) {
        return {
          id: profile.id,
          provider_id: profile.id,
          username: profile.username,
          global_name: profile.global_name,
          avatar: profile.avatar,
          discriminator: profile.discriminator,
          banner_color: profile.banner_color,
          access_token: token.access_token,
          refresh_token: token.refresh_token,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      const setSession = session;
      setSession.user = user;
      setSession.accessToken = user.access_token;
      setSession.refreshToken = user.refresh_token;
      return setSession;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
