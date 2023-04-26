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
      className="h-[calc(100%_-_3rem)] w-full  rounded-md bg-gradient-to-br from-[#4158D0] via-[#C850C0] to-[#FFCC70] p-2"
      ref={setNodeRef}
    >
      <div
        className={`${
          isOver ? "scale-[1.015] drop-shadow-xl" : ""
        } h-full overflow-auto rounded-lg bg-[rgba(255,255,255,0.6);] outline-2 outline-offset-[3px] outline-white duration-300`}
      >
        <DraggableElememntPlaceArea group={group} members={members} teams={teams} className="min-h-full py-2" />
      </div>
    </div>
  );
};

export default NoSelectDropableArea;
