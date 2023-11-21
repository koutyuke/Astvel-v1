import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ScrollArea } from "components/elements/scrollArea";
import { SelectedGuild } from "./guild";
import { Separator } from "./separator";
import { TravelerSize } from "./travelerSize";
import { BackToPage } from "./backToPage";
import { Move } from "./move";
import { Reset } from "./reset";
import { TeamSetting } from "./teamSetting";

type Props = {
  guildId: string;
};
const ToolBar: FC<Props> = ({ guildId }) => (
  <div className="mx-8 flex h-14 items-center rounded-lg border border-gray-500 bg-black-2 px-2 tablet:mx-16">
    <SelectedGuild guildId={guildId} />
    <Separator />
    <ScrollArea className="h-fit w-[1px] flex-1" type="hover">
      <div className="flex h-full w-full min-w-fit items-center space-x-2">
        <TravelerSize />
        <Separator />
        <div className={twMerge(" flex w-[1px] min-w-fit flex-1 space-x-1")}>
          <Move guildId={guildId} />
          <Reset />
          <TeamSetting />
        </div>
      </div>
    </ScrollArea>
    <Separator />
    <BackToPage />
  </div>
);

export { ToolBar };
