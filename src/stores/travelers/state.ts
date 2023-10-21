import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { TeamTravelersSelectorFamily, VoiceTravelersSelectorFamily } from "./selectorFamily";
import { TeamTravelersAtom, TravelerSizeAtom, UnselectedTravelersAtom, VoiceTravelersAtom } from "./atom";

export const useIdVoiceTravelerValue = (id: string) => useRecoilValue(VoiceTravelersSelectorFamily(id));

export const useVoiceTravelersValue = () => useRecoilValue(VoiceTravelersAtom);

export const useVoiceTravelersMutater = () => useSetRecoilState(VoiceTravelersAtom);

export const useVoiceTravelersState = () => useRecoilState(VoiceTravelersAtom);

export const useIdTeamTravelersValue = (id: string) => useRecoilValue(TeamTravelersSelectorFamily(id));

export const useTeamTravelersValue = () => useRecoilValue(TeamTravelersAtom);

export const useTeamTravelersMutater = () => useSetRecoilState(TeamTravelersAtom);

export const useTeamTravelersState = () => useRecoilState(TeamTravelersAtom);

export const useUnselectedTravelersValue = () => useRecoilValue(UnselectedTravelersAtom);

export const useUnselectedTravelersMutater = () => useSetRecoilState(UnselectedTravelersAtom);

export const useUnselectedTravelersState = () => useRecoilState(UnselectedTravelersAtom);

export const useTravelerSizeValue = () => useRecoilValue(TravelerSizeAtom);

export const useTravelerSizeMutater = () => useSetRecoilState(TravelerSizeAtom);

export const useTravelerSizeState = () => useRecoilState(TravelerSizeAtom);
