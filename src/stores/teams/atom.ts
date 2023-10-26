import { atom } from "recoil";
import { Team } from "./type";

export const TeamsAtom = atom<Team[]>({
  key: "Teams",
  default: [],
});
