import { atom } from "recoil";
import { ToastType } from "types/recoil/toast";

export const toastAtom = atom<ToastType>({
  key: "toast",
  default: {
    open: false,
    title: "",
    message: "",
    status: "success",
  },
});

export const toastRefIdAtom = atom<number>({
  key: "toastRefId",
  default: 0,
});
