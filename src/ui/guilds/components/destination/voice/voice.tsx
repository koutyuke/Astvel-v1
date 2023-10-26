import { memo, useState } from "react";
import { APIVoice } from "types/api/astvel";
import * as Accordion from "@radix-ui/react-accordion";
import { DownIcon } from "components/icon/down";
import { DragIcon } from "components/icon/drag";
import { PrivateSpeakerIcon, SpeakerIcon } from "components/icon/speaker";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FillSquareIcon } from "components/icon/square";
import { DraggableMember } from "features/dnd/components/models/traveler/member";
import { DndData } from "types/models/dnd";
import { twMerge } from "tailwind-merge";
import { sortMoveY } from "ui/guilds/utils/sortMoveY";
import { useIdVoiceTravelerValue, useTravelerSizeValue } from "stores/travelers/state";
import { DraggableTeam } from "features/dnd/components/models/traveler/team";
import { isPrivateVoiceChannel } from "utils/isPrivateVoiceChannel";
import { tv } from "tailwind-variants";

type Props = {
  guildId: string;
  data: APIVoice;
  spaceSize: number;
  categoryId: string;
};

const variant = tv({
  variants: {
    placeTraveler: {
      small: "grid grid-cols-[repeat(auto-fill_,_minmax(2.5rem_,_1fr))] gap-1",
      regular: "grid grid-cols-[repeat(auto-fill_,_minmax(8rem_,_1fr))] justify-items-start gap-1",
      large: "grid grid-cols-[repeat(auto-fill_,_minmax(5rem_,_1fr))] gap-1",
    },
  },
});

const NoMemoVoice = ({ guildId, data: voiceData, spaceSize }: Props) => {
  const travelers = useIdVoiceTravelerValue(voiceData.id);

  const dndData: DndData = {
    type: "voice",
    data: voiceData,
  };
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    active,
    isDragging,
    over,
    isOver,
  } = useSortable({
    id: voiceData.id,
    data: dndData,
  });
  const activeData = active?.data.current as DndData | undefined;

  const [droppable, setDroppalbe] = useState(true);

  const travelerSize = useTravelerSizeValue();

  const style = {
    transform: CSS.Translate.toString(
      sortMoveY(active?.rect.current.initial, over?.rect, transform, spaceSize, active?.id === voiceData.id),
    ),
    transition,
  };

  if (travelers === undefined) {
    return null;
  }

  const { members, teams } = travelers;

  const isPrivate = isPrivateVoiceChannel(guildId, voiceData.permissionOverwriteRoles);

  return (
    <Accordion.Root
      type="multiple"
      defaultValue={[voiceData.id]}
      ref={
        !droppable && (activeData?.type === "member" || activeData?.type === "travelerTeam") ? undefined : setNodeRef
      }
      className={twMerge("relative", isDragging ? "z-10 opacity-50" : "z-0")}
      style={style}
      value={isDragging ? [] : undefined}
      onValueChange={data => {
        setDroppalbe(data.length !== 0);
      }}
    >
      <Accordion.Item
        value={voiceData.id}
        className={twMerge(
          "box-border w-full items-center space-y-2.5 rounded-lg border border-gray-500 bg-black-3 py-2.5 pl-1 pr-2.5 transition",
          isOver && "border-green-500",
        )}
      >
        <Accordion.Header className="flex grow items-center">
          <div ref={setActivatorNodeRef} {...attributes} {...listeners} className="transition hover:text-green-500">
            <DragIcon className="h-5 w-5" />
          </div>
          {isPrivate ? (
            <PrivateSpeakerIcon className="ml-1 h-5 w-5" backgroundColor="bg-black-3" />
          ) : (
            <SpeakerIcon className="ml-1 h-5 w-5" />
          )}

          <p className="ml-2 grow truncate text-start">{voiceData.name}</p>
          <Accordion.Trigger className="group">
            <DownIcon className="h-5 w-5 transition duration-300 hover:text-green-500 group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="mx-auto box-border w-full space-y-2 px-2">
          {members.length !== 0 && (
            <div className="box-border space-y-1 ">
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
                      key={`member-${voiceData.id}-${member.id}`}
                      parentId={voiceData.id}
                      member={member}
                      group={{
                        type: "destination",
                        id: voiceData.id,
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
                <div className={twMerge("w-full", variant({ placeTraveler: travelerSize }))}>
                  {teams.map(team => (
                    <DraggableTeam
                      key={`member-${voiceData.id}-${team.id}`}
                      parentId={voiceData.id}
                      team={team}
                      group={{
                        type: "destination",
                        id: voiceData.id,
                      }}
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

NoMemoVoice.displayName = "Voice";

const Voice = memo(NoMemoVoice);

export { Voice };
