import { selectorFamily } from "recoil";
import { TeamTravelersAtom, VoiceTravelersAtom } from "./atom";

export const VoiceTravelersSelectorFamily = selectorFamily({
  key: "DroppableVoiceContainersSelectorFamily",
  get:
    (id: string) =>
    ({ get }) => {
      const containers = get(VoiceTravelersAtom);
      return containers.find(container => container.id === id);
    },
});

export const TeamTravelersSelectorFamily = selectorFamily({
  key: "DroppableTeamContainersSelectorFamily",
  get:
    (id: string) =>
    ({ get }) => {
      const containers = get(TeamTravelersAtom);
      return containers.find(container => container.id === id);
    },
});
