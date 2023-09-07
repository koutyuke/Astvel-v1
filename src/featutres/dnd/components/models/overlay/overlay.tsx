import { DragOverlay, DropAnimation, useDndContext } from "@dnd-kit/core";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { OverlayContents } from "./contents";

const DndOverlay: FC = () => {
  const dropAnimationConfig: DropAnimation = {
    keyframes({ transform }) {
      return [
        { transform: CSS.Transform.toString(transform.initial) },
        { transform: CSS.Transform.toString(transform.final) },
      ];
    },
  };

  const { active } = useDndContext();

  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>
      <OverlayContents active={active} />
    </DragOverlay>
  );
};

export { DndOverlay };
