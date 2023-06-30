import { useDroppable } from "@dnd-kit/core";
import { useState, type FC } from "react";
import { DragDataType, GroupType } from "types/models/dnd";
import { HiSpeakerWave } from "react-icons/hi2";
// import { IoLockClosed } from "react-icons/io5";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useRecoilValue } from "recoil";
import { APIVoice } from "types/api/astvel";
import { DnDMembersAtom, DnDTeamsAtom, TeamsAtom } from "utils/recoil/dnd";
import useAllMembers from "featutres/dnd/hooks/swr/useAllMembers";
import ViewTravelers from "../../viewTraveler";
import DragTravelers from "../../dragableArea";

type Props = {
  channel: APIVoice;
  guildId: string;
};

const DropChannel: FC<Props> = ({ channel, guildId }) => {
  const { id, name } = channel;
  const group: GroupType = {
    type: "channel",
    id,
  };
  const { isOver, active, setNodeRef } = useDroppable({
    id,
    data: {
      group,
      data: {},
    },
  });
  const [isOpen, setOpen] = useState<boolean>(false);
  const activeGroup = active?.data.current as DragDataType | undefined;

  const isKeep = !!(activeGroup !== undefined && activeGroup.group.type === "channel" && activeGroup.group.id === id);

  const allMembers = useAllMembers(guildId);
  const allTeams = useRecoilValue(TeamsAtom);

  const DnDMembers = useRecoilValue(DnDMembersAtom);
  const DnDTeams = useRecoilValue(DnDTeamsAtom);

  if (allMembers.data === undefined || allMembers.error !== undefined) {
    return null;
  }
  const members = allMembers.data.filter(member =>
    DnDMembers.some(
      DnDMember =>
        DnDMember.attributionType === "channel" && DnDMember.id === member.id && DnDMember.attributionId === id,
    ),
  );
  const teams = allTeams.filter(team =>
    DnDTeams.some(
      DnDTeam => DnDTeam.attributionType === "channel" && DnDTeam.id === team.id && DnDTeam.attributionId === id,
    ),
  );

  return (
    <div
      className={`${
        isOver ? "scale-[1.02] drop-shadow-lg" : ""
      } flex w-full flex-col items-center justify-center space-y-1 rounded-lg bg-[rgba(255,255,255,0.6)] px-2 py-1 duration-300`}
      ref={setNodeRef}
    >
      <div
        className="flex h-6 w-full items-center justify-start space-x-1 rounded-lg text-gray-500"
        onClick={() => {
          setOpen(!isOpen);
        }}
        role="button"
        aria-hidden="true"
      >
        {/* {isPrivate ? <IoLockClosed size={20} /> : } */}
        <HiSpeakerWave size={20} />
        <p className="w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="text-base">{name}</span>
        </p>
        <ChevronDownIcon className={`${isOpen || isKeep ? "" : "rotate-180"} h-4 w-4 duration-200`} />
      </div>

      <div className="w-full">
        {isOpen || isKeep ? (
          <DragTravelers group={group} members={members} teams={teams} className="" />
        ) : (
          <ViewTravelers members={members} teams={teams} />
        )}
      </div>
    </div>
  );
};

export default DropChannel;
