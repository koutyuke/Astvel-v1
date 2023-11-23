import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { ChannelsAtom } from "./atom";

export const useChannelsValue = () => useAtomValue(ChannelsAtom);

export const useSetChannels = () => useSetAtom(ChannelsAtom);

export const useChannelsState = () => useAtom(ChannelsAtom);

export const useResetChannels = () => useResetAtom(ChannelsAtom);
