import BaseDialog from "components/elements/dialog";
// import useToastSetter from "hooks/useToastSetter";
import { FC, useState } from "react";
import BaseToolButton from "featutres/dnd/components/elements/button/tool";
import { FiSettings } from "react-icons/fi";

const ToolSettingMenu: FC = () => {
  const [open, setOpen] = useState(false);
  const AddDialog = BaseDialog(<BaseToolButton Icon={FiSettings} title="Setting" />);
  // const toastSetter = useToastSetter();

  return (
    <AddDialog open={open} setOpen={setOpen}>
      <div>Comming Soon...</div>
    </AddDialog>
  );
};

export default ToolSettingMenu;
