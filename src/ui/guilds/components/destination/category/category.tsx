import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { DragIcon } from "components/icon/drag";
import { FC } from "react";
import { APICategory, APIVoice } from "types/api/astvel";
import { CSS } from "@dnd-kit/utilities";
import { CategoryIcon } from "components/icon/category";
import { DownIcon } from "components/icon/down";
import * as Accordion from "@radix-ui/react-accordion";
import { twMerge } from "tailwind-merge";
import { sortMoveY } from "ui/guilds/utils/sortMoveY";
import { DndData } from "types/models/dnd";
import { Voice } from "../voice";

type Props = {
  guildId: string;
  data: APICategory;
  spaceSize: number;
  voices: APIVoice[];
};

const Category: FC<Props> = ({ guildId, data: categoryData, spaceSize, voices }) => {
  const dragData: DndData = {
    type: "category",
    data: categoryData,
  };
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, active, isDragging, over } =
    useSortable({
      id: categoryData.id,
      data: dragData,
    });

  const style = {
    transform: CSS.Translate.toString(
      sortMoveY(active?.rect.current.initial, over?.rect, transform, spaceSize, active?.id === categoryData.id),
    ),
    transition,
  };

  if (voices.length === 0) {
    return null;
  }

  return (
    <Accordion.Root
      type="multiple"
      defaultValue={[categoryData.id]}
      value={isDragging ? [] : undefined}
      ref={setNodeRef}
      className={twMerge("relative", isDragging ? "z-10 opacity-50" : "z-0")}
      style={style}
    >
      <Accordion.Item
        value={categoryData.id}
        className={twMerge(
          "box-border w-full items-center space-y-2.5 rounded-lg border border-gray-500 bg-black-2 py-2.5 pl-1 pr-2.5 transition",
        )}
      >
        <Accordion.Header className="flex items-center">
          <div ref={setActivatorNodeRef} {...attributes} {...listeners} className="transition hover:text-green-500">
            <DragIcon className="h-5 w-5" />
          </div>
          <CategoryIcon className="ml-1 h-5 w-5" />
          <p className="ml-2 w-[1px] flex-1 truncate text-start">{categoryData.name}</p>
          <Accordion.Trigger className="group">
            <DownIcon className="h-5 w-5 transition duration-300 hover:text-green-500 group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>
        <SortableContext items={voices}>
          <Accordion.Content className="ml-1.5 space-y-2.5 ">
            {voices.length !== 0 &&
              voices.map(voice => (
                <Voice
                  key={`Channel-${voice.id}`}
                  guildId={guildId}
                  categoryId={categoryData.id}
                  data={voice}
                  spaceSize={10}
                />
              ))}
          </Accordion.Content>
        </SortableContext>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export { Category };
