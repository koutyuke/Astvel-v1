import { ComponentPropsWithoutRef, FC } from "react";
import { GroupType } from "types/models/dnd";
import { Member, Team } from "types/models/data";
import LargeDragMember from "../../models/traveler/member/large";
import LargeDragTeam from "../../models/traveler/team/large";
import LabelWrapper from "./Label";

type Props = {
  group: GroupType;
  members: Member[];
  teams?: Team[];
} & ComponentPropsWithoutRef<"div">;

const DraggableElememntPlaceArea: FC<Props> = ({ group, members, className, teams, ...others }) => {
  const isMembersShow = members.filter(member => member.isShow).length;
  const isTeamsShow = teams === undefined ? 0 : teams.filter(team => team.isShow).length;

  return (
    <div className={`${className} space-y-1 rounded-md p-2 text-black `} {...others}>
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

DraggableElememntPlaceArea.defaultProps = {
  teams: undefined,
};

export default DraggableElememntPlaceArea;
