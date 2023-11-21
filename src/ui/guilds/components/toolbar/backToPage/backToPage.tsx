import { BaseButton } from "components/elements/button";
import { createDialog } from "components/elements/dialog";
import { useRouter } from "next/router";
import { ComponentPropsWithoutRef, FC, useState } from "react";
import { SignOutIcon } from "components/icon/signOut";
import { useResetTeam } from "stores/teams";
import { useResetTeamTravelers, useResetUnselectedTravelers, useResetVoiceTravelers } from "stores/travelers";
import { useResetChannels } from "stores/channels";
import { twMerge } from "tailwind-merge";

type Props = Pick<ComponentPropsWithoutRef<"div">, "className">;

const BackToPage: FC<Props> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const AddDialog = createDialog(
    <span
      className={twMerge(
        "box-border flex h-9 w-9 items-center justify-center rounded-md border border-transparent transition hover:border-gray-500 hover:bg-black-3",
        className,
      )}
    >
      <SignOutIcon size={22} className="stroke-gray-400 stroke-[2.5]" />
    </span>,
  );
  const router = useRouter();
  const resetTeam = useResetTeam();
  const resetTeamTravelers = useResetTeamTravelers();
  const resetUnselectedTravelers = useResetUnselectedTravelers();
  const resetVoiceTravelers = useResetVoiceTravelers();
  const resetChannels = useResetChannels();

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
            theme="normal"
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
              resetTeam();
              resetTeamTravelers();
              resetUnselectedTravelers();
              resetVoiceTravelers();
              resetChannels();
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
