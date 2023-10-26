import { Member } from "components/models/traveler/member";
import { ComponentPropsWithoutRef } from "react";
import { APIMember } from "types/api/astvel";
import { DndData } from "types/models/dnd";
import { avatarUrlGen } from "utils/iconUrlGen";
import { CSS } from "@dnd-kit/utilities";
import { twMerge } from "tailwind-merge";
import { useSortable } from "@dnd-kit/sortable";
import { GroupType } from "types/models/group";
import { useTravelerSizeValue } from "stores/travelers";

type Props = {
  member: APIMember;
  parentId: string | null;
  group: GroupType;
} & Omit<ComponentPropsWithoutRef<typeof Member>, "image" | "name" | "size">;

const DraggableMember = ({ member, parentId, group }: Props) => {
  const dragData: DndData = {
    type: "member",
    data: { ...member, parentId },
    group,
  };
  const { displayName, avatar, id, userAvatar } = member;
  const { isDragging, isOver, attributes, listeners, setNodeRef, transform, transition, active, over } = useSortable({
    id,
    data: dragData,
  });
  const image = avatarUrlGen(id, avatar ?? userAvatar);
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  const size = useTravelerSizeValue();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={twMerge(
        "cursor-grab rounded-lg outline outline-1 outline-black-3 transition-[outline-color] duration-300 hover:outline-green-500",
        isDragging && "opacity-50",
        isOver && active?.id !== over?.id && "outline-green-500",
      )}
      {...listeners}
      {...attributes}
    >
      {/* {transition} */}
      <Member image={image} name={displayName} size={size} />
    </div>
  );
};

export { DraggableMember };
