import { FC } from "react";
import { useRouter } from "next/router";
import { useResetRecoilState } from "recoil";
import { DnDMembersAtom, DnDTeamsAtom, TeamsAtom } from "stores/atom/dnd";
import { useCurrentUserGuilds } from "ui/selectGuild/hooks/useCurrentUserGuilds";
import { Guild } from "../model/guild";

const Guilds: FC = () => {
  const { data: guilds, error, isLoading } = useCurrentUserGuilds();
  const router = useRouter();
  const resetDnDMembers = useResetRecoilState(DnDMembersAtom);
  const resetDnDTeams = useResetRecoilState(DnDTeamsAtom);
  const resetTeams = useResetRecoilState(TeamsAtom);

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
            resetDnDMembers();
            resetDnDTeams();
            resetTeams();
            router.push({
              pathname: "/guilds",
              query: {
                id: guild.id,
              },
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
