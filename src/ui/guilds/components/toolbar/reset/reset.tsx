import { FC, useState } from "react";
import { TbReload } from "react-icons/tb";
import { createDialog } from "components/elements/dialog";
import { useSetToast } from "featutres/toast/hooks";
import { BaseButton } from "components/elements/button";
import { ToolTriggerButton } from "../triggerButton";

const Reset: FC = () => {
  const [open, setOpen] = useState(false);
  const AddDialog = createDialog(<ToolTriggerButton Icon={TbReload} title="Reset" />);
  const toastSetter = useSetToast();

  return (
    <AddDialog open={open} setOpen={setOpen}>
      <div className="flex h-48 w-80 flex-col items-center justify-between rounded-lg bg-white p-4 text-gray-500">
        <p className="w-full text-center text-2xl">Member Reset</p>
        <p className="w-full text-center">
          Reset all members.
          <br />
          Are you sure?
          <br />* this action don&apos;t reset teams.
        </p>

        <div className="flex w-full items-center justify-between">
          <BaseButton
            className="h-8 border-2 border-gray-300 duration-200 hover:scale-110"
            onClick={() => {
              setOpen(false);
            }}
          >
            <p>Calcel</p>
          </BaseButton>
          <BaseButton className="h-8 bg-green-300 text-green-700 duration-200 hover:scale-110" onClick={() => {}}>
            <p>Reset</p>
          </BaseButton>
        </div>
      </div>
    </AddDialog>
  );
};

export { Reset };
