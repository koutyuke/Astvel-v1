import BaseButton from "components/elements/button";
import BaseDialog from "components/elements/dialog";
import BaseToolButton from "featutres/dnd/components/elements/button/tool";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { TbLogout2 } from "react-icons/tb";

const ToolBackGuildsMenu: FC = () => {
  const [open, setOpen] = useState(false);
  const AddDialog = BaseDialog(<BaseToolButton Icon={TbLogout2} title="Select" />);
  const router = useRouter();

  return (
    <AddDialog open={open} setOpen={setOpen}>
      <div className="flex h-48 w-80 flex-col items-center justify-between rounded-lg bg-white p-4 text-gray-500">
        <p className="w-full text-center text-2xl">Go Back Guild Select</p>
        <p className="w-full text-center">
          All teams will be deleted.
          <br />
          Are you sure?
        </p>
        <div className="flex w-full items-center justify-between">
          <BaseButton
            className="h-8 border-2 border-gray-300 duration-200 hover:scale-110"
            onClick={() => {
              setOpen(false);
            }}
          >
            <p>Calcel</p>
          </BaseButton>
          <BaseButton
            className="h-8 bg-green-300 text-green-700 duration-200 hover:scale-110"
            onClick={() => {
              router.push("/guilds");
            }}
          >
            <p>Go Back</p>
          </BaseButton>
        </div>
      </div>
    </AddDialog>
  );
};

export default ToolBackGuildsMenu;
