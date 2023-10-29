// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: User;
    accessToken?: string;
    refreshToken?: string;
  }
  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
  }
}
