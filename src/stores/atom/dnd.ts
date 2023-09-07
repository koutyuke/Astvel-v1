import { atom } from "recoil";
import { DnDMember, DnDTeam, Team } from "types/recoil/dnd";

export const TeamsAtom = atom<Team[]>({
  key: "Teams",
  default: [],
});

export const DnDMembersAtom = atom<DnDMember[]>({
  key: "DnDMembers",
  default: [],
});

export const DnDTeamsAtom = atom<DnDTeam[]>({
  key: "DnDTeams",
  default: [],
});
