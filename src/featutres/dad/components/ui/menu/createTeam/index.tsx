import DialogForAdd from "components/elements/dialog/add";
import TeamInfoForm from "featutres/dad/components/elements/form/teamInfo";
import { FC, useState } from "react";

const CreateTeamMenu: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <DialogForAdd open={open} setOpen={setOpen}>
      <TeamInfoForm
        title="Create New Team"
        onSubmit={data => {
          console.log(data);
          setOpen(false);
        }}
      />
    </DialogForAdd>
  );
};

export default CreateTeamMenu;
