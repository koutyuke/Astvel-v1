import { ComponentPropsWithoutRef, FC } from "react";
import { GroupType } from "types/models/dnd";
import { APIMember } from "types/api/astvel";
import { Team } from "types/recoil/dnd";
import { LargeDragMember } from "../models/traveler/member";
import { LargeDragTeam } from "../models/traveler/team";
import { Label } from "./label";

type Props = {
  group: GroupType;
  members: APIMember[];
  teams?: Team[];
} & ComponentPropsWithoutRef<"div">;

const DraggableTravelers: FC<Props> = ({ group, members, className, teams, ...others }) => {
  const isMembersShow = members.length;
  const isTeamsShow = teams === undefined ? 0 : teams.length;

  return (
    <div className={`${className} space-y-1 rounded-md px-2 text-gray-700`} {...others}>
      {isMembersShow !== 0 && (
        <Label label="Member">
          <div className="grid w-full grid-cols-[repeat(auto-fit,5rem)] grid-rows-[repeat(auto-fit,6rem)]">
            {members.map(member => (
              <LargeDragMember member={member} group={group} key={member.id} />
            ))}
          </div>
        </Label>
      )}
      {isTeamsShow !== 0 && (
        <Label label="Team">
          <div className="grid w-full grid-cols-[repeat(auto-fit,5rem)] grid-rows-[repeat(auto-fit,6rem)]">
            {teams?.map(team => (
              <LargeDragTeam team={team} group={group} key={team.id} />
            ))}
          </div>
        </Label>
      )}
    </div>
  );
};

DraggableTravelers.defaultProps = {
  teams: undefined,
};

export { DraggableTravelers };
