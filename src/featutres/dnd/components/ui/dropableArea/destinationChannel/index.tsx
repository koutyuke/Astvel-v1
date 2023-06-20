import type { FC } from "react";
import { GroupChannelType } from "types/models/dnd";
import * as Accordion from "@radix-ui/react-accordion";
import { DestinationChannels } from "types/models/group";
import DropChannel from "./dropChannel";
import CategoryAccordion from "./categoryAccordion";

type Props = {
  data: DestinationChannels;
};

const DestinationChannelDropArea: FC<Props> = ({ data }) => {
  const { noCategory, categories } = data;
  const defaultOpen = [
    "nocategory",
    ...categories.filter(category => category.channels.length !== 0).map(category => category.id.toString()),
  ];
  return (
    <div className="h-full w-full rounded-lg bg-gradient-to-br from-[#0d6399] to-[#42cba8] py-2">
      <Accordion.Root
        type="multiple"
        className="flex h-full w-full flex-col items-center justify-start space-y-1 overflow-auto px-2"
        defaultValue={defaultOpen}
      >
        {noCategory.channels.length !== 0 && (
          <CategoryAccordion name="nocategory" value="nocategory" isPrivate={false}>
            {noCategory.channels.map(channel => {
              const group: GroupChannelType = {
                type: "channel",
                channelId: channel.id,
                categoryType: "noCategory",
                categoryId: null,
              };

              return <DropChannel channel={channel} group={group} key={channel.id} />;
            })}
          </CategoryAccordion>
        )}
        {categories.map(
          category =>
            category.channels.length !== 0 && (
              <CategoryAccordion
                name={category.name}
                value={category.id.toString()}
                isPrivate={false}
                key={category.id}
              >
                {category.channels.map(channel => {
                  const group: GroupChannelType = {
                    type: "channel",
                    channelId: channel.id,
                    categoryType: "category",
                    categoryId: category.id,
                  };
                  return <DropChannel channel={channel} group={group} key={channel.id} />;
                })}
              </CategoryAccordion>
            ),
        )}
      </Accordion.Root>
    </div>
  );
};

export default DestinationChannelDropArea;
