import LargeMemberModel from "components/models/traveler/member/largeMember";
import { FC } from "react";
import { GroupType } from "types/models/dnd";
import { Member } from "types/models/data";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  member: Member;
  group: GroupType;
};

const LargeDragMember: FC<Props> = ({ member, group }) => {
  const { name, iconUrl, id } = member;
  const { attributes, listeners, setNodeRef, isDragging, setActivatorNodeRef } = useDraggable({
    id,
    data: {
      group: { ...group },
      data: member,
      dataType: "member",
    },
  });

  return (
    <div
      className={`${isDragging ? "bg-gray-400" : "hover:outline"} h-24 w-20 touch-none rounded-xl outline-orange-500`}
      ref={setNodeRef}
    >
      {!isDragging && (
        <LargeMemberModel
          imageUrl={iconUrl}
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

export default LargeDragMember;
