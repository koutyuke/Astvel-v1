import { atom } from "recoil";
import { TeamTravelers, TravelerSize, UnselectedTravelers, VoiceTravelers } from "./type";

export const VoiceTravelersAtom = atom<VoiceTravelers[]>({
  key: "VoiceTravelersAtom",
  default: [],
});

export const UnselectedTravelersAtom = atom<UnselectedTravelers>({
  key: "UnselectedTravelersAtom",
  default: {
    members: [],
    teams: [],
  },
});

export const TeamTravelersAtom = atom<TeamTravelers[]>({
  key: "TeamTravelersAtom",
  default: [],
});

export const TravelerSizeAtom = atom<TravelerSize>({
  key: "TravelerSizeAtom",
  default: "large",
});
