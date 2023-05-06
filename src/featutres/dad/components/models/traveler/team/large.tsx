import LargeTeamModel from "components/models/traveler/team/largeTeam";
import { FC } from "react";
import { GroupType } from "types/models/dnd";
import { useDraggable } from "@dnd-kit/core";
import { Team } from "types/models/group";

type Props = {
  team: Team;
  group: GroupType;
};

const LargeDragTeam: FC<Props> = ({ team, group }) => {
  const { iconEmoji, name, id } = team;
  const { attributes, listeners, setNodeRef, isDragging, setActivatorNodeRef } = useDraggable({
    id,
    data: {
      group: { ...group },
      data: team,
      dataType: "team",
    },
  });

  return (
    <div
      className={`${isDragging ? "bg-gray-400" : "hover:outline"} h-24 w-20 touch-none rounded-xl outline-orange-500`}
      ref={setNodeRef}
    >
      {!isDragging && (
        <LargeTeamModel
          emoji={iconEmoji}
          name={name}
          ref={setActivatorNodeRef}
          className="select-none duration-200"
          {...listeners}
          {...attributes}
        />
      )}
    </div>
  );
};

export default LargeDragTeam;
