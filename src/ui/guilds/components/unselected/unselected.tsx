import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { FillSquareIcon } from "components/icon/square";
import { DraggableMember } from "featutres/dnd/components/models/traveler/member";
import { DraggableTeam } from "featutres/dnd/components/models/traveler/team";
import { ComponentPropsWithRef, FC } from "react";
import { useTravelerSizeValue, useUnselectedTravelersValue } from "stores/travelers";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { DndData } from "types/models/dnd";

type Props = Pick<ComponentPropsWithRef<"div">, "className">;

const variant = tv({
  variants: {
    placeTraveler: {
      small: "grid grid-cols-[repeat(auto-fill_,_minmax(2.5rem_,_1fr))] gap-1",
      regular: "grid grid-cols-[repeat(auto-fill_,_minmax(8rem_,_1fr))] gap-1",
      large: "grid grid-cols-[repeat(auto-fill_,_minmax(5rem_,_1fr))] gap-1",
    },
  },
});

const Unselected: FC<Props> = ({ className }) => {
  const { members, teams } = useUnselectedTravelersValue();

  const dndData: DndData = {
    type: "unselected",
    data: null,
  };
  const { setNodeRef, isOver } = useDroppable({ id: "unselected", data: dndData });

  const travelerSize = useTravelerSizeValue();

  return (
    <div className={twMerge("rounded-lg  border border-gray-500 bg-black-2 p-2.5", className)}>
      <div
        ref={setNodeRef}
        className={twMerge(
          "box-border h-full space-y-2 rounded-lg border border-gray-500 bg-black-3 p-2 transition",
          isOver && "border-green-500",
        )}
      >
        {members.length !== 0 && (
          <div className="w-full">
            <div className="mx-1 flex items-center space-x-1.5">
              <FillSquareIcon className="h-1.5 w-1.5" />
              <p className="text-sm">Members</p>
            </div>
            <SortableContext items={members}>
              <div
                className={twMerge(
                  "w-full items-center justify-items-center",
                  variant({ placeTraveler: travelerSize }),
                )}
              >
                {members.map(member => (
                  <DraggableMember
                    key={`member-unselected-${member.id}`}
                    parentId={null}
                    member={member}
                    group={{
                      type: "unselected",
                      id: null,
                    }}
                  />
                ))}
              </div>
            </SortableContext>
          </div>
        )}
        {teams.length !== 0 && (
          <div className="w-full">
            <div className="mx-1 flex items-center space-x-1.5">
              <FillSquareIcon className="h-1.5 w-1.5" />
              <p className="text-sm">Teams</p>
            </div>
            <SortableContext items={teams}>
              <div
                className={twMerge(
                  "w-full items-center justify-items-center",
                  variant({ placeTraveler: travelerSize }),
                )}
              >
                {teams.map(team => (
                  <DraggableTeam
                    key={`member-unselected-${team.id}`}
                    parentId={null}
                    team={team}
                    group={{
                      type: "unselected",
                      id: null,
                    }}
                  />
                ))}
              </div>
            </SortableContext>
          </div>
        )}
      </div>
    </div>
  );
};

export { Unselected };
