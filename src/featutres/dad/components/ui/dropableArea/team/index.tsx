import type { FC } from "react";
import { Team } from "types/models/data";
import { GroupTeamType } from "types/models/dnd";
import DropTeam from "./dropTeam";

type Props = {
  data: Team[];
};

const TeamDropArea: FC<Props> = ({ data }) => (
  <div className="h-[calc(100%_-_3rem)] w-full rounded-lg bg-gradient-to-br from-red-500 to-yellow-600 py-2">
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

export default TeamDropArea;
