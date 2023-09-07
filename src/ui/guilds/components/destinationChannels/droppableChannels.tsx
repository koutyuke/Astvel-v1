import { useDroppable } from "@dnd-kit/core";
import { useState, type FC } from "react";
import { GroupType } from "types/models/dnd";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoLockClosed } from "react-icons/io5";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useRecoilValue } from "recoil";
import { APIVoice } from "types/api/astvel";
import { DnDMembersAtom, DnDTeamsAtom, TeamsAtom } from "stores/atom/dnd";
import permissionCheck from "utils/permissionCheck";
import { useAllMembers } from "ui/guilds/hooks/swr";
import { DraggableTravelers } from "featutres/dnd/components/draggableTravelers";
import { ViewonlyTravelers } from "featutres/dnd/components/viewonlyTravelers";

type Props = {
  channel: APIVoice;
  guildId: string;
};

const DroppableChannel: FC<Props> = ({ channel, guildId }) => {
  const { id, name } = channel;
  const group: GroupType = {
    type: "channel",
    id,
  };
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      group,
      data: {},
    },
  });
  const [isOpen, setOpen] = useState<boolean>(false);

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

  const everyone = channel.permissionOverwriteRoles.find(role => role.id === guildId);
  const isPrivate =
    everyone !== undefined
      ? permissionCheck(BigInt(everyone.deny), BigInt(1024)) && permissionCheck(BigInt(everyone.deny), BigInt(1048576))
      : false;

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
        {isPrivate ? <IoLockClosed size={20} /> : <HiSpeakerWave size={20} />}

        <p className="w-full min-w-0 truncate">
          <span className="text-base">{name}</span>
        </p>
        <ChevronDownIcon className={`${isOpen ? "" : "rotate-180"} h-4 w-4 duration-200`} />
      </div>

      <div className="w-full">
        {isOpen ? (
          <DraggableTravelers group={group} members={members} teams={teams} />
        ) : (
          <ViewonlyTravelers members={members} teams={teams} />
        )}
      </div>
    </div>
  );
};

export { DroppableChannel };
