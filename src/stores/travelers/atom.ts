import { atomWithReset, atomWithStorage } from "jotai/utils";
import { TeamTravelers, TravelerSize, UnselectedTravelers, VoiceTravelers } from "./type";

export const VoiceTravelersAtom = atomWithReset<VoiceTravelers[]>([]);

export const UnselectedTravelersAtom = atomWithReset<UnselectedTravelers>({
  members: [],
  teams: [],
});

export const TeamTravelersAtom = atomWithReset<TeamTravelers[]>([]);

export const TravelerSizeAtom = atomWithStorage<TravelerSize>("TravelerSizeAtom", "large");
