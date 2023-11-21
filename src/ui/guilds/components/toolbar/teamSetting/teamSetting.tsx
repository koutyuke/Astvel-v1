import { FC, useState } from "react";
import { createDialog } from "components/elements/dialog";
import { TeamIcon } from "components/icon/team";
import { TeamSettingMenu } from "./menu";

const TeamSetting: FC = () => {
  const [open, setOpen] = useState(false);
  const AddDialog = createDialog(
    <span className="box-border flex h-9 w-9 items-center justify-center rounded-md border border-transparent transition hover:border-gray-500 hover:bg-black-3">
      <TeamIcon size={24} className="fill-gray-400" />
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
