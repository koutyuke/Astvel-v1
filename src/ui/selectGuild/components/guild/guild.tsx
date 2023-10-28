import { ComponentPropsWithoutRef, FC } from "react";
import { APIUserGuild } from "types/api/astvel";
import { twMerge } from "tailwind-merge";
import { DownIcon } from "components/icon/down";
import { useRouter } from "next/router";
import { GuildIcon } from "./icon";

type Props = {
  guild: APIUserGuild;
} & Pick<ComponentPropsWithoutRef<"div">, "className"> &
  Pick<ComponentPropsWithoutRef<"button">, "onClick">;

const Guild: FC<Props> = ({ guild, className, onClick }) => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={e => {
        router.push(`/guilds/${guild.id}`);
        if (onClick) onClick(e);
      }}
    >
      <div className="group h-36 w-48 rounded-lg bg-black-2 p-3 shadow-[3px_3px_25px_0] shadow-black/30 transition hover:scale-105">
        <div
          className={twMerge(
            "box-border flex h-full w-full flex-col items-start justify-between rounded-lg  bg-black-2 p-2 shadow-[2px_2px_20px_0] shadow-black/50  transition",
            className,
          )}
        >
          <GuildIcon
            id={guild.id}
            icon={guild.icon}
            name={guild.name}
            className="box-border h-16 w-16 shadow-[3px_3px_25px_0_rgb(0,0,0),_-2px_-2px_16px_-4px_rgba(255,255,255,0.35)]"
          />
          <div className="flex w-full items-center">
            <div className="w-0 flex-1 ">
              <span className="inline-block min-w-[4rem] max-w-full truncate text-center">{guild.name}</span>
            </div>
            <DownIcon className="h-4 w-4 -rotate-90 stroke-gray-500 transition duration-200 group-hover:translate-x-1 group-hover:scale-105 group-hover:stroke-gray-300" />
          </div>
        </div>
      </div>
    </button>
  );
};

export { Guild };
