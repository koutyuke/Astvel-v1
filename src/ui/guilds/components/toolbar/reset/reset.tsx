import { FC, useState } from "react";
import { createDialog } from "components/elements/dialog";
import { useSetToast } from "features/toast/hooks";
import { BaseButton } from "components/elements/button";
import { ResetIcon } from "components/icon/reset";
import { useMemberReset } from "ui/guilds/hooks/useMemberReset";
import { PlusIcon } from "components/icon/plus";

const Reset: FC = () => {
  const [open, setOpen] = useState(false);
  const AddDialog = createDialog(
    <span className="box-border flex h-9 w-9 items-center justify-center rounded-md border border-transparent transition hover:border-gray-500 hover:bg-black-3">
      <ResetIcon className=" stroke-gray-400 transition" size={26} />
    </span>,
  );
  const toastSetter = useSetToast();

  const reset = useMemberReset();

  return (
    <AddDialog open={open} setOpen={setOpen}>
      <div className="relative flex aspect-video w-96 max-w-[90vw] flex-col items-center justify-between gap-y-6 rounded-lg bg-black-1 p-6 text-white outline outline-1 outline-gray-500 tablet:px-10 tablet:py-6">
        <p className="w-full text-center text-2xl font-semibold">Member Reset</p>
        <p className="w-full text-center">
          Reset all members.
          <br />
          Are you sure?
          <br />* This action don&apos;t reset teams.
        </p>

        <div className="flex w-full items-center justify-between">
          <BaseButton
            theme="normal"
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
        <div className="absolute right-6 top-6">
          <button
            type="button"
            className="group rounded-full border border-gray-500 transition hover:border-green-500"
            onClick={() => {
              setOpen(false);
            }}
          >
            <PlusIcon size={24} className="rotate-45 stroke-gray-500 transition group-hover:stroke-green-500" />
          </button>
        </div>
      </div>
    </AddDialog>
  );
};

export { Reset };
