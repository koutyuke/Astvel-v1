import { atom } from "recoil";
import { UserKey } from "types/recoil/dnd";

// eslint-disable-next-line import/prefer-default-export
export const userInfo = atom<UserKey>({
  key: "userInfo",
  default: {
    status: "noLogined",
    data: null,
  },
});
