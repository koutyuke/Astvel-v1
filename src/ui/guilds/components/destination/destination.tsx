import { SortableContext } from "@dnd-kit/sortable";
import { ComponentPropsWithRef, FC } from "react";
import { twMerge } from "tailwind-merge";
import { useSortableChannels } from "ui/guilds/hooks/sortable/useSortableChannels";
import { ScrollArea } from "components/elements/scrollArea";
import { Category } from "./category";

type Props = {
  guildId: string;
} & Omit<ComponentPropsWithRef<"div">, "children">;

const Destination: FC<Props> = ({ guildId, className }) => {
  const { isLoading, error, data } = useSortableChannels(guildId);

  if (isLoading) {
    return (
      <div className={twMerge("box-border animate-pulse rounded-lg border border-gray-500", className)}>loading</div>
    );
  }

  if (error !== undefined || data === undefined) {
    return null;
  }

  return (
    <SortableContext items={data}>
      <div
        className={twMerge("relative box-border h-full w-full rounded-lg border border-gray-500 bg-black-2", className)}
      >
        <ScrollArea className="h-full w-full" type="auto">
          <div className="space-y-2.5 p-2.5">
            {data.map(category => (
              <Category
                data={category}
                guildId={guildId}
                key={`guild-category-${category.id}`}
                spaceSize={10}
                voices={category.voices}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </SortableContext>
  );
};

export { Destination };
