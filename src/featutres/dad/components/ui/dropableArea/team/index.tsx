import type { FC } from "react";
import { DragDataType, GroupTeamType } from "types/models/dnd";
import { useDndContext } from "@dnd-kit/core";
import { Team } from "types/models/group";
import DropTeam from "./dropTeam";

type Props = {
  data: Team[];
};

const TeamDropArea: FC<Props> = ({ data }) => {
  const { active } = useDndContext();

  const activeData = active?.data.current as DragDataType | undefined;
  const isDragTeam = activeData?.dataType === "team";
  return (
    <div className="relative h-full w-full rounded-lg bg-gradient-to-br from-red-500 to-yellow-600 py-2">
      {isDragTeam && (
        <div className="absolute top-1 left-1 z-10 flex h-[calc(100%_-_0.5rem)] w-[calc(100%_-_0.5rem)] items-center justify-center rounded-lg bg-[rgba(100,116,139,0.7)]">
          <p>Cannot drop a team into a team</p>
        </div>
      )}
      <div className="flex h-full w-full flex-col items-center justify-start space-y-2 overflow-auto px-2">
        {data.map(team => {
          const group: GroupTeamType = {
            type: "team",
            teamId: team.id,
          };

          return <DropTeam group={group} team={team} key={team.id} />;
        })}
      </div>
    </div>
  );
};

export default TeamDropArea;
