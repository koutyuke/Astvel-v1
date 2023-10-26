import { SortableContext } from "@dnd-kit/sortable";
import { ComponentPropsWithRef, FC } from "react";
import { twMerge } from "tailwind-merge";
import { useSortableChannels } from "ui/guilds/hooks/sortable/useSortableChannels";
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
        className={twMerge(
          "box-border h-full w-full space-y-2.5 overflow-auto rounded-lg border border-gray-500 bg-black-2 p-2.5",
          className,
        )}
      >
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
    </SortableContext>
  );
};

export { Destination };
