import AdditionalButton from "featutres/dnd/components/ui/menu/createTeam/additional";
import BaseDialog from "components/elements/dialog";
import TeamInfoForm from "featutres/dnd/components/elements/form/teamInfo";
import useToastSetter from "hooks/useToastSetter";
import { FC, useState } from "react";
import useCreateTeam from "featutres/dnd/hooks/useCreateTeam";

const CreateTeamMenu: FC = () => {
  const [open, setOpen] = useState(false);
  const AddDialog = BaseDialog(<AdditionalButton />);
  const toastSetter = useToastSetter();
  const createTeam = useCreateTeam();

  return (
    <AddDialog open={open} setOpen={setOpen}>
      <TeamInfoForm
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

export default CreateTeamMenu;
