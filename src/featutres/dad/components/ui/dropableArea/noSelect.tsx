import { FC } from "react";
import { Member, Team } from "types/models/data";
import { GroupNoSelectType } from "types/models/dnd";
import { useDroppable } from "@dnd-kit/core";
import DraggableElememntPlaceArea from "../dragableElementPlaceArea";

type Props = {
  group: GroupNoSelectType;
  members: Member[];
  teams?: Team[];
};

const NoSelectDropableArea: FC<Props> = ({ group, members, teams }) => {
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
      } h-full w-full overflow-auto rounded-md bg-orange-100  outline-offset-4 outline-orange-500`}
      ref={setNodeRef}
    >
      <DraggableElememntPlaceArea group={group} members={members} teams={teams} />
    </div>
  );
};

NoSelectDropableArea.defaultProps = {
  teams: undefined,
};

export default NoSelectDropableArea;
