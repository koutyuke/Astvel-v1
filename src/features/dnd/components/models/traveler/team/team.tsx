import { useSortable } from "@dnd-kit/sortable";
import { Team } from "components/models/traveler/team";
import { ComponentPropsWithoutRef } from "react";
import { DndData } from "types/models/dnd";
import { DestinationGroup, GroupType, UnselectedGroup } from "types/models/group";
import { CSS } from "@dnd-kit/utilities";
import { twMerge } from "tailwind-merge";
import { TravelerTeam } from "stores/travelers/type";
import { useTravelerSizeValue } from "stores/travelers";

type Props = {
  team: TravelerTeam;
  parentId: string | null;
  group: Extract<GroupType, DestinationGroup | UnselectedGroup>;
} & Omit<ComponentPropsWithoutRef<typeof Team>, "emoji" | "name" | "size">;

const DraggableTeam = ({ team, parentId, group }: Props) => {
  const dragData: DndData = {
    type: "travelerTeam",
    data: { ...team, parentId },
    group,
  };
  const { name, iconEmoji, id } = team;
  const { attributes, listeners, setNodeRef, transition, transform, active, over, isDragging, isOver } = useSortable({
    id,
    data: dragData,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  const size = useTravelerSizeValue();

  return (
    <div
      ref={setNodeRef}
      className={twMerge(
        "h-fit w-fit cursor-grab rounded-lg outline outline-1 outline-black-3 transition-[outline-color] hover:outline-green-500",
        isDragging && "opacity-50",
        isOver && active?.id !== over?.id && "outline-green-500",
      )}
      style={style}
      {...listeners}
      {...attributes}
    >
      {/* {transition} */}
      <Team emoji={iconEmoji} name={name} size={size} />
    </div>
  );
};

export { DraggableTeam };
