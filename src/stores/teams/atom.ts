import { atomWithReset } from "jotai/utils";
import { Team } from "./type";

export const TeamsAtom = atomWithReset<Team[]>([]);
