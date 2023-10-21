import { EmojiClickData, EmojiStyle, Theme } from "emoji-picker-react";
import dynamic from "next/dynamic";
import { ComponentPropsWithoutRef, FC } from "react";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

type Props = {
  setClose: (value: boolean) => void;
  setValue: (value: EmojiClickData) => void;
} & Pick<ComponentPropsWithoutRef<"div">, "className">;

const EmojiPicker: FC<Props> = ({ setClose, setValue, className }) => {
  return (
    <div className={className}>
      <Picker
        onEmojiClick={emojiData => {
          setClose(false);
          setValue(emojiData);
        }}
        width="100%"
        height="100%"
        emojiStyle={EmojiStyle.NATIVE}
        theme={Theme.DARK}
      />
    </div>
  );
};

export { EmojiPicker };
