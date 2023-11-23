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
  const { isLoading, error, data: channels } = useSortableChannels(guildId);

  if (isLoading || error !== undefined || channels === undefined) {
    return null;
  }

  return (
    <SortableContext items={channels}>
      <div
        className={twMerge("relative box-border h-full w-full rounded-lg border border-gray-500 bg-black-2", className)}
      >
        {channels.length === 0 && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
            <p className="text-center leading-6 text-gray-500">
              Oops, there is no authorized channel. <br />
              Check with your server administrator.
            </p>
          </div>
        )}
        <ScrollArea className="h-full w-full" type="auto">
          <div className="space-y-2.5 p-2.5">
            {channels.map(category => (
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
