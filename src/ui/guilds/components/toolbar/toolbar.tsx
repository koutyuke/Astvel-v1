import { FC } from "react";
import { twMerge } from "tailwind-merge";
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
  <div className="mx-8 flex h-14 items-center justify-start rounded-lg border border-gray-500 p-2 tablet:mx-16">
    <SelectedGuild guildId={guildId} />
    <Separator />
    <TravelerSize />
    <Separator />
    <div className={twMerge("scrollber-hidden flex  h-full w-0 flex-1 items-center space-x-2 overflow-x-auto px-2")}>
      <Move guildId={guildId} />
      <Reset />
      <TeamSetting />
    </div>
    <Separator />
    <BackToPage />
  </div>
);

export { ToolBar };
