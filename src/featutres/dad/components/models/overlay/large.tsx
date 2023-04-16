import { Active } from "@dnd-kit/core";
import { FC } from "react";
import { DragDataType } from "types/models/dnd";
import LargeMemberModel from "components/models/member/largeMember";
import LargeTeamModel from "components/models/team/largeTeam";

type Props = {
  active: Active | null;
};

const LargeDragOverlay: FC<Props> = ({ active }) => {
  const dragData = active?.data.current as DragDataType | undefined;

  if (dragData === undefined) {
    return null;
  }

  return dragData.dataType === "member" ? (
    <LargeMemberModel
      imageUrl={dragData.data.iconUrl}
      name={dragData.data.name}
      className="cursor-grabbing bg-gray-200 text-black"
    />
  ) : (
    <LargeTeamModel
      emoji={dragData.data.iconEmoji}
      name={dragData.data.name}
      className="cursor-grabbing bg-gray-200 text-black"
    />
  );
};

export default LargeDragOverlay;
