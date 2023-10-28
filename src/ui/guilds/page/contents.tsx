import { DndContext } from "@dnd-kit/core";
import { FC, useState } from "react";
import { DndOverlay } from "features/dnd/components/models/overlay";
import { Toast } from "features/toast/components";
import { customCollisionDetectionAlgorithm } from "features/dnd/utils";
import { DndData } from "types/models/dnd";
import { useDragEnd, useReflectChannelChanges, useReflectTravelerChanges } from "features/dnd/hooks";
import { twMerge } from "tailwind-merge";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { ToolBar } from "../components/toolbar";
import { Destination } from "../components/destination";
import { Unselected } from "../components/unselected";
import { Team } from "../components/team";
import { useSocketEffect } from "../hooks/useSocketEffect";

type Props = {
  guildId: string;
};

const Content: FC<Props> = ({ guildId }) => {
  const [activeType, setActiveType] = useState<DndData["type"] | undefined>(undefined);
  const [isDragging, setIsDragging] = useState(false);
  const dragEnd = useDragEnd();
  useSocketEffect(guildId);
  useReflectChannelChanges(guildId);
  useReflectTravelerChanges(guildId);

  return (
    <DndContext
      id="root-context"
      collisionDetection={customCollisionDetectionAlgorithm}
      modifiers={activeType === "member" || activeType === "travelerTeam" ? [] : [restrictToVerticalAxis]}
      onDragStart={({ active }) => {
        setActiveType(active?.data.current?.type);
        setIsDragging(true);
      }}
      onDragEnd={e => {
        dragEnd(e);
        setIsDragging(false);
      }}
      autoScroll={activeType === "member" || activeType === "travelerTeam"}
    >
      <div className="flex h-full w-full flex-col space-y-4 overflow-x-auto">
        <ToolBar guildId={guildId} />
        <div
          className={twMerge(
            "scrollber-hidden flex grow space-x-4 overflow-x-auto px-8 tablet:px-16",
            !isDragging && " snap-x snap-mandatory ",
          )}
        >
          <Destination
            guildId={guildId}
            className={twMerge("w-1/3 min-w-[15rem] snap-center", !isDragging && "snap-center")}
          />
          <Unselected className={twMerge("w-1/3 min-w-[15rem]", !isDragging && "snap-center")} />
          <Team className={twMerge("w-1/3 min-w-[15rem] snap-center", !isDragging && "snap-center")} />
        </div>
      </div>
      <DndOverlay guildId={guildId} />
      <Toast />
    </DndContext>
  );
};

export { Content };
