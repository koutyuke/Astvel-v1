import { atom } from "recoil";
import { Toast } from "./type";

export const ToastAtom = atom<Toast>({
  key: "toast",
  default: {
    open: false,
    title: "",
    message: "",
    status: "success",
  },
});

export const ToastRefIdAtom = atom<number>({
  key: "toastRefId",
  default: 0,
});
