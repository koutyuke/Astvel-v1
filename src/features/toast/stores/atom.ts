import { atom } from "jotai";
import { Toast } from "./type";

export const ToastAtom = atom<Toast>({
  open: false,
  title: "",
  message: "",
  status: "success",
});

export const ToastRefIdAtom = atom<number>(0);
