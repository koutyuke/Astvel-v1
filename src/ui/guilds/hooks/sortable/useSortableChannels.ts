import { useChannelsValue } from "stores/channels";
import { useAllCategories, useAllVoices } from "../swr";

const useSortableChannels = (guildId: string | undefined) => {
  const categoryStatus = useAllCategories(guildId);
  const voiceStatus = useAllVoices(guildId);
  const channel = useChannelsValue();

  return {
    isLoading: categoryStatus.isLoading || voiceStatus.isLoading,
    error: categoryStatus.error || voiceStatus.error,
    data: channel,
  };
};

export { useSortableChannels };
