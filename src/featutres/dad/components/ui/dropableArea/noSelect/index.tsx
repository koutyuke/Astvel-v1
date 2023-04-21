import { FC } from "react";
import { NoSelect } from "types/models/data";
import { GroupNoSelectType } from "types/models/dnd";
import { useDroppable } from "@dnd-kit/core";
import DraggableElememntPlaceArea from "../../dragableElementPlaceArea";

type Props = {
  data: NoSelect;
};

const NoSelectDropableArea: FC<Props> = ({ data }) => {
  const group: GroupNoSelectType = {
    type: "noSelect",
  };
  const { members, teams } = data;
  const { isOver, setNodeRef } = useDroppable({
    id: "noSelect",
    data: {
      group: { ...group },
      data: {},
    },
  });

  return (
    <div
      className={`${
        isOver ? "outline" : ""
      } h-[calc(100%_-_3rem)] w-full  rounded-md bg-gradient-to-br from-[#4158D0] via-[#C850C0] to-[#FFCC70] p-2 outline-offset-4 outline-orange-500`}
      ref={setNodeRef}
    >
      <div className="h-full overflow-auto rounded-lg bg-orange-100">
        <DraggableElememntPlaceArea group={group} members={members} teams={teams} className="min-h-full" />
      </div>
    </div>
  );
};

export default NoSelectDropableArea;
