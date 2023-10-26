import { atom } from "recoil";
import { Channel, NoCategory } from "./type";

export const noCategoryValue: NoCategory = {
  id: "NoCategory",
  name: "No Category",
  permissionOverwriteMembers: [],
  permissionOverwriteRoles: [],
  parentId: null,
};

export const ChannelsAtom = atom<Channel[]>({
  key: "Channels",
  default: [
    {
      ...noCategoryValue,
      voices: [],
    },
  ],
});
