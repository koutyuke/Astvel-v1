import { Profile, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    profile?: Profile;
    accessToken?: string;
    refreshToken?: string;
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
