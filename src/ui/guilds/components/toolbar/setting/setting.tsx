// import useToastSetter from "hooks/useToastSetter";
import { FC, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { createDialog } from "components/elements/dialog";
import { ToolTriggerButton } from "../triggerButton";

const Setting: FC = () => {
  const [open, setOpen] = useState(false);
  const AddDialog = createDialog(<ToolTriggerButton Icon={FiSettings} title="Setting" />);
  // const toastSetter = useToastSetter();

  return (
    <AddDialog open={open} setOpen={setOpen}>
      <div>Comming Soon...</div>
    </AddDialog>
  );
};

export { Setting };
