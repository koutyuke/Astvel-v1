import { ClientRect } from "@dnd-kit/core";
import { Transform } from "@dnd-kit/utilities";

type Types = (
  activeRect: ClientRect | null | undefined,
  overRect: ClientRect | null | undefined,
  transform: Transform | null,
  spaceSize: number,
  isActive: boolean,
) => Transform;

const sortMoveY: Types = (activeRect, overRect, transform, spaceSize, isActive) => {
  if (!activeRect || !overRect || !transform || transform.y === 0) {
    return {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
    };
  }

  if (isActive) {
    return {
      x: 0,
      y: transform.y < 0 ? transform.y : transform.y + overRect.height - activeRect.height,
      scaleX: 1,
      scaleY: 1,
    };
  }
  return {
    x: 0,
    y: (activeRect.height + spaceSize) * (transform.y > 0 ? 1 : -1),
    scaleX: 1,
    scaleY: 1,
  };
};

export { sortMoveY };
