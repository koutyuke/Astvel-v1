import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { TeamTravelersAtom, TravelerSizeAtom, UnselectedTravelersAtom, VoiceTravelersAtom } from "./atom";

export const useVoiceTravelersValue = () => useAtomValue(VoiceTravelersAtom);

export const useSetVoiceTravelers = () => useSetAtom(VoiceTravelersAtom);

export const useVoiceTravelersState = () => useAtom(VoiceTravelersAtom);

export const useResetVoiceTravelers = () => useResetAtom(VoiceTravelersAtom);

export const useTeamTravelersValue = () => useAtomValue(TeamTravelersAtom);

export const useSetTeamTravelers = () => useSetAtom(TeamTravelersAtom);

export const useTeamTravelersState = () => useAtom(TeamTravelersAtom);

export const useResetTeamTravelers = () => useResetAtom(TeamTravelersAtom);

export const useUnselectedTravelersValue = () => useAtomValue(UnselectedTravelersAtom);

export const useSetUnselectedTravelers = () => useSetAtom(UnselectedTravelersAtom);

export const useUnselectedTravelersState = () => useAtom(UnselectedTravelersAtom);

export const useResetUnselectedTravelers = () => useResetAtom(UnselectedTravelersAtom);

export const useTravelerSizeValue = () => useAtomValue(TravelerSizeAtom);

export const useSetTravelerSize = () => useSetAtom(TravelerSizeAtom);

export const useTravelerSizeState = () => useAtom(TravelerSizeAtom);
