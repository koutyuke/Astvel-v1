import LargeSignInUser from "components/models/user/large";
import useValidatedSession from "hooks/useValidatedSession";
import { FC } from "react";
import { avatarUrlGen } from "utils/iconUrlGen";
import { SignInButton } from "./signIn";

const SignInOutLarge: FC = () => {
  const { session, status } = useValidatedSession();

  if (status === "loading") {
    return (
      <div className="flex h-10 w-full  items-center justify-center rounded-full bg-[#ff4da6]">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  if (session.success) {
    const { user } = session.data;
    return (
      <LargeSignInUser
        image={avatarUrlGen(user.provider_id ?? "", user.avatar ?? "")}
        main={user.discriminator === "0" ? user.global_name ?? "" : user.username ?? ""}
        sub={user.discriminator === "0" ? `@${user.username}` : `#${user.discriminator ?? ""}`}
      />
    );
  }

  return <SignInButton />;
};

export { SignInOutLarge };
