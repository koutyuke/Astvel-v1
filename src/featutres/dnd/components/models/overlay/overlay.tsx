import { DragOverlay, DropAnimation, useDndContext } from "@dnd-kit/core";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useTravelerSizeValue } from "stores/travelers";
import { OverlayContents } from "./contents";

type Props = {
  guildId: string;
};

const DndOverlay: FC<Props> = ({ guildId }) => {
  const dropAnimationConfig: DropAnimation = {
    keyframes({ transform }) {
      return [
        { transform: CSS.Transform.toString(transform.initial) },
        { transform: CSS.Transform.toString(transform.final) },
      ];
    },
  };

  const { active, activeNodeRect } = useDndContext();
  const size = useTravelerSizeValue();

  return (
    <DragOverlay dropAnimation={dropAnimationConfig} style={{ width: activeNodeRect?.width }}>
      <OverlayContents active={active} guildId={guildId} size={size} />
    </DragOverlay>
  );
};

export { DndOverlay };
