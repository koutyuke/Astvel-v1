import { FC, useState } from "react";
import { useValidatedSession } from "hooks/useValidatedSession";
import { createDialog } from "components/elements/dialog";
import { RocketIcon } from "components/icon/rocket";
import { useTeamTravelersValue, useVoiceTravelersValue } from "stores/travelers";
import { MoveConfirm } from "./confirm";

type Props = {
  guildId: string;
};

const Move: FC<Props> = ({ guildId }) => {
  const [open, setOpen] = useState(false);
  const voiceTravelers = useVoiceTravelersValue();
  const teamTravelers = useTeamTravelersValue();

  const isSelected = voiceTravelers.some(
    traveler =>
      traveler.members.length !== 0 ||
      traveler.teams.some(team => {
        const teamTraveler = teamTravelers.find(t => t.id === team.containerId);
        return teamTraveler !== undefined && teamTraveler.members.length !== 0;
      }),
  );

  const { session } = useValidatedSession();

  if (!session.success) {
    return null;
  }

  const AddDialog = createDialog(
    <span className="relative flex h-9 w-9 items-center justify-center rounded-md border border-transparent transition hover:border-gray-500 hover:bg-black-3">
      {isSelected && (
        <span className="absolute right-0 top-0 flex h-2  w-2 -translate-y-1/2 translate-x-1/2 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-[ping_2s_ease-in-out_infinite] rounded-full bg-green-400 " />
          <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-green-500" />
        </span>
      )}
      <RocketIcon size={20} className="fill-gray-400" />
    </span>,
  );

  return (
    <AddDialog open={open} setOpen={setOpen}>
      <MoveConfirm guildId={guildId} setOpen={setOpen} />
    </AddDialog>
  );
};

export { Move };
