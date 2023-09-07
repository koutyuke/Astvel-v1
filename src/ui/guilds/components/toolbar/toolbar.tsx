import { FC } from "react";
import { SelectedGuild } from "./selectedGuild";
import { Move } from "./move";
import { Reset } from "./reset";
import { Setting } from "./setting";
import { BackGuilds } from "./backGuilds";

type Props = {
  guildId: string;
};
const ToolBar: FC<Props> = ({ guildId }) => (
  <div className="relative">
    <div className="group absolute -left-16 top-0 flex h-full w-16 flex-col overflow-y-auto overflow-x-hidden rounded-md bg-gradient-to-b from-[#22c1c3] to-[#7cff9d] p-2 text-teal-700 shadow-lg duration-200 hover:w-40 [&>*]:mb-2 last:[&>*]:mb-0 last:[&>*]:mt-auto">
      <SelectedGuild guildId={guildId} />
      <span className="h-[2px] w-full rounded-full bg-[rgba(255,255,255,0.6)]" />
      <Move guildId={guildId} />
      <Reset />
      <Setting />
      <BackGuilds />
    </div>
  </div>
);

export { ToolBar };