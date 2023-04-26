import type { ComponentPropsWithoutRef, FC } from "react";
import { Member, Team } from "types/models/data";
import SmallMemberModel from "components/models/traveler/member/smallMember";
import SmallTeamModel from "components/models/traveler/team/smallTeam";

type Props = {
  teams?: Team[];
  members: Member[];
} & ComponentPropsWithoutRef<"div">;

const ViewTraveler: FC<Props> = ({ teams, members, className, ...other }) => {
  const isMembersShow = members.filter(member => member.isShow).length;
  const isTeamsShow = teams === undefined ? 0 : teams.filter(team => team.isShow).length;

  return (
    <div className={`${className} w-full pl-4 text-black`} {...other}>
      {isMembersShow !== 0 && (
        <div className="">
          {members.map(member => (
            <SmallMemberModel imageUrl={member.iconUrl} name={member.name} key={member.id} />
          ))}
        </div>
      )}
      {isTeamsShow !== 0 && (
        <div className="">
          {teams?.map(team => (
            <SmallTeamModel emoji={team.iconEmoji} name={team.name} key={team.id} />
          ))}
        </div>
      )}
    </div>
  );
};

ViewTraveler.defaultProps = {
  teams: undefined,
};

export default ViewTraveler;
