import { FC } from "react";
import { LuMinusCircle } from "react-icons/lu";
import { useCurrentUserGuilds } from "hooks";
import { guildIconUrlGen } from "utils/iconUrlGen";
import * as Avatar from "@radix-ui/react-avatar";

type Props = {
  guildId: string;
};

const SelectedGuild: FC<Props> = ({ guildId }) => {
  const guildList = useCurrentUserGuilds();

  if (guildList.data === undefined || guildList.error !== undefined) return null;
  const guild = guildList.data.find(g => g.id === guildId);
  if (guild === undefined) return null;

  return (
    <div className="relative flex h-12 w-full items-center justify-start rounded-md  bg-[rgba(255,255,255,0.6)] duration-200 group-hover:w-full">
      <span className="absolute left-[2px] top-[2px] -rotate-45">
        <LuMinusCircle size={8} />
      </span>
      <span className="absolute right-[2px] top-[2px] rotate-45">
        <LuMinusCircle size={8} />
      </span>
      <span className="absolute bottom-[2px] left-[2px] rotate-45">
        <LuMinusCircle size={8} />
      </span>
      <span className="absolute bottom-[2px] right-[2px] -rotate-45">
        <LuMinusCircle size={8} />
      </span>
      <div className="flex h-12 w-full max-w-[3rem] items-center justify-center">
        {guild.icon ? (
          <Avatar.Root>
            <Avatar.Image src={guildIconUrlGen(guildId, guild.icon)} className="h-8 w-8 rounded-full" />
          </Avatar.Root>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 ">
            <p className=" text-center text-xl text-white">{guild.name[0]}</p>
          </div>
        )}
      </div>
      <div className="hidden h-full w-[calc(100%_-_3.5rem)] items-center justify-start group-hover:flex ">
        <p className="max-w-full truncate text-xl">{guild.name}</p>
      </div>
    </div>
  );
};

export { SelectedGuild };
