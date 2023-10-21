import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ToastAtom, ToastRefIdAtom } from "./atom";

export const useToastState = () => useRecoilState(ToastAtom);

export const useToastValue = () => useRecoilValue(ToastAtom);

export const useToastMutater = () => useSetRecoilState(ToastAtom);

export const useToastRefId = () => useRecoilValue(ToastRefIdAtom);

export const useToastRefIdMutater = () => useSetRecoilState(ToastRefIdAtom);

export const useToastRefIdState = () => useRecoilState(ToastRefIdAtom);
