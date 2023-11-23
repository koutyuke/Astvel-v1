import { User } from "components/models/user";
import { useValidatedSession } from "hooks/useValidatedSession";
import { ComponentProps, ComponentPropsWithoutRef, FC } from "react";
import { SignOutIcon } from "components/icon/signOut";
import { genUserAvatar } from "utils/iconUrl";
import { signIn, signOut } from "../utils";
import { useDiscordUser } from "../hooks/useDiscordUser";

type SignOutProps = ComponentPropsWithoutRef<"button"> & Pick<ComponentProps<typeof User>, "contentAlignment">;

const SignIn: FC<SignOutProps> = ({ contentAlignment }) => {
  const { session, status } = useValidatedSession();
  const discordUser = useDiscordUser();

  if (status === "loading" || discordUser.isLoading) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-gray-300 outline outline-2 outline-white" />;
  }

  if (session.success && discordUser.data) {
    return (
      <User
        name={
          discordUser.data.discriminator === "0" ? discordUser.data.global_name ?? "" : discordUser.data.username ?? ""
        }
        id={
          discordUser.data.discriminator === "0"
            ? `@${discordUser.data.username}`
            : `#${discordUser.data.discriminator ?? ""}`
        }
        image={genUserAvatar(discordUser.data.id, discordUser.data.avatar)}
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
