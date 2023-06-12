import { atom } from "recoil";
import { UserKey } from "types/recoil/keys";

// eslint-disable-next-line import/prefer-default-export
export const userInfo = atom<UserKey>({
  key: "userInfo",
  default: {
    status: "noLogined",
    data: null,
  },
});
