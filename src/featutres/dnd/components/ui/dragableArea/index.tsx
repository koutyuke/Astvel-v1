import { ComponentPropsWithoutRef, FC } from "react";
import { GroupType } from "types/models/dnd";
import { APIMember } from "types/api/astvel";
import { Team } from "types/recoil/dnd";
import LargeDragMember from "../../models/traveler/member/large";
import LargeDragTeam from "../../models/traveler/team/large";
import LabelWrapper from "./Label";

type Props = {
  group: GroupType;
  members: APIMember[];
  teams?: Team[];
} & ComponentPropsWithoutRef<"div">;

const DragTravelers: FC<Props> = ({ group, members, className, teams, ...others }) => {
  const isMembersShow = members.length;
  const isTeamsShow = teams === undefined ? 0 : teams.length;

  return (
    <div className={`${className} space-y-1 rounded-md px-2 text-gray-700`} {...others}>
      {isMembersShow !== 0 && (
        <LabelWrapper label="Member">
          <div className="grid w-full grid-cols-[repeat(auto-fit,5rem)] grid-rows-[repeat(auto-fit,6rem)]">
            {members.map(member => (
              <LargeDragMember member={member} group={group} key={member.id} />
            ))}
          </div>
        </LabelWrapper>
      )}
      {isTeamsShow !== 0 && (
        <LabelWrapper label="Team">
          <div className="grid w-full grid-cols-[repeat(auto-fit,5rem)] grid-rows-[repeat(auto-fit,6rem)]">
            {teams?.map(team => (
              <LargeDragTeam team={team} group={group} key={team.id} />
            ))}
          </div>
        </LabelWrapper>
      )}
    </div>
  );
};

DragTravelers.defaultProps = {
  teams: undefined,
};

export default DragTravelers;
