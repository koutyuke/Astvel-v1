import { SortableContext } from "@dnd-kit/sortable";
import { ComponentPropsWithoutRef, FC } from "react";
import { useTeamsValue } from "stores/teams";
import { twMerge } from "tailwind-merge";
import { useDndContext } from "@dnd-kit/core";
import { DndData } from "types/models/dnd";
import { TeamDroppableContainer } from "./droppableContainer";

type Props = Omit<ComponentPropsWithoutRef<"div">, "children">;

const Team: FC<Props> = ({ className }) => {
  const teams = useTeamsValue();
  const { active } = useDndContext();
  const activeData = active?.data.current as DndData | undefined;
  return (
    <SortableContext items={teams}>
      <div className={twMerge("relative rounded-lg border border-gray-500 bg-black-2", className)}>
        <div className=" h-full w-full space-y-2.5 overflow-auto p-2.5">
          {teams.map(team => (
            <TeamDroppableContainer data={team} spaceSize={10} key={`team-${team.id}`} />
          ))}
        </div>
        <div
          className={twMerge(
            "absolute left-0 top-0  z-10 box-border hidden h-full  w-full items-center rounded-lg bg-black/50 p-2",
            activeData?.type === "travelerTeam" && "flex",
          )}
        >
          <p className="grow text-center">
            Teams cannot be
            <br />
            dropped on a team.
          </p>
        </div>
      </div>
    </SortableContext>
  );
};

export { Team };
