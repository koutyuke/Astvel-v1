import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ToastAtom, ToastRefIdAtom } from "./atom";

export const useToastState = () => useAtom(ToastAtom);

export const useToastValue = () => useAtomValue(ToastAtom);

export const useSetToast = () => useSetAtom(ToastAtom);

export const useToastRefId = () => useAtomValue(ToastRefIdAtom);

export const useSetToastRefId = () => useSetAtom(ToastRefIdAtom);

export const useToastRefIdState = () => useAtom(ToastRefIdAtom);
