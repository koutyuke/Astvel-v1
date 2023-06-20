import BaseDialog from "components/elements/dialog";
// import useToastSetter from "hooks/useToastSetter";
import { FC, useState } from "react";
import BaseToolButton from "featutres/dnd/components/elements/button/tool";
import { TbReload } from "react-icons/tb";

const ToolResetMenu: FC = () => {
  const [open, setOpen] = useState(false);
  const AddDialog = BaseDialog(<BaseToolButton Icon={TbReload} title="Reset" />);
  // const toastSetter = useToastSetter();

  return (
    <AddDialog open={open} setOpen={setOpen}>
      <div>jpeg</div>
    </AddDialog>
  );
};

export default ToolResetMenu;
