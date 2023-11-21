import { BaseButton } from "components/elements/button";
import { FC, useState } from "react";

type Props = {
  deleteTeams: () => void;
};

const DeleteAllTeams: FC<Props> = ({ deleteTeams }) => {
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="flex flex-col space-y-4 rounded-lg border border-red-700 bg-red-700/10 p-4 text-red-500 ">
      <p>Delete all teams.</p>
      <ul className="mx-2 space-y-1 text-white">
        <li className="relative before:mr-2 before:inline-block before:h-1 before:w-1 before:rounded-full before:bg-red-500 before:align-middle before:content-['']">
          Only teams will be deleted.
        </li>
        <li className="relative before:mr-2 before:inline-block before:h-1 before:w-1 before:rounded-full before:bg-red-500 before:align-middle before:content-['']">
          Member will not be deleted
        </li>
      </ul>
      <div className="flex w-fit space-x-2 self-end">
        {!confirm && (
          <BaseButton
            theme="danger"
            className="h-fit w-fit bg-red-700/10 px-3 py-1 text-sm"
            onClick={() => {
              setConfirm(true);
            }}
          >
            Delete
          </BaseButton>
        )}
        {confirm && (
          <div className="flex space-x-2">
            <BaseButton
              theme="danger"
              className="h-fit w-fit bg-red-700/10 px-3 py-1 text-sm"
              onClick={() => {
                deleteTeams();
              }}
            >
              Done
            </BaseButton>
            <BaseButton
              theme="normal"
              className="h-fit w-fit bg-black-1 px-3 py-1 text-sm hover:bg-black-3"
              onClick={() => {
                setConfirm(false);
              }}
            >
              Cancel
            </BaseButton>
          </div>
        )}
      </div>
    </div>
  );
};

export { DeleteAllTeams };
