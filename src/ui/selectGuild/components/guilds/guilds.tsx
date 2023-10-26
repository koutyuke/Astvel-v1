import { FC } from "react";
import { useRouter } from "next/router";
import { useCurrentUserGuilds } from "ui/selectGuild/hooks/useCurrentUserGuilds";
import { useResetTeamTravelers, useResetUnselectedTravelers, useResetVoiceTravelers } from "stores/travelers/state";
import { useResetTeam } from "stores/teams/state";
import { Guild } from "../model/guild";

const Guilds: FC = () => {
  const { data: guilds, error, isLoading } = useCurrentUserGuilds();
  const router = useRouter();
  const resetVoiceTravelers = useResetVoiceTravelers();
  const resetTeamTravelers = useResetTeamTravelers();
  const resetUnselectedTravelers = useResetUnselectedTravelers();
  const resetTeams = useResetTeam();

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (guilds === undefined || error) {
    return <div>error</div>;
  }

  return (
    <div className="grid h-full w-full grid-cols-[repeat(auto-fit,10rem)] grid-rows-[repeat(auto-fit,10rem)] place-items-center items-center justify-center gap-3 overflow-auto bg-gray-100 from-[#60fcea] to-[#0e6fa7] px-2 py-4">
      {guilds.map(guild => (
        <button
          type="button"
          key={guild.id}
          onClick={() => {
            resetVoiceTravelers();
            resetTeamTravelers();
            resetUnselectedTravelers();
            resetTeams();
            router.push({
              pathname: `/guilds/${guild.id}`,
            });
          }}
        >
          <Guild id={guild.id} icon={guild.icon} name={guild.name} />
        </button>
      ))}
    </div>
  );
};

export { Guilds };
