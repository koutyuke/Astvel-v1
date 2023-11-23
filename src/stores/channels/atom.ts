import { atomWithReset } from "jotai/utils";
import { Channel, NoCategory } from "./type";

export const noCategoryValue: NoCategory = {
  id: "NoCategory",
  name: "No Category",
  permissionOverwriteMembers: [],
  permissionOverwriteRoles: [],
  parentId: null,
};

export const ChannelsAtom = atomWithReset<Channel[]>([
  {
    ...noCategoryValue,
    voices: [],
  },
]);
