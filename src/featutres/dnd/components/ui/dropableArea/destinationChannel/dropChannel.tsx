import { useDroppable } from "@dnd-kit/core";
import { useState, type FC } from "react";
import { Channel } from "types/models/data";
import { DragDataType, GroupChannelType } from "types/models/dnd";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoLockClosed } from "react-icons/io5";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useRecoilValue } from "recoil";
import { memberListSelector, teamListSelector } from "utils/recoil/dnd";
import ViewTravelers from "../../viewTraveler";
import DragTravelers from "../../dragableArea";

type Props = {
  channel: Channel;
  group: GroupChannelType;
};

const DropChannel: FC<Props> = ({ channel, group }) => {
  const { id, isPrivate, name, members: memberIdList, teams: teamIdList } = channel;
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

  const members = useRecoilValue(memberListSelector(memberIdList));
  const teams = useRecoilValue(teamListSelector(teamIdList));

  if (members === undefined || teams === undefined) {
    return <div>error</div>;
  }

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
        <p className="w-full overflow-hidden text-ellipsis">
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
