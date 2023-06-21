import { Profile, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: User;
    accessToken?: string;
    refreshToken?: string;
  }
  interface User {
    id: string;
    provider_id: string;
    accountId?: string;
    username: string;
    global_name: string;
    avatar: string | null;
    discriminator: string;
    banner_color: string;
    access_token?: string;
    refresh_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: User;
    profile?: Profile;
    accessToken?: string;
    refreshToken?: string;
  }
}
