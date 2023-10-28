import { DownIcon } from "components/icon/down";
import { SpeechBalloonTriangle } from "components/icon/speechBalloonTriangle";
import { EmojiPicker } from "features/emojiPicker/components";
import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  close: VoidFunction;
  currentEmoji: string;
} & ComponentPropsWithoutRef<typeof EmojiPicker>;

const SelectEmoji: FC<Props> = ({ currentEmoji, close, onEmojiClick, className }) => {
  return (
    <div className={twMerge("flex h-full flex-col ", className)}>
      <button
        type="button"
        onClick={() => {
          close();
        }}
        className="group mb-2 flex h-6 w-fit flex-none items-center space-x-1"
      >
        <DownIcon size={20} className="rotate-90 transition group-hover:stroke-green-500" />
        <p className="transition group-hover:text-green-500 ">Close</p>
      </button>
      <EmojiPicker
        className="box-border w-full flex-1 overflow-hidden rounded-lg border border-gray-500"
        onEmojiClick={(emoji, event) => {
          if (onEmojiClick) onEmojiClick(emoji, event);
          close();
        }}
      />
      <SpeechBalloonTriangle className="mx-auto fill-gray-500" height={12} width={24} />
      <div className="flex h-16 flex-none items-center justify-center space-x-2">
        <div className="box-border flex h-12 w-12 items-center justify-center rounded-md border border-gray-500">
          <span className="text-2xl">{currentEmoji}</span>
        </div>
      </div>
    </div>
  );
};

export { SelectEmoji };
