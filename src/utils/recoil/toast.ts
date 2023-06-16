import { atom } from "recoil";
import { ToastType } from "types/recoil/toast";

// eslint-disable-next-line import/prefer-default-export
export const toast = atom<ToastType>({
  key: "toast",
  default: {
    open: false,
    title: "",
    message: "",
    status: "success",
  },
});
