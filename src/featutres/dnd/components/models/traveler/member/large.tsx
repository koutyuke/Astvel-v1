import { FC } from "react";
import { GroupType } from "types/models/dnd";
import { useDraggable } from "@dnd-kit/core";
import { APIMember } from "types/api/astvel";
import { avatarUrlGen } from "utils/iconUrlGen";
import { LargeMemberModel } from "components/models/traveler/member";

type Props = {
  member: APIMember;
  group: GroupType;
};

const LargeDragMember: FC<Props> = ({ member, group }) => {
  const { displayName, avatar, id, userAvatar } = member;
  const { attributes, listeners, setNodeRef, isDragging, setActivatorNodeRef } = useDraggable({
    id,
    data: {
      group: { ...group },
      data: member,
      dataType: "member",
    },
  });

  const iconUrl = avatarUrlGen(id, avatar ?? userAvatar);

  return (
    <div
      className={`${isDragging ? "bg-gray-400" : "hover:outline"} h-24 w-20 touch-none rounded-xl outline-orange-500`}
      ref={setNodeRef}
    >
      {!isDragging && (
        <LargeMemberModel
          imageUrl={iconUrl}
          name={displayName}
          ref={setActivatorNodeRef}
          className="select-none duration-200"
          {...listeners}
          {...attributes}
        />
      )}
    </div>
  );
};

export { LargeDragMember };
