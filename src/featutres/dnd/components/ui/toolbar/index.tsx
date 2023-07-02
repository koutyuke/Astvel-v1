import { FC } from "react";
import ToolMoveMenu from "../menu/tools/move";
import ToolResetMenu from "../menu/tools/reset";
import ToolSettingMenu from "../menu/tools/setting";
import ToolTitle from "./title";

type Props = {
  guildId: string;
};
const ToolBar: FC<Props> = ({ guildId }) => (
  <div className="relative">
    <div className="group absolute -left-16 top-0 flex h-full w-16 flex-col space-y-2 overflow-auto rounded-md bg-gradient-to-b from-[#22c1c3] to-[#7cff9d] p-2 text-teal-700 shadow-lg duration-200 hover:w-40">
      <ToolTitle />
      <span className="h-[2px] w-full rounded-full bg-[rgba(255,255,255,0.6)]" />
      <ToolMoveMenu guildId={guildId} />
      <ToolResetMenu />
      <ToolSettingMenu />
    </div>
  </div>
);

export default ToolBar;
