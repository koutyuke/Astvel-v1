import { DragOverlay, DropAnimation, useDndContext } from "@dnd-kit/core";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import LargeDragOverlay from "./large";

const Overlay: FC = () => {
  const dropAnimationConfig: DropAnimation = {
    keyframes({ transform }) {
      // console.log(transform.initial, transform.final);
      return [
        { transform: CSS.Transform.toString(transform.initial) },
        { transform: CSS.Transform.toString(transform.final) },
      ];
    },
  };

  const { active } = useDndContext();

  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>
      <LargeDragOverlay active={active} />
    </DragOverlay>
  );
};

export default Overlay;
