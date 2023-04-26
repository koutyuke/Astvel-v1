import { useDroppable } from "@dnd-kit/core";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useState, type FC } from "react";
import { Team } from "types/models/data";
import { DragDataType, GroupTeamType } from "types/models/dnd";
import { HiUserGroup } from "react-icons/hi";
import DraggableElememntPlaceArea from "../../dragableElementPlaceArea";
import ViewTraveler from "../../viewTraveler";

type Props = {
  group: GroupTeamType;
  team: Team;
};

const DropTeam: FC<Props> = ({ group, team }) => {
  const { id, name, members, iconEmoji } = team;
  const { isOver, active, setNodeRef } = useDroppable({
    id,
    data: {
      group: { ...group },
      data: {},
    },
  });
  const [isOpen, setOpen] = useState<boolean>(false);
  const activeGroup = active?.data.current as DragDataType | undefined;
  const isKeep = !!(activeGroup !== undefined && activeGroup.group.type === "team" && activeGroup.group.teamId === id);

  return (
    <div
      className={`${isOver ? "scale-[1.015] drop-shadow-lg" : ""}
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
        <p className="w-full overflow-hidden text-ellipsis">
          <span className="text-center text-base">
            <span className="opacity-75">{iconEmoji}</span> {name}
          </span>
        </p>
        <ChevronDownIcon className={`${isOpen || isKeep ? "" : "rotate-180"} h-4 w-4 duration-200`} />
      </div>
      <div className="relative w-full">
        {isOpen || isKeep ? (
          <DraggableElememntPlaceArea group={group} members={members} className="" />
        ) : (
          <ViewTraveler members={members} />
        )}
      </div>
    </div>
  );
};

export default DropTeam;
