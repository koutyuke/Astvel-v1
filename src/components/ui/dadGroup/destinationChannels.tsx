import { useDroppable } from "@dnd-kit/core";
import DraggableElememntPlaceArea from "featutres/dad/components/ui/dragableElementPlaceArea";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { GroupChannelType } from "types/models/dnd";
import { destinationChannels } from "utils/recoil/keys";

const DestinationChannelsArea: FC = () => {
  const [data, setData] = useRecoilState(destinationChannels);

  const group: GroupChannelType = {
    type: "channel",
    categoryType: "noCategory",
    categoryId: null,
    channelId: 987,
  };
  const { isOver, setNodeRef } = useDroppable({
    id: group.channelId,
    data: {
      group: { ...group },
      data: {},
    },
  });

  if (data.status === "failure") {
    return <div>error</div>;
  }
  const channel = data.data.noCategory.channels.find(ch => ch.id === 987);

  if (channel === undefined) {
    return <div>channelNotFound</div>;
  }

  const { members, teams } = channel;

  return (
    <div
      className={`${
        isOver ? "outline" : ""
      } h-full w-1/3 overflow-auto rounded-lg bg-orange-100 outline-offset-4 outline-orange-500`}
      ref={setNodeRef}
    >
      <DraggableElememntPlaceArea group={group} members={members} teams={teams} />
    </div>
  );
};

export default DestinationChannelsArea;
