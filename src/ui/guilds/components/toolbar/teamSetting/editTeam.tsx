import { BaseButton } from "components/elements/button";
import { FC, useState } from "react";
import type { Team } from "stores/teams";
import { EditIcon } from "components/icon/edit";
import { TrashIcon } from "components/icon/trash";
import { twMerge } from "tailwind-merge";
import type { EmojiPickerSetting, TeamValue } from "./store";
import { TeamEditor } from "./teamEditor";

type Props = {
  setPickerSetting: (value: EmojiPickerSetting) => void;
  deleteTeam: (id: string) => void;
  updateTeam: (id: string, emoji: TeamValue["emoji"], name: TeamValue["name"]) => void;
  team: Team;
};

const EditTeam: FC<Props> = ({ setPickerSetting, team, deleteTeam, updateTeam }) => {
  const [mode, setMode] = useState<"view" | "edit" | "delete">("view");

  if (mode === "edit") {
    return (
      <TeamEditor
        setPickerSetting={setPickerSetting}
        onSubmit={value => {
          updateTeam(team.id, value.emoji, value.name);
          setMode("view");
        }}
        onCancel={() => {
          setMode("view");
        }}
        defaultValues={{
          emoji: team.iconEmoji,
          name: team.name,
        }}
        type="edit"
      />
    );
  }
  return (
    <div className={twMerge("box-border flex items-center gap-x-2 rounded-lg border border-gray-500 p-2")}>
      <span className={twMerge("h-8 w-8 rounded-full border-gray-500 text-center text-2xl transition")}>
        {team.iconEmoji}
      </span>
      <p className={twMerge("h-fit w-1 flex-1 truncate rounded-lg border-gray-500 transition ")}>{team.name}</p>
      {mode === "view" && (
        <>
          <BaseButton
            className="h-8 w-8 rounded-md text-sm"
            theme="normal"
            onClick={() => {
              setMode("edit");
            }}
          >
            <span>
              <EditIcon size={20} className="m-auto" />
            </span>
          </BaseButton>
          <BaseButton
            className="h-8 w-8 rounded-md text-sm"
            theme="danger"
            onClick={() => {
              setMode("delete");
            }}
          >
            <span>
              <TrashIcon size={20} className="m-auto" />
            </span>
          </BaseButton>
        </>
      )}
      {mode === "delete" && (
        <>
          <BaseButton
            theme="danger"
            className="h-8 w-fit px-3 text-sm"
            type="submit"
            onClick={() => {
              deleteTeam(team.id);
              setMode("view");
            }}
          >
            <span>Delete</span>
          </BaseButton>
          <BaseButton
            theme="normal"
            className="h-8 w-fit px-3 text-sm"
            onClick={() => {
              setMode("view");
            }}
          >
            <span>Cancel</span>
          </BaseButton>
        </>
      )}
    </div>
  );
};

export { EditTeam };
