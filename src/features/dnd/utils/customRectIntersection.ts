import { Collision, CollisionDetection } from "@dnd-kit/core";

const customRectIntersectin: CollisionDetection = ({
  collisionRect: activeRect,
  droppableContainers,
  droppableRects,
}) => {
  const collisions: Collision[] = [];

  const activeArea = activeRect.width * activeRect.height;

  droppableContainers.forEach(droppableContainer => {
    const { id } = droppableContainer;
    const droppableRect = droppableRects.get(id);

    if (droppableRect) {
      if (
        activeRect.right >= droppableRect.left &&
        activeRect.left <= droppableRect.right &&
        activeRect.top <= droppableRect.bottom &&
        activeRect.bottom >= droppableRect.top
      ) {
        const valueTop = activeRect.top > droppableRect.top ? activeRect.top : droppableRect.top;
        const valueBottom = activeRect.bottom < droppableRect.bottom ? activeRect.bottom : droppableRect.bottom;
        const valueLeft = activeRect.left > droppableRect.left ? activeRect.left : droppableRect.left;
        const valueRight = activeRect.right < droppableRect.right ? activeRect.right : droppableRect.right;

        const valueWidth = valueRight - valueLeft;
        const valueHeight = valueBottom - valueTop;
        const valueArea = valueWidth * valueHeight;
        const value = valueArea / activeArea;

        collisions.push({
          id,
          data: {
            droppableContainer,
            value,
          },
        });
      }
    }
  });

  return collisions.sort((a, b) => {
    const aValue = a.data?.value as number;
    const bValue = b.data?.value as number;
    return bValue - aValue;
  });
};

export { customRectIntersectin };
