import { User } from "components/models/user";
import { useValidatedSession } from "hooks";
import { ComponentProps, ComponentPropsWithoutRef, FC } from "react";
import { SignOutIcon } from "components/icon/signoOut";
import { avatarUrlGen } from "utils/iconUrlGen";
import { signIn, signOut } from "../utils";

type SignOutProps = ComponentPropsWithoutRef<"button"> & Pick<ComponentProps<typeof User>, "contentAlignment">;

const SignIn: FC<SignOutProps> = ({ contentAlignment }) => {
  const { session, status } = useValidatedSession();

  if (status === "loading") {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-gray-300 outline outline-2 outline-white" />;
  }

  if (session.success) {
    const { user } = session.data;
    return (
      <User
        name={user.discriminator === "0" ? user.global_name ?? "" : user.username ?? ""}
        id={user.discriminator === "0" ? `@${user.username}` : `#${user.discriminator ?? ""}`}
        image={avatarUrlGen(user.provider_id, user.avatar)}
        contentAlignment={contentAlignment}
      >
        <button
          type="button"
          onClick={() => {
            signOut();
          }}
          className="group mx-auto mt-4 flex items-center space-x-1"
        >
          <SignOutIcon size={20} className="text-red-700 transition group-hover:text-green-500" />
          <p className="text-red-700 transition group-hover:text-green-500">Sign out</p>
        </button>
      </User>
    );
  }
  return (
    <button
      type="button"
      className="box-border h-10 w-24 rounded-lg border-2 border-white p-2 transition hover:border-green-500 hover:text-green-500"
      onClick={() => {
        signIn();
      }}
    >
      <p className="m-auto text-center ">Sign in</p>
    </button>
  );
};

export { SignIn };
