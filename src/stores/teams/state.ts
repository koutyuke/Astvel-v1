import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { TeamsAtom } from "./atom";

export const useTeamsValue = () => useRecoilValue(TeamsAtom);

export const useTeamsMutater = () => useSetRecoilState(TeamsAtom);

export const useTeamsState = () => useRecoilState(TeamsAtom);

export const useResetTeam = () => useResetRecoilState(TeamsAtom);
