import { FC } from "react";
import { GroupType } from "types/models/dnd";
import { useDroppable } from "@dnd-kit/core";
import { useRecoilValue } from "recoil";
import { DnDMembersAtom, DnDTeamsAtom, TeamsAtom } from "utils/recoil/dnd";
import useAllMembers from "featutres/dnd/hooks/swr/useAllMembers";
import DragTravelers from "../../dragableArea";

type Props = {
  guildId: string;
};

const NoSelectDropableArea: FC<Props> = ({ guildId }) => {
  const group: GroupType = {
    type: "noSelect",
    id: null,
  };
  const { isOver, setNodeRef } = useDroppable({
    id: "noSelect",
    data: {
      group: { ...group },
      data: {},
    },
  });

  const allMembers = useAllMembers(guildId);
  const allTeams = useRecoilValue(TeamsAtom);

  const DnDMembers = useRecoilValue(DnDMembersAtom);
  const DnDTeams = useRecoilValue(DnDTeamsAtom);

  if (allMembers.data === undefined || allMembers.error !== undefined) {
    return null;
  }

  const members = allMembers.data.filter(member =>
    DnDMembers.some(DnDMember => DnDMember.attributionType === "noSelect" && DnDMember.id === member.id),
  );
  const teams = allTeams.filter(team =>
    DnDTeams.some(DnDTeam => DnDTeam.attributionType === "noSelect" && DnDTeam.id === team.id),
  );

  return (
    <div
      className="h-full w-[calc((100%_-_3rem)/3)] rounded-md bg-gradient-to-br from-[#4158D0] via-[#C850C0] to-[#cc2b5e] p-2"
      ref={setNodeRef}
    >
      <div
        className={`${
          isOver ? "scale-[1.015] drop-shadow-xl" : ""
        } h-full overflow-auto rounded-lg bg-[rgba(255,255,255,0.6);] outline-2 outline-offset-[3px] outline-white duration-300`}
      >
        <DragTravelers group={group} members={members} teams={teams} className="min-h-full py-2" />
      </div>
    </div>
  );
};

export default NoSelectDropableArea;
