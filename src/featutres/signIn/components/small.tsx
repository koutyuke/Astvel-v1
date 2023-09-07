import { signOut } from "next-auth/react";
import { FC, useState } from "react";
import SignInUser from "components/models/user/signInUser";
import { avatarUrlGen } from "utils/iconUrlGen";
import { useValidatedSession } from "hooks";
import { SignInButton } from "./signIn";

const SignInOutSmall: FC = () => {
  const { session, status } = useValidatedSession();
  const [isOpen, setOpen] = useState(false);
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
        className={`${
          isOpen ? "" : " hover:outline"
        } relative max-w-full rounded-md outline-offset-4 outline-orange-500 `}
        onMouseLeave={() => {
          if (isOpen) {
            setOpen(false);
          }
        }}
      >
        {isOpen && (
          <button
            type="button"
            className="absolute left-[2.6rem] top-10 flex h-[3.15rem] w-[calc(100%_-_2.6rem)] items-center justify-center rounded-b-xl bg-[#ff4da6] pt-2 hover:bg-green-500"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <span>Sign Out</span>
          </button>
        )}
        <button type="button" onClick={() => setOpen(!isOpen)} className="z-10 w-full">
          <SignInUser
            image={avatarUrlGen(user.provider_id ?? "", user.avatar ?? "")}
            main={user.discriminator === "0" ? user.global_name ?? "" : user.username ?? ""}
            sub={user.discriminator === "0" ? `@${user.username}` : `#${user.discriminator ?? ""}`}
          />
        </button>
      </div>
    );
  }

  return <SignInButton className="outline-2 outline-offset-[3px] outline-green-500 hover:outline" />;
};

export { SignInOutSmall };
