import { selectorFamily } from "recoil";
import { ChannelsAtom } from "./atom";

export const ChannelsSelectorFamily = selectorFamily({
  key: "ChannelsSelectorFamily",
  get:
    (id: string | null) =>
    ({ get }) => {
      const categories = get(ChannelsAtom);
      return categories.find(category => category.id === id);
    },
});
