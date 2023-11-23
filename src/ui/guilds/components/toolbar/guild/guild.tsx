import { FC } from "react";
import { genGuildIcon } from "utils/iconUrl";
import { useGuild } from "ui/guilds/hooks/swr";
import Image from "next/image";

type Props = {
  guildId: string;
};

const SelectedGuild: FC<Props> = ({ guildId }) => {
  const guild = useGuild(guildId);

  if (guild.isLoading) {
    return <div className="box-border h-9 w-9 animate-pulse rounded-md border border-gray-500 bg-gray-600" />;
  }

  if (guild.data === undefined || guild.data === null || guild.error !== undefined) {
    return null;
  }

  return (
    <div className="box-border h-9 w-9 overflow-hidden rounded-md border border-gray-500">
      {guild.data.icon ? (
        <Image src={genGuildIcon(guildId, guild.data.icon)} alt="Guild Icon Image" width={40} height={40} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-center text-xl text-white">{guild.data.name[0]}</p>
        </div>
      )}
    </div>
  );
};

export { SelectedGuild };
