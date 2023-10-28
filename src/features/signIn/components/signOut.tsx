import { useValidatedSession } from "hooks/useValidatedSession";
import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";
import { signOut } from "../utils";

type SignOutProps = ComponentPropsWithoutRef<"button">;

const SignOut: FC<SignOutProps> = ({ className, onClick, ...other }) => {
  const { session } = useValidatedSession();
  if (!session.success) {
    return null;
  }

  return (
    <button
      type="button"
      className={twMerge(
        "group h-10 w-24 rounded-lg border-2 border-red-700 p-2 transition hover:border-green-500",
        className,
      )}
      onClick={e => {
        signOut();
        if (onClick) {
          onClick(e);
        }
      }}
      {...other}
    >
      <p className="text-red-700 transition group-hover:text-green-500">Sign out</p>
    </button>
  );
};

export { SignOut };
