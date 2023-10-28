import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { ChannelsAtom } from "./atom";
import { ChannelsSelectorFamily } from "./selectorFamily";

export const useChannelsValue = () => useRecoilValue(ChannelsAtom);

export const useChannelsMutater = () => useSetRecoilState(ChannelsAtom);

export const useChannelsState = () => useRecoilState(ChannelsAtom);

export const useIdChannelState = (id: string) => useRecoilValue(ChannelsSelectorFamily(id));

export const useResetChannels = () => useResetRecoilState(ChannelsAtom);
