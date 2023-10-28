import { guildIconUrlGen } from "utils/iconUrlGen";
import Image from "next/image";
import { APIUserGuild } from "types/api/astvel";
import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

type IconProps = {
  id: APIUserGuild["id"];
  name: APIUserGuild["name"];
  icon: APIUserGuild["icon"];
} & Pick<ComponentPropsWithoutRef<"div">, "className">;

const GuildIcon: FC<IconProps> = ({ id, icon, name, className }) => {
  if (icon === undefined || icon === null) {
    return (
      <div
        className={twMerge(
          "flex h-20 w-20 place-content-center rounded-full bg-gray-700 text-center text-3xl",
          className,
        )}
      >
        <span className="m-auto">{name[0]}</span>
      </div>
    );
  }
  const iconUrl = guildIconUrlGen(id, icon);
  return (
    <div className={twMerge("h-20 w-20 overflow-hidden rounded-full", className)}>
      <Image src={iconUrl} priority loading="eager" alt={`guild[${id}]-icon-image`} width={128} height={128} />
    </div>
  );
};

export { GuildIcon };
