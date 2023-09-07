import { useDroppable } from "@dnd-kit/core";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useState, type FC } from "react";
import { DragDataType, GroupType } from "types/models/dnd";
import { HiUserGroup } from "react-icons/hi";
import { DnDMembersAtom } from "stores/atom/dnd";
import { useRecoilValue } from "recoil";
import { Team } from "types/recoil/dnd";
import { useAllMembers } from "ui/guilds/hooks/swr";
import { DraggableTravelers } from "featutres/dnd/components/draggableTravelers";
import { ViewonlyTravelers } from "featutres/dnd/components/viewonlyTravelers";

type Props = {
  team: Team;
  guildId: string;
};

const DroppableTeam: FC<Props> = ({ team, guildId }) => {
  const { id, name, iconEmoji } = team;
  const group: GroupType = {
    type: "team",
    id,
  };

  const allMembers = useAllMembers(guildId);
  const DnDMembers = useRecoilValue(DnDMembersAtom);
  const { isOver, active, setNodeRef } = useDroppable({
    id,
    data: {
      group: { ...group },
      data: {},
    },
  });
  const [isOpen, setOpen] = useState<boolean>(false);
  const activeGroup = active?.data.current as DragDataType | undefined;

  if (allMembers.data === undefined || allMembers.error !== undefined) {
    return null;
  }

  const members = allMembers.data.filter(member =>
    DnDMembers.some(
      DnDMember => DnDMember.attributionType === "team" && DnDMember.id === member.id && DnDMember.attributionId === id,
    ),
  );
  const isDragTeam = activeGroup?.dataType === "team";

  return (
    <div
      className={`${isOver && !isDragTeam ? "scale-[1.015] drop-shadow-lg" : ""}
        flex w-full flex-col items-center justify-center space-y-1 rounded-lg
        bg-[rgb(255,255,255,0.6)]
        px-2 py-1 outline-2 outline-offset-[3px] outline-white duration-300
      `}
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
        <HiUserGroup size={20} />
        <p className="w-full min-w-0 truncate">
          <span className="text-center text-base">
            <span className="opacity-75">{iconEmoji}</span> {name}
          </span>
        </p>
        <ChevronDownIcon className={`${isOpen ? "" : "rotate-180"} h-4 w-4 duration-200`} />
      </div>
      <div className="relative w-full">
        {isOpen ? <DraggableTravelers group={group} members={members} /> : <ViewonlyTravelers members={members} />}
      </div>
    </div>
  );
};

export { DroppableTeam };
