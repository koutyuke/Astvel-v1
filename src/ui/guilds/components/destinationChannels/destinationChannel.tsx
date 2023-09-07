import type { FC } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { useAllCategories, useAllVoices } from "ui/guilds/hooks/swr";
import { CategoryAccordion } from "./categoryAccordion";
import { DroppableChannel } from "./droppableChannels";

type Props = {
  guildId: string;
};

const DestinationChannels: FC<Props> = ({ guildId }) => {
  const allCategories = useAllCategories(guildId);
  const allVoices = useAllVoices(guildId);

  if (allCategories.isLoading || allVoices.isLoading) {
    return (
      <div className="h-full w-[calc((100%_-_3rem)/3)] rounded-lg bg-gradient-to-br from-[#0d6399] to-[#42cba8] py-2">
        Loading
      </div>
    );
  }

  if (
    allCategories.error !== undefined ||
    allCategories.data === undefined ||
    allVoices.error !== undefined ||
    allVoices.data === undefined
  ) {
    return null;
  }
  const noCategoryVoices = allVoices.data.filter(channel => channel.parentId === null);

  const defaultOpen = ["nocategory", ...allCategories.data.map(category => category.id)];
  return (
    <div className="h-full w-[calc((100%_-_3rem)/3)] rounded-lg bg-gradient-to-br from-[#0d6399] to-[#42cba8] py-2">
      <Accordion.Root
        type="multiple"
        className="flex h-full w-full flex-col items-center justify-start space-y-1 overflow-auto px-2"
        defaultValue={defaultOpen}
      >
        {noCategoryVoices.length !== 0 && (
          <CategoryAccordion name="nocategory" id="nocategory">
            {noCategoryVoices.map(channel => (
              <DroppableChannel channel={channel} guildId={guildId} key={channel.id} />
            ))}
          </CategoryAccordion>
        )}
        {allCategories.data.map(category => {
          const channels = allVoices.data?.filter(channel => channel.parentId === category.id);
          if (channels === undefined || channels.length === 0) {
            return null;
          }
          return (
            <CategoryAccordion id={category.id} name={category.name} key={category.id}>
              {channels.map(channel => (
                <DroppableChannel channel={channel} guildId={guildId} key={channel.id} />
              ))}
            </CategoryAccordion>
          );
        })}
      </Accordion.Root>
    </div>
  );
};

export { DestinationChannels };
