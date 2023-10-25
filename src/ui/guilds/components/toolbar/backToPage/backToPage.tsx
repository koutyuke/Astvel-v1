import { BaseButton } from "components/elements/button";
import { createDialog } from "components/elements/dialog";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { SignOutIcon } from "components/icon/signOut";

const BackToPage: FC = () => {
  const [open, setOpen] = useState(false);
  const AddDialog = createDialog(
    <span>
      <SignOutIcon size={24} className="stroke-gray-400 transition hover:stroke-green-500" />
    </span>,
  );
  const router = useRouter();

  return (
    <AddDialog open={open} setOpen={setOpen}>
      <div className="flex aspect-video w-96 max-w-[90vw]  flex-col items-center justify-between space-y-6 rounded-lg bg-black-1 p-6 text-white outline outline-1 outline-gray-500">
        <p className="w-full text-center text-2xl">Back to Guild Select Page</p>
        <p className="w-full text-center">
          All teams will be deleted.
          <br />
          Are you sure?
        </p>
        <div className="flex w-full items-center justify-between">
          <BaseButton
            className="h-8"
            theme="nomal"
            onClick={() => {
              setOpen(false);
            }}
          >
            <p>Cancel</p>
          </BaseButton>
          <BaseButton
            className="h-8"
            theme="danger"
            onClick={() => {
              router.push("/guilds");
            }}
          >
            <p>OK</p>
          </BaseButton>
        </div>
      </div>
    </AddDialog>
  );
};

export { BackToPage };
