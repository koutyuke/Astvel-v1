import { BaseButton } from "components/elements/button";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmojiPickerSetting, TeamValue, schema } from "./store";

type Props = {
  setPickerSetting: (value: EmojiPickerSetting) => void;
  onSubmit: (data: TeamValue) => void;
};

const CreateTeam: FC<Props> = ({ setPickerSetting, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    getValues,
  } = useForm<TeamValue>({
    defaultValues: {
      emoji: "",
      name: "",
    },
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  return (
    <form
      className="box-border items-center space-y-2 rounded-lg border border-gray-500 p-2"
      onSubmit={handleSubmit(data => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="grid w-full grid-cols-[auto_,_1fr] grid-rows-2 items-center gap-2">
        <label htmlFor="emoji" className="justify-self-center px-1  text-sm">
          Icon Emoji
        </label>
        <span className="flex items-end space-x-1">
          <input
            type="button"
            id="emoji"
            className="relative h-8 w-8 rounded-full border border-gray-500 text-center text-xl transition hover:border-green-500"
            {...register("emoji")}
            onClick={() => {
              setPickerSetting({
                open: true,
                func: value => {
                  setValue("emoji", value.emoji);
                },
                currentEmoji: getValues("emoji"),
              });
            }}
          />
          <span className="w-0 flex-1 text-sm text-gray-500">* Click and Choose!</span>
        </span>
        <label htmlFor="name" className="justify-self-center px-1 text-sm">
          Team Name
        </label>
        <input
          type="text"
          id="name"
          className="box-border h-8 w-full rounded-md border border-gray-500 px-2 transition hover:border-green-500"
          placeholder="Example: Team-A"
          {...register("name")}
        />
      </div>
      <div className="w-full pl-2">
        {errors.emoji && <p className="text-sm text-red-500 ">* {errors.emoji.message}</p>}
        {errors.name && <p className="text-sm text-red-500">* {errors.name.message}</p>}
      </div>
      <div className="relative flex h-8 w-full justify-end space-x-2">
        <BaseButton
          className="h-8 w-fit rounded-md px-3 text-sm"
          theme="normal"
          onClick={() => {
            reset();
          }}
        >
          <p className="m-auto">Reset</p>
        </BaseButton>
        <BaseButton className="flex h-8 w-fit rounded-md px-3 text-sm" theme="safety" type="submit">
          <p className="m-auto">Create</p>
        </BaseButton>
      </div>
    </form>
  );
};

export { CreateTeam };
