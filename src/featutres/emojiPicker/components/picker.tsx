import { EmojiStyle, Theme } from "emoji-picker-react";
import dynamic from "next/dynamic";
import { ComponentPropsWithoutRef, FC } from "react";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

type Props = Pick<ComponentPropsWithoutRef<typeof Picker>, "onEmojiClick"> &
  Pick<ComponentPropsWithoutRef<"div">, "className">;

const EmojiPicker: FC<Props> = ({ onEmojiClick, className }) => {
  return (
    <div className={className}>
      <Picker
        onEmojiClick={onEmojiClick}
        width="100%"
        height="100%"
        emojiStyle={EmojiStyle.NATIVE}
        theme={Theme.DARK}
      />
    </div>
  );
};

export { EmojiPicker };
