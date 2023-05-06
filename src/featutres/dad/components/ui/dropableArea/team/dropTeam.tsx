import { useDroppable } from "@dnd-kit/core";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useState, type FC } from "react";
import { DragDataType, GroupTeamType } from "types/models/dnd";
import { HiUserGroup } from "react-icons/hi";
import { Team } from "types/models/group";
import { memberListSelector } from "utils/recoil/keys";
import { useRecoilValue } from "recoil";
import DraggableElememntPlaceArea from "../../dragableElementPlaceArea";
import ViewTraveler from "../../viewTraveler";

type Props = {
  group: GroupTeamType;
  team: Team;
};

const DropTeam: FC<Props> = ({ group, team }) => {
  const { id, name, members: memberIdList, iconEmoji } = team;
  const { isOver, active, setNodeRef } = useDroppable({
    id,
    data: {
      group: { ...group },
      data: {},
    },
  });
  const [isOpen, setOpen] = useState<boolean>(false);
  const activeGroup = active?.data.current as DragDataType | undefined;
  const isDragTeam = activeGroup?.dataType === "team";
  const members = useRecoilValue(memberListSelector(memberIdList));

  if (members === undefined) {
    return <div>error</div>;
  }

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
        <p className="w-full overflow-hidden text-ellipsis">
          <span className="text-center text-base">
            <span className="opacity-75">{iconEmoji}</span> {name}
          </span>
        </p>
        <ChevronDownIcon className={`${isOpen ? "" : "rotate-180"} h-4 w-4 duration-200`} />
      </div>
      <div className="relative w-full">
        {isOpen ? <DraggableElememntPlaceArea group={group} members={members} /> : <ViewTraveler members={members} />}
      </div>
    </div>
  );
};

export default DropTeam;
