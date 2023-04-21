import { useDroppable } from "@dnd-kit/core";
import { useState, type FC } from "react";
import { Channel } from "types/models/data";
import { DragDataType, GroupChannelType } from "types/models/dnd";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoLockClosed } from "react-icons/io5";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import ViewTraveler from "../../viewTraveler";
import DraggableElememntPlaceArea from "../../dragableElementPlaceArea";

type Props = {
  channel: Channel;
  group: GroupChannelType;
};

const DropChannel: FC<Props> = ({ channel, group }) => {
  const { id, isPrivate, name, members, teams } = channel;
  const { isOver, active, setNodeRef } = useDroppable({
    id,
    data: {
      group: { ...group },
      data: {},
    },
  });
  const [isOpen, setOpen] = useState<boolean>(false);
  const activeGroup = active?.data.current as DragDataType | undefined;
  const isKeep = !!(
    activeGroup !== undefined &&
    activeGroup.group.type === "channel" &&
    activeGroup.group.channelId === id
  );

  return (
    <div
      className={`${
        isOver ? "outline" : ""
      } flex w-full flex-col items-center justify-center space-y-1 rounded-lg bg-gray-200 px-2 py-1 outline-2 outline-offset-[3px] outline-orange-400`}
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
        <p className="w-full overflow-hidden text-ellipsis">
          <span className="text-base">{name}</span>
        </p>
        <ChevronDownIcon className={`${isOpen || isKeep ? "" : "rotate-180"} h-4 w-4 duration-200`} />
      </div>

      <div className="w-full">
        {isOpen || isKeep ? (
          <DraggableElememntPlaceArea group={group} members={members} teams={teams} className="bg-orange-100" />
        ) : (
          <ViewTraveler members={members} teams={teams} />
        )}
      </div>
    </div>
  );
};

export default DropChannel;
