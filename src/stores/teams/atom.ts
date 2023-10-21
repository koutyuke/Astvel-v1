import { atom } from "recoil";
import { Team } from "./type";

export const TeamsAtom = atom<Team[]>({
  key: "Teams",
  default: [
    {
      iconEmoji: "👨‍💻",
      name: "開発",
      id: "1",
    },
    {
      iconEmoji: "😡",
      name: "怒り",
      id: "2",
    },
  ],
});
