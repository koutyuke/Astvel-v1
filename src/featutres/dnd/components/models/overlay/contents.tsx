import { Active } from "@dnd-kit/core";
import { LargeMemberModel } from "components/models/traveler/member";
import { LargeTeamModel } from "components/models/traveler/team";
import { FC } from "react";
import { DragDataType } from "types/models/dnd";
import { avatarUrlGen } from "utils/iconUrlGen";

type Props = {
  active: Active | null;
};

const OverlayContents: FC<Props> = ({ active }) => {
  const dragData = active?.data.current as DragDataType | undefined;

  if (dragData === undefined) {
    return null;
  }

  return dragData.dataType === "member" ? (
    <LargeMemberModel
      imageUrl={avatarUrlGen(dragData.data.id, dragData.data.avatar ?? dragData.data.userAvatar)}
      name={dragData.data.displayName}
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

export { OverlayContents };
