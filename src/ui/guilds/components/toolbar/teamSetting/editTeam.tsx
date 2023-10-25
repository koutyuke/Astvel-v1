import { BaseButton } from "components/elements/button";
import { FC, useState } from "react";
import { Team } from "stores/teams";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from "components/icon/edit";
import { TrashIcon } from "components/icon/trash";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { EmojiPickerSetting, TeamValue, schema } from "./store";

type Props = {
  setPickerSetting: (value: EmojiPickerSetting) => void;
  teamDelete: (id: string) => void;
  teamUpdate: (id: string, emoji: TeamValue["emoji"], name: TeamValue["name"]) => void;
  team: Team;
};

const variant = tv({
  variants: {
    form: {
      view: "flex items-center ",
      edit: "flex flex-col items-end space-y-2",
      delete: "flex items-center ",
    },
    body: {
      view: "flex",
      edit: "grid w-full grid-cols-[auto_,_1fr] grid-rows-2 items-center gap-2",
      delete: "flex",
    },
  },
});

const EditTeam: FC<Props> = ({ setPickerSetting, team, teamDelete, teamUpdate }) => {
  const [mode, setMode] = useState<"view" | "edit" | "delete">("view");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    reset,
  } = useForm<TeamValue>({
    defaultValues: {
      emoji: team.iconEmoji,
      name: team.name,
    },
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  return (
    <form
      className={twMerge("box-border rounded-lg border border-gray-500 p-2", variant({ form: mode }))}
      onSubmit={handleSubmit(data => {
        teamUpdate(team.id, data.emoji, data.name);
      })}
    >
      <div className={twMerge("w-0 flex-1", variant({ body: mode }))}>
        <label htmlFor="emoji" className={twMerge("justify-self-center px-1 text-sm", mode !== "edit" && "hidden")}>
          Icon Emoji
        </label>
        <span className="flex items-end space-x-1">
          <input
            type="button"
            id="emoji"
            className={twMerge(
              "h-8 w-8 rounded-full border-gray-500 text-center text-xl transition",
              mode === "edit" && "border hover:border-green-500",
            )}
            onClick={() => {
              setPickerSetting({
                open: true,
                func: value => {
                  setValue("emoji", value.emoji);
                },
                currentEmoji: getValues("emoji"),
              });
            }}
            disabled={mode !== "edit"}
            {...register("emoji")}
          />
          {mode === "edit" && <span className="w-0 flex-1 text-sm text-gray-500">* Click and Choose!</span>}
        </span>
        <label htmlFor="name" className={twMerge("justify-self-center px-1 text-sm", mode !== "edit" && "hidden")}>
          Team Name
        </label>
        <input
          type="text"
          id="name"
          disabled={mode !== "edit"}
          className={twMerge(
            "h-8 w-0 flex-1 truncate rounded-lg border-gray-500 px-3 transition ",
            mode === "edit" && "w-full border hover:border-green-500",
          )}
          placeholder="Example: Team-A"
          {...register("name")}
        />
      </div>
      {mode === "view" && (
        <div className="flex space-x-2">
          <BaseButton
            className="h-8 w-8 rounded-md text-sm"
            theme="nomal"
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
        </div>
      )}
      {mode === "edit" && (
        <>
          {(errors.emoji || errors.name) && (
            <div className="w-full pl-2">
              {errors.emoji && <p className="text-sm text-red-500 ">* {errors.emoji.message}</p>}
              {errors.name && <p className="text-sm text-red-500">* {errors.name.message}</p>}
            </div>
          )}
          <div className="flex space-x-2">
            <BaseButton
              theme="nomal"
              className="h-8 w-fit px-3 text-sm"
              onClick={() => {
                reset();
                setMode("view");
              }}
            >
              <span>Cancel</span>
            </BaseButton>
            <BaseButton theme="safety" className="h-8 w-fit px-3 text-sm" type="submit">
              <span>Update</span>
            </BaseButton>
          </div>
        </>
      )}
      {mode === "delete" && (
        <div className="flex space-x-2">
          <BaseButton
            theme="danger"
            className="h-8 w-fit px-3 text-sm"
            type="submit"
            onClick={() => {
              teamDelete(team.id);
              setMode("view");
            }}
          >
            <span>Delete</span>
          </BaseButton>
          <BaseButton
            theme="nomal"
            className="h-8 w-fit px-3 text-sm"
            onClick={() => {
              reset();
              setMode("view");
            }}
          >
            <span>Cancel</span>
          </BaseButton>
        </div>
      )}
    </form>
  );
};

export { EditTeam };
