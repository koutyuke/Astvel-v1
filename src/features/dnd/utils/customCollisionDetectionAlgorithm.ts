import { CollisionDetection, closestCenter } from "@dnd-kit/core";
import { DndData } from "types/models/dnd";
import { customRectIntersectin } from "./customRectIntersection";

const customCollisionDetectionAlgorithm: CollisionDetection = args => {
  const { active } = args;
  const activeData = active?.data.current as DndData | undefined;

  if (activeData === undefined) {
    return [];
  }

  if (activeData.type === "category") {
    return closestCenter({
      ...args,
      droppableContainers: args.droppableContainers.filter(container => {
        const containerData = container.data.current as DndData | undefined;
        return containerData?.type === "category";
      }),
    });
  }
  if (activeData.type === "voice") {
    return closestCenter({
      ...args,
      droppableContainers: args.droppableContainers.filter(container => {
        const containerData = container.data.current as DndData | undefined;
        return containerData?.type === "voice" && containerData?.data.parentId === activeData.data.parentId;
      }),
    });
  }
  if (activeData.type === "team") {
    return closestCenter({
      ...args,
      droppableContainers: args.droppableContainers.filter(container => {
        const containerData = container.data.current as DndData | undefined;
        return containerData?.type === "team";
      }),
    });
  }

  if (activeData.type === "member") {
    const overMember = customRectIntersectin({
      ...args,
      droppableContainers: args.droppableContainers.filter(container => {
        const containerData = container.data.current as DndData | undefined;
        return containerData?.type === "member";
      }),
    });
    if (overMember.length === 0) {
      return customRectIntersectin({
        ...args,
        droppableContainers: args.droppableContainers.filter(container => {
          const containerData = container.data.current as DndData | undefined;
          return (
            container.id !== (activeData.data.parentId ?? "unselected") &&
            (containerData?.type === "voice" || containerData?.type === "unselected" || containerData?.type === "team")
          );
        }),
      });
    }

    return overMember;
  }

  if (activeData.type === "travelerTeam") {
    const overTravelerTeam = customRectIntersectin({
      ...args,
      droppableContainers: args.droppableContainers.filter(container => {
        const containerData = container.data.current as DndData | undefined;
        return containerData?.type === "travelerTeam";
      }),
    });
    if (overTravelerTeam.length === 0) {
      return customRectIntersectin({
        ...args,
        droppableContainers: args.droppableContainers.filter(container => {
          const containerData = container.data.current as DndData | undefined;
          return (
            container.id !== (activeData.data.parentId ?? "unselected") &&
            (containerData?.type === "voice" || containerData?.type === "unselected")
          );
        }),
      });
    }

    return overTravelerTeam;
  }

  return [];
};

export { customCollisionDetectionAlgorithm };
