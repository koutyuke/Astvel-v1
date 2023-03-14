import { signIn, signOut, useSession } from "next-auth/react";
import { FC, useState } from "react";
import SingInUser from "components/models/user/SingInUser";

const SingInButton: FC = () => {
  const { data: session, status } = useSession();
  const [isOpenLogout, setOpenLogout] = useState(false);
  if (status === "loading") {
    return (
      <div className="flex h-10 w-40 items-center justify-center rounded-full bg-[#ff4da6]">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  if (session) {
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
            className="absolute top-10 left-[2.6rem] flex h-[3.15rem] w-[7.4rem] items-center justify-center rounded-b-xl bg-[#ff4da6] pt-2 hover:bg-green-500"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <span>Sing Out</span>
          </button>
        )}
        <button type="button" onClick={() => setOpenLogout(!isOpenLogout)} className="z-10">
          <SingInUser
            image={session.profile?.image_url ?? ""}
            name={session.profile?.username ?? ""}
            discriminator={session.profile?.discriminator ?? ""}
          />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn("discord")}
      className="flex h-10 w-40 items-center justify-center rounded-full bg-[#ff4da6] outline-2 outline-offset-[3px] outline-green-500 hover:outline"
    >
      <span className="text-lg">Sing In</span>
    </button>
  );
};

export default SingInButton;
