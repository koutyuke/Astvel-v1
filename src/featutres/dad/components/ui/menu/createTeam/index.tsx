import AdditionalButton from "components/elements/button/additional";
import BaseDialog from "components/elements/dialog";
import TeamInfoForm from "featutres/dad/components/elements/form/teamInfo";
import useToastSetter from "hooks/useToastSetter";
import { FC, useState } from "react";

const CreateTeamMenu: FC = () => {
  const [open, setOpen] = useState(false);
  const AddDialog = BaseDialog(<AdditionalButton />);
  const toastSetter = useToastSetter();

  return (
    <AddDialog open={open} setOpen={setOpen}>
      <TeamInfoForm
        title="Create New Team"
        buttonTitle="Create"
        defaultEmoji=""
        defaultName=""
        onSubmit={data => {
          // console.log(data);
          setOpen(false);
          toastSetter({
            title: "Create New Team",
            message: `success for ${data.emoji}${data.name}`,
            status: "success",
          });
        }}
      />
    </AddDialog>
  );
};

export default CreateTeamMenu;
