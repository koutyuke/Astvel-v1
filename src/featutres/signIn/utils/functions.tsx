import { signIn as authSignIn, signOut } from "next-auth/react";

export const signIn = () => authSignIn("discord");
export { signOut };
