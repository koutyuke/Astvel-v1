import { atom } from "recoil";
import { ToastType } from "types/recoil/toast";

export const toast = atom<ToastType>({
  key: "toast",
  default: {
    open: false,
    title: "",
    message: "",
    status: "success",
  },
});

export const toastRefId = atom<number>({
  key: "toastRefId",
  default: 0,
});
