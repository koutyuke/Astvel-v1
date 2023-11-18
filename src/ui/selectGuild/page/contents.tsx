import { FC } from "react";
import { APIUserGuild } from "types/api/astvel";
import { useResetTeam } from "stores/teams";
import { useResetTeamTravelers, useResetUnselectedTravelers, useResetVoiceTravelers } from "stores/travelers";
import { useResetChannels } from "stores/channels";
import { useDiscordUser } from "features/signIn/hooks/useDiscordUser";
import { Guild } from "../components/guild";
import { Bot } from "../components/bot";

type Props = {
  guilds: APIUserGuild[];
};

const Content: FC<Props> = ({ guilds }) => {
  const resetTeam = useResetTeam();
  const resetTeamTravelers = useResetTeamTravelers();
  const resetUnselectedTravelers = useResetUnselectedTravelers();
  const resetVoiceTravelers = useResetVoiceTravelers();
  const resetChannels = useResetChannels();
  const user = useDiscordUser();

  if (user === undefined) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col space-y-2 self-start px-8 tablet:px-16">
      <div className="flex w-full items-end justify-between border-b-[1px]  border-b-gray-500">
        <p className="indent-4 text-3xl font-medium">{user.data?.username}&apos;s Guilds</p>
      </div>
      <div className="grid h-0 flex-1 grid-cols-[repeat(auto-fit_,_12rem)] grid-rows-[repeat(auto-fit_,_9rem)]  justify-center gap-4 overflow-auto p-2">
        <Bot />
        {guilds.map(guild => (
          <Guild
            guild={guild}
            key={`guild-${guild.id}`}
            onClick={() => {
              resetTeam();
              resetTeamTravelers();
              resetUnselectedTravelers();
              resetVoiceTravelers();
              resetChannels();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export { Content };
