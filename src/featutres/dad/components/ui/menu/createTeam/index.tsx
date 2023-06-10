import AdditionalButton from "components/elements/button/additional";
import BaseDialog from "components/elements/dialog";
import TeamInfoForm from "featutres/dad/components/elements/form/teamInfo";
import { FC, useState } from "react";

const CreateTeamMenu: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <BaseDialog open={open} setOpen={setOpen} TrigerButton={AdditionalButton}>
      <TeamInfoForm
        title="Create New Team"
        onSubmit={data => {
          console.log(data);
          setOpen(false);
        }}
      />
    </BaseDialog>
  );
};

export default CreateTeamMenu;
