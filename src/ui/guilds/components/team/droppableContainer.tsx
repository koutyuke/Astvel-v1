import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { FC, memo, useState } from "react";
import { Team } from "stores/teams";
import { DndData } from "types/models/dnd";
import { CSS } from "@dnd-kit/utilities";
import { sortMoveY } from "ui/guilds/utils/sortMoveY";
import * as Accordion from "@radix-ui/react-accordion";
import { DragIcon } from "components/icon/drag";
import { DownIcon } from "components/icon/down";
import { twMerge } from "tailwind-merge";
import { useIdTeamTravelersValue, useTravelerSizeValue } from "stores/travelers";
import { DraggableMember } from "features/dnd/components/models/traveler/member";
import { TeamIcon } from "components/icon/team";
import { FillSquareIcon } from "components/icon/square";
import { tv } from "tailwind-variants";

type Props = {
  data: Team;
  spaceSize: number;
};

const variant = tv({
  variants: {
    placeTraveler: {
      small: "grid grid-cols-[repeat(auto-fill_,_minmax(2.5rem_,_1fr))] gap-1",
      regular: "grid grid-cols-[repeat(auto-fill_,_minmax(8rem_,_1fr))] justify-items-start  gap-1",
      large: "grid grid-cols-[repeat(auto-fill_,_minmax(5rem_,_1fr))] gap-1",
    },
  },
});

const NoMemoTeamDroppableContainer: FC<Props> = ({ data: teamData, spaceSize }) => {
  const travelers = useIdTeamTravelersValue(teamData.id);
  const [droppable, setDroppable] = useState(true);
  const dndData: DndData = {
    type: "team",
    data: teamData,
  };
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
    active,
    over,
  } = useSortable({
    id: teamData.id,
    data: dndData,
  });
  const activeData = active?.data.current as DndData | undefined;
  const style = {
    transform: CSS.Translate.toString(
      sortMoveY(active?.rect.current.initial, over?.rect, transform, spaceSize, active?.id === teamData.id),
    ),
    transition,
  };

  const travelerSize = useTravelerSizeValue();

  if (travelers === undefined) {
    return null;
  }

  return (
    <Accordion.Root
      type="multiple"
      value={isDragging ? [] : undefined}
      defaultValue={[teamData.id]}
      ref={
        !droppable && (activeData?.type === "member" || activeData?.type === "travelerTeam") ? undefined : setNodeRef
      }
      style={style}
      className={twMerge("relative", isDragging ? "z-10 opacity-50" : "z-0")}
      onValueChange={data => {
        setDroppable(data.length !== 0);
      }}
    >
      <Accordion.Item
        value={teamData.id}
        className={twMerge(
          "box-border w-full items-center space-y-1 rounded-lg border border-gray-500 bg-black-3 py-2.5 pl-1 pr-2.5 transition",
          isOver && "border-green-500",
        )}
      >
        <Accordion.Header className="flex grow items-center">
          <div ref={setActivatorNodeRef} {...attributes} {...listeners} className="transition hover:text-green-500">
            <DragIcon className="h-5 w-5" />
          </div>
          <TeamIcon className="ml-1 h-5 w-5" />
          <span className="ml-1 w-5 text-center">{teamData.iconEmoji}</span>
          <p className="ml-2 w-[1px] grow truncate text-start">{teamData.name}</p>
          <Accordion.Trigger className="group">
            <DownIcon className="h-5 w-5 transition duration-300 hover:text-green-500 group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="mx-auto box-border w-full space-y-2 px-2">
          {travelers.members.length !== 0 && (
            <div className="box-border space-y-1 ">
              <div className="mx-1 flex items-center space-x-1.5">
                <FillSquareIcon className="h-1.5 w-1.5" />
                <p className="text-sm">Members</p>
              </div>
              <SortableContext items={travelers.members}>
                <div
                  className={twMerge(
                    "w-full items-center justify-items-center",
                    variant({ placeTraveler: travelerSize }),
                  )}
                >
                  {travelers.members.map(member => (
                    <DraggableMember
                      key={`member-${teamData.id}-${member.id}`}
                      group={{
                        type: "team",
                        id: teamData.id,
                      }}
                      member={member}
                      parentId={teamData.id}
                    />
                  ))}
                </div>
              </SortableContext>
            </div>
          )}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

const TeamDroppableContainer = memo(NoMemoTeamDroppableContainer);

export { TeamDroppableContainer };
