import { FC } from "react";
import { APIUserGuild } from "types/api/astvel";
import { useResetTeam } from "stores/teams";
import { useResetTeamTravelers, useResetUnselectedTravelers, useResetVoiceTravelers } from "stores/travelers";
import { useResetChannels } from "stores/channels";
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

  return (
    <div className="flex h-full w-full flex-col space-y-2 px-8 pt-2 tablet:px-16">
      <div className="flex w-full items-end justify-between border-b-[1px]  border-b-gray-500 px-2">
        <p className="text-3xl font-medium">Guilds</p>
        <p className="text-sm text-gray-500">
          Select the guild <br className="tablet:hidden" />
          you want to play for
        </p>
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
