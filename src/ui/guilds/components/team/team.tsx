import type { FC } from "react";
import { useDndContext } from "@dnd-kit/core";
import { useRecoilValue } from "recoil";
import { TeamsAtom } from "stores/atom/dnd";
import { DroppableTeam } from "./droppableTeam";
import { CreateTeam } from "../createTeam";

type Props = {
  guildId: string;
};

const Team: FC<Props> = ({ guildId }) => {
  const { active } = useDndContext();
  const allTeams = useRecoilValue(TeamsAtom);

  return (
    <div className="relative h-full w-[calc((100%_-_3rem)/3)] rounded-lg bg-gradient-to-br from-red-500 to-yellow-600 py-2">
      {active?.data.current?.dataType === "team" && (
        <div className="absolute left-1 top-1 z-10 flex h-[calc(100%_-_0.5rem)] w-[calc(100%_-_0.5rem)] items-center justify-center rounded-lg bg-[rgba(100,116,139,0.7)]">
          <p>Cannot drop a team into a team</p>
        </div>
      )}
      <div className="flex h-full w-full flex-col items-center justify-start space-y-2 overflow-auto px-2">
        {allTeams.map(team => (
          <DroppableTeam team={team} key={team.id} guildId={guildId} />
        ))}
      </div>
      <div className="absolute bottom-0 right-0 pb-4 pr-4">
        <CreateTeam />
      </div>
    </div>
  );
};

export { Team };
