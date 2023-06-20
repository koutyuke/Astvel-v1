import { Profile, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    profile?: Profile;
    accessToken?: string;
    refreshToken?: string;
  }
  interface Profile {
    id: string;
    username: string;
    global_name: string;
    avatar: string | null;
    discriminator: string;
    banner_color: string;
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
