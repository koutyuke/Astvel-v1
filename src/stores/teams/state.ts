import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { TeamsAtom } from "./atom";

export const useTeamsValue = () => useAtomValue(TeamsAtom);

export const useSetTeams = () => useSetAtom(TeamsAtom);

export const useTeamsState = () => useAtom(TeamsAtom);

export const useResetTeam = () => useResetAtom(TeamsAtom);
