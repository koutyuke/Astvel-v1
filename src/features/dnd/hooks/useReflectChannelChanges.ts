import { useEffect } from "react";
import { Channel, useSetChannels } from "stores/channels";
import { noCategoryValue } from "stores/channels/atom";
import { APICategory, APIVoice } from "types/api/astvel";
import { useAllCategories, useAllVoices } from "ui/guilds/hooks/swr";

const useReflectChannelChanges = (guildId: string | undefined) => {
  const apiCategories = useAllCategories(guildId);
  const apiVoices = useAllVoices(guildId);

  const setChannels = useSetChannels();

  useEffect(() => {
    if (apiCategories.data === undefined || apiVoices.data === undefined) {
      return;
    }

    setChannels(currentChannels => {
      const apiCategoriesData = apiCategories.data as APICategory[];
      const apiVoicesData = apiVoices.data as APIVoice[];

      const returnChannels: Channel[] = currentChannels.reduce<Channel[]>((acc, currentChannel) => {
        const apiCategory =
          currentChannel.id !== noCategoryValue.id
            ? apiCategoriesData.find(category => category.id === currentChannel.id)
            : currentChannel;

        if (apiCategory !== undefined) {
          const returnVoices: APIVoice[] = [];

          const apiVoicesInCategory = apiVoicesData.filter(
            voice =>
              voice.parentId === apiCategory.id || (voice.parentId === null && apiCategory.id === noCategoryValue.id),
          );

          currentChannel.voices.forEach(voice => {
            const apiVoice = apiVoicesInCategory.find(apiVoiceInCategory => apiVoiceInCategory.id === voice.id);
            if (apiVoice !== undefined) {
              returnVoices.push(apiVoice);
            }
          });

          returnVoices.push(
            ...apiVoicesInCategory.filter(
              apiVoiceInCategory => !returnVoices.some(voice => voice.id === apiVoiceInCategory.id),
            ),
          );

          acc.push({
            ...apiCategory,
            voices: returnVoices,
          });
        }
        return acc;
      }, []);

      apiCategoriesData.forEach(apiCategory => {
        if (!returnChannels.some(channel => channel.id === apiCategory.id)) {
          returnChannels.push({
            ...apiCategory,
            voices: apiVoicesData.filter(voice => voice.parentId === apiCategory.id),
          });
        }
      });

      return returnChannels;
    });
  }, [apiCategories.data, apiVoices.data, setChannels]);
};

export { useReflectChannelChanges };
