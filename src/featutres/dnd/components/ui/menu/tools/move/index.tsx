import BaseDialog from "components/elements/dialog";
// import useToastSetter from "hooks/useToastSetter";
import { FC, useState } from "react";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import BaseToolButton from "featutres/dnd/components/elements/button/tool";

const ToolMoveMenu: FC = () => {
  const [open, setOpen] = useState(false);
  const AddDialog = BaseDialog(<BaseToolButton Icon={BsFillRocketTakeoffFill} title="Move" />);
  // const toastSetter = useToastSetter();

  return (
    <AddDialog open={open} setOpen={setOpen}>
      <div>jpeg</div>
    </AddDialog>
  );
};

export default ToolMoveMenu;
