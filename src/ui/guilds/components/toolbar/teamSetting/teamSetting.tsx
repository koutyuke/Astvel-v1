import { FC, useState } from "react";
import { createDialog } from "components/elements/dialog";
import { TeamIcon } from "components/icon/team";
import { TeamSettingMenu } from "./menu";

const TeamSetting: FC = () => {
  const [open, setOpen] = useState(false);
  const AddDialog = createDialog(
    <span>
      <TeamIcon size={26} className="fill-gray-400 transition hover:fill-green-500" />
    </span>,
  );

  return (
    <AddDialog open={open} setOpen={setOpen}>
      <TeamSettingMenu
        setClose={() => {
          setOpen(false);
        }}
      />
    </AddDialog>
  );
};

export { TeamSetting };
