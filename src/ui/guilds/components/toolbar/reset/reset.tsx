import { FC, useState } from "react";
import { createDialog } from "components/elements/dialog";
import { useSetToast } from "features/toast/hooks";
import { BaseButton } from "components/elements/button";
import { ResetIcon } from "components/icon/reset";
import { useMemberReset } from "ui/guilds/hooks/useMemberReset";

const Reset: FC = () => {
  const [open, setOpen] = useState(false);
  const AddDialog = createDialog(
    <span>
      <ResetIcon className=" stroke-gray-400 transition hover:stroke-green-500" size={26} />
    </span>,
  );
  const toastSetter = useSetToast();

  const reset = useMemberReset();

  return (
    <AddDialog open={open} setOpen={setOpen}>
      <div className="flex aspect-video w-96 max-w-[90vw] flex-col items-center justify-between space-y-6 rounded-lg bg-black-1 p-6 text-white outline outline-1 outline-gray-500">
        <p className="w-full text-center text-2xl">Member Reset</p>
        <p className="w-full text-center">
          Reset all members.
          <br />
          Are you sure?
          <br />* This action don&apos;t reset teams.
        </p>

        <div className="flex w-full items-center justify-between">
          <BaseButton
            theme="nomal"
            className="h-8"
            onClick={() => {
              setOpen(false);
            }}
          >
            <p>Cancel</p>
          </BaseButton>
          <BaseButton
            theme="danger"
            className="h-8"
            onClick={() => {
              setOpen(false);
              reset();
              toastSetter({ title: "Reset", message: "Success for Member Reset", status: "success" });
            }}
          >
            <p>Reset</p>
          </BaseButton>
        </div>
      </div>
    </AddDialog>
  );
};

export { Reset };
