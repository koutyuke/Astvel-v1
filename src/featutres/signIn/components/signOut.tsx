import { useValidatedSession } from "hooks";
import { signOut } from "next-auth/react";
import { ComponentPropsWithoutRef, FC } from "react";

type SignOutProps = ComponentPropsWithoutRef<"button">;

const SignOutButton: FC<SignOutProps> = ({ className, onClick, ...other }) => {
  const { session } = useValidatedSession();
  if (!session.success) {
    return null;
  }

  return (
    <button
      type="button"
      className={`${className}`}
      onClick={e => {
        signOut();
        if (onClick) {
          onClick(e);
        }
      }}
      {...other}
    >
      Sign Out
    </button>
  );
};

export { SignOutButton };
