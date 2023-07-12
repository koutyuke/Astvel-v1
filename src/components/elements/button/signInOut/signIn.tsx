import { signIn } from "next-auth/react";
import { ComponentPropsWithoutRef, FC } from "react";

type SignOutProps = ComponentPropsWithoutRef<"button">;

const SignInButton: FC<SignOutProps> = ({ className, ...other }) => (
  <button
    type="button"
    onClick={() => signIn("discord")}
    className={`flex h-10 w-40 items-center justify-center rounded-full bg-[#ff4da6] outline-2 ${className}`}
    {...other}
  >
    <span className="text-lg">Sign In</span>
  </button>
);

export default SignInButton;
