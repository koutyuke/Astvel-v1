import LargeSignInUser from "components/models/user/large";
import useValidatedSession from "hooks/useValidatedSession";
import { signIn } from "next-auth/react";
import { FC } from "react";
import iconUrlGen from "utils/iconUrlGen";

const SignInLarge: FC = () => {
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
        image={iconUrlGen(user.provider_id ?? "", user.avatar ?? "")}
        main={user.discriminator === "0" ? user.global_name ?? "" : user.username ?? ""}
        sub={user.discriminator === "0" ? `@${user.username}` : `#${user.discriminator ?? ""}`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn("discord")}
      className="flex h-10 w-40 items-center justify-center rounded-full bg-[#ff4da6] outline-2"
    >
      <span className="text-lg">Sign In</span>
    </button>
  );
};

export default SignInLarge;
