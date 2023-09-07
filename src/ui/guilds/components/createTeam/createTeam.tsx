import { FC, useState } from "react";
import { useCreateTeam } from "ui/guilds/hooks/useCreateTeam";
import { createDialog } from "components/elements/dialog";
import { useSetToast } from "featutres/toast/hooks";
import { TeamSetting } from "../elements/form/teamSetting";
import { TriggerButton } from "./triggerButton";

const CreateTeam: FC = () => {
  const [open, setOpen] = useState(false);
  const AddDialog = createDialog(<TriggerButton />);
  const toastSetter = useSetToast();
  const createTeam = useCreateTeam();

  return (
    <AddDialog open={open} setOpen={setOpen}>
      <TeamSetting
        title="Create New Team"
        buttonTitle="Create"
        defaultEmoji=""
        defaultName=""
        onSubmit={data => {
          setOpen(false);
          try {
            createTeam(data);
            toastSetter({
              title: "Create New Team",
              message: `success for ${data.emoji}${data.name}`,
              status: "success",
            });
          } catch {
            toastSetter({
              title: "Error",
              message: "Could Not Create Team",
              status: "error",
            });
          }
        }}
      />
    </AddDialog>
  );
};

export { CreateTeam };
