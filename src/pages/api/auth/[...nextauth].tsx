import nextAuth, { Account, Profile, User } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";


export default nextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
      authorization: process.env.DISCORD_AUTHORIZATION ?? ""
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user, profile}: { token:JWT, account?:Account|undefined|null, user?: User | AdapterUser,profile?:Profile}) {
      if(account && user && profile) {
        return{
          profile,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          user,
        }
      }
      return token
    },
    async session({session, token}) {
      const setSession = session;
      // const guildInfo = await getWithAuthorization<GetUserDiscordGuildInfo>("https://discordapp.com/api/users/@me/guilds", tokenValue.accessToken).then((data) => data.data).catch((error) =>[])
      
      setSession.user = token.user
      setSession.profile = token.profile
      setSession.accessToken = token.accessToken;
      setSession.refreshToken = token.refreshToken;

      return setSession
    }
  }
})