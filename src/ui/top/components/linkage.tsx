import { AccountIcon } from "components/icon/account";
import { BotIcon } from "components/icon/bot";
import { PermissionIcon } from "components/icon/permission";
import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = Pick<ComponentPropsWithoutRef<"div">, "className">;

const Linkage: FC<Props> = ({ className }) => {
  return (
    <div className={twMerge("grid w-full grid-cols-12 items-center gap-6", className)}>
      <div className="col-[2_/_12] flex h-full flex-col justify-center space-y-4 tablet:col-[3_/_7] ">
        <h2 className="text-center text-4xl font-bold leading-[1.25] tablet:text-start tablet:text-5xl">
          Linkage
          <br />
          with Discord
        </h2>
        <p className="px-4 text-center text-gray-400 tablet:px-0 tablet:text-start tablet:text-lg ">
          This application can be used in conjunction with Discord.
          <br />
          This makes it easy to do a variety of things.
        </p>
      </div>
      <div className="col-[2_/_12]  flex min-h-full flex-col gap-4 rounded-lg bg-black-3 p-5 shadow-2xl  shadow-black tablet:col-[7_/_11]">
        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-black-1 shadow-[inset_0px_0px_16px_0px_#000]">
          <AccountIcon size={56} className="fill-green-500" />
        </div>
        <h3 className="text-3xl font-bold">Account</h3>
        <p className="text-lg text-gray-400 ">
          Account will use account on Discord.
          <br />
          Therefore, there is no need to create a new account.
        </p>
      </div>
      <div className="col-[2_/_12]  flex min-h-full flex-col gap-4 rounded-lg bg-black-3 p-5 shadow-2xl  shadow-black tablet:col-[3_/_7]">
        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-black-1 shadow-[inset_0px_0px_16px_0px_#000]">
          <PermissionIcon size={56} className="m-auto stroke-green-500" />
        </div>
        <h3 className="text-3xl font-bold">Permission</h3>
        <p className="text-lg text-gray-400 ">
          Protect the privileges granted to members of the server.
          <br />
          You must have &quot;View Channel,&quot; &quot;Connect,&quot; or &quot;Move Member&quot; permission to use it.
        </p>
      </div>
      <div className="col-[2_/_12]  flex min-h-full flex-col gap-4 rounded-lg bg-black-3 p-5 shadow-2xl  shadow-black tablet:col-[7_/_11]">
        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-black-1 shadow-[inset_0px_0px_16px_0px_#000]">
          <BotIcon size={56} className="fill-green-500" />
        </div>
        <h3 className="text-3xl font-bold">Setup by Bot</h3>
        <p className="text-lg text-gray-400 ">
          Setup on the Discord server is completed by simply inviting Astvel bots.
        </p>
      </div>
    </div>
  );
};

export { Linkage };
