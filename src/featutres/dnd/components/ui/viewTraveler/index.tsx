import type { ComponentPropsWithoutRef, FC } from "react";
import SmallMemberModel from "components/models/traveler/member/smallMember";
import SmallTeamModel from "components/models/traveler/team/smallTeam";
import { APIMember } from "types/api/astvel";
import { avatarUrlGen } from "utils/iconUrlGen";
import { Team } from "types/recoil/dnd";

type Props = {
  teams?: Team[];
  members: APIMember[];
} & ComponentPropsWithoutRef<"div">;

const ViewTravelers: FC<Props> = ({ teams, members, className, ...other }) => {
  const isMembersShow = members.length;
  const isTeamsShow = teams === undefined ? 0 : teams.length;

  return (
    <div className={`${className} w-full pl-4 text-gray-600`} {...other}>
      {isMembersShow !== 0 && (
        <div className="">
          {members.map(member => (
            <SmallMemberModel
              imageUrl={avatarUrlGen(member.id, member.avatar ?? member.userAvatar)}
              name={member.displayName}
              key={member.id}
            />
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

ViewTravelers.defaultProps = {
  teams: undefined,
};

export default ViewTravelers;
