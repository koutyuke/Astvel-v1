import { signOut } from "next-auth/react";
import { FC, useState } from "react";
import SignInUser from "components/models/user/singInUser";
import iconUrlGen from "utils/iconUrlGen";
import useValidatedSession from "hooks/useValidatedSession";
import SignInButton from "./signIn";

const SignInOutSmall: FC = () => {
  const { session, status } = useValidatedSession();
  const [isOpenLogout, setOpenLogout] = useState(false);
  if (status === "loading") {
    return (
      <div className="flex h-10 w-40 items-center justify-center rounded-full bg-[#ff4da6]">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  if (session.success) {
    const { user } = session.data;
    return (
      <div
        className={`${isOpenLogout ? "" : " hover:outline"} relative rounded-md outline-offset-4 outline-orange-500 `}
        onMouseLeave={() => {
          if (isOpenLogout) {
            setOpenLogout(false);
          }
        }}
      >
        {isOpenLogout && (
          <button
            type="button"
            className="absolute left-[2.6rem] top-10 flex h-[3.15rem] w-[7.4rem] items-center justify-center rounded-b-xl bg-[#ff4da6] pt-2 hover:bg-green-500"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <span>Sign Out</span>
          </button>
        )}
        <button type="button" onClick={() => setOpenLogout(!isOpenLogout)} className="z-10">
          <SignInUser
            image={iconUrlGen(user.provider_id ?? "", user.avatar ?? "")}
            main={user.discriminator === "0" ? user.global_name ?? "" : user.username ?? ""}
            sub={user.discriminator === "0" ? `@${user.username}` : `#${user.discriminator ?? ""}`}
          />
        </button>
      </div>
    );
  }

  return <SignInButton className="outline-2 outline-offset-[3px] outline-green-500 hover:outline" />;
};

export default SignInOutSmall;
