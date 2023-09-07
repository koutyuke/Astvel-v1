/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { EmojiStyle } from "emoji-picker-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseButton } from "components/elements/button";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

export type FormValue = {
  emoji: string;
  name: string;
};

type Props = {
  title: string;
  buttonTitle: string;
  onSubmit: (data: FormValue) => void;
  defaultEmoji: string;
  defaultName: string;
};

const TeamSetting: FC<Props> = ({ title, buttonTitle, defaultEmoji, defaultName, onSubmit }) => {
  const schema = z.object({
    emoji: z.string().min(1, { message: "Please Select a Emoji." }),
    name: z.string().min(1, { message: "Name length is 1~20." }).max(20, { message: "Name length is 1~20." }),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      name: defaultName,
      emoji: defaultEmoji,
    },
    resolver: zodResolver(schema),
  });
  const [showPicker, setPicker] = useState(false);

  return (
    <form
      className="relative h-96 w-96 flex-col rounded-lg bg-white p-8 text-gray-500"
      onSubmit={handleSubmit(data => {
        onSubmit(data);
      })}
    >
      <p className="h-8 w-full text-center text-2xl">{title}</p>
      <div className="mt-12 h-44 w-full">
        {showPicker && (
          <div
            className="absolute left-0 top-0 h-96 w-96"
            aria-hidden="true"
            onClick={() => {
              setPicker(false);
            }}
          />
        )}
        <div className={`absolute left-[60%] top-3 ${showPicker ? "block" : "hidden"}`}>
          <Picker
            onEmojiClick={emojiData => {
              setPicker(false);
              setValue("emoji", emojiData.emoji);
            }}
            width={360}
            height={400}
            emojiStyle={EmojiStyle.TWITTER}
          />
        </div>
        <div className="h-24 w-full flex-col items-center justify-center space-y-2">
          <label htmlFor="emoji" className="m-auto block w-fit">
            icon emoji
          </label>
          <input
            id="emoji"
            {...register("emoji")}
            readOnly
            className="m-auto block h-10 w-10 cursor-pointer rounded-lg text-center text-4xl outline outline-2 outline-red-200"
            onClick={() => {
              setPicker(!showPicker);
            }}
          />
          {errors.emoji?.message && <p className="text-center text-sm text-red-500">{errors.emoji.message}</p>}
        </div>
        <div className="h-20 w-full flex-col space-y-2">
          <label htmlFor="name" className="m-auto block w-fit">
            name
          </label>
          <input
            id="name"
            {...register("name")}
            className="mx-auto block w-fit rounded-sm text-center outline outline-2 outline-offset-2 outline-red-200"
          />
          {errors.name?.message && <p className="text-center text-sm text-red-500">{errors.name.message}</p>}
        </div>
      </div>
      <div className="mt-4 flex h-12 w-full items-center justify-center">
        <BaseButton type="submit" className="bg-green-500 text-white">
          {buttonTitle}
        </BaseButton>
      </div>
    </form>
  );
};

export { TeamSetting };
