import { EmojiClickData } from "emoji-picker-react";
import * as z from "zod";

export type TeamValue = {
  emoji: string;
  name: string;
};

export type EmojiPickerSetting =
  | {
      open: true;
      currentEmoji: string;
      func: (value: EmojiClickData) => void;
    }
  | {
      open: false;
    };

export const schema = z.object({
  emoji: z.string().min(1, { message: "Emoji: Not Selected" }),
  name: z
    .string()
    .min(3, { message: "Name: Length is too few. (3~16)" })
    .max(16, { message: "Name: Length is too much. (3~16)" }),
});

export const defaultTeamValue: TeamValue = {
  emoji: "🚀",
  name: "Team",
};
