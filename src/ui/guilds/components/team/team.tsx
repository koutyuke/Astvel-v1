import { SortableContext } from "@dnd-kit/sortable";
import { ComponentPropsWithoutRef, FC } from "react";
import { useTeamsValue } from "stores/teams";
import { twMerge } from "tailwind-merge";
import { useDndContext } from "@dnd-kit/core";
import { DndData } from "types/models/dnd";
import { TeamIcon } from "components/icon/team";
import { ScrollArea } from "components/elements/scrollArea";
import { TeamDroppableContainer } from "./droppableContainer";

type Props = Omit<ComponentPropsWithoutRef<"div">, "children">;

const Team: FC<Props> = ({ className }) => {
  const teams = useTeamsValue();
  const { active } = useDndContext();
  const activeData = active?.data.current as DndData | undefined;
  return (
    <SortableContext items={teams}>
      <div className={twMerge("relative h-full w-full rounded-lg border border-gray-500 bg-black-2", className)}>
        {teams.length === 0 && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
            <p className="text-center leading-6 text-gray-500">
              No team
              <br />
              If you want to create a team, <br />
              click the
              <span className="mx-1 inline-block w-5 translate-y-0.5">
                <TeamIcon size={20} />{" "}
              </span>
              button.
            </p>
          </div>
        )}
        {activeData?.type === "travelerTeam" && (
          <div className="absolute left-0 top-0 z-10 box-border flex h-full  w-full items-center rounded-lg bg-black/50 p-2">
            <p className="grow text-center">
              Teams cannot be
              <br />
              dropped on a team.
            </p>
          </div>
        )}
        <ScrollArea className="h-full w-full" type="auto">
          <div className="h-full w-full space-y-2.5 p-2.5">
            {teams.map(team => (
              <TeamDroppableContainer data={team} spaceSize={10} key={`team-${team.id}`} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </SortableContext>
  );
};

export { Team };
